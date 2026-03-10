# Three-Pillar Strategy
## Pure'O Naturals · Strategic Recommendations & Implementation Roadmap

---

## Strategic Overview

The analytical findings converge into a **unified three-pillar transformation strategy** designed to be implemented over 12 weeks. Each pillar addresses a specific cluster of business problems and delivers measurable, trackable outcomes.

```
PILLAR 1                    PILLAR 2                    PILLAR 3
SKU Rationalization    ×    Pricing & Margin        ×    Dynamic Inventory
                            Optimization                 Management
3,247 → 1,800 SKUs          +₹28–42L annual recovery     −40% stockout rate
12 weeks / 3 phases         Tiered repricing             Dynamic ROP formula
```

---

## Pillar 1: SKU Rationalization

**Goal:** Reduce the active SKU portfolio from 3,247 to approximately 1,800 products with less than 3% revenue impact.

**Why this matters:** 1,645 Class C SKUs (51% of portfolio) generate only 9.8% of revenue while consuming shelf space, staff attention, supplier payment cycles, and inventory carrying costs. 97 of these are effectively dormant (>90 days since last sale).

### Three-Phase Implementation

#### Phase 1 — Weeks 1–4: Immediate Liquidation (200 SKUs)
**Target:** Products with Risk Score >50 (RED Zone)
- CV >25% AND margin <15% AND revenue <₹4,000 in 6 months
- 97 dormant products (DSLS >90 days) → immediate discontinuation protocol
- **Action:** 25–40% markdown promotion → if unsold within 14 days → supplier return / donate / scrap
- **Expected outcome:** Free ~₹8.3L in locked capital; recover shelf space

#### Phase 2 — Weeks 5–8: Class C Discontinuation (600 SKUs)
**Target:** Class C products with no unique demand profile
- Products with max_gap_days >30 and revenue <₹5,000/6 months
- Products with consistently low Z-scores (never a high-demand day)
- **Action:** Remove from active ordering; keep legacy stock until depleted
- **Expected outcome:** ₹12–18L annual carrying cost savings

#### Phase 3 — Weeks 9–12: Consolidation (845 SKUs)
**Target:** Remaining Class C products — consolidate into best-performing variants
- Example: 6 variants of "basmati rice" → keep top 2 by revenue
- Merge near-duplicate SKUs under standard product codes
- **Action:** Update POS SKU master; retrain staff
- **Expected outcome:** Cleaner assortment, faster stock-taking, reduced purchase order complexity

### DSLS Protocol (30-Day Slow-Mover Response)

```
Day 30: Auto-flag in dashboard (zero sales alert triggers)
Day 35: Manager review — decision gate: DISCOUNT or WAIT
Day 42: If no sale → 25–40% markdown in-store promotion
Day 60: If no sale post-markdown → Supplier return OR donate OR scrap
Day 61: Remove from active SKU list; block future PO for this SKU
```

### Phase 1 Priority List (Sample — 97 Dormant SKUs)

| Criteria | Count | Revenue Locked | Action |
|----------|-------|---------------|--------|
| DSLS >120 days | 76 | ₹6.5L | Immediate discontinuation |
| DSLS 91–120 days | 21 | ₹1.8L | Liquidation promotion |
| Max gap >30 days (not dormant) | 205 | ₹3.8L | Review + conditional markdown |

---

## Pillar 2: Pricing & Margin Optimization

**Goal:** Recover ₹28–42 lakhs annually by standardizing pricing and repricing below-floor-margin products.

**Why this matters:** 869 SKUs operate below a 20% margin floor — 95 of them with estimated negative margins. A 36.6% average price variance across the portfolio indicates systematic pricing control failure, not just market fluctuation.

### Three-Tier Repricing Framework

#### Tier 1 — IMMEDIATE: Negative Margin SKUs (95 products)
- Estimated margin: <0%
- Monthly revenue exposure: ₹4.23L
- Monthly margin-at-risk: ₹84,629
- **Action sequence:**
  1. Pull supplier invoices for all 95 products within Week 1
  2. If confirmed negative margin: Increase price by 15–25% OR discontinue
  3. If margin proxy was wrong: Document and reclassify
  4. **Timeline:** Pricing review complete by end of Week 3

**Sample Tier 1 products:**
- TOMATO LOCAL — ~12% est. margin; ₹1,358/day revenue; vendor renegotiation + dual source
- POTATO — ~10% est. margin; ₹890/day revenue; volume pricing + pack size optimization
- WHITE SEEDLESS GRAPES — ~8% est. margin; ₹11,166/month; +8% price increase recommended

#### Tier 2 — HIGH PRIORITY: Very Low Margin (751 SKUs, 0–15%)
- Combined monthly revenue: ₹18.72L
- Combined monthly margin-at-risk: ₹1.87L
- **Action:** +2–5% price increase in tranches (2% increase every 2 weeks to avoid customer price shock)
- **Timeline:** 8 weeks for full implementation

#### Tier 3 — MONITOR: Near-Floor Margin (23 SKUs, 15–20%)
- Monthly revenue: ₹2.48L
- **Action:** Bundle with high-margin specialty items; monitor for natural correction
- **Example:** Bundle APPLE ROYAL GALA (~16% est. margin) with specialty wellness items

### Pricing Standardization (POS Controls)

For the **Top 20 misaligned SKUs** (from `pricing_misalignment_top20.csv`):

1. **Calculate UCL and LCL** from X-MR chart for each SKU
2. **Programme price bounds into POS system:**
   - Alert when price entered is below LCL or above UCL
   - Require manager override for any price outside bounds
3. **Pre-authorize seasonal adjustments** (documented, date-stamped, not ad hoc overrides)

**Priority SKUs for immediate POS controls:**

| Product | Avg Price | Price Range% | Revenue at Risk | Action |
|---------|-----------|-------------|----------------|--------|
| BANGINAPALLI MANGO LOOSE | ₹147 | Varies >100% | ₹6.70L | Price floor ₹130; ceiling ₹170 |
| ENG ITEM BROCOLI SAMBERRY | ₹360 | Very high | ₹1.66L | Standardize to ₹360 ±15% |
| CAPSICUM RED SAMBERRY | ₹333 | High | ₹58,228 | UCL/LCL from X-MR |
| WHITE SEEDLESS GRAPES | ₹140 | High | ₹66,995 | Price floor enforcement |

---

## Pillar 3: Dynamic Inventory Management

**Goal:** Reduce stockout frequency for Class A SKUs by 40% and reduce over-stocking waste by 25% by replacing the fixed Reorder Point system with a dynamic, demand-signal-driven approach.

**Why this matters:** The current fixed ROP was set based on average demand only. It ignores daily variance — meaning on high-demand days (Z > 2.5) the buffer is insufficient, and on low-demand days orders arrive when stock hasn't depleted. For perishable goods, this gap directly translates to either lost sales or food waste.

### Dynamic Safety Stock Formula

```
For each SKU:
  μ_d = mean daily demand (units)
  σ_d = standard deviation of daily demand
  LT  = supplier lead time (days)
  Z   = service level Z-score

  Safety Stock (SS) = Z × σ_d × √LT
  Reorder Point (ROP) = μ_d × LT + SS
```

### Service Level Tiers by Volatility Class

| SKU Tier | CV Range | Service Level | Z Score | ROP Recalculation |
|----------|----------|-------------|---------|------------------|
| Stable | <12% | 95% | 1.645 | Monthly |
| Moderate | 12–25% | 97% | 1.881 | Weekly |
| High Volatility | >25% | 99% | 2.326 | Daily |
| Class A High Season | >25%, A-class, Aug-Sep | 99.5% | 2.576 | Daily |

### Worked Example: ANAR (Pomegranate)

```
Mean Daily Demand (μ_d):   14.2 kg/day
Demand Std Dev (σ_d):       6.8 kg/day
Lead Time (LT):             1 day (local farm direct)
Service Level:              99% → Z = 2.33

Safety Stock = 2.33 × 6.8 × √1 = 15.8 kg
ROP = 14.2 × 1 + 15.8 = 30.0 kg

Old fixed ROP:              20 kg (based on average only)
New dynamic ROP:            30.0 kg
Buffer improvement:         +50% on high-demand days
Outcome:                    Stockout eliminated (confirmed by 6-month backtesting)
```

### September Pre-Positioning Protocol

September's rolling CV of 3.59 (vs. April baseline of 1.93) indicates extreme demand unpredictability during the festival + monsoon overlap period. The following protocol is recommended annually:

```
2 weeks before Ganesh Chaturthi / Onam:
  → Pre-position Top 50 Class A SKUs at 2× normal safety stock
  → Negotiate express delivery slots with top 5 suppliers
  → Staff +2 floor assistants for the 3-week festival window
  → Activate same-day emergency reorder protocol for Z > 2.5 days
```

### Class-Based Management Framework

| Zone | SKUs | Strategy | Ownership |
|------|------|---------|-----------|
| **BLUE** (Growth Champions) | ~200 | Zero-stockout guarantee; daily monitoring; depth expansion | Senior buyer + owner |
| **GREEN** (Stable) | ~1,800 | Weekly ROP update; auto-replenishment | Purchasing team |
| **YELLOW** (Monitor) | ~600 | Bi-weekly review; conditional reorder | Category manager |
| **RED** (Discontinue) | ~200 | Liquidation; no new orders | Branch manager |

---

## 12-Week Implementation Roadmap

| Week | Pillar | Action | Owner | KPI Target |
|------|--------|--------|-------|-----------|
| 1 | P2 | Pull supplier invoices for 95 Tier 1 SKUs | Branch Manager | 100% invoice coverage |
| 2 | P2 | POS price controls live for Top 20 misaligned | IT / POS Admin | UCL/LCL programmed |
| 3 | P1 | Begin 97 dormant SKU liquidation promotion | Floor Manager | 25-40% markdown live |
| 4 | P2 | First tranche Tier 2 repricing (+2%) | Branch Manager | 250 SKUs repriced |
| 5 | P3 | Dynamic ROP live for Top 50 Class A SKUs | Inventory Manager | ROP recalculated daily |
| 6 | P1 | Phase 2 discontinuation list finalized (600 SKUs) | Buyer | Supplier notified |
| 7 | P2 | Second tranche Tier 2 repricing (+2%) | Branch Manager | 500 SKUs total |
| 8 | P3 | ROP live for all 746 high-volatility SKUs | Inventory Manager | 99% SL active |
| 9 | P1 | Phase 3 consolidation begins (duplicate merging) | POS Admin | SKU master updated |
| 10 | P2 | Tier 3 bundling strategy live | Sales / Floor | Bundle displays active |
| 11 | P1 | Phase 3 complete; SKU count target hit | Branch Manager | ≤1,800 active SKUs |
| 12 | ALL | Full review; dashboard KPIs assessed | Owner | All KPI targets reviewed |

---

## Key Performance Indicators (Post-Implementation)

| KPI | Baseline (Apr-Sep 2025) | 12-Week Target |
|-----|------------------------|---------------|
| Active SKU count | 3,247 | ≤ 1,800 |
| Class A stockout frequency | Baseline (to be measured) | −40% |
| Negative-margin SKUs | 95 | 0 |
| Below-20%-margin SKUs | 869 | ≤ 200 |
| Price variance (avg) | 36.6% | ≤ 15% |
| Dormant SKUs (DSLS >90d) | 97 | ≤ 10 |
| Category attribution accuracy | 59.72% (pre-cleaning) | ≥ 98% |

---

*Strategy synthesized from 6-month POS analysis · Full financial impact in `09_Business_Impact/` · Implementation scripts in `10_Scripts/`*
