# Project Knowledge Graph
## Pure'O Naturals BDM Capstone — File & Insight Relationship Map

---

## Artifact Classification

### CORE ARTIFACTS (Production-Grade)

| File | Type | Stage | Purpose |
|------|------|-------|---------|
| `22f1001645- Final_Report.pdf` | PDF | Final | Submitted final report |
| `22f1001645- Final_Report.md` | Markdown | Final | Source text of final report |
| `BDM_Final_Report_Pure_O_Naturals_Dec2025.md` | Markdown | Final | Master annotated report |
| `22f1001645- Midterm_Report.pdf` | PDF | Midterm | Submitted midterm report |
| `22f1001645- BDM_Proposal_.pdf` | PDF | Proposal | Submitted proposal |
| `BDM PPT viva.pptx` | PowerPoint | Final | Viva presentation deck |
| `cleaned_sales.csv` | CSV | Data | Master cleaned dataset (all 52,314 transactions) |
| `monthly_overall.csv` | CSV | Data | Monthly revenue aggregates |
| `category_performance.csv` | CSV | Data | Category-level KPIs |
| `wastage_risk.csv` | CSV | Data | 746 volatile SKU flags |
| `slow_movers.csv` | CSV | Data | 302 slow-mover products (>30 day gap) |
| `low_margin.csv` | CSV | Data | 869 below-floor margin products |
| `pricing_misalignment_top20.csv` | CSV | Data | Top 20 price-volatile SKUs |
| `branch_revenue.csv` | CSV | Data | Branch-level revenue rollup |
| `eda_pure_o_naturals.py` | Python | Scripts | EDA + cleaning pipeline |
| `ada_pipeline.py` | Python | Scripts | ABC + advanced analytics |

### SUPPORTING ARTIFACTS

| File | Type | Purpose |
|------|------|---------|
| `1. pureo_naturals_6_month_eda_apr_sep_2025_end_to_end_documentation.md` | Markdown | EDA end-to-end documentation |
| `1.1. pureo_naturals_strategic_prioritization_addendum_apr_sep_2025.md` | Markdown | Strategic priority ordering rationale |
| `2. bdm_capstone_methodology_design_pureo_naturals.md` | Markdown | Methodology design document |
| `6.problem_solving_approach_strategic_synthesis_and_benchmark_validation.md` | Markdown | Problem-solving approach + benchmark validation |
| All ADA Visuals (.png files) | Images | 8 analytical chart outputs |
| All XLSX/CSV monthly raw files | Raw Data | Original POS exports (6 months) |

### REFERENCE ARTIFACTS (Institutional Guides)

| File | Purpose |
|------|---------|
| `BDM Capstone Project Document for 2025.pdf` | Course requirements document |
| `BDM Capstone Project Rubrics- Analysis with Primary Data.pdf` | Grading rubric |
| `Mastery Guide - Mid Term Excellence.pdf` | Internal excellence guide |
| `Authorization Letter from IITM.pdf` | IIT Madras authorization |
| `Proof of Originality.pdf` | Originality certificate |

### NOISE / ARCHIVE (Not Core)

| Pattern | Status |
|---------|--------|
| `.venv/` folder | Virtual environment — exclude from portfolio |
| `.pytest_cache/` | Test cache — exclude |
| `__pycache__/` | Python bytecode — exclude |
| `archives/scripts_legacy_*` | Legacy scripts (superseded by `scripts/` folder) |
| `dist/section6_*` | Generated distribution packages |
| `output/metadata/archives/*` | Historical metadata snapshots |
| `tmp_check_pdf.py`, `tmp_show_section3_md.py` | Temporary debugging scripts |

---

## Conceptual Knowledge Map

```
BUSINESS CONTEXT
    └── Pure'O Naturals (organic retail chain, South India)
        └── Branch 0007-ANJANEYA NAGER (Bangalore, 2,400 sq.ft)
            └── Owner: Mr. [Name] (NOC authorized)
            └── Period: Apr–Sep 2025 (183 days)
            └── Revenue: ₹2.54 crores | Transactions: 52,314 | SKUs: 3,247

PROBLEM DISCOVERY
    └── Owner Interview → 3 pain points → 5 quantified problems
        ├── P1: Demand Volatility (746 SKUs, CV>25%, ₹31.7L/year)
        ├── P2: Portfolio Complexity (80% SKUs → 19% revenue, ₹8.3L locked)
        ├── P3: Margin Compression (869 SKUs below 20%, ₹22.4L/month at risk)
        ├── P4: Pricing Misalignment (36.6% variance, ₹14.4L annual leakage)
        └── P5: Category Mix Drift (40.28% Unknown, Vegetables +42.8%, Fruits -20.6%)

DATA PIPELINE
    └── Raw POS CSVs (6 files, monthly)
        └── Cleaning: normalization → imputation → deduplication
        └── Category mapping (3-layer: keyword → web → brand/price inference)
        └── Derived datasets:
            ├── cleaned_sales.csv (master)
            ├── monthly_overall.csv
            ├── category_performance.csv
            ├── wastage_risk.csv (CV>25%)
            ├── slow_movers.csv (DSLS>30 days)
            ├── low_margin.csv (margin<20%)
            └── pricing_misalignment_top20.csv

ANALYTICAL METHODS (6 core techniques)
    ├── ABC/Pareto → Portfolio class A/B/C labels (3,247 rows)
    ├── CV Volatility → wastage_risk.csv (746 flagged)
    ├── P10 Margin Proxy → low_margin.csv (869 flagged)
    ├── Price Variance Index → pricing_misalignment_top20.csv
    ├── X-MR Control Charts → pricing stability analysis
    └── Risk Stratification → RED/YELLOW/GREEN/BLUE matrix

VISUAL OUTPUTS (8 charts)
    ├── Fig 1: Rolling Volatility Heatmap (Top 20-30 SKUs)
    ├── Fig 2: Margin Distribution by Category
    ├── Fig 3: Category Mix by Month (revenue share %)
    ├── Fig 4: Daily Sales Z-Score (Top SKUs)
    ├── Fig 5: ABC Pareto Curve
    ├── Fig 6: Daily Revenue Histogram
    ├── Fig 7: Monthly Revenue Trend Line
    └── Fig 8: X-MR Control Charts (pricing)

STRATEGY (3 pillars, 12 weeks)
    ├── Pillar 1: SKU Rationalization (3,247 → 1,800 SKUs)
    │   ├── Phase 1: Liquidate 200 low-performers (Week 1-4)
    │   ├── Phase 2: Discontinue 600 Class C (Week 5-8)
    │   └── Phase 3: Consolidate 845 Class C (Week 9-12)
    ├── Pillar 2: Pricing & Margin Optimization
    │   ├── Tier 1: 95 negative-margin SKUs (immediate review)
    │   ├── Tier 2: 751 SKUs at 5-15% (repricing +2-5%)
    │   └── Tier 3: 23 SKUs at 15-20% (bundling)
    └── Pillar 3: Dynamic Inventory Management
        ├── Stable: Auto-replenishment (95% SL)
        ├── Moderate: Weekly dynamic ROP (97% SL)
        └── High volatility: Daily ROP (99% SL for Class A)

BUSINESS IMPACT
    └── Conservative: ₹72 Lakhs | Upside: ₹100 Lakhs (12 months)
        ├── Repricing: ₹28-42L
        ├── Pricing standardization: ₹14.4L
        ├── SKU consolidation: ₹12-18L
        ├── Dynamic safety stock: ₹8.8-12.1L
        └── Inventory liquidation: ₹8.5-11.2L
```

---

## Stage-by-Stage File Relationships

### Stage 1 → Proposal
```
Problem identification → 0. Pre-Feed Documents (reference)
                      → Owner interview (video, 45 min)
                      → Proposal Format (IITM template)
                      → SUBMITTED: 22f1001645- BDM_Proposal_.pdf
                      → WBS & Gantt Chart
```

### Stage 2 → Midterm Report
```
Raw data (6 CSVs) → Cleaned data → EDA scripts
                 → Section 3 (Metadata & Data Sources)
                 → Section 4 (Descriptive Statistics)
                 → Section 5 (Analysis Process, Methods)
                 → Section 6 (Results & Findings)
                 → ADA Visuals (8 charts)
                 → X-MR Control Charts
                 → SUBMITTED: 22f1001645- Midterm_Report.pdf
```

### Stage 3 → Final Report
```
All midterm outputs + advanced analytics
    → BDM_Final_Report_Pure_O_Naturals_Dec2025.md (master)
    → 22f1001645- Final_Report.md
    → Strategic recommendations + implementation roadmap
    → Financial impact projection (₹72-100L)
    → SUBMITTED: 22f1001645- Final_Report.pdf
    → BDM PPT viva.pptx
```

---

*Knowledge graph built via forensic analysis of all 200+ non-cache project files · March 2026*
