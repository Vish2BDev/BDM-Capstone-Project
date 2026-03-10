# Visual Outputs Guide
## Pure'O Naturals · BDM Capstone · Apr–Sep 2025

This guide explains every chart and visualization produced in this project — what each shows, why it matters, and what decision it informs.

---

## Figure 1: 7-Day Rolling Sales Volatility Heatmap (Top 20–30 SKUs)

**File:** `1. 7 Day Rolling Sales Volatility Heatmap for Top 20 SKU's.png`
**Section:** Midterm Report — ADA Visuals

### What It Shows
A heat map with SKUs on the Y-axis and calendar weeks on the X-axis. Cell color intensity represents the 7-day rolling Coefficient of Variation (CV) of daily units sold. Darker cells = more volatile demand in that week for that SKU.

### Key Insight
Several premium SKUs (APPLE ROYAL GALA, WHITE SEEDLESS GRAPES, BROCCOLI SAMBERRY) exhibit deep red cells during June–September — correlating with monsoon season and festival demand spikes. This is not random noise; it is a predictable seasonal pattern.

### Decision It Informs
- **Which SKUs need daily ROP recalculation** vs. weekly vs. monthly
- **Supplier negotiation priority**: High-volatility SKUs need shorter lead times
- **Markdown timing**: High CV in final days of the week suggests markdowns should be triggered automatically

---

## Figure 2: Estimated Margin Distribution by Category

**File:** `2. Estimated Margin Distribution by Category.png`
**Section:** Midterm Report — ADA Visuals

### What It Shows
Box plots or violin plots showing the distribution of estimated margins (using P10 cost proxy) across product categories (Fruits, Vegetables, Dairy, Snacks, Other). Shows median, IQR spread, and outliers.

### Key Insight
Vegetables exhibit the widest margin spread (from negative to 45%+), indicating that "vegetables" is a catch-all category containing both high-margin specialty items (imported organic tomatoes) and near-zero-margin staples (local onions, potatoes). This spread justifies disaggregated analysis rather than category-level averages.

### Decision It Informs
- **Category-level margin floor policy** cannot work: must be SKU-level
- Justifies the need for the **three-tier repricing framework** (Tier 1/2/3 by margin severity)
- Identifies Dairy and specialty Snacks as categories with more stable, higher margins — underdeveloped growth opportunities

---

## Figure 3: Category Mix by Month — Revenue Share (%)

**File:** `3. Category Mix by Month - Revenue Share (%) - Figure_3.png`
**Section:** Midterm Report — ADA Visuals

### What It Shows
A 100% stacked bar chart with months on the X-axis (Apr–Sep 2025) and percentage revenue contribution from each category stacked vertically. Each color represents a category.

### Key Insight
Two clear trends emerge: (1) Vegetables' share **grows each month** from ~30% in April to ~42% by September; (2) Fruits' share **declines** from ~40% in April to ~32% by September. The "Unknown" category remains stubbornly flat — evidence that the data hygiene problem is structural, not self-correcting.

### Decision It Informs
- **Procurement rebalancing**: Vegetables are trending up; buying plan should front-load seasonal crop cycles
- **Shelf space allocation**: Fruits need a demand-generation intervention (promotion, fresh variety expansion) to defend their share
- **Data hygiene urgency**: Flat Unknown share means taxonomy work is mandatory, not optional

---

## Figure 4: Daily Sales Variation (Z-Score) — Top SKUs

**File:** `1. Daily Sales Variation ( Z-score) - Top SKU's - Figure_1.png`
**Section:** Midterm Report — ADA Visuals

### What It Shows
A Z-score heatmap where each cell represents the standardized deviation of a SKU's daily sales from its own mean. Z > +2 = unusually high demand day; Z < -2 = unusually low.

### Key Insight
Z-score extremes cluster on weekends (especially Sundays) and around the last week of July and August — consistent with bulk pre-festival stocking behavior. The pattern is strong enough to be actionable for demand-surge planning.

### Decision It Informs
- **Staffing optimization**: High-Z-score days need more cashiers and floor staff
- **Emergency procurement protocol**: Days where Z > 2.5 for top SKUs should trigger same-day reorder to same-day supplier
- **Customer flow management**: High-demand days warrant cart management, express checkout, and aisle restocking schedules

---

## Figure 5: ABC Pareto Curve — Cumulative Revenue by Product Rank

**File:** `Chart_4_4_ABC_Pareto.png`
**Section:** Midterm Section 4 — Descriptive Statistics

### What It Shows
A Pareto curve (cumulative revenue % on Y-axis, products ranked by revenue on X-axis) with the classic "elbow" shape. The ABC class boundaries (A: top 20%, B: next 29%, C: remaining 51%) are marked with vertical dashed lines.

### Key Insight
The curve is steeper than typical retail benchmarks — the first 10% of products account for ~55% of revenue. This extreme concentration means that protecting Class A products from stockouts is existentially important, while Class C management decisions (discontinue vs. keep) have minimal revenue impact.

### Decision It Informs
- **Investment priority**: All service-level improvement investment should target Class A first
- **Risk tolerance**: Can afford to discontinue 1,200+ Class C products with <3% revenue impact
- **Buyer accountability**: Each buyer should own an ABC tier; Class A requires senior buyer attention

---

## Figure 6: Daily Revenue Histogram

**File:** `Chart_4_1_Daily_Revenue_Histogram.png`
**Section:** Midterm Section 4 — Descriptive Statistics

### What It Shows
A histogram of daily total branch revenue (₹ on X-axis, count of days on Y-axis) showing the distribution shape, central tendency, and spread of daily revenue over 183 days.

### Key Insight
The distribution is approximately normal with a slight right skew (mean ₹1.39L, median ₹1.31L, skewness ~0.6). The right tail extends to ₹2.58L — driven by weekend + festival demand. The left tail extends to ₹84.6K (minimum, likely a partial trading day or special closure).

### Decision It Informs
- **Cash flow forecasting**: Daily revenue distribution allows owners to plan bank deposits, supplier payments, and staff overtime with confidence intervals
- **KPI setting**: Daily revenue target should be ~₹1.3–1.4L; days below ₹1.1L should trigger management review
- **Insurance and shrinkage benchmarking**: Variance around the mean (\u00B1₹29.4K) provides a baseline for abnormal-day detection

---

## Figure 7: Monthly Revenue Trends (Apr–Sep 2025)

**File:** `Chart_4_2_Monthly_Revenue_Trends.png`
**Section:** Midterm Section 4 — Descriptive Statistics

### What It Shows
A line chart of total monthly revenue over 6 months with month-over-month % change annotations.

### Key Insight
Revenue peak was July 2025 (₹48.1L, +10.7% MoM) followed by a correction in August (−2.3%) and recovery in September (₹39.6L). The June spike (+12.6%) correlates with early monsoon produce abundance. September's decline may reflect the end of mango season and early festival inventory pre-buying shifting demand forward.

### Decision It Informs
- **Annual budget planning**: Q2 (Oct–Dec) likely to show continuation of seasonal patterns; forecast should embed ~10% uplift for festival months
- **Procurement calendar**: June and July are high-revenue months requiring maximum inventory readiness
- **Performance benchmarking**: Any month >20% below trend deserves root-cause investigation

---

## Figure 8: X-MR Control Chart (Pricing Stability)

**File:** `X Chart, MR Chart` folder
**Section:** Midterm — X Chart, MR Chart

### What It Shows
Shewhart X-bar chart plotting average unit price over time with Upper Control Limit (UCL) and Lower Control Limit (LCL). The Moving Range (MR) chart below shows the within-period price variability. Points outside UCL/LCL are special-cause signals.

### Key Insight
Multiple SKUs show consecutive UCL breaches during August–September — periods of supplier cost increases (monsoon supply chain disruption). These are not random variation; they are systematic "out of control" events caused by external cost pressure being absorbed inconsistently.

### Decision It Informs
- **POS system controls**: UCL/LCL bounds from the X-MR chart can be directly coded as alert thresholds in the POS system
- **Supplier cost indexing**: Price control chart signals can trigger automatic supplier cost review meetings
- **Pricing policy calendar**: Seasonal price adjustment windows should be pre-authorized with documented approval, not reactive overrides

---

## Summary: Visualization Deployment in Recommended Dashboard

| Visual | Dashboard Type | Update Frequency | Owner |
|--------|---------------|-----------------|-------|
| Rolling Volatility Heatmap | Operations Dashboard | Daily | Inventory Manager |
| Margin Distribution | Profitability Dashboard | Weekly | Branch Manager |
| Category Mix Chart | Strategy Dashboard | Monthly | Branch Manager |
| Z-Score Daily Sales | Operations Dashboard | Daily | Inventory Manager |
| ABC Pareto Curve | Strategy Dashboard | Monthly | Branch Manager / Owner |
| Revenue Histogram | Finance Dashboard | Monthly | Owner |
| Revenue Trend Line | Finance Dashboard | Monthly | Owner |
| X-MR Control Charts | Pricing Dashboard | Weekly | Branch Manager |

---

*All visualizations produced by Python (matplotlib/seaborn) pipeline — reproducible via `eda_pure_o_naturals.py` and `ada_pipeline.py` scripts.*
