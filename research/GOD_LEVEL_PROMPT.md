# ██████████████████████████████████████████████████████████████████
# GOD-LEVEL MASTER PROMPT
# Pure'O Naturals · BDM Capstone · Award-Winning Portfolio Website
# IIT Madras · Student 22f1001645
# ██████████████████████████████████████████████████████████████████
#
# INSTRUCTIONS FOR USE:
# Copy the entire prompt block below and paste it to Claude in a
# fresh conversation. Have your project folder open in Cowork or
# share it via filesystem access.
#
# ══════════════════════════════════════════════════════════════════

---

# MASTER PROMPT — BEGIN COPY BELOW THIS LINE

---

You are building the definitive, award-winning portfolio website for a BDM (Business Data Management) Capstone Project completed at IIT Madras. This is not a template site — it is a **world-class data journalism and consulting showcase** that must stand alongside McKinsey case studies and top Kaggle notebooks in visual and intellectual quality.

**Your mandate:** Build, deploy, and document everything end-to-end. No shortcuts. No generic AI aesthetics. This site must make any viewer stop scrolling and say "this is exceptional."

---

## SECTION 0 — PROJECT INTELLIGENCE BRIEF

**Project:** Pure'O Naturals Strategic Intelligence Report
**Student:** SVCAN · Roll No: 22f1001645 · IIT Madras BS Data Science
**Business:** Pure'O Naturals · Branch 0007-ANJANEYA NAGER · Bangalore
**Data:** 52,314 POS transactions · ₹2.54 crore revenue · 3,247 SKUs · Apr–Sep 2025
**Outcome:** ₹72–100 Lakhs projected annual benefit via 3-pillar strategy

**Five Problems Solved:**
1. Demand Volatility — 746 high-CV SKUs, ₹31.7L annual wastage risk
2. SKU Proliferation — ₹8.3L locked in dormant stock, 3,247→1,800 target
3. Margin Compression — 869 below-floor SKUs, ₹34.1L/year at risk
4. Pricing Misalignment — 36.6% avg variance, ₹14.4L annual leakage
5. Category Mix Drift — 40.28% unknown attribution → cleaned to 98.5%

**Three-Pillar Strategy:**
- Pillar 1: SKU Rationalization (ABC/Pareto + DSLS protocol)
- Pillar 2: Pricing & Margin Optimization (P10 heuristic + X-MR controls)
- Pillar 3: Dynamic Inventory Management (CV-weighted ROP formula)

---

## SECTION 1 — REPO & PROJECT STRUCTURE

### 1.1 Initialize Git Repo

Create a **pristine, top-1% GitHub repository** with this structure:

```
pureo-naturals-bdm-capstone/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml          # Vercel auto-deploy on push to main
│   │   └── lighthouse.yml      # Lighthouse CI on every PR
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
├── public/
│   ├── assets/
│   │   ├── charts/             # All analysis PNG figures (15+ files)
│   │   ├── proof/
│   │   │   ├── photos/         # Shop interaction photos (12 JPGs)
│   │   │   ├── videos/         # MP4 proof videos (5 videos)
│   │   │   └── documents/      # NOC letter, MOM photos
│   │   ├── reports/            # PDFs (proposal, midterm, final)
│   │   └── gantt/              # WBS + Gantt chart images
│   └── favicon.svg
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Main portfolio page
│   │   ├── globals.css
│   │   └── api/
│   │       └── data/
│   │           └── route.ts    # CSV data API endpoint
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── BusinessContext.tsx
│   │   ├── FiveProblems.tsx
│   │   ├── Methodology.tsx
│   │   ├── Analysis.tsx
│   │   ├── VisualizationGallery.tsx
│   │   ├── Strategy.tsx
│   │   ├── FinancialImpact.tsx
│   │   ├── ProofSection.tsx
│   │   ├── Timeline.tsx
│   │   ├── Downloads.tsx
│   │   └── ui/
│   │       ├── AnimatedCounter.tsx
│   │       ├── ChartEmbed.tsx
│   │       ├── VideoPlayer.tsx
│   │       ├── Lightbox.tsx
│   │       ├── DataTable.tsx
│   │       └── FormulaBlock.tsx
│   ├── data/
│   │   ├── monthly_overall.json
│   │   ├── category_performance.json
│   │   └── financial_projections.json
│   ├── lib/
│   │   └── utils.ts
│   └── hooks/
│       ├── useScrollReveal.ts
│       └── useAnimatedCounter.ts
├── data/                       # Raw CSVs for reference
│   ├── cleaned_sales.csv
│   ├── category_performance.csv
│   ├── wastage_risk.csv
│   ├── slow_movers.csv
│   ├── low_margin.csv
│   ├── pricing_misalignment_top20.csv
│   ├── monthly_overall.csv
│   └── branch_revenue.csv
├── scripts/
│   ├── eda_pure_o_naturals.py
│   ├── ada_pipeline.py
│   └── pure_o_naturals_eda.py
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATA_DICTIONARY.md
│   └── METHODOLOGY.md
├── .env.example
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── package.json
├── LICENSE (MIT)
├── CONTRIBUTING.md
└── README.md                   # Top-1% README (see Section 5)
```

### 1.2 .gitignore
```gitignore
node_modules/
.next/
.env
.env.local
dist/
*.log
.DS_Store
Thumbs.db
coverage/
.vercel/
```

### 1.3 .env.example
```env
# Vercel Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=

# Site URL
NEXT_PUBLIC_SITE_URL=https://pureo-naturals-bdm.vercel.app
```

---

## SECTION 2 — DESIGN DIRECTION

**Aesthetic:** `Organic Luxury Data Journalism`

This is a project about an **organic fresh produce store** analyzed with **consulting-grade rigor**. The design must marry:
- The warmth of a farmer's market — earth tones, natural texture, organic curves
- The precision of a McKinsey deck — sharp data tables, clean hierarchies, authoritative typography
- The drama of award-winning data journalism (NYT, The Pudding, Bloomberg Viz) — cinematic full-width moments, scroll-triggered reveals, charts that breathe

**Color Palette — "Midnight Harvest":**
```css
:root {
  --ink: #0D0D0B;          /* Near-black with warmth */
  --cream: #F5F0E8;        /* Warm off-white — paper texture */
  --parchment: #EDE5D0;    /* Deeper warm background */
  --forest: #1A3A2A;       /* Deep botanical green */
  --moss: #2D5A3D;         /* Primary brand green */
  --sage: #4A7C5E;         /* Secondary green */
  --fern: #6B9E7A;         /* Light green accent */
  --gold: #C8922A;         /* Warm amber — highlight/accent */
  --honey: #E8A73A;        /* Brighter gold for hover states */
  --saffron: #F5B84A;      /* Data highlight color */
  --terracotta: #C45A3A;   /* Alert/risk/warning */
  --rust: #9E3A22;         /* Deep risk color */
  --slate: #4A5568;        /* Body text */
  --silver: #A0AEC0;       /* Muted labels */
  --divider: rgba(26,58,42,0.12); /* Subtle green divider */
}
```

**Typography:**
```css
/* Display: Dramatic editorial headings */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');

/* Data: Clean, tabular precision */
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&display=swap');

/* Body: Readable, warm */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&display=swap');

/* UI Labels: Geometric precision */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');
```

**Motion Principles:**
- Page sections scroll-reveal with `translateY(40px) → 0, opacity 0 → 1` at 0.6s ease-out
- Numbers count up when they enter viewport (AnimatedCounter hook)
- Charts fade in with a 200ms stagger between elements
- Hover states: cards lift with `translateY(-4px)` + box-shadow deepens
- Proof gallery: smooth lightbox with backdrop blur
- Section transitions: thin green horizontal rule slides in from left (2s)
- Problem cards: left border sweeps in color on scroll entry

**Layout Philosophy:**
- Full-bleed dark hero with noise texture overlay
- Alternating section backgrounds: `--ink` ↔ `--cream` ↔ `--forest`
- Data tables on `--parchment` with `--moss` headers
- Charts always on `--cream` with generous padding — never cramped
- Pull quotes in `Playfair Display Italic`, oversized, centered
- Mobile-first, but desktop is the showcase — side-by-side layouts collapse gracefully

---

## SECTION 3 — WEBSITE SECTIONS (Build Each Precisely)

Build a **Next.js 14 App Router** single-page application with 12 sections. Use `IntersectionObserver` for scroll reveals. Use `Recharts` for interactive charts. Use `Framer Motion` for animations.

---

### SECTION 3.1 — HERO

**Visual:** Full-viewport dark section with animated grain texture. The Pure'O Naturals name in large `Playfair Display` italic. A one-line description.

**Content:**
```
Pure'O Naturals
Strategic Intelligence Report

A 6-Month Data Forensics Study · Bangalore · Apr–Sep 2025
IIT Madras BDM Capstone · 22f1001645
```

**Animated stat cards (count up on load, 2-second duration):**
```
₹2.54 Crore    52,314          3,247          ₹72–100L
Revenue        Transactions    SKUs Audited   Annual Impact
Analyzed       Processed       Evaluated      Projected
```

**Background:** Dark forest green `#1A3A2A` with:
- CSS noise texture overlay (SVG filter or pseudo-element grain)
- Subtle radial gradient from center
- Thin gold `#C8922A` horizontal rule below headline
- Scrolling marquee at bottom: "ABC Classification · Demand Volatility · Margin Analysis · Pricing Control · Category Mix · SKU Rationalization ·" (repeating, slow, gold text on dark)

**Navigation:** Fixed top nav, transparent → frosted glass on scroll. Links: Overview · Problems · Methodology · Analysis · Strategy · Impact · Proof · Downloads

---

### SECTION 3.2 — BUSINESS CONTEXT

**Background:** `--cream` section.

**Layout:** Two-column. Left: company profile card with store details. Right: study overview KPI table.

**Company Card:**
- Store name: **Pure'O Naturals · Branch 0007-ANJANEYA NAGER**
- Location: Bangalore, Karnataka
- Store type: Specialty Organic Retail
- Study period: April 1 – September 30, 2025 (183 days)
- POS System: SalesDetail (.rpt.csv exports)

**KPI Table (styled, `--forest` header, `--parchment` rows):**
| Metric | Value |
| Total Revenue | ₹2,53,93,827 |
| Daily Mean Revenue | ₹1,38,764 |
| Peak Daily Revenue | ₹2,58,000+ |
| Total Transactions | 52,314 |
| Unique Active SKUs | 3,247 |
| Mean Transaction Value | ₹486 |
| Median Transaction Value | ₹200 |
| Total Units Sold | 3,35,900 |
| Transaction Skewness | 6.1 (right-tailed) |

**Embed Image:** `public/assets/charts/Chart_4_3_Category_Performance.png`
— caption: "Category Revenue Mix · Apr–Sep 2025"

**Pull Quote (Playfair Italic, oversized):**
> "We often run out on busy days and over-buy on slow ones."
> — Branch Owner, Pure'O Naturals, Nov 2025

---

### SECTION 3.3 — FIVE PROBLEMS

**Background:** `--ink` (dark) section.

**Layout:** Staggered 5-card grid. Cards animate in from left with 100ms stagger.

**Card Design:** Each card has:
- Left colored border (6px): P1=orange, P2=purple, P3=red, P4=blue, P5=gray
- Problem number + title in `Syne 700`
- One-sentence impact statement in `Lora Italic`
- Two key metrics in `DM Mono`
- Method badge (pill tag, `--forest` background)
- Financial impact number, large, colored

**Five Problem Cards:**

**P1 — Demand Volatility & Wastage** `border-color: #E8873A`
- 746 SKUs with CV >25% · September CV: 3.59 (vs. April: 1.93)
- ₹31.7L annual wastage risk
- Method: `CV Analysis` `Rolling Heatmap` `Dynamic ROP`
- Image: `Chart_4_5_Volatility_Distribution.png`

**P2 — Portfolio Complexity** `border-color: #9B59B6`
- 1,645 Class C SKUs = only 9.8% revenue · 97 SKUs dormant >90 days
- ₹8.3L locked capital
- Method: `ABC/Pareto` `DSLS Analysis`
- Image: `Chart_4_4_ABC_Pareto.png`

**P3 — Margin Compression** `border-color: #E74C3C`
- 869 SKUs below 20% margin floor · 95 with negative estimated margin
- ₹34.1L/year at risk
- Method: `P10 Heuristic` `Margin Stratification`
- Image: `2. Estimated Margin Distribution by Category - Figure_2.png`

**P4 — Pricing Misalignment** `border-color: #3498DB`
- 36.6% average price variance · Top SKU: Banginapalli Mango ₹6.7L exposure
- ₹14.4L annual leakage
- Method: `PVI Index` `Shewhart X-MR Charts`
- Images (carousel): All X-MR chart PNGs from `X Chart, MR Chart/` folder

**P5 — Category Mix Drift** `border-color: #95A5A6`
- 40.28% unknown attribution → cleaned to 98.5% · Veg share +42.8% over 6 months
- Foundational data quality
- Method: `3-Layer Taxonomy` `Monthly Stacked Bar`
- Image: `3. Category Mix by Month - Revenue Share (%) - Figure_3.png`

---

### SECTION 3.4 — DATA & METHODOLOGY

**Background:** `--forest` dark section.

**Layout:** Timeline pipeline (vertical on mobile, horizontal step-flow on desktop)

**Pipeline Steps (connected by animated line):**
```
Step 1          Step 2          Step 3          Step 4
POS Export  →   Cleaning    →   Analysis    →   Synthesis
6 CSV files     52,314 rows     6 techniques    3-pillar
183 days        QA: 8/8 ✓      Python stack    strategy
```

**QA Log Table** (all green check marks):
| Check | Status |
| Revenue sum consistency | ✅ PASS |
| Date range coverage | ✅ PASS |
| Missing critical columns | ✅ PASS |
| Duplicate removal (3 found) | ✅ PASS |
| Outlier handling | ✅ PASS |
| Category mapping (98.5%) | ✅ PASS |
| Manual receipt audit (100 rows) | ✅ PASS |
| Pipeline reproducibility (3×) | ✅ PASS |

**Six Technique Cards** (2×3 grid):
Each shows technique name, formula in `DM Mono` code block, and result metric.

1. **Descriptive Statistics** — `CV = σ/μ × 100` · Overall portfolio CV: 180.9%
2. **ABC/Pareto** — `Cumulative Revenue %` · Class A (652 SKUs) = 70.2% revenue
3. **CV Volatility** — `ROP = μ·LT + Z·σ·√LT` · 746 flagged SKUs
4. **P10 Margin Proxy** — `Margin ≈ 1 − P10(price)/Avg(price)` · 869 below-floor
5. **Price Variance Index** — `PVI = Var(price)/(Revenue/Qty)` · 36.6% avg variance
6. **Risk Stratification** — `Score = (CV + Margin_Gap + DSLS/10)/3` · RED/YELLOW/GREEN/BLUE

**Tech Stack Badges:** Python · pandas · numpy · matplotlib · seaborn · scipy · docx (npm) · Next.js · Recharts

**Embed:** `1. BDM Proposal Submission/WBS & Gantt Chart/WBS & GANTT.png`
— full-width, with caption "Work Breakdown Structure & Project Gantt — 12-Week Implementation"

---

### SECTION 3.5 — ANALYSIS & FINDINGS (Deep Dive)

**Background:** `--cream` section.

**Layout:** Alternating content + chart pairs. Charts are `800×400` max-width, centered, with hover zoom effect.

**Subsections:**

**5a. Revenue Landscape**
- Master stats table (mean ₹1,38,764/day, σ ₹22,481, skewness 6.1)
- Embed: `Chart_4_1_Daily_Revenue_Histogram.png` + `Chart_4_2_Monthly_Revenue_Trends.png`
- Side by side on desktop

**5b. Category Intelligence**
- Category revenue table (Fruits 36.3%, Vegetables 35.3%, Dairy 6.1%, Snacks 4.3%, Other 18%)
- Embed: `Chart_4_3_Category_Performance.png`
- Embed: `3. Category Mix by Month - Revenue Share (%) - Figure_3.png`

**5c. ABC Classification**
- ABC table: A (652 SKUs, 70.2%), B (950 SKUs, 20%), C (1,645 SKUs, 9.8%)
- Interactive Recharts bar: top 15 Class A SKUs by revenue (data from `wastage_risk.csv`)
- Embed: `Chart_4_4_ABC_Pareto.png`
- Top SKUs callout: ANAR ₹12.98L, BANGINAPALLI MANGO ₹6.70L, APPLE ROYAL GALA ₹5.62L

**5d. Volatility Profile**
- CV distribution table: <12% (stable), 12-25% (moderate), 25-50% (high), >50% (extreme)
- Seasonal CV table: Apr 1.93 → May 2.41 → Jun 2.18 → Jul 2.87 → Aug 3.12 → Sep 3.59
- Embed: `1. Daily Sales Variation ( Z-score) - Top SKU's - Figure_1.png`
- Embed: `1. 7 Day Rolling Sales Volatility Heatmap for Top 20 SKU's.png`
- Embed: `Chart_4_5_Volatility_Distribution.png`

**5e. Margin & Pricing Deep Dive**
- Margin stratification: Negative (95 SKUs), Very Low (180), Low (571), Near-Floor (23)
- Embed: `2. Estimated Margin Distribution by Category - Figure_2.png`
- Embed: `2. Estimated Margin Distribution by SKU ( Top 20 By Revenue).png`
- X-MR Charts carousel (lightbox gallery): All Shewhart control charts from `X Chart, MR Chart/`
  - Banginapalli Mango, ANAR, Apple Royal Gala, Tomato Local + 12 more

**5f. Section 6 Extended Figures** (from `0.2. Pure'O Naturals Data/charts/section6/`)
- Figure_6_1: CV Distribution
- Figure_6_2: Rolling Volatility by Month
- Figure_6_3: Margin Distribution
- Figure_6_4: ABC Pareto
- Figure_6_5: Slow Movers DSLS
- Figure_6_6: Price Variance Top 20
- Figure_6_7: Wastage Risk
- Figure_6_8: Unknown Impact (Before vs After category cleanup)
- Figure_6_9: Day of Week Efficiency

**All figures:** Click to enlarge (full-screen lightbox). Caption from VISUAL_GUIDE.md text.

---

### SECTION 3.6 — THREE-PILLAR STRATEGY

**Background:** `--ink` dark section with subtle radial glow behind pillar cards.

**Layout:** Three hero pillar cards + implementation timeline below.

**Pillar Cards** (large, full-height, side by side on desktop):

**Pillar 1 — SKU Rationalization** `#2D5A3D` dark green card
- Icon: 🌿 (leaf, or SVG equivalent)
- Headline: "3,247 → 1,800 SKUs. 12 weeks. <3% revenue impact."
- Phase 1 (Weeks 1-4): Liquidate 200 dormant SKUs · ₹8.3L capital freed
- Phase 2 (Weeks 5-8): Discontinue 600 Class C products
- Phase 3 (Weeks 9-12): Consolidate 845 duplicates
- DSLS Protocol visual: horizontal 60-day timeline flow (Day 30 → Day 42 → Day 60)

**Pillar 2 — Pricing & Margin Optimization** `#8B4513` earthy brown card
- Icon: ₹ (rupee precision)
- Headline: "₹28–42L annual recovery. Tiered repricing. POS price floors."
- Tier 1 (95 SKUs, immediate): price +15-25% or discontinue
- Tier 2 (751 SKUs): +2% tranches every 2 weeks
- Top 20 misaligned SKUs: UCL/LCL POS controls
- Formula: `UCL = X̄ + 2.66 × MR̄` in `DM Mono` block

**Pillar 3 — Dynamic Inventory** `#1A3A6A` deep navy card
- Icon: 📊 (waveform / distribution)
- Headline: "−40% stockout rate. Dynamic ROP. CV-weighted safety stock."
- Formula showcase: `ROP = μ·LT + Z·σ·√LT` — large, gold color, `DM Mono`
- ANAR worked example: μ=14.2, σ=6.8, LT=1, Z=2.33 → SS=15.8 kg → ROP=30 kg (was 20)
- Service Level Tiers table: Stable (95%, Z=1.645) → Moderate → High → Class A Festival (99.5%)

**12-Week Implementation Timeline:**
Horizontal timeline (vertical on mobile). Each week is a dot with callout card above/below.
Color-coded by pillar (green/brown/navy). Week 12 = "Full KPI Review".

**KPI Dashboard (Post-Implementation Targets):**
Side-by-side metric cards: Current vs Target with color-coded delta arrows.
| KPI | Current | Target |
| Active SKUs | 3,247 | ≤1,800 |
| Stockout Freq | Baseline | −40% |
| Negative-margin SKUs | 95 | 0 |
| Price variance (avg) | 36.6% | ≤15% |
| Dormant SKUs | 97 | ≤10 |

---

### SECTION 3.7 — FINANCIAL IMPACT

**Background:** `--cream` section.

**Layout:** Three scenario columns + waterfall chart + ROI callout.

**Three-Scenario Cards** (side by side):
```
CONSERVATIVE          BASE CASE             UPSIDE
₹72 Lakhs            ₹85 Lakhs             ₹100 Lakhs
Annual Net Benefit    Annual Net Benefit    Annual Net Benefit
━━━━━━━━━━━━━━        ━━━━━━━━━━━━━━        ━━━━━━━━━━━━━━
Repricing: ₹28L       Repricing: ₹35L       Repricing: ₹42L
Pricing std: ₹14.4L   Pricing std: ₹14.4L   Pricing std: ₹14.4L
SKU save: ₹12L        SKU save: ₹15L        SKU save: ₹18L
Inventory: ₹8.8L      Inventory: ₹10.5L     Inventory: ₹12.1L
Liquidation: ₹8.5L   Liquidation: ₹9.8L    Liquidation: ₹11.2L
```

**ROI Callout Box** (gold border, dramatic typography):
```
Implementation Cost: ₹4–6 Lakhs
Conservative ROI:    1,100%
Payback Period:      3–5 Weeks
```

**Interactive Recharts Waterfall** (build from `financial_projections.json`):
5 bars: Repricing | Pricing Std | SKU Save | Inventory | Liquidation → Total
Color: each bar `--moss`, total bar `--gold`, labels in `DM Mono`

**Monthly Benefit Accumulation Line Chart** (Recharts):
X-axis: Month 1 → Month 12
Y-axis: ₹0 → ₹100L
Three lines: Conservative (green), Base (gold), Upside (dashed gold)
Data points: [0, 1.2, 3.8, 7.5, 12, 18, 25, 35, 45, 55, 65, 72] (conservative)

**Risk Sensitivity Table:**
| Risk | Conservative Impact | Mitigation |
Styled with `--terracotta` for risk column, `--sage` for mitigation.

---

### SECTION 3.8 — PROOF OF WORK

**Background:** `--forest` dark section. Gold section title: "Field Research & Data Acquisition"

> This section is CRITICAL for academic credibility. Every piece of evidence must be presented beautifully.

**Layout:** Three subsections

**Subsection A — Owner Interaction Videos**

Four video embeds in a 2×2 grid on desktop:
```
Video 1: "Owner Interaction Video_Actual.mp4"
  → Title: "Owner Interview — Primary Data Discussion"
  → Duration badge
  → Description: "45-minute structured interview covering business pain points,
    data authorization, and operational context. Branch 0007-ANJANEYA NAGER,
    Bangalore. November 8, 2025."

Video 2: "Store Tour - Overall Walkthrough.mp4"
  → Title: "Store Walkthrough — Branch 0007"
  → Description: "Physical store tour documenting store layout, shelf organization,
    POS terminal, and product category placement."

Video 3: "Store Tour - Interaction with Cashier.mp4"
  → Title: "POS System Demo — Data Collection Process"
  → Description: "Interaction with cashier demonstrating POS workflow and
    SalesDetail export process used to collect primary data."

Video 4: "Proof_Data_Acquisition_Process.mp4"
  → Title: "Data Acquisition — Live POS Export"
  → Description: "Screen-recorded demonstration of exporting SalesDetail.rpt.csv
    files from the branch POS system."
```

**Each video player:** Custom styled `<video>` element with:
- Thumbnail/poster (first frame)
- Gold play button overlay
- `--forest` dark background
- File name, duration, date badge
- `controls` enabled
- Max width 640px

**Subsection B — Field Photo Gallery**

Masonry or 3-column grid photo gallery with lightbox. Elegant `Playfair Display` captions.

Photos to include (all from `Section 2 - Proof of Originality/`):
```
20251108_154336.jpg  → "Pure'O Naturals Store Front — Anjaneya Nagar, Bangalore"
20251108_154347.jpg  → "Product Display — Organic Produce Section"
20251108_155027.jpg  → "Discussion with Branch Owner"
20251108_155038.jpg  → "POS Terminal & Billing Counter"
20251108_155044.jpg  → "Store Interior — Vegetable & Fruit Aisle"
20251108_201839.jpg  → "Data Collection Session — Evening Review"
IMG20251108155936.jpg → "Interaction During Store Hours"
IMG20251108155950_BURST000_COVER.jpg → "Owner Presenting Sales Reports"
IMG20251108155956.jpg → "SalesDetail Export — Data Documentation"
NOC Letter.jpg       → "No Objection Certificate — Signed by Branch Owner"
Pre-Feed: 1. .jpg    → "Pre-Analysis Store Visit — Initial Assessment"
Pre-Feed: 2.jpg      → "Data Acquisition Authorization Discussion"
Pre-Feed: Data Acquisition.png → "Data Collection Process Overview"
```

**Gallery styling:**
- Hover: slight zoom + gold overlay with caption
- Lightbox: black backdrop, white caption below, keyboard navigation (← →)
- NOC Letter: separate highlighted card with `--gold` border + seal icon

**Subsection C — Minutes of Meeting**

Three MOM photos (from `drive-download-20251110T060429Z-1-001/`):
```
MOM_01.jpg → "Minutes of Meeting — Page 1 | November 8, 2025"
MOM_02.jpg → "Minutes of Meeting — Page 2 | Data Requirements Discussion"
MOM_03.jpg → "Minutes of Meeting — Page 3 | Agreed Deliverables"
```

Displayed in a horizontal scroll strip with elegant card borders.

**Subsection D — Academic Credentials**

Four credential cards in a row:
```
IIT Madras Authorization Letter  →  Link to PDF
Proof of Originality             →  Link to PDF
Proposal Score & Feedback        →  Embed Score_and_Feedback.png
Midterm Score & Feedback         →  Embed Submitted Document/Score and Feedback.png
```

Each card: `--ink` background, `--gold` icon, metric (score if visible), PDF download button.

---

### SECTION 3.9 — PROJECT JOURNEY

**Background:** `--cream` section.

Three-stage journey cards (Proposal → Midterm → Final):

**Stage 1: Proposal**
- Date: October 2025
- Key deliverable: Problem identification, SMART objectives, methodology design
- Artifacts: WBS diagram, Gantt chart, 4 problem prioritization
- Embed: `WBS & GANTT.png` (thumbnail)
- Score badge (from feedback screenshot if visible)

**Stage 2: Midterm**
- Date: November 8, 2025
- Key deliverable: EDA complete, ADA techniques applied, volatility + margin analysis
- Artifacts: 6 Section 6 figures, X-MR charts, category reclassification
- Score badge

**Stage 3: Final**
- Date: December 2025
- Key deliverable: 3-pillar strategy, financial projections, master DOCX report
- Artifacts: 9-section consulting report, full visualization gallery, deployment

---

### SECTION 3.10 — DOWNLOADS

**Background:** `--ink` dark section.

Clean download card grid. Each card: file icon, name, format badge, size, description, download button.

```
📄 Final Report (PDF)       → 22f1001645- Final_Report.pdf
📄 Midterm Report (PDF)     → 22f1001645- Midterm_Report.pdf
📄 Proposal (PDF)           → 22f1001645- BDM_Proposal_.pdf
📊 Viva Presentation (PPTX) → BDM PPT viva.pptx
📝 Master Report (DOCX)     → master_report.docx
🐍 EDA Script (Python)      → eda_pure_o_naturals.py
🐍 ADA Pipeline (Python)    → ada_pipeline.py
📦 Raw CSV Data (ZIP)       → cleaned_data/
```

Plus: GitHub repo link button (prominent), Vercel live site link.

---

### SECTION 3.11 — FOOTER

Dark `--ink` background. Three columns:
- Left: "Pure'O Naturals · BDM Capstone · IIT Madras" + student details
- Center: Quick links (all nav sections)
- Right: "Built with" stack (Next.js, Vercel, Python, IIT Madras)

Bottom bar: "© 2025 SVCAN · Roll No: 22f1001645 · IIT Madras BS Data Science" + MIT License

---

## SECTION 4 — VERCEL DEPLOYMENT

### 4.1 vercel.json
```json
{
  "framework": "nextjs",
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "headers": [
    {
      "source": "/assets/videos/(.*)",
      "headers": [
        { "key": "Accept-Ranges", "value": "bytes" },
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/assets/charts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=86400" }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/data/:path*",
      "destination": "/api/data/:path*"
    }
  ]
}
```

### 4.2 next.config.ts
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1200, 1920],
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
```

### 4.3 GitHub Actions — deploy.yml
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### 4.4 Lighthouse CI — lighthouse.yml
```yaml
name: Lighthouse CI

on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci && npm run build
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:3000
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

### 4.5 Deployment Steps

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Link project (first time)
vercel link

# 4. Set env variables
vercel env add NEXT_PUBLIC_SITE_URL

# 5. Deploy to preview
vercel

# 6. Deploy to production
vercel --prod

# 7. Set custom domain (optional)
vercel domains add your-domain.com
```

**Recommended Vercel project name:** `pureo-naturals-bdm-capstone`
**Recommended URL:** `pureo-naturals-bdm.vercel.app`

---

## SECTION 5 — GITHUB README (TOP 1%)

Write a README.md that is the best README any IIT Madras BDM student has ever produced. Follow this template precisely:

```markdown
<div align="center">

# 🌿 Pure'O Naturals — Strategic Intelligence Report

### IIT Madras BDM Capstone · 6-Month POS Data Forensics · Bangalore

[![Vercel Deploy](https://img.shields.io/badge/Live_Site-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://pureo-naturals-bdm.vercel.app)
[![IIT Madras](https://img.shields.io/badge/IIT_Madras-003087?style=for-the-badge&logo=academia&logoColor=white)](https://study.iitm.ac.in)
[![Python](https://img.shields.io/badge/Python_3.x-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**₹2.54 Crore · 52,314 Transactions · 3,247 SKUs · ₹72–100L Projected Annual Impact**

[🌐 Live Portfolio](https://pureo-naturals-bdm.vercel.app) · [📄 Final Report](public/assets/reports/final/) · [📊 Analysis Scripts](scripts/) · [📁 Raw Data](data/)

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Business Context](#-business-context)
- [The Five Problems](#-the-five-problems)
- [Analytical Methods](#-analytical-methods)
- [Key Findings](#-key-findings)
- [Three-Pillar Strategy](#-three-pillar-strategy)
- [Financial Impact](#-financial-impact)
- [Repository Structure](#-repository-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Data Dictionary](#-data-dictionary)
- [Visualizations](#-visualizations)
- [Proof of Work](#-proof-of-work)
- [Academic Context](#-academic-context)
- [License](#-license)

---

## 🎯 Project Overview

This repository contains the complete end-to-end capstone project for IIT Madras's Business Data Management (BDM) program. It analyzes **6 months of primary Point-of-Sale data** from Pure'O Naturals, a specialty organic retail chain in Bangalore (Branch 0007-ANJANEYA NAGER), using quantitative analytical methods to diagnose business problems and deliver actionable, financially-quantified recommendations.

> **"From 52,314 raw transactions to a ₹72–100 Lakh annual value recovery roadmap — in 6 analytical techniques."**

| Attribute | Detail |
|-----------|--------|
| **Student** | SVCAN · Roll No: 22f1001645 |
| **Program** | IIT Madras BS Data Science — BDM Capstone |
| **Business** | Pure'O Naturals · Branch 0007-ANJANEYA NAGER, Bangalore |
| **Data Type** | Primary POS Transaction Data (SalesDetail.rpt.csv) |
| **Study Period** | April 1 – September 30, 2025 (183 days) |
| **Data Volume** | 52,314 transactions · ₹2.54 crore revenue · 3,247 SKUs |
| **Outcome** | 3-pillar strategy · ₹72–100L projected annual benefit |
| **Live Site** | [pureo-naturals-bdm.vercel.app](https://pureo-naturals-bdm.vercel.app) |

---

## 🏪 Business Context

Pure'O Naturals is a premium specialty organic retail chain serving health-conscious urban consumers in South India. This study focuses on Branch 0007-ANJANEYA NAGER (Bangalore), analyzed over 183 consecutive trading days.

**Branch KPIs (Apr–Sep 2025):**

| Metric | Value |
|--------|-------|
| Total Revenue | ₹2,53,93,827 (~₹2.54 crore) |
| Total Transactions | 52,314 |
| Active SKU Portfolio | 3,247 |
| Mean Daily Revenue | ₹1,38,764 |
| Transaction Skewness | 6.1 (right-tailed distribution) |

---

## 🔍 The Five Problems

[Full detail in `02_Problem_Statement/FIVE_PROBLEMS.md`]

| # | Problem | SKUs Affected | Monthly Impact | Priority |
|---|---------|--------------|----------------|----------|
| P1 | Demand Volatility & Wastage | 746 high-CV SKUs | ₹2.6L | High |
| P2 | Portfolio Complexity (SKU Bloat) | 1,645 Class C SKUs | ₹1.0–1.5L | Medium |
| P3 | Margin Compression | 869 below-floor SKUs | ₹2.8L | Critical |
| P4 | Pricing Misalignment | Top 20 + 36.6% avg | ₹1.2L | Quick Win |
| P5 | Category Mix Drift | 40.28% Unknown | Enabler | Foundation |

---

## 🔬 Analytical Methods

Six quantitative techniques were applied sequentially:

| Technique | Formula | Insight Delivered |
|-----------|---------|-------------------|
| **Descriptive Statistics** | `CV = σ/μ × 100` | Baseline distribution + outlier detection |
| **ABC/Pareto** | Cumulative revenue % ranking | Portfolio triage (652 A, 950 B, 1645 C) |
| **CV Volatility Analysis** | `CV > 25% = high-risk flag` | 746 wastage-prone SKUs identified |
| **P10 Margin Proxy** | `Margin ≈ 1 − P10(price)/Avg(price)` | 869 below-floor, 95 negative |
| **Price Variance Index** | `PVI = Var(price)/(Revenue/Qty)` | ₹14.4L annual leakage mapped |
| **Risk Stratification** | `Score = (CV + Margin_Gap + DSLS/10)/3` | RED/YELLOW/GREEN/BLUE zones |

**Dynamic ROP Formula:**
```
Safety Stock (SS) = Z × σ_demand × √LT
Reorder Point (ROP) = μ_demand × LT + SS

Example — ANAR (Pomegranate):
  μ = 14.2 kg/day · σ = 6.8 kg/day · LT = 1 day · Z = 2.33 (99%)
  SS = 2.33 × 6.8 × √1 = 15.8 kg
  ROP = 14.2 × 1 + 15.8 = 30.0 kg  (old fixed ROP was 20 kg → +50% buffer)
```

---

## 📊 Key Findings

| Finding | Metric | Source |
|---------|--------|--------|
| Revenue concentration | Top 20% SKUs = 70.2% revenue | ABC analysis |
| Demand volatility surge | Sep CV 3.59 vs Apr CV 1.93 (+86%) | Rolling CV heatmap |
| Capital lockup | ₹8.3L in dormant stock (>90 DSLS) | DSLS analysis |
| Pricing leakage | 36.6% avg price variance | PVI + X-MR charts |
| Margin erosion | 869 SKUs below 20% floor | P10 heuristic |
| Data hygiene | 40.28% unknown → 98.5% cleaned | 3-layer taxonomy |

---

## 🏛️ Three-Pillar Strategy

```
PILLAR 1                  PILLAR 2                  PILLAR 3
SKU Rationalization   ×   Pricing & Margin      ×   Dynamic Inventory
                          Optimization               Management
3,247 → 1,800 SKUs        +₹28-42L recovery         −40% stockout rate
12 weeks / 3 phases       Tiered repricing           Dynamic ROP formula
₹20.5L annual savings    POS price controls         99% service level
```

[Full strategy in `08_Strategic_Recommendations/THREE_PILLAR_STRATEGY.md`]

---

## 💰 Financial Impact

| Scenario | Annual Net Benefit | ROI | Payback |
|----------|-------------------|-----|---------|
| Conservative | **₹72 Lakhs** | 1,100% | 3 weeks |
| Base Case | **₹85 Lakhs** | 1,600% | 3 weeks |
| Upside | **₹100 Lakhs** | 2,400% | 3 weeks |

Implementation cost: ₹4–6 Lakhs

[Full projections in `09_Business_Impact/FINANCIAL_PROJECTIONS.md`]

---

## 📁 Repository Structure

[Paste complete tree here — see SECTION 1.1 above]

---

## 🛠️ Tech Stack

**Analysis:**
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![pandas](https://img.shields.io/badge/pandas-150458?logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?logo=numpy&logoColor=white)
![matplotlib](https://img.shields.io/badge/matplotlib-11557c)
![seaborn](https://img.shields.io/badge/seaborn-2E4057)

**Website:**
![Next.js](https://img.shields.io/badge/Next.js_14-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF)

**Deployment:**
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Python 3.10+ (for data scripts)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/pureo-naturals-bdm-capstone.git
cd pureo-naturals-bdm-capstone

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

### Run the Analysis Scripts

```bash
# Install Python dependencies
pip install pandas numpy matplotlib seaborn scipy

# Run EDA pipeline
python scripts/eda_pure_o_naturals.py

# Run ADA pipeline
python scripts/ada_pipeline.py
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📚 Data Dictionary

[Summary — link to full `docs/DATA_DICTIONARY.md`]

| Dataset | Rows | Description |
|---------|------|-------------|
| `cleaned_sales.csv` | 52,314 | Master transaction log — all 183 days |
| `monthly_overall.csv` | 6 | Monthly revenue aggregates |
| `category_performance.csv` | 24 | 4 categories × 6 months |
| `wastage_risk.csv` | 3,247 | CV + volatility flags per SKU |
| `slow_movers.csv` | 302 | DSLS > 30 days |
| `low_margin.csv` | 869 | Below 20% margin floor |
| `pricing_misalignment_top20.csv` | 20 | Highest PVI SKUs |

---

## 📈 Visualizations

All 20+ figures are in `public/assets/charts/`. Key visualizations:

| Figure | Description |
|--------|-------------|
| `Chart_4_4_ABC_Pareto.png` | ABC/Pareto classification curve |
| `1. Daily Sales Variation (Z-score).png` | Z-score volatility heatmap |
| `1. 7 Day Rolling Volatility Heatmap.png` | Rolling CV heatmap (Top 20 SKUs) |
| `2. Estimated Margin Distribution.png` | Margin box plots by category |
| `3. Category Mix by Month.png` | 100% stacked bar — monthly mix |
| `Chart_4_2_Monthly_Revenue_Trends.png` | Revenue trend line |
| `Shewhart X-MR Control Charts.png` | Price control charts (13 SKUs) |
| `Figure_6_1` through `Figure_6_9` | Extended analysis figures |

---

## 🎬 Proof of Work

Primary data was collected with full authorization from the branch owner.

| Evidence Type | Files |
|--------------|-------|
| Owner Interview Video | `Owner Interaction Video_Actual.mp4` |
| Store Walkthrough Video | `Store Tour - Overall Walkthrough.mp4` |
| Cashier Interaction Video | `Store Tour - Interaction with Cashier.mp4` |
| Data Acquisition Video | `Proof_Data_Acquisition_Process.mp4` |
| Field Photos | 12 JPGs (Nov 8, 2025) |
| NOC Letter | `NOC Letter.jpg` |
| Minutes of Meeting | `MOM_01.jpg`, `MOM_02.jpg`, `MOM_03.jpg` |

---

## 🎓 Academic Context

| Item | Detail |
|------|--------|
| Program | IIT Madras BS Data Science |
| Course | Business Data Management (BDM) — Capstone |
| Student ID | 22f1001645 |
| Authorization | IIT Madras NOC + Branch Owner NOC |
| Ethics | Non-disclosure commitment; aggregated reporting |
| Submission Stages | Proposal → Midterm → Final |

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

Data belongs to Pure'O Naturals and is used with explicit written authorization for academic purposes only.

---

<div align="center">

**Made with ❤️ and rigorous analysis**
*IIT Madras · BDM Capstone 2025 · Student 22f1001645*

</div>
```

---

## SECTION 6 — ADDITIONAL REPO FILES

### 6.1 CONTRIBUTING.md
Write a professional contributing guide covering:
- How to report bugs (link to GitHub Issues template)
- Development setup
- Code style (ESLint + Prettier config)
- Branch naming: `feat/`, `fix/`, `docs/`, `chore/`
- PR checklist: Build passes, Lighthouse score maintained, no console errors

### 6.2 SECURITY.md
```markdown
# Security Policy

## Reporting Vulnerabilities
This is an academic portfolio site. No user data is collected.
If you find a security issue, please email: bhandari.sravya66@gmail.com

## Data Privacy
All business data is anonymized and used with explicit written authorization
from Pure'O Naturals for academic purposes only.
```

### 6.3 Pull Request Template (.github/pull_request_template.md)
```markdown
## Summary
<!-- What does this PR change? -->

## Type of Change
- [ ] Bug fix
- [ ] New feature / section
- [ ] Content update
- [ ] Performance improvement
- [ ] Documentation

## Checklist
- [ ] `npm run build` passes
- [ ] No console errors
- [ ] Mobile responsive (tested at 375px)
- [ ] Images optimized (next/image used)
- [ ] No hardcoded text (use data files)

## Screenshots
<!-- Before / After if visual change -->
```

### 6.4 LICENSE (MIT)
```
MIT License

Copyright (c) 2025 SVCAN (22f1001645) — IIT Madras

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

Data used in this project belongs to Pure'O Naturals and is used under written
authorization for academic purposes only. Data must not be redistributed.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND...
```

---

## SECTION 7 — QUALITY STANDARDS

The final site MUST:

- [ ] Score **≥90** on Lighthouse Performance
- [ ] Score **100** on Lighthouse Accessibility
- [ ] Score **100** on Lighthouse Best Practices
- [ ] Score **100** on Lighthouse SEO
- [ ] Load in **<2.5s** on 3G (LCP target)
- [ ] All images use `next/image` with proper `alt` text
- [ ] All videos have `controls` + captions where possible
- [ ] Keyboard navigable throughout
- [ ] Works at 375px (mobile), 768px (tablet), 1440px (desktop)
- [ ] No layout shift on load (CLS = 0)
- [ ] All external fonts load with `font-display: swap`
- [ ] `<meta>` tags: title, description, og:image, og:title, twitter:card
- [ ] `/sitemap.xml` generated
- [ ] `/robots.txt` present

**SEO Meta:**
```html
<title>Pure'O Naturals — BDM Capstone | IIT Madras Strategic Intelligence Report</title>
<meta name="description" content="6-month POS data forensics of Pure'O Naturals Bangalore. 52,314 transactions, ₹2.54 crore analyzed. IIT Madras BDM Capstone 2025 by 22f1001645.">
<meta property="og:image" content="/assets/og-image.png">
```

---

## SECTION 8 — EXECUTION ORDER

Execute in this precise sequence:

1. **Init repo:** `git init` → create all structure → first commit "chore: initial repo scaffold"
2. **Copy all assets** to `public/assets/` (charts, proofs, videos, reports, gantt)
3. **Convert CSVs to JSON** for frontend consumption (create `src/data/*.json`)
4. **Build layout + globals** (CSS variables, typography, base styles)
5. **Build components** in order: Hero → Stats → BusinessContext → FiveProblems → Methodology → Analysis → VisualizationGallery → Strategy → FinancialImpact → ProofSection → Timeline → Downloads → Footer
6. **Add interactivity:** AnimatedCounter, Lightbox, VideoPlayer, Recharts charts, scroll reveals
7. **Test:** Mobile responsiveness, video playback, lightbox, all chart loads
8. **Optimize:** next/image for all PNGs, video preload="metadata", lazy loading
9. **Deploy to Vercel:** `vercel --prod`
10. **Add Vercel URL** to README badges + meta tags
11. **Push to GitHub:** Tag `v1.0.0`, write release notes
12. **Final Lighthouse audit:** All scores ≥90

---

## FINAL MANDATE

This website and GitHub repository represent the culmination of months of rigorous academic and analytical work. Every pixel, every line of code, every data table must reflect the quality of the underlying analysis.

When a professor, recruiter, or fellow student lands on this site, they should feel:
- The scale of the work (₹2.54 crore of data, 52K transactions)
- The rigor of the methodology (formulas, QA logs, code)
- The human story (shop owner videos, store photos, field research)
- The business impact (₹72–100L is real, quantified, actionable)

**This is not a student project. It is a consulting case study, deployed like a product, documented like open-source software.**

Build accordingly.

---

# END OF MASTER PROMPT
