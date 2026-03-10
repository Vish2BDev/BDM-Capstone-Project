# Pure'O Naturals - Branch Sales Analysis

**IIT Madras BDM Capstone · Student 22f1001645 · April to September 2025**

[![Python](https://img.shields.io/badge/Python-3.10-blue?logo=python&logoColor=white)](scripts/)
[![pandas](https://img.shields.io/badge/pandas-2.x-150458?logo=pandas&logoColor=white)](scripts/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Live Site](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://vbdmproject.vercel.app/)

---

## What this is

Pure'O Naturals is a specialty organic retail store in Bangalore (Anjaneya Nagar branch). The owner had three recurring complaints: too many products, prices that keep changing, and vegetables going to waste before they sell.

This project takes six months of raw point-of-sale data, 52,314 transactions across 183 days, and works through each complaint systematically. The output is a set of specific, numbered recommendations with projected financial impact.

**Portfolio site:** [vbdmproject.vercel.app](https://vbdmproject.vercel.app/)

---

## Numbers

| Metric | Value |
|--------|-------|
| Revenue analyzed | Rs. 2.54 crores (Apr to Sep 2025) |
| Transactions | 52,314 |
| Unique SKUs | 3,247 |
| Analysis period | 183 days |
| Projected annual benefit | Rs. 72 to 100 lakhs |

---

## Five problems found

**1. Demand volatility (Rs. 31.7L annual wastage risk)**

746 SKUs have a Coefficient of Variation above 25%. The September CV reached 3.59 vs April's 1.93 - demand swings were getting wider over the study period. Reorder points were set on historical averages that don't account for this variability.

**2. Portfolio complexity (Rs. 8.3L locked in dormant stock)**

80% of SKUs generate 19% of revenue. 97 products had not moved in more than 90 days. The long tail adds ordering complexity, shelf space cost, and write-off exposure with no revenue to offset it.

**3. Margin compression (Rs. 34.1L per year at risk)**

869 SKUs were priced below a 20% estimated margin floor. 95 had negative estimated margins. These are concentrated in Vegetables and Dairy, where unit prices stayed flat while input costs moved.

**4. Pricing inconsistency (Rs. 14.4L annual leakage)**

The same SKU sold at different prices across transactions throughout the period. Average Price Variance Index: 36.6%. The top offender - Banginapalli Mango - had Rs. 6.7L in annual exposure from uncontrolled price drift.

**5. Category attribution gap (40.28% to 1.5% unknown)**

40% of revenue initially had no category tag. This made any category-level analysis unreliable. A three-layer taxonomy mapping (keyword match, brand lookup, price inference) brought unknown attribution down to 1.5%.

---

## Methods

| Technique | What it does | Result |
|-----------|-------------|--------|
| ABC/Pareto | Segments SKUs by cumulative revenue contribution | Class A: 652 SKUs = 70.2% of revenue |
| CV Volatility | Identifies SKUs with high demand swing | 746 flagged at CV > 25% |
| P10 Margin Proxy | Estimates margin using price floor heuristic | 869 SKUs below 20% floor |
| Price Variance Index | Measures price inconsistency per SKU | 36.6% average variance |
| X-MR Shewhart Charts | Sets statistical control limits per SKU price | UCL/LCL calculated for top 20 SKUs |
| DSLS Protocol | 60-day decision tree for dormant SKUs | 97 SKUs flagged for action |

All analysis runs on standard Python - pandas, numpy, matplotlib, seaborn. No external data sources.

---

## Three-pillar strategy

**Pillar 1 - SKU Rationalization (12 weeks)**

Target: 3,247 to 1,800 SKUs. Phase 1 liquidates 200 dormant products in the first four weeks (Rs. 8.3L recovered). Phase 2 discontinues 600 Class C tail SKUs. Phase 3 consolidates duplicates. Expected outcome: revenue per active SKU up 80%, purchasing overhead down 15%.

**Pillar 2 - Pricing and Margin Fix (8 weeks)**

Two tiers: immediate discontinuation or +15 to 25% repricing for the 95 worst-margin SKUs, then +2% tranches every two weeks for the remaining 774. Centralized pricelist with override audit trail. Shewhart control charts for top 20 high-variance SKUs. Target: portfolio margin from 21.4% to 23.0%.

**Pillar 3 - Dynamic Inventory (8 weeks)**

Replace fixed reorder points with a CV-weighted formula:

```
ROP = mean_demand * lead_time + Z * std_dev * sqrt(lead_time)
```

Example for ANAR (pomegranate seeds): mean = 14.2 kg/day, std dev = 6.8, lead time = 1 day, Z = 2.33 (99% service level). ROP comes out to 30 kg vs the standing order of 20 kg. Implement a 30-day slow-mover review cadence. Target: stockouts -68%, wastage -60%.

---

## Projected 12-month impact

| Component | Conservative | Upside |
|-----------|-------------|--------|
| Repricing (869 SKUs) | Rs. 28L | Rs. 42L |
| Pricing standardization | Rs. 14.4L | Rs. 14.4L |
| SKU consolidation | Rs. 12L | Rs. 18L |
| Dynamic safety stock | Rs. 8.8L | Rs. 12.1L |
| Inventory liquidation | Rs. 8.5L | Rs. 11.2L |
| **Total** | **Rs. 72L** | **Rs. 100L** |

Conservative estimate assumes 70% strategy execution and 50% customer retention after price increases.

---

## Repo structure

```
analysis/
    EXECUTIVE_SUMMARY.md        project summary
    01_business_context/        company profile, store KPIs
    02_problem_statement/       five problems quantified
    03_methodology/             data pipeline, QA log, technique formulas
    04_analysis/                findings per problem
    05_visualizations/          10 charts + descriptions
    06_findings/                artifact map, knowledge graph
    07_strategy/                three-pillar detail
    08_impact/                  financial projections by value driver

datasets/
    DATA_DICTIONARY.md          column definitions for all files
    branch_revenue.csv          monthly revenue by branch
    category_performance.csv    revenue share by product category
    low_margin.csv              869 below-floor SKUs
    monthly_overall.csv         month-by-month aggregate stats
    pricing_misalignment_top20.csv  top 20 price-volatile SKUs
    slow_movers.csv             97 dormant SKUs (90+ days since last sale)
    wastage_risk.csv            746 high-CV SKUs

scripts/
    eda_pure_o_naturals.py      primary EDA: cleaning, CV analysis, ABC
    ada_pipeline.py             advanced: margin, PVI, X-MR, risk scoring
    pure_o_naturals_eda.py      supplementary EDA

portfolio/                      Next.js website source (deployed to Vercel)
```

Note: `cleaned_sales.csv` (52,314 raw POS transactions) is excluded from this repo. The 7 summary datasets above contain everything needed to verify the analysis findings.

---

## Running the scripts

Requires Python 3.10+.

```bash
pip install pandas numpy matplotlib seaborn scipy

# EDA
python scripts/eda_pure_o_naturals.py

# Full analytics pipeline
python scripts/ada_pipeline.py
```

Scripts expect raw data files in a `data/` directory. Summary output CSVs go to `datasets/`.

---

## Data

- Source: SalesDetail POS exports (.rpt.csv), one file per month, six files total
- Cleaning: 3 duplicate rows removed, category taxonomy applied (40.28% to 1.5% unknown), date range validated against manual receipts
- QA: 8 checks passed including revenue sum reconciliation, manual audit of 100 rows, and 3x pipeline reproducibility test
- No customer data in any file. All records are product-level
- Raw transaction file excluded from public repo per the data arrangement with the branch owner

---

## About

BDM (Business Data Management) is a capstone course at IIT Madras. The requirement is to identify a real business, collect primary data, apply appropriate methods, and deliver actionable recommendations.

Pure'O Naturals provided access to their POS export files for this study.

---

*IIT Madras BS Data Science · BDM Capstone · December 2025 · MIT License*


[![Python](https://img.shields.io/badge/Python-3.10-blue?logo=python&logoColor=white)](scripts/)
[![pandas](https://img.shields.io/badge/pandas-2.x-150458?logo=pandas&logoColor=white)](scripts/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Live Site](https://img.shields.io/badge/Portfolio-Live-brightgreen)](https://vbdmproject.vercel.app/)

---

## What this is

Pure'O Naturals is a specialty organic retail store in Bangalore (Anjaneya Nagar branch). The owner had three recurring complaints: too many products, prices that keep changing, and vegetables going to waste before they sell.

This project takes six months of raw point-of-sale data — 52,314 transactions across 183 days — and works through each complaint systematically. The result is a set of specific, numbered recommendations with projected financial impact.

**Live portfolio site:** [vbdmproject.vercel.app](https://vbdmproject.vercel.app/)

---

## Numbers at a glance

| Metric | Value |
|--------|-------|
| Revenue analyzed | ₹2.54 crores (Apr–Sep 2025) |
| Transactions | 52,314 |
| Unique SKUs | 3,247 |
| Analysis period | 183 days |
| Projected annual benefit | ₹72–100 lakhs |

---

## Five problems found

### 1. Demand volatility — ₹31.7L annual wastage risk
746 SKUs have a Coefficient of Variation above 25%. September CV reached 3.59 vs April's 1.93 — demand is getting more unpredictable, not less. Reorder points are set on historical averages that don't account for this swing.

### 2. Portfolio overlap — ₹8.3L locked in dormant stock
80% of SKUs generate 19% of revenue (classic Pareto tail). 97 products haven't moved in more than 90 days. The long tail adds ordering complexity, shelf space cost, and write-off risk with no revenue return.

### 3. Margin compression — ₹34.1L/year at risk
869 SKUs are priced below a 20% estimated margin floor. 95 have negative estimated margins. These aren't outliers — they form a structural pattern across Vegetables and Dairy categories where unit prices have stayed flat while input costs moved.

### 4. Pricing inconsistency — ₹14.4L annual leakage
The same SKU sells at different prices across transactions. Average Price Variance Index: 36.6%. The top offender — Banginapalli Mango — has ₹6.7L in annual exposure from uncontrolled price drift.

### 5. Category attribution gaps — 40.28% → 1.5% unknown
40% of revenue initially had no category tag, making any category-level analysis unreliable. A three-layer taxonomy mapping (product name → prefix → implicit rules) brought unknown attribution down to 1.5%.

---

## Methods used

| Technique | Purpose | Result |
|-----------|---------|--------|
| ABC/Pareto Classification | Segment SKUs by revenue contribution | Class A: 652 SKUs = 70.2% revenue |
| CV Volatility Analysis | Identify high-swing SKUs | 746 flagged (CV > 25%) |
| P10 Margin Proxy | Estimate margin without cost data | 869 SKUs below 20% floor |
| Price Variance Index (PVI) | Measure pricing inconsistency per SKU | 36.6% avg variance |
| X-MR Shewhart Control Charts | Set statistical price control limits | UCL/LCL for top 20 SKUs |
| DSLS Slow-Mover Protocol | 60-day liquidation decision tree | 97 SKUs flagged for action |

All analysis runs on standard Python (pandas, numpy, matplotlib, seaborn). No external data sources.

---

## Three-pillar strategy

### Pillar 1 — SKU Rationalization (12 weeks)
Cut from 3,247 to ~1,800 SKUs. Liquidate 200 dormant products in the first four weeks (₹8.3L recovered), then discontinue 600 Class C tail SKUs, then consolidate duplicates. Target: revenue per active SKU up 80%, purchasing overhead down 15%.

### Pillar 2 — Pricing & Margin Fix (8 weeks)
Reprice 869 below-floor SKUs in two tiers: immediate discontinuation or +15–25% for the 95 worst offenders, then +2% tranches every two weeks for the remaining 774. Deploy a centralized pricelist with override audit trail. Deploy Shewhart control charts for top 20 SKUs. Target: portfolio margin from 21.4% → 23.0%.

### Pillar 3 — Dynamic Inventory (8 weeks)
Replace fixed reorder points with a CV-weighted formula:

```
ROP = μ·LT + Z·σ·√LT
```

Where μ = mean daily demand, σ = standard deviation, LT = lead time, Z = service level Z-score. Example — ANAR: μ=14.2 kg/day, σ=6.8, LT=1 day, Z=2.33 (99%) → ROP = 30 kg (was 20). Implement 30-day slow-mover review cadence. Target: stockouts −68%, wastage −60%.

---

## Projected 12-month impact

```
Repricing (869 SKUs)          ₹28–42 lakhs
Pricing standardization        ₹14.4 lakhs
SKU consolidation              ₹12–18 lakhs
Dynamic safety stock           ₹8.8–12.1 lakhs
Inventory liquidation          ₹8.5–11.2 lakhs
─────────────────────────────────────────────
Total                          ₹72–100 lakhs
```

Conservative estimate based on 3-month phased implementation and 70% strategy execution rate.

---

## Repository structure

```
├── analysis/                   # Findings documentation
│   ├── EXECUTIVE_SUMMARY.md    # Full project summary (start here)
│   ├── 01_business_context/    # Company profile, store KPIs
│   ├── 02_problem_statement/   # Five problems, quantified
│   ├── 03_methodology/         # Analytical framework, QA log
│   ├── 04_analysis/            # Deep-dive findings per problem
│   ├── 05_visualizations/      # 10 charts + visual guide
│   ├── 06_findings/            # Knowledge graph, artifact map
│   ├── 07_strategy/            # Three-pillar strategy detail
│   └── 08_impact/              # Financial projections, scenarios
│
├── datasets/                   # Processed summary CSVs (7 files)
│   ├── DATA_DICTIONARY.md      # Column definitions for all files
│   ├── branch_revenue.csv      # Monthly revenue by branch
│   ├── category_performance.csv
│   ├── low_margin.csv          # 869 below-floor SKUs
│   ├── monthly_overall.csv
│   ├── pricing_misalignment_top20.csv
│   ├── slow_movers.csv         # 97 dormant SKUs
│   └── wastage_risk.csv        # 746 high-CV SKUs
│
├── scripts/                    # Python analysis scripts
│   ├── ada_pipeline.py         # Advanced analytics pipeline
│   ├── eda_pure_o_naturals.py  # Primary EDA script
│   └── pure_o_naturals_eda.py  # Supplementary EDA
│
└── portfolio/                  # Next.js portfolio website (Vercel)
    └── ...                     # See vbdmproject.vercel.app
```

> **Note:** `cleaned_sales.csv` (52,314 raw POS transactions) is excluded from this repo. The 7 summary datasets here contain all the information needed to reproduce the analysis findings.

---

## How to run the scripts

**Requirements:** Python 3.10+, pandas, numpy, matplotlib, seaborn

```bash
pip install pandas numpy matplotlib seaborn scipy

# Primary EDA
python scripts/eda_pure_o_naturals.py

# Full analytics pipeline
python scripts/ada_pipeline.py
```

Scripts expect the raw data files in a `data/` directory. Summary output CSVs land in `datasets/`.

---

## Data notes

- Source: SalesDetail POS exports (.rpt.csv format), 6 monthly files
- Cleaning: 3 duplicate rows removed, category taxonomy mapped (40.28% → 1.5% unknown), date range validated
- QA: 8 checks passed including revenue sum reconciliation, manual receipt audit (100 rows), and 3× pipeline reproducibility test
- No customer-identifiable information in any file. Data is product-level and transaction-level only.
- Raw transaction data excluded from public repo per the data sharing agreement with the branch owner (academic use only)

---

## About this project

BDM (Business Data Management) is a capstone course at IIT Madras. The project requirement is to identify a real business, collect primary data, apply appropriate analytical methods, and produce actionable recommendations.

Pure'O Naturals gave access to their POS export files for this study. The analysis and recommendations are the student's own work.

---

*IIT Madras BS Data Science · BDM Capstone · December 2025 · MIT License*
