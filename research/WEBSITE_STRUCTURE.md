# Website Structure Guide
## Pure'O Naturals · BDM Capstone Portfolio Website

> This file maps every folder and content file to its corresponding website section. A developer can use this as a 1:1 blueprint for building the portfolio website.

---

## Recommended Website Architecture

```
Homepage (index.html)
├── Hero Section              ← EXECUTIVE_SUMMARY.md
├── Project Overview          ← README.md
├── About the Company         ← 01_Business_Context/COMPANY_PROFILE.md
├── Five Business Problems    ← 02_Problem_Statement/FIVE_PROBLEMS.md
├── Data & Methodology        ← 03_Data/DATA_DICTIONARY.md
│                                04_Methodology/ANALYTICAL_FRAMEWORK.md
├── Analysis & Findings       ← 05_Analysis/ANALYSIS_DEEP_DIVE.md
├── Visualizations Gallery    ← 06_Visualizations/*.png + VISUAL_GUIDE.md
├── Key Findings Map          ← 07_Key_Findings/PROJECT_KNOWLEDGE_GRAPH.md
├── Strategy & Recommendations← 08_Strategic_Recommendations/THREE_PILLAR_STRATEGY.md
├── Business Impact           ← 09_Business_Impact/FINANCIAL_PROJECTIONS.md
├── Downloads & Reports       ← 11_Project_Reports/ (PDFs + PPT)
└── Interactive Case Study    ← 12_Portfolio/case_study.html
```

---

## Section-by-Section Content Map

### Section 1: Hero / Landing

**Purpose:** Instantly communicate the scale and significance of the project.

**Key stats to feature (animated counters):**
- ₹2.54 Crore revenue analyzed
- 52,314 transactions
- 3,247 SKUs evaluated
- ₹72–100 Lakhs projected annual impact
- 6 analytical techniques
- 12-week implementation roadmap

**File:** `EXECUTIVE_SUMMARY.md`

---

### Section 2: Project Overview

**Purpose:** Context-setting — who, what, where, when, why.

**Content to pull:**
- Company profile card (from `01_Business_Context/COMPANY_PROFILE.md`)
- KPI table (branch at a glance)
- Study period and data source

---

### Section 3: The Five Problems

**Purpose:** Show the analytical journey from pain points → quantified problems.

**Content to pull:** `02_Problem_Statement/FIVE_PROBLEMS.md`

**Recommended UI:** 5 problem cards, each with:
- Problem icon/color code
- One-line headline
- Financial impact (monthly/annual ₹)
- Analytical method badge

| Card | Color | Problem |
|------|-------|---------|
| P1 | Orange | Demand Volatility — 746 SKUs, ₹31.7L/year |
| P2 | Purple | Portfolio Complexity — ₹8.3L locked capital |
| P3 | Red | Margin Compression — 869 SKUs, ₹34.1L/year |
| P4 | Blue | Pricing Misalignment — ₹14.4L leakage |
| P5 | Gray | Category Mix Drift — 40% attribution gap |

---

### Section 4: Data & Methodology

**Purpose:** Demonstrate analytical rigor and reproducibility.

**Content:**
- Data pipeline diagram (from `04_Methodology/ANALYTICAL_FRAMEWORK.md`)
- 6 technique cards with formulas
- QA log table (all 8 checks PASSED ✅)
- Technology stack badges (Python, pandas, numpy, matplotlib)

**Files:**
- `04_Methodology/ANALYTICAL_FRAMEWORK.md`
- `03_Data/DATA_DICTIONARY.md`

---

### Section 5: Analysis & Findings

**Purpose:** Share the "aha" moments — what the data actually revealed.

**Content to pull:** `05_Analysis/ANALYSIS_DEEP_DIVE.md`

**Recommended UI:**
- Master statistics table (embedded)
- ABC Classification donut chart (data: A=70.2%, B=20%, C=9.8%)
- Volatility distribution table
- Seasonal CV chart (Apr 1.93 → Sep 3.59)
- Margin stratification breakdown

---

### Section 6: Visualizations Gallery

**Purpose:** The visual evidence — all 8 charts explained and displayed.

**Files:** `06_Visualizations/*.png` + `06_Visualizations/VISUAL_GUIDE.md`

**Chart inventory:**

| File | Figure | Description |
|------|--------|-------------|
| `1. 7 Day Rolling Sales Volatility Heatmap for Top 20 SKU's.png` | Fig 1 | Rolling CV heatmap |
| `2. Estimated Margin Distribution by Category.png` | Fig 2 | Margin box plots |
| `3. Category Mix by Month - Revenue Share (%) - Figure_3.png` | Fig 3 | 100% stacked bar |
| `1. Daily Sales Variation ( Z-score) - Top SKU's - Figure_1.png` | Fig 4 | Z-score heatmap |
| `Chart_4_4_ABC_Pareto.png` | Fig 5 | ABC Pareto curve |
| `Chart_4_1_Daily_Revenue_Histogram.png` | Fig 6 | Daily revenue histogram |
| `Chart_4_2_Monthly_Revenue_Trends.png` | Fig 7 | Monthly trend line |
| X-MR Charts folder | Fig 8 | Shewhart control charts |

**Recommended UI:** Lightbox gallery or tabbed chart viewer with description panel from VISUAL_GUIDE.md

---

### Section 7: Knowledge Map

**Purpose:** Show the full project story — how everything connects.

**File:** `07_Key_Findings/PROJECT_KNOWLEDGE_GRAPH.md`

**Content:** Artifact classification table + ASCII knowledge tree (can be rendered as a flowchart or D3.js diagram)

---

### Section 8: Three-Pillar Strategy

**Purpose:** The actionable recommendations — what to do about the findings.

**File:** `08_Strategic_Recommendations/THREE_PILLAR_STRATEGY.md`

**Recommended UI:**
- 3 large pillar cards with icons
- 12-week implementation timeline (Gantt-style or numbered steps)
- KPI targets table

---

### Section 9: Business Impact

**Purpose:** The "so what" — quantified financial value of the analysis.

**File:** `09_Business_Impact/FINANCIAL_PROJECTIONS.md`

**Recommended UI:**
- 3-column scenario comparison (Conservative / Base / Upside)
- Value driver waterfall chart
- ROI metric cards
- Risk table

---

### Section 10: Downloads & Reports

**Purpose:** Access to all formal project documents.

**Files:** `11_Project_Reports/`

| Document | File | Description |
|----------|------|-------------|
| Final Report (PDF) | `final/22f1001645- Final_Report.pdf` | Submitted final report |
| Midterm Report (PDF) | `midterm/22f1001645- Midterm_Report.pdf` | Submitted midterm |
| Proposal (PDF) | `proposal/22f1001645- BDM_Proposal_.pdf` | Original proposal |
| Viva Presentation | `BDM PPT viva.pptx` | Final viva deck |
| Master Report (DOCX) | `12_Portfolio/master_report.docx` | Consulting-format report |

---

### Section 11: Interactive Case Study

**Purpose:** Self-contained, standalone portfolio showcase.

**File:** `12_Portfolio/case_study.html`

This is a fully self-contained single-page website. It can be hosted directly as the portfolio or embedded as a sub-page.

---

## Data Files for Web Interactivity

The CSV datasets in `03_Data/cleaned_data/` can be used to power live charts:

| Dataset | Web Use Case |
|---------|-------------|
| `monthly_overall.csv` | Revenue trend line chart |
| `category_performance.csv` | Category mix bar chart |
| `wastage_risk.csv` | Volatility scatter/heatmap |
| `slow_movers.csv` | Dormant SKU table |
| `low_margin.csv` | Margin waterfall/bar |
| `pricing_misalignment_top20.csv` | Price variance bar chart |

**Recommended chart library:** Chart.js or D3.js (both work in static HTML)

---

## Quick Start: Build the Website

1. Start with `12_Portfolio/case_study.html` — it's already a complete working site
2. Expand into a multi-page site by adding one HTML file per section
3. Use the CSV files from `03_Data/cleaned_data/` to add live data tables
4. Embed the PNG charts from `06_Visualizations/` directly
5. Add download links to `11_Project_Reports/` PDFs
6. Host on GitHub Pages, Vercel, or Netlify — all files are static

---

## Folder → Website Section Reference

| Folder | Website Section | Content Type |
|--------|----------------|-------------|
| `01_Business_Context/` | About the Company | Markdown → HTML |
| `02_Problem_Statement/` | Five Problems | Cards + tables |
| `03_Data/` | Data & Pipeline | Tables + code blocks |
| `04_Methodology/` | Analytical Framework | Diagrams + formulas |
| `05_Analysis/` | Deep Dive Findings | Tables + stats |
| `06_Visualizations/` | Chart Gallery | PNG lightbox |
| `07_Key_Findings/` | Knowledge Map | Flowchart or tree |
| `08_Strategic_Recommendations/` | Strategy | Pillar cards + timeline |
| `09_Business_Impact/` | Financial Impact | KPI cards + charts |
| `10_Scripts/` | GitHub / Technical | Code showcase |
| `11_Project_Reports/` | Downloads | PDF links |
| `12_Portfolio/` | Interactive Site | Live HTML |
| `EXECUTIVE_SUMMARY.md` | Hero Section | Animated stats |
| `README.md` | Full Project README | GitHub display |

---

*Last updated: March 2026 · Student 22f1001645 · IIT Madras BDM Capstone*
