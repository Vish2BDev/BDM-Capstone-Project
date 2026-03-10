'use client'

import Image from 'next/image'
import ScrollReveal from './ScrollReveal'

const problems = [
  {
    id: 'P1',
    title: 'Demand Volatility & Wastage',
    impact: '₹31.7L annual wastage risk',
    color: '#E8873A',
    tagBg: 'rgba(232,135,58,0.15)',
    tagColor: '#E8873A',
    metrics: ['746 SKUs with CV >25%', 'Sep CV: 3.59 vs Apr: 1.93'],
    methods: ['CV Analysis', 'Rolling Heatmap', 'Dynamic ROP'],
    description: 'Seasonal demand spikes create chronic overstocking and spoilage in perishables.',
    chart: '/assets/charts/Chart_4_5_Volatility_Distribution.png',
    chartAlt: 'Volatility Distribution',
    priority: 'HIGH',
    priorityColor: '#E8873A',
  },
  {
    id: 'P2',
    title: 'Portfolio Complexity',
    impact: '₹8.3L locked capital',
    color: '#9B59B6',
    tagBg: 'rgba(155,89,182,0.15)',
    tagColor: '#9B59B6',
    metrics: ['1,645 Class C SKUs = 9.8% revenue', '97 SKUs dormant >90 days'],
    methods: ['ABC/Pareto', 'DSLS Analysis'],
    description: 'SKU bloat dilutes buyer focus and ties up capital in slow-moving inventory.',
    chart: '/assets/charts/Chart_4_4_ABC_Pareto.png',
    chartAlt: 'ABC Pareto Analysis',
    priority: 'MEDIUM',
    priorityColor: '#9B59B6',
  },
  {
    id: 'P3',
    title: 'Margin Compression',
    impact: '₹34.1L/year at risk',
    color: '#E74C3C',
    tagBg: 'rgba(231,76,60,0.15)',
    tagColor: '#E74C3C',
    metrics: ['869 SKUs below 20% margin floor', '95 SKUs with negative margin'],
    methods: ['P10 Heuristic', 'Margin Stratification'],
    description: 'Inconsistent pricing erodes margins across 27% of the active SKU portfolio.',
    chart: '/assets/ada_visuals/2. Estimated Margin Distribution by Category - Figure_2.png',
    chartAlt: 'Margin Distribution by Category',
    priority: 'CRITICAL',
    priorityColor: '#E74C3C',
  },
  {
    id: 'P4',
    title: 'Pricing Misalignment',
    impact: '₹14.4L annual leakage',
    color: '#3498DB',
    tagBg: 'rgba(52,152,219,0.15)',
    tagColor: '#3498DB',
    metrics: ['36.6% average price variance', 'Mango SKU: ₹6.7L exposure'],
    methods: ['PVI Index', 'Shewhart X-MR Charts'],
    description: 'Staff apply inconsistent prices at POS, creating revenue leakage and customer distrust.',
    chart: '/assets/charts/Figure_6_6_Price_Variance_Top20.png',
    chartAlt: 'Price Variance Top 20 SKUs',
    priority: 'QUICK WIN',
    priorityColor: '#3498DB',
  },
  {
    id: 'P5',
    title: 'Category Mix Drift',
    impact: 'Data quality enabler',
    color: '#95A5A6',
    tagBg: 'rgba(149,165,166,0.12)',
    tagColor: '#95A5A6',
    metrics: ['40.28% unknown attribution (original)', 'Cleaned to 98.5% accuracy'],
    methods: ['3-Layer Taxonomy', 'Monthly Stacked Bar'],
    description: 'Miscategorized transactions masked true category performance, invalidating analysis.',
    chart: '/assets/ada_visuals/3. Category Mix by Month - Revenue Share (%) - Figure_3.png',
    chartAlt: 'Category Mix by Month',
    priority: 'FOUNDATION',
    priorityColor: '#95A5A6',
  },
]

export default function FiveProblems() {
  return (
    <section
      id="problems"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(45,90,61,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span
              className="badge border mb-4 inline-flex"
              style={{
                borderColor: 'rgba(200,146,42,0.3)',
                background: 'rgba(200,146,42,0.1)',
                color: 'var(--saffron)',
              }}
            >
              Five Core Problems
            </span>
            <h2
              className="font-display font-bold text-cream mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Diagnosed. Quantified. Solved.
            </h2>
            <div className="flex justify-center">
              <div className="w-16 h-0.5" style={{ background: 'var(--gold)' }} />
            </div>
            <p className="font-body text-silver/60 max-w-2xl mx-auto mt-4 text-lg">
              Six analytical techniques, 52,314 transactions, and one business stripped bare.
            </p>
          </div>
        </ScrollReveal>

        {/* Problem Cards Grid */}
        <div className="space-y-8">
          {problems.map((problem, i) => (
            <ScrollReveal key={problem.id} delay={i * 100}>
              <div
                className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:border-opacity-60"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: `${problem.color}30`,
                  borderLeftWidth: '6px',
                  borderLeftColor: problem.color,
                }}
              >
                <div className="p-8 grid lg:grid-cols-[1fr_auto] gap-8 items-start">
                  <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
                    {/* Left: Problem Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="font-ui font-black text-3xl"
                          style={{ color: problem.color }}
                        >
                          {problem.id}
                        </span>
                        <span
                          className="px-2.5 py-1 rounded font-ui font-bold text-xs tracking-widest uppercase"
                          style={{
                            background: problem.tagBg,
                            color: problem.priorityColor,
                          }}
                        >
                          {problem.priority}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-cream text-xl mb-3">
                        {problem.title}
                      </h3>

                      <p className="font-body italic text-silver/70 mb-4 leading-relaxed">
                        {problem.description}
                      </p>

                      {/* Metrics */}
                      <div className="space-y-2 mb-4">
                        {problem.metrics.map((m) => (
                          <div key={m} className="flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: problem.color }}
                            />
                            <span className="font-mono text-sm text-silver/80">{m}</span>
                          </div>
                        ))}
                      </div>

                      {/* Method Badges */}
                      <div className="flex flex-wrap gap-2">
                        {problem.methods.map((method) => (
                          <span
                            key={method}
                            className="px-3 py-1 rounded-full font-ui font-bold text-xs tracking-wide"
                            style={{
                              background: 'rgba(45,90,61,0.3)',
                              color: 'var(--fern)',
                              border: '1px solid rgba(107,158,122,0.3)',
                            }}
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Chart */}
                    <div className="flex flex-col justify-start">
                      <div
                        className="rounded-xl overflow-hidden border transition-transform duration-300 group-hover:scale-[1.02]"
                        style={{ borderColor: `${problem.color}20` }}
                      >
                        <Image
                          src={problem.chart}
                          alt={problem.chartAlt}
                          width={500}
                          height={280}
                          className="responsive-img"
                          style={{ background: 'var(--parchment)' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Impact Badge */}
                  <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:gap-2">
                    <div
                      className="text-right"
                      style={{ color: problem.color }}
                    >
                      <div
                        className="font-display font-black leading-none"
                        style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                      >
                        {problem.impact.split(' ').slice(0, 1).join('')}
                      </div>
                      <div className="font-body text-xs text-silver/50 mt-1">
                        {problem.impact.split(' ').slice(1).join(' ')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Total Impact Summary */}
        <ScrollReveal delay={200}>
          <div
            className="mt-16 p-8 rounded-2xl border text-center"
            style={{
              background: 'rgba(200,146,42,0.08)',
              borderColor: 'rgba(200,146,42,0.3)',
            }}
          >
            <p className="font-display italic text-saffron text-2xl mb-2">
              &ldquo;Five problems. One business. ₹72–100 Lakhs recoverable.&rdquo;
            </p>
            <p className="font-mono text-silver/50 text-sm tracking-wide">
              Combined annual impact across all five problem domains
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
