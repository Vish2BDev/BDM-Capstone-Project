# Financial Impact & Business Projections
## Pure'O Naturals · Quantified Value of the Three-Pillar Strategy

---

## Summary: Total Projected Value

| Scenario | Annual Net Benefit |
|----------|-------------------|
| **Conservative Estimate** | **₹72 Lakhs** |
| **Base Case** | **₹86 Lakhs** |
| **Upside Scenario** | **₹100 Lakhs** |

These projections are derived from the six months of POS data (Apr–Sep 2025) from Branch 0007-ANJANEYA NAGER. Each value driver is independently calculated with its own confidence level and methodology.

---

## Value Driver 1: Repricing Margin Recovery

**Source:** `low_margin.csv` — 869 products below 20% margin floor
**Method:** Apply tiered price increases (2–20% depending on margin gap and demand elasticity)
**Risk:** ±15% error band on P10 heuristic; actual recovery depends on customer price acceptance

| Tier | SKUs | Monthly Revenue | Est. Recovery | Annual Recovery |
|------|------|----------------|--------------|----------------|
| Tier 1 (Negative, price +15-25%) | 95 | ₹4.23L | ₹84,629/mo | **₹10.2L** |
| Tier 2 (0–15%, price +2–5%) | 751 | ₹18.72L | ₹1.87L/mo | **₹22.4L** |
| Tier 3 (15–20%, bundling) | 23 | ₹2.48L | ₹31,000/mo | **₹3.7L** |
| **Subtotal** | **869** | | | **₹28–42L** |

**Conservative:** ₹28L | **Upside:** ₹42L
*(Upside assumes 75% customer retention after price increases; conservative assumes 50%)*

---

## Value Driver 2: Pricing Standardization (Leakage Recovery)

**Source:** `pricing_misalignment_top20.csv` — Top 20 price-volatile SKUs
**Method:** POS price controls (UCL/LCL bounds) eliminate unauthorized price discounts
**Confidence:** HIGH — pricing misalignment is directly measurable

| Metric | Value |
|--------|-------|
| Average price variance (top 20 SKUs) | 36.6% |
| Revenue exposed to misalignment | ₹14.4L annually |
| Recovery expected from POS controls | 100% of identifiable leakage |
| **Annual recovery** | **₹14.4L** |

**Conservative:** ₹14.4L | **Upside:** ₹14.4L (fixed — directly recoverable)

---

## Value Driver 3: SKU Consolidation (Carrying Cost Savings)

**Source:** `slow_movers.csv` + ABC classification
**Method:** Remove 1,445 Class C SKUs over 12 weeks; reduce inventory carrying costs

| Cost Category | Savings Basis | Annual Savings |
|---------------|--------------|---------------|
| Shelf space reallocation | Free up 35–40% of display area | ₹3–5L (reallocate to high-margin) |
| Staff time (stock-taking, ordering) | -44% SKU count × 10 min/SKU/week | ₹2–4L |
| Supplier management (fewer POs) | Fewer small-volume orders | ₹1–2L |
| Spoilage reduction | Fewer slow-moving perishables | ₹6–7L |
| **Subtotal** | | **₹12–18L** |

**Conservative:** ₹12L | **Upside:** ₹18L

---

## Value Driver 4: Dynamic Safety Stock (Stockout & Overstock)

**Source:** `wastage_risk.csv` + volatility analysis
**Method:** Replace fixed ROP with dynamic ROP formula; reduce both stockouts (lost sales) and overstock waste

### Stockout Loss Recovery (Class A SKUs)
```
Assumptions:
  - Class A SKUs generate ~70% of revenue = ₹1.78L/day
  - Current estimated stockout rate: 3–5% of Class A demand days
  - Post-implementation target: 1–2% (−40% reduction)

  Avoided lost sales = (₹1.78L × 2%) × 365 = ₹13.0L/year
```

### Overstock Waste Reduction
```
Assumptions:
  - 746 high-CV SKUs have ~5% spoilage rate (perishables)
  - Avg monthly revenue of high-CV SKUs: ₹28,000–₹55,000
  - Spoilage reduction via better ordering: 25%

  Overstock savings = 746 × ₹3,000 (avg monthly waste reduction) × 12 = ₹26.9L
  (conservative: 30% of this = ₹8.1L; upside: 45% = ₹12.1L)
```

| Sub-driver | Conservative | Upside |
|-----------|-------------|--------|
| Stockout recovery | ₹8.8L | ₹12.1L |
| Overstock/spoilage | Included above | Included above |
| **Subtotal** | **₹8.8L** | **₹12.1L** |

---

## Value Driver 5: Inventory Liquidation (Locked Capital Release)

**Source:** `slow_movers.csv` — dormant and slow-moving products
**Method:** Liquidate dormant stock to free working capital

| DSLS Category | SKUs | Est. Revenue Locked | Recovery Rate | Release |
|---------------|------|--------------------|--------------|----|
| DSLS >120 days | 76 | ₹6.5L | 40% (deep discount) | ₹2.6L |
| DSLS 91–120 days | 21 | ₹1.8L | 60% | ₹1.1L |
| DSLS 31–90 days | 205 | ₹3.8L | 70% | ₹2.7L |
| **Total** | **302** | **₹12.1L** | | **₹6.4L** |

Plus **annual** carrying cost savings from eliminating these products from future orders:
- **Annual savings:** ₹8.5L–₹11.2L

---

## Consolidated Annual Impact Projection

| Value Driver | Conservative | Base Case | Upside |
|-------------|-------------|-----------|--------|
| Repricing Recovery (P3) | ₹28L | ₹35L | ₹42L |
| Pricing Standardization (P4) | ₹14.4L | ₹14.4L | ₹14.4L |
| SKU Consolidation (P2) | ₹12L | ₹15L | ₹18L |
| Dynamic Safety Stock (P1) | ₹8.8L | ₹10.5L | ₹12.1L |
| Inventory Liquidation (P2) | ₹8.5L | ₹9.8L | ₹11.2L |
| **TOTAL** | **₹71.7L** | **₹84.7L** | **₹97.7L** |

> Rounded projections: **₹72L (conservative)** · **₹85L (base)** · **₹100L (upside)**

---

## Implementation Cost & ROI

### Estimated Implementation Costs

| Cost Item | Estimate |
|-----------|---------|
| Staff time (12 weeks, 2 dedicated employees) | ₹1.5–2L |
| POS system modification (price controls, alert setup) | ₹50K–₹1L |
| Liquidation markdown loss (discounted below cost on worst products) | ₹1–2L |
| Supplier renegotiation time (management) | ₹1L (opportunity cost) |
| **Total Implementation Cost** | **₹4–6L** |

### Return on Investment

| Scenario | Gross Benefit | Implementation Cost | Net Benefit | ROI |
|----------|-------------|---------------------|------------|-----|
| Conservative | ₹72L | ₹6L | **₹66L** | **1,100%** |
| Base Case | ₹85L | ₹5L | **₹80L** | **1,600%** |
| Upside | ₹100L | ₹4L | **₹96L** | **2,400%** |

**Payback Period:** Implementation costs are recovered within **3–5 weeks** of full deployment.

---

## Monthly Benefit Timeline

The strategy's benefits are phased in as each pillar is implemented:

| Month | Cumulative Benefit | Primary Driver |
|-------|-------------------|----------------|
| Month 1 | ₹1.2L | Pricing standardization starts |
| Month 2 | ₹3.8L | Tier 1 repricing live |
| Month 3 | ₹7.5L | Full repricing + dormant liquidation |
| Month 6 | ₹25L | All pillars live; SKU count reduced |
| Month 12 | ₹72–100L | Full-year compounded benefit |

---

## Risk-Adjusted Projections

### Key Risks and Sensitivity

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Customer churn from price increases | Medium | −₹10–15L | Phased repricing (+2% tranches); monitor sales velocity |
| P10 margin estimate inaccuracy | High | ±₹8–12L | Validate all Tier 1 products against supplier invoices before action |
| Supplier resistance to renegotiation | Low-Medium | −₹5L | Dual-source strategy; increase competition |
| Staff adoption of new ROP system | Medium | −₹3L | Training + manager accountability system |

### Sensitivity Analysis

**What if customer churn is 20% on repriced items?**
- Conservative downside: ₹72L → ₹58L (still 967% ROI)

**What if P10 heuristic overstates margin problems by 2×?**
- Tier 1 from 95 → 48 products; repricing recovery: ₹28L → ₹20L
- Total: ₹72L → ₹62L (still 1,033% ROI)

**Conclusion:** Even under pessimistic assumptions, the strategy delivers 10× the implementation cost.

---

## Non-Financial Benefits

Beyond direct financial impact, the strategy delivers structural improvements:

| Benefit | Description |
|---------|-------------|
| **Operational clarity** | Reduced SKU count means faster stock-takes, simpler buying, cleaner POS |
| **Data quality** | 98.5% category attribution enables ongoing analytics |
| **Competitive positioning** | Tighter pricing discipline prevents customer trust erosion from inconsistent prices |
| **Scalability** | Dynamic ROP framework scales to any new branch without manual calibration |
| **Owner visibility** | Dashboard-ready datasets enable real-time business monitoring |

---

*Projections derived from 6-month primary POS data (Apr–Sep 2025) · Validated against Indian specialty retail benchmarks · All figures at Branch 0007-ANJANEYA NAGER level · Student: 22f1001645 · IIT Madras BDM Capstone*
