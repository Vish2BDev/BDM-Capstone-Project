'use client'

import Image from 'next/image'
import ScrollReveal from './ScrollReveal'

const kpiData = [
  { metric: 'Total Revenue', value: '₹2,53,93,827', highlight: true },
  { metric: 'Daily Mean Revenue', value: '₹1,38,764', highlight: false },
  { metric: 'Peak Daily Revenue', value: '₹2,58,000+', highlight: false },
  { metric: 'Total Transactions', value: '52,314', highlight: true },
  { metric: 'Unique Active SKUs', value: '3,247', highlight: false },
  { metric: 'Mean Transaction Value', value: '₹486', highlight: false },
  { metric: 'Median Transaction Value', value: '₹200', highlight: false },
  { metric: 'Total Units Sold', value: '3,35,900', highlight: false },
  { metric: 'Transaction Skewness', value: '6.1 (right-tailed)', highlight: true },
]

export default function BusinessContext() {
  return (
    <section
      id="overview"
      className="py-24 lg:py-36"
      style={{ background: 'var(--cream)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="badge text-moss border border-moss/30 bg-moss/8 mb-4 inline-flex">
              Business Context
            </span>
            <h2
              className="font-display font-bold text-ink mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              The Store Behind the Data
            </h2>
            <div className="w-16 h-0.5" style={{ background: 'var(--gold)' }} />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Company Card */}
          <ScrollReveal>
            <div
              className="rounded-2xl overflow-hidden border border-moss/20 shadow-xl"
              style={{ background: 'var(--forest)' }}
            >
              {/* Card Header */}
              <div
                className="px-8 py-6 border-b border-gold/20"
                style={{ background: 'rgba(45, 90, 61, 0.5)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-ui font-bold text-cream text-sm tracking-wide">
                      Pure&apos;O Naturals
                    </div>
                    <div className="font-body text-silver/60 text-xs">
                      Branch 0007-ANJANEYA NAGER
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-8 py-6 space-y-5">
                {[
                  { label: 'Location', value: 'Bangalore, Karnataka' },
                  { label: 'Store Type', value: 'Specialty Organic Retail' },
                  { label: 'Study Period', value: 'April 1 – September 30, 2025' },
                  { label: 'Duration', value: '183 Trading Days' },
                  { label: 'POS System', value: 'SalesDetail (.rpt.csv exports)' },
                  { label: 'Branch Code', value: '0007-ANJANEYA NAGER' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="font-ui text-xs font-semibold tracking-widest uppercase text-silver/50">
                      {item.label}
                    </span>
                    <span className="font-mono text-sm text-cream/90 text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pull Quote */}
              <div className="px-8 py-6 bg-black/20 border-t border-gold/10">
                <blockquote className="font-display italic text-gold/80 text-lg leading-relaxed">
                  &ldquo;We often run out on busy days and over-buy on slow ones.&rdquo;
                </blockquote>
                <cite className="block mt-3 font-body text-silver/50 text-sm not-italic">
                  — Branch Owner, Pure&apos;O Naturals, Nov 2025
                </cite>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: KPI Table */}
          <ScrollReveal delay={150}>
            <div>
              <h3 className="font-ui font-bold text-ink text-lg tracking-wide mb-4">
                Study Overview — Key Metrics
              </h3>
              <div
                className="rounded-xl overflow-hidden border shadow-md"
                style={{ borderColor: 'var(--divider)' }}
              >
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpiData.map((row) => (
                      <tr key={row.metric}>
                        <td className="font-body text-slate">{row.metric}</td>
                        <td
                          className={`font-mono font-medium ${
                            row.highlight ? 'text-moss font-bold' : 'text-ink'
                          }`}
                        >
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Chart */}
              <div className="mt-8">
                <div className="chart-wrap rounded-xl overflow-hidden border border-moss/20 shadow-md cursor-zoom-in">
                  <Image
                    src="/assets/charts/Chart_4_3_Category_Performance.png"
                    alt="Category Revenue Mix · Apr–Sep 2025"
                    width={800}
                    height={400}
                    className="responsive-img"
                    style={{ background: 'var(--parchment)' }}
                  />
                </div>
                <p className="font-mono text-silver/60 text-xs mt-2 text-center tracking-wide">
                  FIG. 1 — Category Revenue Mix · Apr–Sep 2025
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
