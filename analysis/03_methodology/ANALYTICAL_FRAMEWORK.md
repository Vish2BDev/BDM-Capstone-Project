# Analytical Framework
## Pure'O Naturals · BDM Capstone · Methodology & Techniques

---

## Research Design Overview

This study follows a **quantitative, data-driven research design** with primary data collected directly from the business's POS system. The research was structured in three phases:

| Phase | Stage | Output |
|-------|-------|--------|
| **Phase 1** | Problem Discovery | Owner interview → 5 SMART problem statements |
| **Phase 2** | Data Collection & Cleaning | 6-month POS exports → `cleaned_sales.csv` |
| **Phase 3** | Analysis & Recommendations | 6 analytical techniques → 3-pillar strategy |

---

## Data Collection

### Primary Data Source
**POS System Exports** — 6 monthly CSV files from Branch 0007-ANJANEYA NAGER's SalesDetail reporting module.

| File | Period | Rows (approx.) |
|------|--------|---------------|
| `1-04-2025 to 30-04-2025 - SalesDetail.rpt.csv` | April 2025 | ~8,500 |
| `1-05-2025 to 31-05-2025 - SalesDetail.rpt.csv` | May 2025 | ~9,100 |
| `1-06-2025 to 30-06-2025 - SalesDetail.rpt.csv` | June 2025 | ~8,800 |
| `1-07-2025 to 31-07-2025 - SalesDetail.rpt.csv` | July 2025 | ~9,200 |
| `1-08-2025 to 31-08-2025 - SalesDetail.rpt.csv` | August 2025 | ~8,400 |
| `1-09-2025 to 30-09-2025 - SalesDetail.rpt.csv` | September 2025 | ~8,314 |

**Total: 52,314 transaction rows after cleaning** across 183 trading days.

### Why Primary Data?
POS data provides transaction-level granularity — every sale, every SKU, every price point, every day. This granularity is essential for demand CV calculation, price variance analysis, and slow-mover DSLS detection. Secondary data (e.g., industry benchmarks) was used only for validation purposes.

---

## Data Cleaning Pipeline

### Step-by-Step Process

```
RAW CSVs (6 files, complex multi-header format)
    │
    ├── 1. Header Parsing
    │       Extract date from "Report date: dd/mm/yyyy" row
    │       Extract branch from "Location, <name>" row
    │
    ├── 2. Column Normalization
    │       Map raw columns → standard schema
    │       Product names: lowercase → uppercase, whitespace stripped
    │       Dates: dd/mm/yyyy → ISO 8601 (YYYY-MM-DD)
    │       Revenue: comma-stripped, ₹-symbol-stripped → float
    │
    ├── 3. Missing Value Imputation
    │       Missing unit_price (0.02%): product-level median imputation
    │       Missing total_revenue: derived as quantity_sold × unit_price
    │
    ├── 4. Quality Filters
    │       Remove negative values (returns not modelled as positive sales)
    │       Remove 3 duplicate rows (identical date+product+qty+price)
    │       Manually verify prices >₹5,500 (confirmed bulk orders)
    │
    ├── 5. Category Mapping (3-layer algorithm)
    │       Layer 1: Keyword match ("MANGO" → fruits, "MILK" → dairy)
    │       Layer 2: Brand/product web lookup for ambiguous terms
    │       Layer 3: Price inference for remaining unknowns
    │       Result: 98.5% high-confidence attribution
    │
    └── MASTER DATASET: cleaned_sales.csv
            52,314 rows × 7 columns
            All QA checks PASSED
```

### QA Log (All Checks PASSED ✅)

| Check | Status | Result |
|-------|--------|--------|
| Revenue sum consistency | ✅ PASS | Monthly file sum = master file (zero discrepancy) |
| Date range coverage | ✅ PASS | All 183 days present; no missing dates |
| Missing critical columns | ✅ PASS | 0 missing in date, product, quantity, price, revenue |
| Duplicate removal | ✅ PASS | 3 duplicates removed; documented |
| Outlier handling | ✅ PASS | Prices >₹5,500 manually verified (bulk orders confirmed) |
| Category mapping | ✅ PASS | 98.5% high-confidence; 1.5% flagged for review |
| Manual audit (100 rows) | ✅ PASS | 99% match against paper receipts |
| Pipeline reproducibility | ✅ PASS | Re-executed 3× (Oct 15, Oct 28, Nov 7); consistent to 3 decimals |

---

## Six Core Analytical Techniques

### Technique 1: Descriptive Statistics & EDA

**Purpose:** Establish baseline understanding of the business — revenue distribution, transaction patterns, price spread.

**Key metrics computed:**
- Daily/monthly revenue: mean, median, standard deviation, skewness
- Transaction value distribution (mean ₹486, median ₹200, skewness 6.1)
- Units sold by category
- Price CV across portfolio (overall CV: 180.9%)

**Tools:** Python (pandas, numpy, matplotlib, seaborn)
**Output:** `monthly_overall.csv`, `section4_master_table.csv`, Figures 6 & 7

---

### Technique 2: ABC/Pareto Classification

**Purpose:** Identify the 20% of SKUs driving 80% of revenue, enabling differentiated investment and service levels.

**Formula:**
```
1. Sort all SKUs by total_revenue (descending)
2. Compute cumulative_revenue_pct for each SKU
3. Assign class:
   - Class A: cumulative_revenue_pct ≤ 70.2%  (top 20% = 652 SKUs)
   - Class B: cumulative_revenue_pct ≤ 90.2%  (next 29% = 950 SKUs)
   - Class C: remainder                         (bottom 51% = 1,645 SKUs)
```

**Result:** Top 10 SKUs alone = ~15% of revenue; Class C (51% of SKUs) = only 9.8% of revenue.

**Output:** ABC labels in master dataset, Figure 5 (Pareto Curve)

---

### Technique 3: CV Volatility Analysis

**Purpose:** Quantify demand unpredictability for each SKU to set appropriate safety stock levels and flag wastage risk.

**Formula:**
```
For each (product, branch) pair:
  daily_qty = daily sum of quantity_sold
  CV = std_dev(daily_qty) / mean(daily_qty)

  flag_volatile = True if CV > 0.25 (25%)
  volatility_index = (max_daily_qty - avg_daily_qty) / avg_daily_qty
```

**Result:** 746 SKUs flagged as high-volatility (CV >25%)
**Seasonal pattern:** Rolling CV by month = 1.93 (Apr) → 3.59 (Sep)

**Output:** `wastage_risk.csv`, Figure 1 (Rolling Volatility Heatmap), Figure 4 (Z-Score Heatmap)

---

### Technique 4: P10 Margin Proxy Analysis

**Purpose:** Estimate product-level margins in the absence of COGS data by using the 10th percentile of observed unit prices as a cost proxy.

**Formula:**
```
p10_unit_price = 10th percentile of unit_price for each product
margin_estimate = 1 - (p10_unit_price / avg_unit_price)

margin_gap = max(0, 0.20 - margin_estimate)
margin_at_risk = margin_gap × monthly_revenue

tier =
  "Tier 1 (Negative)" if margin_estimate < 0
  "Tier 2 (Very Low)"  if 0 ≤ margin_estimate < 0.15
  "Tier 3 (Low)"       if 0.15 ≤ margin_estimate < 0.20

action_flag =
  "IMMEDIATE" if margin_estimate < 0
  "HIGH"      if 0 ≤ margin_estimate < 0.15
  "MONITOR"   if 0.15 ≤ margin_estimate < 0.20
```

> ⚠️ **Limitation:** The P10 heuristic carries an estimated ±15 percentage point error band. It provides directional prioritization only — not precise COGS. All recommendations must be validated against actual supplier invoices before executing price changes.

**Result:** 869 SKUs below 20% margin floor; ₹2.84L/month at risk.

**Output:** `low_margin.csv`, Figure 2 (Margin Distribution by Category)

---

### Technique 5: Price Variance Index (PVI) & X-MR Control Charts

**Purpose:** Identify SKUs where unit prices fluctuate excessively across transactions — indicating POS override abuse or supplier cost pass-through instability.

**Formulas:**
```
# Price Variance Index
unit_price_variance = variance(unit_price) per product
PVI = unit_price_variance / (revenue_6mo / total_units)
price_range_pct = (max_price - min_price) / avg_price × 100

# Shewhart X-MR Chart
X̄ = mean of daily avg unit prices
MR = moving range between consecutive daily averages
MR̄ = mean of all moving ranges
UCL = X̄ + 2.66 × MR̄
LCL = X̄ - 2.66 × MR̄
```

**Result:** Top 20 misaligned SKUs identified; BANGINAPALLI MANGO LOOSE = highest revenue exposure at ₹6.7L.

**Output:** `pricing_misalignment_top20.csv`, Figure 8 (X-MR Control Charts)

---

### Technique 6: Risk Stratification Matrix

**Purpose:** Synthesize all analytical signals into a unified risk score per SKU, enabling portfolio-wide triage.

**Formula:**
```
Risk Score = (
    normalize(CV_pct) × 0.33 +
    normalize(margin_gap_pct) × 0.33 +
    normalize(dsls / 10) × 0.34
)

Zone assignment:
  RED    (Score > 50): CV >25% + Margin <15% + Revenue <₹4K/6mo → Discontinue
  YELLOW (Score 30-50): Monitoring required
  GREEN  (Score 10-30): Stable, routine management
  BLUE   (Score < 10, High Revenue): Growth Champions → Maximum investment
```

**Result:**
- RED Zone: ~200 SKUs (discontinue candidates)
- BLUE Zone: ~200 SKUs (Class A, low CV, good margin) — zero-stockout guarantee targets

---

## Derived Datasets Summary

| Dataset | Rows | Analytical Purpose |
|---------|------|-------------------|
| `cleaned_sales.csv` | 52,314 | Master transaction log |
| `monthly_overall.csv` | 6 | Revenue trend analysis |
| `category_performance.csv` | 24 (4 cats × 6 months) | Category mix drift |
| `wastage_risk.csv` | 3,247 | Volatility flags per SKU |
| `slow_movers.csv` | 302+ | Dormancy and SKU lifecycle |
| `low_margin.csv` | 869 | Below-floor margin products |
| `pricing_misalignment_top20.csv` | 20 | Highest price-variance SKUs |
| `branch_revenue.csv` | Variable | Branch-level rollup |

---

## Technology Stack

| Tool | Purpose |
|------|---------|
| **Python 3.x** | Primary analysis language |
| **pandas** | Data wrangling, groupby, rolling calculations |
| **numpy** | Statistical computations (CV, variance, Z-scores) |
| **matplotlib** | Chart generation (Figures 1–8) |
| **seaborn** | Heatmaps, distribution plots |
| **scipy.stats** | Skewness, percentile calculations |
| **docx (npm)** | Final report generation |

**Scripts:**
- `eda_pure_o_naturals.py` — EDA, cleaning pipeline, basic visualizations
- `ada_pipeline.py` — ABC classification, advanced analytics, derived datasets
- `compute_section4_master_table.py` — Descriptive statistics master table

---

*All analysis reproducible end-to-end via scripts in `10_Scripts/` · Pipeline re-executed 3× with consistent results · Full data dictionary in `03_Data/DATA_DICTIONARY.md`*
