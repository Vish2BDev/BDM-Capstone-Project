'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'

interface ChartGalleryItem {
  src: string
  alt: string
  caption: string
  figNum: string
}

const allCharts: ChartGalleryItem[] = [
  { src: '/assets/charts/Chart_4_1_Daily_Revenue_Histogram.png', alt: 'Daily Revenue Histogram', caption: 'Daily Revenue Distribution — Strongly Right-Skewed (Skewness: 6.1)', figNum: 'FIG 4.1' },
  { src: '/assets/charts/Chart_4_2_Monthly_Revenue_Trends.png', alt: 'Monthly Revenue Trends', caption: 'Monthly Revenue Trend · Apr–Sep 2025 · Peak: July ₹48.1L', figNum: 'FIG 4.2' },
  { src: '/assets/charts/Chart_4_3_Category_Performance.png', alt: 'Category Performance', caption: 'Category Revenue Mix — Fruits 36.3%, Vegetables 26.3%', figNum: 'FIG 4.3' },
  { src: '/assets/charts/Chart_4_4_ABC_Pareto.png', alt: 'ABC Pareto Analysis', caption: 'ABC Pareto Curve — Class A (20%) drives 70.2% of revenue', figNum: 'FIG 4.4' },
  { src: '/assets/charts/Chart_4_5_Volatility_Distribution.png', alt: 'Volatility Distribution', caption: 'CV Distribution — 746 SKUs flagged as High-Volatility (CV >25%)', figNum: 'FIG 4.5' },
  { src: '/assets/ada_visuals/1. Daily Sales Variation ( Z-score) - Top SKU\'s - Figure_1.png', alt: 'Daily Sales Variation Z-Score', caption: 'Daily Sales Z-Score Heatmap — Top High-Volatility SKUs', figNum: 'FIG 5.1' },
  { src: '/assets/ada_visuals/1. 7 Day Rolling Sales Volatility Heatmap for Top 20 SKU\'s.png', alt: '7-Day Rolling Volatility Heatmap', caption: '7-Day Rolling Volatility Heatmap — Top 20 SKUs by Revenue', figNum: 'FIG 5.2' },
  { src: '/assets/ada_visuals/2. Estimated Margin Distribution by Category - Figure_2.png', alt: 'Margin Distribution by Category', caption: 'Estimated Margin Distribution by Category — P10 Proxy Method', figNum: 'FIG 5.3' },
  { src: '/assets/ada_visuals/2. Estimated Margin Distribution by SKU ( Top 20 By Revenue).png', alt: 'Margin Distribution by SKU', caption: 'Margin Distribution — Top 20 Revenue SKUs', figNum: 'FIG 5.4' },
  { src: '/assets/ada_visuals/Category_Mix_by_Month_Figure_3.png', alt: 'Category Mix by Month', caption: 'Category Mix Shift · Apr–Sep 2025 — Vegetables +42.8% share', figNum: 'FIG 5.5' },
  { src: '/assets/charts/Figure_6_1_CV_Distribution.png', alt: 'CV Distribution', caption: 'Figure 6.1 — CV Distribution Across All SKUs', figNum: 'FIG 6.1' },
  { src: '/assets/charts/Figure_6_2_Rolling_Volatility_By_Month.png', alt: 'Rolling Volatility By Month', caption: 'Figure 6.2 — Monthly Rolling Volatility Trend', figNum: 'FIG 6.2' },
  { src: '/assets/charts/Figure_6_3_Margin_Distribution.png', alt: 'Margin Distribution', caption: 'Figure 6.3 — Full Portfolio Margin Distribution', figNum: 'FIG 6.3' },
  { src: '/assets/charts/Figure_6_4_ABC_Pareto.png', alt: 'ABC Pareto Extended', caption: 'Figure 6.4 — Extended ABC Pareto Analysis', figNum: 'FIG 6.4' },
  { src: '/assets/charts/Figure_6_5_Slow_Movers_DSLS.png', alt: 'Slow Movers DSLS', caption: 'Figure 6.5 — Slow Movers by Days Since Last Sale', figNum: 'FIG 6.5' },
  { src: '/assets/charts/Figure_6_6_Price_Variance_Top20.png', alt: 'Price Variance Top 20', caption: 'Figure 6.6 — Top 20 SKUs by Price Variance Index', figNum: 'FIG 6.6' },
  { src: '/assets/charts/Figure_6_7_Wastage_Risk.png', alt: 'Wastage Risk Map', caption: 'Figure 6.7 — Wastage Risk Map (CV × Revenue Class)', figNum: 'FIG 6.7' },
  { src: '/assets/charts/Figure_6_8_Unknown_Impact.png', alt: 'Category Reclassification Impact', caption: 'Figure 6.8 — Category Cleanup: 40.28% Unknown → 1.5% After Reclassification', figNum: 'FIG 6.8' },
  { src: '/assets/charts/Figure_6_9_Day_of_Week_Efficiency.png', alt: 'Day of Week Efficiency', caption: 'Figure 6.9 — Day-of-Week Revenue Efficiency', figNum: 'FIG 6.9' },
]

const xmrCharts: ChartGalleryItem[] = [
  { src: '/assets/xmr/Shewhart X-MR Control Charts - ANAR.png', alt: 'ANAR X-MR Chart', caption: 'ANAR (Pomegranate) — Shewhart X-MR Price Control Chart', figNum: 'X-MR 1' },
  { src: '/assets/xmr/Shewhart X-MR Control Charts - Apple Royal Gala.png', alt: 'Apple Royal Gala X-MR', caption: 'Apple Royal Gala — Shewhart X-MR Price Control Chart', figNum: 'X-MR 2' },
  { src: '/assets/xmr/Shewhart X-MR Control Charts - Banginapalli Mango Loose KGS.png', alt: 'Banginapalli Mango X-MR', caption: 'Banginapalli Mango — Shewhart X-MR Control Chart · ₹6.7L Exposure', figNum: 'X-MR 3' },
  { src: '/assets/xmr/Shewhart X-MR Control Charts - Tomato Local.png', alt: 'Tomato Local X-MR', caption: 'Tomato Local — Shewhart X-MR Price Control Chart', figNum: 'X-MR 4' },
  { src: '/assets/xmr/X Chart , MR Chart - Baby Orange.png', alt: 'Baby Orange X-MR', caption: 'Baby Orange — X Chart & MR Chart', figNum: 'X-MR 5' },
  { src: '/assets/xmr/X Chart , MR Chart - Onion.png', alt: 'Onion X-MR', caption: 'Onion — X Chart & MR Chart (High Volume Staple)', figNum: 'X-MR 6' },
  { src: '/assets/xmr/X Chart , MR Chart - Potato.png', alt: 'Potato X-MR', caption: 'Potato — X Chart & MR Chart', figNum: 'X-MR 7' },
  { src: '/assets/xmr/X Chart , MR Chart - Carrot.png', alt: 'Carrot X-MR', caption: 'Carrot — X Chart & MR Chart', figNum: 'X-MR 8' },
  { src: '/assets/xmr/X Chart , MR Chart - Ladies Finger.png', alt: 'Ladies Finger X-MR', caption: 'Ladies Finger — X Chart & MR Chart', figNum: 'X-MR 9' },
]

interface LightboxProps {
  items: ChartGalleryItem[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index]
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        className="relative max-w-5xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-silver/60 hover:text-cream transition-colors font-ui text-sm"
        >
          ✕ Close (ESC)
        </button>
        <div className="relative bg-ink rounded-2xl overflow-hidden border border-gold/20">
          <Image
            src={item.src}
            alt={item.alt}
            width={1200}
            height={700}
            className="w-full h-auto object-contain"
            style={{ maxHeight: '80vh', background: 'var(--parchment)' }}
          />
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <span className="font-mono text-gold/60 text-xs">{item.figNum}</span>
              <p className="font-display italic text-cream/80 text-sm mt-1">{item.caption}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onPrev}
                className="px-4 py-2 rounded-full border border-silver/20 text-silver text-sm font-ui hover:border-gold/40 hover:text-gold transition-colors"
              >
                ← Prev
              </button>
              <button
                onClick={onNext}
                className="px-4 py-2 rounded-full border border-silver/20 text-silver text-sm font-ui hover:border-gold/40 hover:text-gold transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
        <p className="text-center text-silver/30 text-xs mt-2 font-mono">
          {index + 1} / {items.length}
        </p>
      </div>
    </div>
  )
}

export default function AnalysisSection() {
  const [lightboxItems, setLightboxItems] = useState<ChartGalleryItem[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = useCallback((items: ChartGalleryItem[], idx: number) => {
    setLightboxItems(items)
    setLightboxIndex(idx)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxItems(null)
  }, [])

  const prevItem = useCallback(() => {
    if (!lightboxItems) return
    setLightboxIndex((i) => (i > 0 ? i - 1 : lightboxItems.length - 1))
  }, [lightboxItems])

  const nextItem = useCallback(() => {
    if (!lightboxItems) return
    setLightboxIndex((i) => (i < lightboxItems.length - 1 ? i + 1 : 0))
  }, [lightboxItems])

  const abcData = [
    { class: 'A', skus: 652, revenue: '₹1.78 Cr', share: '70.2%', desc: 'Protect & optimize' },
    { class: 'B', skus: 950, revenue: '₹50.8 L', share: '20.0%', desc: 'Monitor closely' },
    { class: 'C', skus: 1645, revenue: '₹24.8 L', share: '9.8%', desc: 'Rationalize aggressively' },
  ]

  const cvDistribution = [
    { range: '<12% (Stable)', skus: 421, pct: '13.0%' },
    { range: '12–25% (Moderate)', skus: 714, pct: '22.0%' },
    { range: '25–50% (High)', skus: 812, pct: '25.0%' },
    { range: '>50% (Extreme)', skus: 1300, pct: '40.0%' },
  ]

  const seasonalCV = [
    { month: 'Apr 2025', cv: '1.93' },
    { month: 'May 2025', cv: '2.41' },
    { month: 'Jun 2025', cv: '2.18' },
    { month: 'Jul 2025', cv: '2.87' },
    { month: 'Aug 2025', cv: '3.12' },
    { month: 'Sep 2025', cv: '3.59' },
  ]

  return (
    <section
      id="analysis"
      className="py-24 lg:py-36"
      style={{ background: 'var(--cream)' }}
    >
      {lightboxItems && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="badge text-moss border border-moss/30 bg-moss/8 mb-4 inline-flex">
              Analysis & Findings
            </span>
            <h2
              className="font-display font-bold text-ink mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              The Numbers Don&apos;t Lie
            </h2>
            <div className="w-16 h-0.5" style={{ background: 'var(--gold)' }} />
          </div>
        </ScrollReveal>

        {/* 5a. Revenue Landscape */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="font-ui font-bold text-forest text-xl mb-6 tracking-wide">
              Revenue Landscape
            </h3>
            {/* Revenue Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
              {[
                { label: 'Daily Mean Revenue', value: '₹1,38,764', sub: 'σ = ₹22,481', color: '#2D5A3D' },
                { label: 'Peak Daily Revenue', value: '₹2,58,000+', sub: 'Distribution right-skewed', color: '#C8922A' },
                { label: 'Transaction Skewness', value: '6.1', sub: 'Strong right tail', color: '#E74C3C' },
                { label: 'Median Txn Value', value: '₹200', sub: 'Mean: ₹486 — Wide spread', color: '#9B59B6' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border"
                  style={{ background: `${stat.color}08`, borderColor: `${stat.color}25` }}
                >
                  <div className="font-display font-black text-xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="font-ui font-bold text-ink text-xs tracking-wide mb-1">{stat.label}</div>
                  <div className="font-mono text-slate/50 text-xs">{stat.sub}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { src: '/assets/charts/Chart_4_1_Daily_Revenue_Histogram.png', alt: 'Daily Revenue Histogram', cap: 'FIG 4.1 — Daily Revenue Distribution' },
                { src: '/assets/charts/Chart_4_2_Monthly_Revenue_Trends.png', alt: 'Monthly Revenue Trends', cap: 'FIG 4.2 — Monthly Revenue Trends' },
              ].map((img, i) => (
                <div
                  key={i}
                  className="chart-wrap rounded-xl overflow-hidden border border-moss/15 shadow-md cursor-zoom-in"
                  onClick={() => openLightbox(allCharts, i)}
                >
                  <Image src={img.src} alt={img.alt} width={700} height={400} className="responsive-img" style={{ background: 'var(--parchment)' }} />
                  <div className="px-4 py-2 bg-parchment/50 border-t border-moss/10">
                    <p className="font-mono text-silver text-xs tracking-wide">{img.cap}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 5b. Category Intelligence */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="font-ui font-bold text-forest text-xl mb-6 tracking-wide">
              Category Revenue Intelligence
            </h3>
            <div className="grid lg:grid-cols-2 gap-8 items-start mb-6">
              <div>
                <div className="rounded-xl overflow-hidden border border-moss/20 shadow-md mb-4">
                  <table className="data-table">
                    <thead><tr><th>Category</th><th>Revenue Share</th><th>6-month Trend</th></tr></thead>
                    <tbody>
                      {[
                        { cat: 'Fruits', share: '36.3%', trend: '↑ Dominant', color: '#2D5A3D' },
                        { cat: 'Vegetables', share: '35.3%', trend: '↑ +42.8% share gain', color: '#4A7C5E' },
                        { cat: 'Dairy & Eggs', share: '6.1%', trend: '→ Stable', color: '#C8922A' },
                        { cat: 'Snacks & Pantry', share: '4.3%', trend: '→ Steady', color: '#9B59B6' },
                        { cat: 'Other / Cleaned', share: '18.0%', trend: '↓ Was 40.28% unknown', color: '#95A5A6' },
                      ].map((row) => (
                        <tr key={row.cat}>
                          <td className="font-body font-medium">{row.cat}</td>
                          <td className="font-mono font-bold" style={{ color: row.color }}>{row.share}</td>
                          <td className="font-body text-slate/70 text-xs italic">{row.trend}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  className="p-4 rounded-xl border"
                  style={{ background: 'rgba(45,90,61,0.06)', borderColor: 'rgba(45,90,61,0.2)' }}
                >
                  <div className="font-ui font-bold text-forest text-xs uppercase tracking-widest mb-2">Category Cleanup Impact</div>
                  <div className="font-mono text-sm text-slate">
                    40.28% unknown → <span className="text-moss font-bold">1.5% residual</span>
                    <span className="text-silver/50"> using 3-layer taxonomy</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { src: '/assets/charts/Chart_4_3_Category_Performance.png', cap: 'FIG 4.3 — Category Revenue Mix', idx: 2 },
                  { src: '/assets/ada_visuals/Category_Mix_by_Month_Figure_3.png', cap: 'FIG 5.5 — Category Mix Shift Apr–Sep 2025', idx: 9 },
                ].map((img, i) => (
                  <div
                    key={i}
                    className="chart-wrap rounded-xl overflow-hidden border border-moss/15 shadow-md cursor-zoom-in"
                    onClick={() => openLightbox(allCharts, img.idx)}
                  >
                    <Image src={img.src} alt={img.cap} width={700} height={350} className="responsive-img" style={{ background: 'var(--parchment)' }} />
                    <div className="px-4 py-2 bg-parchment/50 border-t border-moss/10">
                      <p className="font-mono text-silver text-xs tracking-wide">{img.cap}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 5c. ABC Classification */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="font-ui font-bold text-forest text-xl mb-6 tracking-wide">
              ABC Portfolio Classification
            </h3>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <div className="rounded-xl overflow-hidden border border-moss/20 shadow-md mb-4">
                  <table className="data-table">
                    <thead><tr><th>Class</th><th>SKUs</th><th>Revenue</th><th>Share</th><th>Action</th></tr></thead>
                    <tbody>
                      {abcData.map((row) => (
                        <tr key={row.class}>
                          <td><span className={`font-ui font-black text-lg ${row.class === 'A' ? 'text-moss' : row.class === 'B' ? 'text-gold' : 'text-terracotta'}`}>{row.class}</span></td>
                          <td className="font-mono font-medium">{row.skus.toLocaleString('en-IN')}</td>
                          <td className="font-mono font-bold text-moss">{row.revenue}</td>
                          <td className="font-mono">{row.share}</td>
                          <td className="font-body text-slate text-sm italic">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="formula-block">
                  <div className="text-silver/50 text-xs font-ui mb-1 uppercase tracking-widest">Top Class A SKUs</div>
                  <div>ANAR · · · · · · · · · ₹12.98 L</div>
                  <div className="text-saffron/70">BANGINAPALLI MANGO · ₹6.70 L</div>
                  <div className="text-saffron/70">APPLE ROYAL GALA · · ₹5.62 L</div>
                </div>
              </div>
              <div
                className="chart-wrap rounded-xl overflow-hidden border border-moss/20 shadow-md cursor-zoom-in"
                onClick={() => openLightbox(allCharts, 3)}
              >
                <Image src="/assets/charts/Chart_4_4_ABC_Pareto.png" alt="ABC Pareto" width={700} height={450} className="responsive-img" style={{ background: 'var(--parchment)' }} />
                <div className="px-4 py-2 bg-parchment/50"><p className="font-mono text-silver text-xs tracking-wide">FIG 4.4 — ABC/Pareto Classification Curve</p></div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 5c. Volatility */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="font-ui font-bold text-forest text-xl mb-6 tracking-wide">
              Demand Volatility Profile
            </h3>
            <div className="grid lg:grid-cols-2 gap-8 mb-6">
              <div className="rounded-xl overflow-hidden border border-moss/20 shadow-md">
                <table className="data-table">
                  <thead><tr><th>CV Range</th><th>SKUs</th><th>Share</th></tr></thead>
                  <tbody>
                    {cvDistribution.map((row) => (
                      <tr key={row.range}>
                        <td className="font-body">{row.range}</td>
                        <td className="font-mono font-medium">{row.skus.toLocaleString()}</td>
                        <td className="font-mono text-terracotta font-bold">{row.pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="rounded-xl overflow-hidden border border-moss/20 shadow-md">
                <table className="data-table">
                  <thead><tr><th>Month</th><th>Portfolio CV</th><th>Trend</th></tr></thead>
                  <tbody>
                    {seasonalCV.map((row, i) => (
                      <tr key={row.month}>
                        <td className="font-body">{row.month}</td>
                        <td className={`font-mono font-bold ${i === 5 ? 'text-terracotta' : i === 0 ? 'text-sage' : 'text-ink'}`}>{row.cv}</td>
                        <td className="font-mono text-xs text-silver/60">{i === 0 ? '← Baseline' : i === 5 ? '← Peak ↑86%' : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[5, 6, 4].map((chartIdx) => (
                <div
                  key={chartIdx}
                  className="chart-wrap rounded-xl overflow-hidden border border-moss/15 shadow-md cursor-zoom-in"
                  onClick={() => openLightbox(allCharts, chartIdx)}
                >
                  <Image src={allCharts[chartIdx].src} alt={allCharts[chartIdx].alt} width={500} height={300} className="responsive-img" style={{ background: 'var(--parchment)' }} />
                  <div className="px-3 py-2 bg-parchment/50 border-t border-moss/10">
                    <p className="font-mono text-silver text-xs">{allCharts[chartIdx].figNum} — {allCharts[chartIdx].alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 5e. Margin & Pricing Deep Dive */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="font-ui font-bold text-forest text-xl mb-2 tracking-wide">
              Margin &amp; Pricing Analysis — P10 Proxy Method
            </h3>
            <p className="font-body text-slate/70 mb-6 leading-relaxed">
              Without access to wholesale cost data, the P10 price heuristic was used:
              products with low minimum prices (P10) relative to average reveal compressed margins.
            </p>
            <div className="grid lg:grid-cols-2 gap-8 mb-6">
              <div>
                <div className="rounded-xl overflow-hidden border border-moss/20 shadow-md mb-4">
                  <table className="data-table">
                    <thead>
                      <tr><th>Margin Tier</th><th>SKUs</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {[
                        { tier: 'Negative Margin', skus: '95', status: 'CRITICAL — Immediate action', color: '#E74C3C' },
                        { tier: 'Very Low (<5%)', skus: '180', status: 'HIGH — Reprice Tier 1', color: '#C45A3A' },
                        { tier: 'Low (5–15%)', skus: '571', status: 'MODERATE — Monitor', color: '#E8873A' },
                        { tier: 'Near-Floor (15–20%)', skus: '23', status: 'WATCH — Approaching floor', color: '#C8922A' },
                        { tier: 'Above Floor (>20%)', skus: '2,378', status: 'SAFE', color: '#2D5A3D' },
                      ].map((row) => (
                        <tr key={row.tier}>
                          <td className="font-body text-sm">{row.tier}</td>
                          <td className="font-mono font-bold" style={{ color: row.color }}>{row.skus}</td>
                          <td className="font-body text-xs italic" style={{ color: row.color }}>{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="formula-block">
                  <div className="text-silver/50 text-xs font-ui mb-1 uppercase tracking-widest">P10 Margin Proxy Formula</div>
                  <div>Margin ≈ 1 − P10(price) / Avg(price)</div>
                  <div className="text-saffron/60 mt-1">Floor = 0.20 (20% minimum margin target)</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { src: '/assets/ada_visuals/2. Estimated Margin Distribution by Category - Figure_2.png', cap: 'FIG 5.3 — Margin Distribution by Category', idx: 7 },
                  { src: '/assets/ada_visuals/2. Estimated Margin Distribution by SKU ( Top 20 By Revenue).png', cap: 'FIG 5.4 — Margin Distribution · Top 20 SKUs', idx: 8 },
                ].map((img, i) => (
                  <div
                    key={i}
                    className="chart-wrap rounded-xl overflow-hidden border border-terracotta/15 shadow-md cursor-zoom-in"
                    onClick={() => openLightbox(allCharts, img.idx)}
                  >
                    <Image src={img.src} alt={img.cap} width={700} height={350} className="responsive-img" style={{ background: 'var(--parchment)' }} />
                    <div className="px-4 py-2 bg-parchment/50 border-t border-moss/10">
                      <p className="font-mono text-silver text-xs tracking-wide">{img.cap}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 5f. X-MR Charts */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="font-ui font-bold text-forest text-xl mb-2 tracking-wide">
              Shewhart X-MR Pricing Control Charts
            </h3>
            <p className="font-body text-slate/80 mb-6">
              Statistical process control applied to retail pricing — catching out-of-control pricing events before they leak revenue.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {xmrCharts.slice(0, 6).map((chart, i) => (
                <div
                  key={i}
                  className="chart-wrap rounded-xl overflow-hidden border border-blue-900/20 shadow-sm cursor-zoom-in"
                  onClick={() => openLightbox(xmrCharts, i)}
                >
                  <Image src={chart.src} alt={chart.alt} width={500} height={320} className="responsive-img" style={{ background: 'var(--parchment)' }} />
                  <div className="px-3 py-2" style={{ background: 'var(--parchment)' }}>
                    <p className="font-mono text-slate text-xs">{chart.figNum}</p>
                    <p className="font-body text-slate/70 text-xs truncate">{chart.alt}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => openLightbox(xmrCharts, 0)}
              className="mt-4 font-ui font-semibold text-sm text-sage hover:text-moss transition-colors underline underline-offset-4"
            >
              View all {xmrCharts.length} X-MR Control Charts →
            </button>
          </div>
        </ScrollReveal>

        {/* All Section 6 Figures Grid */}
        <ScrollReveal>
          <div>
            <h3 className="font-ui font-bold text-forest text-xl mb-6 tracking-wide">
              Extended Analysis
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allCharts.slice(10, 19).map((chart, i) => (
                <div
                  key={i}
                  className="chart-wrap rounded-xl overflow-hidden border border-moss/15 shadow-sm cursor-zoom-in"
                  onClick={() => openLightbox(allCharts, 10 + i)}
                >
                  <Image src={chart.src} alt={chart.alt} width={500} height={300} className="responsive-img" style={{ background: 'var(--parchment)' }} />
                  <div className="px-3 py-2 bg-parchment/50 border-t border-moss/10">
                    <p className="font-mono text-slate/60 text-xs">{chart.figNum}</p>
                    <p className="font-body text-slate/70 text-xs">{chart.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
