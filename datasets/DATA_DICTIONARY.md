# Data Dictionary
## Pure'O Naturals BDM Capstone · Dataset Documentation

---

## Master Dataset: `cleaned_sales.csv`

**Description:** The authoritative, cleaned transaction-level dataset combining 6 months of POS exports.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `date` | datetime | Transaction date (ISO 8601: YYYY-MM-DD) | 2025-04-01 |
| `branch` | string | Branch identifier parsed from Location header | 0007-ANJANEYA NAGER |
| `product` | string | SKU description (normalized: uppercase, trimmed) | ANAR |
| `quantity_sold` | float | Units sold in transaction row | 2.5 |
| `unit_price` | float | Selling price per unit (₹) | 287.0 |
| `total_revenue` | float | Net sales amount incl. tax for the row (₹) | 717.5 |
| `category` | enum | Inferred category: fruits / vegetables / juices / unknown | fruits |

**Cleaning Rules Applied:**
- Product names: lowercase → uppercase, whitespace stripped, special characters normalized
- Dates: dd/mm/yyyy → ISO 8601 (day-first parsing)
- Revenue: Comma-stripped, symbol-stripped, converted to float
- Missing unit_price (0.02%): imputed via product-level median
- Missing total_revenue: derived as `quantity_sold × unit_price`
- Negative values: removed (returns not modelled as positive sales)
- Duplicates: 3 rows removed (identical date+product+qty+price)

---

## Derived Dataset: `monthly_overall.csv`

**Description:** Monthly revenue aggregates for trend analysis.

| Column | Description |
|--------|-------------|
| `year_month` | YYYY-MM format |
| `total_revenue` | Sum of all transaction revenue for the month |
| `total_transactions` | Count of transaction rows |
| `avg_daily_revenue` | total_revenue / trading_days |
| `mom_pct_change` | Month-over-month % revenue change |
| `total_units` | Sum of quantity_sold |

---

## Derived Dataset: `category_performance.csv`

**Description:** Category-level KPIs per month.

| Column | Description |
|--------|-------------|
| `year_month` | Period |
| `category` | fruits / vegetables / juices / unknown |
| `revenue` | Category revenue for the period |
| `revenue_share_pct` | Category % of total revenue |
| `transaction_count` | Number of transactions |
| `total_units` | Units sold |
| `avg_unit_price` | Average selling price |
| `ytd_growth_pct` | YTD proxy: first vs. last month % change |

---

## Derived Dataset: `wastage_risk.csv`

**Description:** Products flagged as high-volatility demand risk.

| Column | Description |
|--------|-------------|
| `branch` | Branch ID |
| `product` | SKU description |
| `avg_daily_units` | Mean daily quantity across active trading days |
| `max_daily_units` | Maximum single-day quantity |
| `std_daily_units` | Standard deviation of daily quantity |
| `cv_units` | Coefficient of variation (std/mean) — flag threshold: 0.25 |
| `volatility_index` | (max−avg)/avg — flag threshold: 0.25 |
| `flag_volatile` | Boolean: True if cv_units >0.25 OR volatility_index >0.25 |
| `revenue_exposure` | avg_daily_units × avg_unit_price × 30 (monthly revenue proxy) |

**Flagged count:** 746 products (CV >25%)

---

## Derived Dataset: `slow_movers.csv`

**Description:** Products with infrequent or absent sales — inventory risk.

| Column | Description |
|--------|-------------|
| `branch` | Branch ID |
| `product` | SKU description |
| `last_sale_date` | Most recent transaction date in dataset |
| `max_gap_days` | Longest interval between consecutive sales (days) |
| `dsls` | Days Since Last Sale (from analysis end date Sep 30, 2025) |
| `total_revenue_6mo` | Total 6-month revenue for the product |
| `slow_mover_flag` | True if max_gap_days >30 |
| `dormancy_flag` | True if dsls >90 (dormant — discontinue candidate) |

**Flagged counts:** 302 with max_gap >30 days; 97 with dsls >90 days

---

## Derived Dataset: `low_margin.csv`

**Description:** Products with estimated margin below 20% floor.

| Column | Description |
|--------|-------------|
| `product` | SKU description |
| `category` | Inferred category |
| `avg_unit_price` | Mean unit price across all transactions |
| `p10_unit_price` | 10th percentile unit price (cost proxy) |
| `margin_estimate` | `1 − p10_unit_price / avg_unit_price` |
| `revenue_6mo` | Total 6-month revenue |
| `monthly_revenue` | revenue_6mo / 6 |
| `margin_gap` | `max(0, 0.20 − margin_estimate)` |
| `margin_at_risk` | `margin_gap × monthly_revenue` |
| `tier` | Tier 1 (negative) / Tier 2 (5-15%) / Tier 3 (15-20%) |
| `action_flag` | IMMEDIATE / HIGH / MONITOR |

**Flagged count:** 869 products below 20% margin

**Important limitation:** P10 heuristic provides a proxy margin, not true COGS. Error band estimated at ±15 percentage points. Use for directional prioritization only; validate with actual supplier invoices before executing price changes.

---

## Derived Dataset: `pricing_misalignment_top20.csv`

**Description:** Top 20 products with highest unit price variance — pricing control issue.

| Column | Description |
|--------|-------------|
| `product` | SKU description |
| `unit_price_variance` | Statistical variance of unit_price across all transactions |
| `revenue_6mo` | Total 6-month revenue |
| `avg_unit_price` | Mean unit price |
| `misalignment_score` | `unit_price_variance / (revenue_6mo / total_units)` |
| `price_range_pct` | `(max_price − min_price) / avg_price × 100` |
| `transaction_count` | Number of transactions for this product |

---

## Raw Data: Monthly POS CSV Exports

**Location:** `03_Data/raw_data/`
**Files:** 6 CSVs named `1-04-2025 to 30-04-2025 - SalesDetail.rpt.csv` through September

**Raw Schema (before cleaning):**

| Raw Column | Cleaned Column | Notes |
|-----------|---------------|-------|
| Report date (header) | `date` | Parsed from "dd/mm/yyyy" in column 0 |
| Location header | `branch` | Parsed from "Location, <name>" rows |
| Description / Item Name | `product` | SKU description |
| Qty Sold | `quantity_sold` | May contain commas; parsed to float |
| SP / Selling Price | `unit_price` | May contain ₹ symbol; parsed to float |
| Net Sales Amount (Incl. Tax) | `total_revenue` | May contain commas; parsed to float |
| (inferred) | `category` | 3-layer keyword algorithm |

---

## Quality Assurance Log

| Check | Status | Method |
|-------|--------|--------|
| Revenue sum consistency | ✅ PASS | Monthly file sum = master file (zero discrepancy) |
| Date range coverage | ✅ PASS | All 183 days present; no missing dates |
| Missing critical columns | ✅ PASS | 0 missing in date, product, quantity, price, revenue |
| Duplicate removal | ✅ PASS | 3 duplicates removed; documented |
| Outlier handling | ✅ PASS | Prices >₹5,500 manually verified (bulk orders confirmed) |
| Category mapping | ✅ PASS | 98.5% high-confidence attribution; 1.5% flagged for review |
| Manual audit (100 rows) | ✅ PASS | 99% match against paper receipts |
| Pipeline reproducibility | ✅ PASS | Re-executed 3× (Oct 15, Oct 28, Nov 7); consistent to 3 decimals |

---

*Data authorized by Pure'O Naturals branch owner under formal NOC · All derivatives version-controlled*
