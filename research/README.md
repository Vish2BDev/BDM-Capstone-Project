# 📊 From Chaos to Control: Data-Driven Retail Optimization for Pure'O Naturals

> **IIT Madras BDM Capstone Project** | Student: 22f1001645 | Program: BS in Data Science & Applications

---

## 🧭 Project at a Glance

| Dimension | Detail |
|-----------|--------|
| **Organization** | Pure'O Naturals — Branch 0007-ANJANEYA NAGER |
| **Industry** | Specialty Organic Retail (Fresh Produce + Packaged Goods) |
| **Analysis Period** | April 1, 2025 – September 30, 2025 (6 months) |
| **Dataset** | 52,314 transactions · 3,247 SKUs · ₹2.54 crore revenue |
| **Data Type** | Primary POS transactional data (CSV exports) |
| **Tools** | Python 3.12 · pandas · numpy · matplotlib · seaborn |
| **Deliverable** | Data-driven strategy with ₹72–100 lakh annual net benefit |

---

## 🎯 The Business Problem

Pure'O Naturals, a specialty organic retail chain serving health-conscious households in South India, faced a silent profitability crisis at its Anjaneya Nager branch. Despite generating ₹2.54 crores in 6-month revenue, the branch owner identified three gut-feel concerns:

> *"Too many products, don't know which are making money."*
> *"Pricing varies by cashier, causing customer complaints."*
> *"We throw away vegetables worth ₹10–15K every month."*

This project transforms those gut-feel concerns into **quantified business intelligence** and **actionable operational strategies**.

---

## 🔍 Five Quantified Business Problems

### Problem 1 — Portfolio Complexity & SKU Fragmentation
- **3,247 active SKUs** tracked over 6 months
- **80% of SKUs** (2,595 products) generate only **19% of revenue**
- Excess inventory carrying cost: **₹3.2L annual**

### Problem 2 — Pricing Misalignment & Revenue Leakage
- Top 20 price-volatile SKUs exhibit **36.6% average unit price variance**
- Cashier-level overrides without audit trail
- Revenue leakage: **₹1.2L/month → ₹14.4L annual**

### Problem 3 — Margin Compression
- **869 products** operate below 20% margin threshold
- Monthly margin-at-risk: **₹22.4 lakhs**
- 95 products with **negative estimated margin**

### Problem 4 — Demand Volatility & Forecasting Gaps
- **746 products** (23% of portfolio) with Coefficient of Variation (CV) > 25%
- Average: 3.2 stockouts/SKU/month + 2.1 overstock instances/month
- Total annual volatility cost: **₹31.7 lakhs**

### Problem 5 — Slow Movers & Working Capital Lock
- **97 products** with >90 days since last sale
- **76 products** with >120 days dormancy
- Working capital locked: **₹8.3 lakhs**

---

## 📐 Analytical Methodology

```
Raw POS Data (6 CSV Files)
       ↓
Data Cleaning Pipeline
(Normalization · Missing Imputation · Deduplication)
       ↓
Category Mapping (3-layer: Keyword → Web Validation → Price Inference)
       ↓
┌─────────────────────────────────────────────────────────────┐
│  DESCRIPTIVE ANALYTICS          │  ADVANCED ANALYTICS       │
│  • Summary Statistics           │  • ABC/Pareto Classification│
│  • Revenue Trend Analysis       │  • CV Volatility Profiling  │
│  • Category Mix Analysis        │  • Margin Proxy Modeling    │
│  • Seasonality Detection        │  • Price Variance Index     │
│                                 │  • X-MR Control Charts      │
│                                 │  • Risk Stratification      │
│                                 │  • DSLS Slow-Mover Detection│
└─────────────────────────────────────────────────────────────┘
       ↓
Strategic Recommendations + Implementation Roadmap
```

### Key Formulas Applied

| Technique | Formula |
|-----------|---------|
| **Volatility (CV)** | `CV = (Std Dev Daily Quantity / Mean Daily Quantity) × 100` |
| **Margin Proxy** | `Margin% = 1 - P10(unit_price) / Avg(unit_price)` |
| **Price Variance Index** | `PVI = Var(unit_price) / (Revenue / Quantity)` |
| **Dynamic Safety Stock** | `ROP = Mean_Demand × Lead_Time + Z × Demand_SD × √Lead_Time` |
| **Risk Score** | `(Volatility_CV% + Margin_Gap% + DSLS/10) / 3` |
| **Misalignment Score** | `Var(unit_price) / revenue_per_unit` |

---

## 📊 Key Findings Summary

### Revenue Snapshot
```
Total Revenue (6 months):    ₹2,53,93,827
Average Daily Revenue:       ₹1,38,764  (CV: 21.2%)
Total Transactions:          52,314
Average Transaction Value:   ₹486  (Median: ₹200)
```

### Category Mix
```
Fruits      ──────────────── 36.3%  (₹92.25L)  ↓ -20.6% trend
Vegetables  ──────────────── 35.3%  (₹89.62L)  ↑ +42.8% trend
Dairy       ████ 6.1%              (₹15.46L)
Snacks      ███ 4.3%               (₹10.91L)
Other       ████ 6.8%              (₹17.20L)
Unknown     ████████ 11.3%  ← CRITICAL DATA HYGIENE ISSUE
```

### ABC Classification
| Class | SKUs | Revenue Share | Avg Revenue/SKU | Avg Margin |
|-------|------|---------------|-----------------|------------|
| A (Top 20%) | 652 | **70.2%** | ₹2.73L | 23.1% |
| B (Mid 29%) | 950 | 20.0% | ₹53.5K | 19.3% |
| C (Tail 51%) | 1,645 | 9.8% | ₹15.1K | 21.2% |

### Volatility Profile
| Tier | CV Range | SKUs | Monthly Cost |
|------|----------|------|-------------|
| Stable | <12% | 1,948 (60%) | ₹2,100 |
| Moderate | 12–25% | 553 (17%) | ₹4,200 |
| **High** | **>25%** | **746 (23%)** | **₹18,700** |

---

## 💡 Strategic Recommendations (3-Pillar Framework)

### Pillar 1: SKU Portfolio Rationalization
**Target:** Reduce SKU base from 3,247 → 1,800 (44% reduction) in 12 weeks

| Phase | Action | Timeline | Impact |
|-------|--------|----------|--------|
| Phase 1 | Liquidate 200 lowest performers at 25–40% discount | Week 1–4 | Free ₹2L+ capital |
| Phase 2 | Discontinue 600 C-class products (DSLS >90 days) | Week 5–8 | Save ₹3.2L carrying cost |
| Phase 3 | Consolidate remaining 845 C-class; test bundles | Week 9–12 | +80% revenue per SKU |

### Pillar 2: Pricing & Margin Optimization
**Target:** Lift portfolio margin from 21.4% → 23.0% (1.6pp improvement)

- **Tier 1** (Negative margin, 95 SKUs): Immediate review/discontinue
- **Tier 2** (5–15% margin, 751 SKUs): +2–5% price adjustment with elasticity testing
- **Tier 3** (15–20% margin, 23 SKUs): Bundle with high-margin leaders
- Deploy centralized pricelist with ±3% deviation alerts
- **Target:** Recover ₹14.4L annual pricing leakage

### Pillar 3: Dynamic Inventory Management
**Target:** Reduce volatility costs by 30% (₹31.7L → ₹22.1L annual)

- **Stable products (60%):** Auto-replenishment; monthly review
- **Moderate volatility (17%):** Weekly dynamic ROP updates
- **High volatility (23%):** Daily ROP recalculation with rolling 30-day demand window
- **Slow-mover protocol:** Auto-flag at 30 days → Discount at 35 days → Discontinue at 60 days

---

## 💰 Business Impact Projection

| Initiative | Annual Benefit (Conservative) | Annual Benefit (Upside) |
|------------|-------------------------------|------------------------|
| Repricing 869 low-margin SKUs | ₹28 lakhs | ₹42 lakhs |
| Pricing standardization/controls | ₹14.4 lakhs | ₹14.4 lakhs |
| SKU consolidation | ₹12 lakhs | ₹18 lakhs |
| Dynamic safety stock | ₹8.8 lakhs | ₹12.1 lakhs |
| Inventory liquidation | ₹8.5 lakhs | ₹11.2 lakhs |
| **TOTAL** | **₹72 lakhs** | **₹100 lakhs** |

> *Implementation over 12 weeks with weekly KPI dashboard monitoring and quarterly business reviews.*

---

## 📁 Repository Structure

```
📊 BDM-Portfolio-PureO-Naturals/
│
├── README.md                          ← This file
├── EXECUTIVE_SUMMARY.md              ← 1-page executive overview
│
├── 01_Business_Context/              ← Company profile & background
├── 02_Problem_Statement/             ← 5 quantified business problems
├── 03_Data/
│   ├── raw_data/                     ← Original 6-month POS CSV exports
│   └── cleaned_data/                 ← Normalized master dataset + derived tables
│       ├── cleaned_sales.csv         ← Master dataset (all transactions)
│       ├── monthly_overall.csv       ← Monthly revenue trends
│       ├── category_performance.csv  ← Category mix & growth
│       ├── wastage_risk.csv          ← Volatile SKU flags
│       ├── slow_movers.csv           ← DSLS analysis
│       ├── low_margin.csv            ← Below-floor margin products
│       └── pricing_misalignment_top20.csv
├── 04_Methodology/                   ← Analytical framework & techniques
├── 05_Analysis/                      ← Section-by-section analysis
├── 06_Visualizations/                ← All charts & dashboards
├── 07_Key_Findings/                  ← Synthesized findings
├── 08_Strategic_Recommendations/     ← 3-pillar strategy
├── 09_Business_Impact/               ← Financial projections
├── 10_Scripts/                       ← Python analysis pipeline
│   ├── eda_pure_o_naturals.py        ← EDA + data cleaning
│   └── ada_pipeline.py               ← ABC + advanced analytics
├── 11_Project_Reports/
│   ├── proposal/                     ← BDM Proposal PDF
│   ├── midterm/                      ← Midterm Report PDF
│   └── final/                        ← Final Report PDF
└── 12_Portfolio/
    ├── case_study.html               ← Interactive portfolio showcase
    └── master_report.docx            ← Consulting-grade master report
```

---

## 🛠️ Technical Stack

```python
Python 3.12          # Core analysis language
pandas 2.0+          # Data manipulation & aggregation
numpy                # Statistical computations
matplotlib           # Static visualizations
seaborn              # Statistical plots
```

**Data Pipeline:**
```
Raw CSVs → parse_location_headers() → normalize_schema() →
infer_categories() → compute_metrics() → export_outputs()
```

---

## 📈 Dashboard Highlights

| Visual | What It Shows | Decision It Informs |
|--------|--------------|---------------------|
| 7-Day Rolling Volatility Heatmap | SKU-level demand instability across 6 months | Which SKUs need dynamic ordering |
| Margin Distribution by Category | Profit concentration vs. at-risk products | Repricing priority queue |
| Category Mix by Month | Revenue share shift (Apr→Sep) | Procurement rebalancing |
| Daily Revenue Z-Score | Outlier sale days | Staffing & inventory surge planning |
| ABC Pareto Curve | Revenue concentration (80/20 law) | Portfolio rationalization roadmap |
| X-MR Control Charts | Pricing stability boundaries | POS override policy design |

---

## 🏁 Project Journey

```
Stage 1: PROPOSAL (Month 1)
  └─ Problem identification · Owner interviews · Scope definition · WBS & Gantt

Stage 2: MIDTERM (Month 2–3)
  └─ Data collection · Cleaning pipeline · EDA · Descriptive statistics

Stage 3: FINAL REPORT (Month 4–5)
  └─ Advanced analytics · Strategic synthesis · Implementation roadmap · Dashboard
```

---

## 📜 Academic Context

- **Program:** IIT Madras Online BS in Data Science and Applications
- **Course:** BDM (Business Data Management) Capstone Project
- **Year:** 2025
- **Data Authorization:** Formal NOC from Pure'O Naturals branch owner
- **Methodology Standard:** Primary data analysis · 7,000+ transaction observations

---

*This project demonstrates end-to-end application of data science to real business operations — from raw POS exports to boardroom-ready strategic recommendations.*
