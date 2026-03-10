# Business Context
## Pure'O Naturals — Company Profile & Operating Environment

---

## About the Company

**Pure'O Naturals** is a specialty organic and fresh produce retail chain operating across multiple branches in South India. The brand positions itself in the premium fresh produce and organic segment, catering to health-conscious urban consumers who seek quality, freshness, and variety above price competitiveness.

| Attribute | Detail |
|-----------|--------|
| **Business Type** | Specialty organic retail (brick-and-mortar) |
| **Segment** | Premium fresh produce & organic groceries |
| **Geography** | South India — primary presence in Bangalore |
| **Study Branch** | 0007-ANJANEYA NAGER, Bangalore |
| **Store Size** | ~2,400 sq.ft |
| **Owner Type** | Independent branch owner under franchise/chain model |
| **POS System** | SalesDetail POS (exported as `.rpt.csv` reports) |

---

## Branch at a Glance (Apr–Sep 2025)

The analysis is based on **6 months of primary POS data** from Branch 0007-ANJANEYA NAGER — the most data-complete branch available for study.

| KPI | Value |
|-----|-------|
| **Total Revenue** | ₹2,53,93,827 (~₹2.54 crore) |
| **Total Transactions** | 52,314 |
| **Unique SKUs Active** | 3,247 |
| **Mean Daily Revenue** | ₹1,38,764 |
| **Peak Daily Revenue** | ₹2,58,000+ |
| **Minimum Daily Revenue** | ₹84,600 |
| **Avg Transaction Value** | ₹486 |
| **Median Transaction Value** | ₹200 |
| **Total Units Sold** | 3,35,900 |
| **Study Period** | 1 April 2025 – 30 September 2025 (183 days) |
| **Trading Days Covered** | 183 (no gaps in date coverage) |

---

## Product Portfolio Overview

Pure'O Naturals carries a wide assortment of fresh produce, imported fruits, vegetables, dairy, beverages, and specialty items. The portfolio is broadly grouped into five categories:

| Category | Revenue Share | Units Sold | Mean Unit Price |
|----------|--------------|------------|-----------------|
| **Fruits** | 36.3% | 67,052 | ₹183 |
| **Vegetables** | 35.3% | 1,71,544 | ₹93 |
| **Dairy** | 6.1% | 24,274 | ₹82 |
| **Snacks** | 4.3% | 7,584 | ₹146 |
| **Other / Unknown** | 18.0% | 65,446 | ₹829 (specialty) |

> **Note:** At time of analysis, 40.28% of transaction rows had uncategorized product descriptions — a data hygiene gap documented as Problem 5 and addressed through a 3-layer keyword taxonomy algorithm that improved attribution to 98.5% confidence coverage.

---

## Market & Seasonal Context

The branch operates in a highly seasonal market. Key seasonal factors observed during Apr–Sep 2025:

**Monsoon Onset (June):** Supply chain disruption for leafy vegetables and tropical fruits → price volatility spikes.

**Festival Season (August–September):** Ganesh Chaturthi (August) + Onam (September) drive a significant surge in bulk purchases of premium fruits (pomegranate, mango, exotic varieties) and specialty gift baskets. September's rolling CV reached **3.59** vs. the April baseline of **1.93** — an 86% increase in demand unpredictability.

**Mango Season (April–July):** Banginapalli Mango Loose was the single highest revenue-exposed SKU (₹6.70 lakh over 6 months), heavily seasonal.

---

## Business Model & Revenue Structure

Pure'O Naturals serves a **bimodal customer base**:

- **Frequent Small Buyers** — daily/weekly shoppers purchasing staple vegetables and dairy (₹100–₹200 per transaction). High volume, low margin.
- **Occasional Bulk Buyers** — weekend shoppers, gifting customers, festival purchasers (₹2,000+ per transaction). Lower frequency, higher margin.

This bimodality is evidenced by a **transaction value skewness of 6.1** — the distribution is heavily right-tailed, where the majority of transactions are small but a meaningful subset of high-value transactions contributes disproportionately to revenue.

---

## Owner Interview — Pain Points (Pre-Analysis)

Prior to any quantitative analysis, a **45-minute owner interview** was conducted to establish the primary business problems from the operator's perspective. Three core pain points emerged:

1. **"We often run out of stock on busy days and over-buy on slow days"** → Demand volatility problem
2. **"We carry too many products, many of which barely sell"** → Portfolio complexity / SKU proliferation
3. **"We're not always sure if we're making money on every item"** → Margin compression and pricing inconsistency

These qualitative pain points were transformed into **5 quantified, analytically defined problems** (documented in `02_Problem_Statement/`).

---

## Data Authorization & Ethics

This study was conducted under formal written authorization from the branch owner, consistent with IIT Madras BDM Capstone data ethics requirements:

- **Non-Disclosure Commitment:** All transaction data remains confidential; product names and revenue figures are reported in aggregate.
- **NOC (No Objection Certificate):** Signed by the branch owner on record.
- **IIT Madras Authorization Letter:** On file (`Authorization Letter from IITM.pdf`).
- **Proof of Originality:** Certified (`Proof of Originality.pdf`).

---

*Profile compiled from 6-month POS data, owner interview (video, 45 min), and IIT Madras BDM Capstone documentation · Study period: Apr–Sep 2025*
