# Five Business Problems
## Pure'O Naturals · Quantified Problem Statement

---

## How Problems Were Identified

The 5 problems below were not assumed — they were **discovered through data**. The analytical journey started with 3 owner-stated pain points (from a 45-minute interview), then transformed each pain point into a measurable, financially quantified business problem using 6 months of POS transaction data.

Each problem has:
- A **quantified scope** (how many SKUs, how much revenue at risk)
- A **root cause** identified from the data
- **SMART objectives** for resolution
- **Analytical methods** applied to measure and address it

---

## Problem 1: Demand Volatility & Wastage Risk

**Classification:** Inventory Management / Operational Risk

### What the Data Shows
- **746 SKUs** have a Coefficient of Variation (CV) >25% in daily unit sales
- September peak CV: **3.59** (baseline April: 1.93) — 86% increase in unpredictability
- The current ordering system uses a **fixed Reorder Point (ROP)** based only on average demand, ignoring daily variation

### Financial Impact
| Metric | Value |
|--------|-------|
| Annual wastage risk (est.) | **₹31.7 lakhs** |
| SKUs with CV 25–50% | 557 |
| SKUs with CV 50–100% | 95 |
| SKUs with CV >100% | 94 |
| Avg monthly carrying cost (high-CV SKU) | ₹28,000–₹55,000 |

### Root Cause
Fixed ROP formula ignores demand variance. During high-demand days (Z-score >2.5), stock depletes before reorder triggers. During low-demand days, over-stocked perishables spoil.

### SMART Objective
> Reduce stockout frequency for Class A SKUs by 40% within 12 weeks by implementing dynamic safety stock with a 99% service level target.

### Analytical Method Applied
- **CV (Coefficient of Variation)** analysis per SKU per branch
- **Z-score daily sales heatmap** to identify surge patterns
- **Dynamic ROP formula:** `ROP = μ_demand × LT + Z × σ_demand × √LT`
- Rolling 7-day volatility heatmap (Figure 1)

---

## Problem 2: Portfolio Complexity — SKU Proliferation

**Classification:** Assortment Strategy / Capital Efficiency

### What the Data Shows
- Active portfolio: **3,247 SKUs** across 183 trading days
- **Class C (bottom 51%):** 1,645 SKUs generating only **9.8% of revenue**
- Average Class C revenue: ₹2,509/month per SKU
- 97 products with **>90 days since last sale** (dormant stock): **₹8.3 lakhs locked capital**
- 302 products with >30-day gaps between sales

### Financial Impact
| Metric | Value |
|--------|-------|
| Capital locked in dormant stock | **₹8.3 lakhs** |
| Carrying cost savings (discontinuing C class) | ₹12–18 lakhs/year |
| Revenue at risk from discontinuation | <3% of total revenue |
| Target SKU reduction | 3,247 → 1,800 (-44.7%) |

### Root Cause
No systematic SKU lifecycle management. Products are added to the assortment based on supplier push or informal requests but are never systematically evaluated for discontinuation. The result: a long tail of nearly-dead SKUs consuming shelf space, staff attention, and working capital.

### SMART Objective
> Reduce active SKU count from 3,247 to 1,800 within 12 weeks with <3% revenue impact by applying ABC/Pareto classification and DSLS-based dormancy protocols.

### Analytical Method Applied
- **ABC/Pareto analysis** → 3-tier classification (A: top 20%, B: middle 29%, C: bottom 51%)
- **DSLS (Days Since Last Sale)** analysis from analysis end date Sep 30, 2025
- **Slow-mover detection:** `slow_movers.csv` (302 products flagged)
- **ABC Pareto Curve** (Figure 5)

---

## Problem 3: Margin Compression

**Classification:** Profitability / Pricing Strategy

### What the Data Shows
- **869 SKUs** estimated to be operating below a 20% margin floor
- **95 SKUs** estimated to have negative margins (selling below cost proxy)
- Total margin-at-risk across these products: **₹2,84,269/month** (~₹34.1 lakhs/year)

### Margin Stratification
| Tier | SKUs | Monthly Revenue | Margin-at-Risk | Priority |
|------|------|----------------|----------------|----------|
| Negative (<0%) | 95 | ₹4,23,147 | ₹84,629 | **IMMEDIATE** |
| Very Low (0–5%) | 180 | ₹5,12,000 | ₹76,800 | **URGENT** |
| Low (5–15%) | 571 | ₹13,60,341 | ₹1,10,434 | **HIGH** |
| Near-Floor (15–20%) | 23 | ₹2,48,129 | ₹12,406 | MONITOR |
| **TOTAL** | **869** | **₹25,43,617** | **₹2,84,269** | — |

### Root Cause
No COGS visibility in the POS system. The branch owner does not see margin by SKU — only total revenue. Products priced during supplier onboarding are never repriced as supplier costs increase, leading to margin erosion over time.

### SMART Objective
> Recover ₹28–42 lakhs annually by repricing the 95 IMMEDIATE and 180 URGENT margin-compressed SKUs within 8 weeks, validated against supplier invoices.

### Analytical Method Applied
- **P10 Heuristic Margin Proxy:** `Margin% ≈ 1 − P10(unit_price) / Avg(unit_price)`
- ⚠️ **Limitation:** ±15 percentage point error band; for directional prioritization only
- Three-tier repricing framework based on margin severity
- `low_margin.csv` (869 products flagged)
- Figure 2: Estimated Margin Distribution by Category

---

## Problem 4: Pricing Misalignment

**Classification:** Pricing Control / Revenue Leakage

### What the Data Shows
- **36.6% average price variance** across products in the study period
- Top 20 SKUs by price variance identified in `pricing_misalignment_top20.csv`
- **BANGINAPALLI MANGO LOOSE:** Revenue exposure of **₹6.70 lakhs** at moderate misalignment score — #1 financial priority
- **ENG ITEM BROCOLI SAMBERRY:** Revenue exposure of **₹1.66 lakhs** at high misalignment score

### Financial Impact
| Metric | Value |
|--------|-------|
| Annual pricing leakage (est.) | **₹14.4 lakhs** |
| Top misaligned product by revenue | BANGINAPALLI MANGO (₹6.7L) |
| Top misaligned product by score | ASPARAGUS KG SAMBERRY (score: 1,075) |
| Price range spread (worst SKU) | >200% of average price |

### Root Cause
The POS system allows cashiers to manually override unit prices at point of sale, with no floor/ceiling enforcement. Legitimate reasons exist (bulk discounts, damaged goods markdowns) but the system lacks guardrails — any price can be entered. This creates both revenue leakage (under-priced transactions) and customer experience inconsistency.

### SMART Objective
> Standardize pricing for the Top 20 misaligned SKUs within 4 weeks by implementing POS price controls (UCL/LCL bounds from X-MR analysis), recovering ₹14.4 lakhs in annual leakage.

### Analytical Method Applied
- **Price Variance Index (PVI):** `PVI = Var(unit_price) / (Revenue / Quantity)`
- **Shewhart X-MR Control Charts:** UCL/LCL = Mean ± 2.66 × MR-bar
- `pricing_misalignment_top20.csv`
- Figure 8: X-MR Control Charts

---

## Problem 5: Category Mix Drift & Data Hygiene

**Classification:** Category Management / Data Integrity

### What the Data Shows
- **40.28% of initial transactions** had product descriptions that couldn't be mapped to a category ("Unknown")
- Vegetables revenue share grew from ~30% (April) to ~42% (September): **+42.8%**
- Fruits revenue share declined from ~40% (April) to ~32% (September): **−20.6%**
- This structural shift in category mix is invisible to the owner without a category analytics dashboard

### Financial Impact
| Metric | Value |
|--------|-------|
| Unknown category revenue (uncategorized) | ~40% of portfolio — management blind spot |
| Fruits share decline (6 months) | −20.6% (demand generation intervention needed) |
| Vegetables share gain | +42.8% (procurement rebalancing needed) |

### Root Cause
Product SKUs in the POS system are entered as free-text descriptions with no standardized taxonomy. The same product may appear as "TOMATO", "TOMATO LOCAL", "TOM LOCAL", "TOMATO 1KG" across different transactions. Without normalization and category mapping, aggregate category performance is invisible.

### SMART Objective
> Achieve 95%+ category attribution accuracy across all SKUs within 6 weeks by deploying a 3-layer keyword taxonomy (keyword match → web lookup → brand/price inference), enabling ongoing category mix monitoring.

### Analytical Method Applied
- **3-layer keyword taxonomy algorithm:**
  - Layer 1: Direct keyword match (e.g., "MANGO" → fruits)
  - Layer 2: Web-assisted category lookup for ambiguous terms
  - Layer 3: Brand/price inference for remaining unknowns
- **Category Mix by Month stacked bar chart** (Figure 3)
- After cleaning: 98.5% high-confidence attribution achieved

---

## Problems Prioritization Matrix

Problems were sequenced for implementation based on financial urgency and analytical dependency:

| Priority | Problem | Monthly Impact | Effort | Dependencies |
|----------|---------|---------------|--------|--------------|
| **1st** | Pricing Misalignment (P4) | ₹1.2L | Low | None (quick win) |
| **2nd** | Margin Compression (P3) | ₹2.8L | Medium | Supplier invoice validation |
| **3rd** | Portfolio Complexity (P2) | ₹1.0–1.5L | Medium | ABC classification complete |
| **4th** | Demand Volatility (P1) | ₹2.6L | High | Volatility analysis + supplier SLAs |
| **5th** | Category Mix Drift (P5) | Enabler | Low | None (foundational) |

> **Sequencing rationale:** P5 (data hygiene) is foundational but its financial impact is indirect. P4 and P3 are highest-ROI quick wins. P1 requires the longest implementation runway (safety stock system + supplier renegotiation). P2 can proceed in parallel with P3.

---

*All financial figures derived from 6-month POS analysis of Branch 0007-ANJANEYA NAGER · Apr–Sep 2025 · Full methodology in `04_Methodology/`*
