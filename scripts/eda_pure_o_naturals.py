import os
import json
from datetime import datetime
from pathlib import Path

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

try:
    from mlxtend.frequent_patterns import apriori, association_rules
except Exception:
    apriori = None
    association_rules = None


OUTPUT_DIR = Path("output")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


FILE_PATHS = [
    r"c:\\Users\\bhand_dyav\\Documents\\IITM Courses\\BDM Capstone Project\\Pure'O Naturals Data\\Excel Format\\1-04-2025 to 30-04-2025 - SalesDetail.rpt.csv",
    r"c:\\Users\\bhand_dyav\\Documents\\IITM Courses\\BDM Capstone Project\\Pure'O Naturals Data\\Excel Format\\1-05-2025 to 31-05-2025 - SalesDetail.rpt.csv",
    r"c:\\Users\\bhand_dyav\\Documents\\IITM Courses\\BDM Capstone Project\\Pure'O Naturals Data\\Excel Format\\1-06-2025 to 30-06-2025 - SalesDetail.rpt.csv",
    r"c:\\Users\\bhand_dyav\\Documents\\IITM Courses\\BDM Capstone Project\\Pure'O Naturals Data\\Excel Format\\1-07-2025 to 31-07-2025 - SalesDetail.rpt.csv",
    r"c:\\Users\\bhand_dyav\\Documents\\IITM Courses\\BDM Capstone Project\\Pure'O Naturals Data\\Excel Format\\1-08-2025 to 31-08-2025 - SalesDetail.rpt.csv",
    r"c:\\Users\\bhand_dyav\\Documents\\IITM Courses\\BDM Capstone Project\\Pure'O Naturals Data\\Excel Format\\1-09-2025 to 30-09-2025 - SalesDetail.rpt.csv",
]


STANDARD_COLS = {
    "date": ["date", "tran_date", "bill_date", "sale_date"],
    "branch": ["branch", "store", "location"],
    "product": ["product", "item", "sku", "product_name", "item_name"],
    "quantity_sold": ["quantity_sold", "qty", "quantity", "units"],
    "unit_price": ["unit_price", "price", "rate"],
    "total_revenue": ["total_revenue", "amount", "total", "line_total", "revenue"],
    # optional
    "category": ["category", "cat", "group"],
    "invoice_id": ["invoice_id", "invoice", "bill_no", "receipt_no", "billnumber"],
    "customer_id": ["customer_id", "customer", "cust_id", "phone", "loyalty_id"],
}


def find_column(df: pd.DataFrame, candidates: list):
    cols_lower = {c.lower(): c for c in df.columns}
    for cand in candidates:
        if cand in cols_lower:
            return cols_lower[cand]
    # try fuzzy contains
    for c in df.columns:
        cl = c.lower()
        for cand in candidates:
            if cand in cl:
                return c
    return None


def normalize_schema(df: pd.DataFrame) -> pd.DataFrame:
    mapping = {}
    for std, cand in STANDARD_COLS.items():
        col = find_column(df, [x.lower() for x in cand])
        if col:
            mapping[col] = std
    df = df.rename(columns=mapping)
    return df


def parse_dates(df: pd.DataFrame) -> pd.DataFrame:
    if "date" in df.columns:
        df["date"] = pd.to_datetime(df["date"], errors="coerce", dayfirst=True)
    return df


def compute_missing_fields(df: pd.DataFrame) -> pd.DataFrame:
    # total_revenue
    if "total_revenue" not in df.columns and {"quantity_sold", "unit_price"}.issubset(df.columns):
        df["total_revenue"] = df["quantity_sold"] * df["unit_price"]
    # unit_price
    if "unit_price" in df.columns and df["unit_price"].isna().any():
        if {"total_revenue", "quantity_sold"}.issubset(df.columns):
            mask = df["unit_price"].isna() & df["quantity_sold"].ne(0)
            df.loc[mask, "unit_price"] = df.loc[mask, "total_revenue"] / df.loc[mask, "quantity_sold"]
    # quantity
    if "quantity_sold" in df.columns and df["quantity_sold"].isna().any():
        if {"total_revenue", "unit_price"}.issubset(df.columns):
            mask = df["quantity_sold"].isna() & df["unit_price"].ne(0)
            df.loc[mask, "quantity_sold"] = df.loc[mask, "total_revenue"] / df.loc[mask, "unit_price"]
    return df


def clean_values(df: pd.DataFrame) -> pd.DataFrame:
    # Remove impossible negatives
    for col in ["quantity_sold", "unit_price", "total_revenue"]:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")
            df.loc[df[col] < 0, col] = np.nan
    # Drop rows with missing critical fields
    critical = ["date", "branch", "product"]
    df = df.dropna(subset=[c for c in critical if c in df.columns])
    # Fill remaining NaNs conservatively
    for col in ["quantity_sold", "unit_price", "total_revenue"]:
        if col in df.columns:
            # no synthetic values; leave NaNs where irrecoverable
            pass
    return df


CATEGORY_KEYWORDS = {
    "juices": ["juice", "smoothie", "cold-pressed", "blend"],
    "fruits": [
        "apple",
        "banana",
        "mango",
        "orange",
        "grape",
        "papaya",
        "pineapple",
        "berry",
        "watermelon",
        "pomegranate",
    ],
    "vegetables": [
        "carrot",
        "spinach",
        "lettuce",
        "broccoli",
        "cabbage",
        "tomato",
        "cucumber",
        "beet",
        "okra",
        "potato",
        "onion",
    ],
}


def infer_category(name: str) -> str:
    n = str(name).lower()
    for cat, keys in CATEGORY_KEYWORDS.items():
        for k in keys:
            if k in n:
                return cat
    return "unknown"


def ensure_category(df: pd.DataFrame) -> pd.DataFrame:
    if "category" not in df.columns:
        df["category"] = df["product"].apply(infer_category)
    return df


def load_all_files(paths):
    frames = []
    load_report = []
    for p in paths:
        try:
            df = pd.read_csv(p, encoding="utf-8", low_memory=False)
        except UnicodeDecodeError:
            df = pd.read_csv(p, encoding="latin-1", low_memory=False)
        orig_cols = list(df.columns)
        df = normalize_schema(df)
        df = parse_dates(df)
        df = compute_missing_fields(df)
        df = clean_values(df)
        df = ensure_category(df)
        frames.append(df)
        load_report.append({
            "file": p,
            "rows": int(len(df)),
            "columns": list(df.columns),
            "original_columns": orig_cols,
        })
    full = pd.concat(frames, axis=0, ignore_index=True)
    return full, load_report


def summarize_quality(df: pd.DataFrame, load_report):
    notes = []
    # Missingness
    miss = df.isna().mean().to_dict()
    # Anomalies: zero price or quantity
    anomalies = {
        "zero_unit_price_rows": int(df["unit_price"].eq(0).sum()) if "unit_price" in df.columns else None,
        "zero_quantity_rows": int(df["quantity_sold"].eq(0).sum()) if "quantity_sold" in df.columns else None,
    }
    summary = {
        "rows": int(len(df)),
        "columns": list(df.columns),
        "missing_fraction": miss,
        "anomalies": anomalies,
        "load_report": load_report,
        "assumptions": [
            "Dates parsed with day-first format where applicable.",
            "Total revenue computed when quantity and unit_price were available.",
            "Unit price or quantity imputed from revenue when possible; otherwise left missing.",
            "Categories inferred via keyword heuristics when not present (unknown if no match).",
        ],
    }
    with open(OUTPUT_DIR / "data_quality_report.json", "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    return summary


def add_time_columns(df: pd.DataFrame):
    df["month"] = df["date"].dt.to_period("M").astype(str)
    df["week"] = df["date"].dt.isocalendar().week.astype(int)
    df["year"] = df["date"].dt.year.astype(int)
    return df


def temporal_trends(df: pd.DataFrame):
    by_month_branch = (
        df.groupby(["branch", "month"], dropna=False)["total_revenue"].sum().reset_index()
    )
    by_month_overall = df.groupby(["month"], dropna=False)["total_revenue"].sum().reset_index()
    # MoM growth per branch
    def mom_growth(g):
        g = g.sort_values("month")
        g["mom_growth"] = g["total_revenue"].pct_change()
        return g
    mom_branch = by_month_branch.groupby("branch", dropna=False).apply(mom_growth).reset_index(drop=True)
    mom_overall = mom_growth(by_month_overall)
    # WoW per branch
    by_week_branch = (
        df.groupby(["branch", "year", "week"], dropna=False)["total_revenue"].sum().reset_index()
    )
    def wow_growth(g):
        g = g.sort_values(["year", "week"]) 
        g["wow_growth"] = g["total_revenue"].pct_change()
        return g
    wow_branch = by_week_branch.groupby("branch", dropna=False).apply(wow_growth).reset_index(drop=True)

    # Exceptional periods
    top_decline = mom_branch.dropna(subset=["mom_growth"]).nsmallest(3, "mom_growth")
    top_growth = mom_branch.dropna(subset=["mom_growth"]).nlargest(3, "mom_growth")

    by_month_branch.to_csv(OUTPUT_DIR / "monthly_revenue_by_branch.csv", index=False)
    mom_branch.to_csv(OUTPUT_DIR / "mom_growth_by_branch.csv", index=False)
    wow_branch.to_csv(OUTPUT_DIR / "wow_growth_by_branch.csv", index=False)
    by_month_overall.to_csv(OUTPUT_DIR / "monthly_revenue_overall.csv", index=False)
    top_decline.to_csv(OUTPUT_DIR / "top_mom_declines.csv", index=False)
    top_growth.to_csv(OUTPUT_DIR / "top_mom_growths.csv", index=False)

    # Plot trends
    plt.figure(figsize=(10, 6))
    for b, g in by_month_branch.groupby("branch"):
        plt.plot(g["month"], g["total_revenue"], marker="o", label=str(b))
    plt.xticks(rotation=45)
    plt.title("Monthly Revenue by Branch")
    plt.xlabel("Month")
    plt.ylabel("Revenue")
    plt.legend()
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "monthly_revenue_by_branch.png")
    plt.close()

    return {
        "mom_branch": mom_branch,
        "wow_branch": wow_branch,
        "top_growth": top_growth,
        "top_decline": top_decline,
    }


def category_performance(df: pd.DataFrame):
    by_cat = df.groupby("category").agg(
        total_revenue=("total_revenue", "sum"),
        total_units=("quantity_sold", "sum"),
    ).reset_index()
    overall_rev = by_cat["total_revenue"].sum()
    by_cat["revenue_share"] = by_cat["total_revenue"] / overall_rev
    # YTD growth proxy: change from first month to last month
    first_month = df["month"].min()
    last_month = df["month"].max()
    mcat = df.groupby(["category", "month"]).agg(total_revenue=("total_revenue", "sum")).reset_index()
    first = mcat[mcat["month"] == first_month].set_index("category")["total_revenue"]
    last = mcat[mcat["month"] == last_month].set_index("category")["total_revenue"]
    ytd = (last - first) / first.replace(0, np.nan)
    ytd = ytd.replace([np.inf, -np.inf], np.nan).fillna(0.0)
    by_cat = by_cat.merge(ytd.rename("ytd_growth").reset_index(), on="category", how="left")
    by_cat.to_csv(OUTPUT_DIR / "category_performance.csv", index=False)

    plt.figure(figsize=(8, 5))
    sns.barplot(data=by_cat.sort_values("total_revenue", ascending=False), x="category", y="total_revenue")
    plt.title("Revenue by Category")
    plt.tight_layout()
    plt.savefig(OUTPUT_DIR / "revenue_by_category.png")
    plt.close()

    return by_cat


def branch_comparison(df: pd.DataFrame):
    branch_rev = df.groupby("branch")["total_revenue"].sum().reset_index()
    overall_mean = branch_rev["total_revenue"].mean()
    branch_rev["relative_to_mean"] = branch_rev["total_revenue"] / overall_mean - 1

    # Average basket proxy: if invoice_id present, compute revenue per invoice
    if "invoice_id" in df.columns:
        basket = df.groupby(["branch", "invoice_id"])['total_revenue'].sum().reset_index()
        basket_mean = basket.groupby('branch')['total_revenue'].mean().reset_index().rename(columns={'total_revenue':'avg_basket_value'})
    else:
        # proxy: average daily revenue per branch
        daily = df.groupby(["branch", "date"])['total_revenue'].sum().reset_index()
        basket_mean = daily.groupby('branch')['total_revenue'].mean().reset_index().rename(columns={'total_revenue':'avg_basket_value'})

    branch_metrics = branch_rev.merge(basket_mean, on='branch', how='left')
    branch_metrics.to_csv(OUTPUT_DIR / "branch_comparison.csv", index=False)

    return branch_metrics


def operational_risk(df: pd.DataFrame):
    # Daily units per product
    daily_units = df.groupby(["product", "date"])['quantity_sold'].sum().reset_index()
    vol_stats = daily_units.groupby("product").agg(
        avg_daily_units=("quantity_sold", "mean"),
        max_daily_units=("quantity_sold", "max"),
        sale_days=("date", "nunique"),
    ).reset_index()
    vol_stats["volatility_ratio"] = vol_stats["max_daily_units"] / vol_stats["avg_daily_units"].replace(0, np.nan)
    vol_stats["wastage_risk_flag"] = vol_stats["volatility_ratio"] > 1.25

    # Slow-moving SKUs: max gap between sale days
    gaps = []
    for prod, g in daily_units.groupby("product"):
        dsorted = g.sort_values("date")["date"].drop_duplicates()
        if len(dsorted) > 1:
            delta = dsorted.diff().dt.days.max()
        else:
            delta = np.nan
        gaps.append({"product": prod, "max_gap_days": delta})
    gaps_df = pd.DataFrame(gaps)
    gaps_df["slow_moving_flag"] = gaps_df["max_gap_days"] > 30

    # Turnover proxy per category per month
    prod_daily = df.groupby(["product", "date"])['quantity_sold'].sum().reset_index()
    # stock proxy: rolling 3-day max per product, averaged within month
    prod_daily = prod_daily.sort_values(["product", "date"]) 
    prod_daily["roll3_sum"] = prod_daily.groupby("product")["quantity_sold"].rolling(window=3, min_periods=1).sum().reset_index(level=0, drop=True)
    prod_daily["stock_proxy"] = prod_daily.groupby("product")["roll3_sum"].transform("max")
    prod_daily["month"] = prod_daily["date"].dt.to_period("M").astype(str)
    turnover = df.groupby(["product", "month", "category"]).agg(total_units=("quantity_sold", "sum")).reset_index()
    stock_month = prod_daily.groupby(["product", "month"]).agg(stock_proxy=("stock_proxy", "max")).reset_index()
    turnover = turnover.merge(stock_month, on=["product", "month"], how="left")
    turnover["turnover_ratio"] = turnover["total_units"] / turnover["stock_proxy"].replace(0, np.nan)
    cat_turnover = turnover.groupby(["category", "month"]).agg(turnover_ratio=("turnover_ratio", "mean")).reset_index()
    cat_turnover.to_csv(OUTPUT_DIR / "category_turnover.csv", index=False)
    low_turnover = cat_turnover.groupby("category")["turnover_ratio"].mean().reset_index()
    low_turnover["low_turnover_flag"] = low_turnover["turnover_ratio"] < 4

    vol_stats.to_csv(OUTPUT_DIR / "volatility_stats.csv", index=False)
    gaps_df.to_csv(OUTPUT_DIR / "slow_moving_skus.csv", index=False)
    low_turnover.to_csv(OUTPUT_DIR / "low_turnover_categories.csv", index=False)

    return {
        "vol_stats": vol_stats,
        "gaps": gaps_df,
        "cat_turnover": cat_turnover,
        "low_turnover": low_turnover,
    }


def customer_behavior(df: pd.DataFrame):
    branch_daily = df.groupby(["branch", "date"])['total_revenue'].sum().reset_index()
    branch_avg = branch_daily.groupby("branch")["total_revenue"].mean().rename("branch_avg").reset_index()
    bd = branch_daily.merge(branch_avg, on="branch", how="left")
    bd["empty_basket_risk"] = bd["total_revenue"] < 0.5 * bd["branch_avg"]
    empty_days = bd.groupby("branch")["empty_basket_risk"].mean().reset_index().rename(columns={"empty_basket_risk":"empty_day_fraction"})

    # Purchase frequency distribution
    if "customer_id" in df.columns:
        cust_freq = df.groupby(["customer_id"]).agg(days_active=("date", "nunique"), transactions=("date", "count")).reset_index()
    else:
        # proxy: per branch active day counts
        cust_freq = bd.groupby("branch").agg(days_active=("date", "nunique")).reset_index()

    # Bundling via association rules
    bundles = pd.DataFrame()
    if apriori and association_rules:
        if "invoice_id" in df.columns:
            trans = df[['invoice_id', 'product']].dropna().drop_duplicates()
            basket = trans.groupby('invoice_id')['product'].apply(list)
        else:
            trans = df[['branch', 'date', 'product']].dropna().drop_duplicates()
            basket = trans.groupby(['branch', 'date'])['product'].apply(list)
        # Build one-hot
        # Limit to top 100 products by frequency to keep matrix manageable
        prod_counts = df['product'].value_counts().head(100).index
        rows = []
        for items in basket:
            items_set = set([i for i in items if i in prod_counts])
            rows.append({p: (p in items_set) for p in prod_counts})
        if rows:
            mat = pd.DataFrame(rows)
            freq = apriori(mat, min_support=0.05, use_colnames=True)
            rules = association_rules(freq, metric="lift", min_threshold=1.5)
            bundles = rules.sort_values("lift", ascending=False).head(50)
    bundles.to_csv(OUTPUT_DIR / "bundling_rules.csv", index=False)

    empty_days.to_csv(OUTPUT_DIR / "empty_days_by_branch.csv", index=False)
    cust_freq.to_csv(OUTPUT_DIR / "purchase_frequency.csv", index=False)

    return {
        "empty_days": empty_days,
        "cust_freq": cust_freq,
        "bundles": bundles,
    }


def profitability(df: pd.DataFrame):
    # Cost proxy: product-level 10th percentile of unit_price across period
    unit_prices = df.dropna(subset=["unit_price"]).groupby("product")["unit_price"].apply(lambda s: np.percentile(s, 10))
    costs = unit_prices.rename("cost_proxy").reset_index()
    prod_stats = df.groupby("product").agg(avg_price=("unit_price", "mean")).reset_index()
    prod_stats = prod_stats.merge(costs, on="product", how="left")
    prod_stats["margin_estimate"] = (prod_stats["avg_price"] - prod_stats["cost_proxy"]) / prod_stats["avg_price"]
    low_margin = prod_stats[prod_stats["margin_estimate"] < 0.2].sort_values("margin_estimate")

    # Misalignment: variance difference between unit_price and revenue per unit
    df_valid = df.dropna(subset=["unit_price", "quantity_sold", "total_revenue"]).copy()
    df_valid["revenue_per_unit"] = df_valid["total_revenue"] / df_valid["quantity_sold"].replace(0, np.nan)
    var_stats = df_valid.groupby("product").agg(
        unit_price_cv=("unit_price", lambda s: s.std(ddof=0) / (s.mean() if s.mean() else np.nan)),
        rev_per_unit_cv=("revenue_per_unit", lambda s: s.std(ddof=0) / (s.mean() if s.mean() else np.nan)),
    ).reset_index()
    var_stats["misalignment_score"] = (var_stats["unit_price_cv"] - var_stats["rev_per_unit_cv"]).abs()
    anomalies = var_stats.sort_values("misalignment_score", ascending=False).head(50)

    prod_stats.to_csv(OUTPUT_DIR / "product_margin_estimates.csv", index=False)
    low_margin.to_csv(OUTPUT_DIR / "low_margin_products.csv", index=False)
    anomalies.to_csv(OUTPUT_DIR / "price_revenue_misalignment.csv", index=False)

    return {
        "prod_stats": prod_stats,
        "low_margin": low_margin,
        "misalignment": anomalies,
    }


def write_summary(problem_candidates):
    md = []
    md.append("Pure’O Naturals – Enterprise EDA Summary (Apr–Sep 2025)\n")
    md.append("\nData Quality & Assumptions\n")
    md.append("- Dates parsed; revenue/price/qty cross-derived when possible.\n")
    md.append("- Categories inferred heuristically if missing; 'unknown' retained otherwise.\n")
    md.append("- Association rules computed from invoices; if absent, day-branch proxy used.\n")
    md.append("\nKey Metrics Files\n")
    md.append("- monthly_revenue_by_branch.csv, mom_growth_by_branch.csv, wow_growth_by_branch.csv\n")
    md.append("- category_performance.csv, branch_comparison.csv\n")
    md.append("- volatility_stats.csv, slow_moving_skus.csv, category_turnover.csv\n")
    md.append("- empty_days_by_branch.csv, bundling_rules.csv\n")
    md.append("- product_margin_estimates.csv, low_margin_products.csv, price_revenue_misalignment.csv\n")
    md.append("\nProblem Candidates (auto-generated excerpts)\n")
    for p in problem_candidates:
        md.append(f"- {p['title']}: {p['evidence']}\n")
    (OUTPUT_DIR / "report_summary.md").write_text("\n".join(md), encoding="utf-8")


def auto_generate_problem_candidates(mom, cat_perf, branch_metrics, risk, cust, profit):
    candidates = []
    # Exceptional decline
    if len(mom["top_decline"]) > 0:
        row = mom["top_decline"].iloc[0]
        candidates.append({
            "title": "Sharp MoM Revenue Decline in Branch",
            "evidence": f"{row['branch']} saw {row['mom_growth']:.1%} MoM change in {row['month']}",
        })
    # Low turnover category
    low_turn = risk["low_turnover"]
    lt = low_turn[low_turn["low_turnover_flag"]]
    if len(lt) > 0:
        row = lt.sort_values("turnover_ratio").iloc[0]
        candidates.append({
            "title": "Low Inventory Turnover Category",
            "evidence": f"Category {row['category']} avg turnover {row['turnover_ratio']:.2f} (<4)",
        })
    # Empty basket risk
    ed = cust["empty_days"].sort_values("empty_day_fraction", ascending=False).head(1)
    if len(ed) > 0:
        r = ed.iloc[0]
        candidates.append({
            "title": "Frequent Low-Revenue Days (Empty Basket Risk)",
            "evidence": f"Branch {r['branch']}: {r['empty_day_fraction']:.1%} of days <50% avg",
        })
    # Low margin products
    lm = profit["low_margin"].head(1)
    if len(lm) > 0:
        r = lm.iloc[0]
        candidates.append({
            "title": "Low-Margin Product Pressure",
            "evidence": f"{r['product']} margin est {r['margin_estimate']:.1%} (<20%)",
        })
    # Price-revenue misalignment
    mis = profit["misalignment"].head(1)
    if len(mis) > 0:
        r = mis.iloc[0]
        candidates.append({
            "title": "Price vs Revenue Per Unit Misalignment",
            "evidence": f"{r['product']} misalignment score {r['misalignment_score']:.2f}",
        })
    return candidates


def main():
    df, load_report = load_all_files(FILE_PATHS)
    df = df[[c for c in [
        "date", "branch", "product", "quantity_sold", "unit_price", "total_revenue", "category", "invoice_id", "customer_id"
    ] if c in df.columns]]
    summarize_quality(df, load_report)
    df = add_time_columns(df)
    # Persist cleaned
    df.to_csv(OUTPUT_DIR / "cleaned_sales.csv", index=False)

    mom = temporal_trends(df)
    cat_perf = category_performance(df)
    branch_metrics = branch_comparison(df)
    risk = operational_risk(df)
    cust = customer_behavior(df)
    profit = profitability(df)

    candidates = auto_generate_problem_candidates(mom, cat_perf, branch_metrics, risk, cust, profit)
    write_summary(candidates)

    print("Analysis complete. Outputs written to 'output' directory.")


if __name__ == "__main__":
    main()