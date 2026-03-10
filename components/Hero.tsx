'use client'

import AnimatedCounter from './AnimatedCounter'

const marqueeItems = [
  'ABC Classification', 'Demand Volatility', 'Margin Analysis',
  'Pricing Control', 'Category Mix', 'SKU Rationalization',
  'X-MR Charts', 'P10 Heuristic', 'Dynamic ROP', 'CV Analysis',
  'DSLS Protocol', 'Pareto Analysis', 'Risk Stratification',
  'IIT Madras BDM', 'Pure\'O Naturals', 'Data Forensics',
]

const stats = [
  { value: 2.54, prefix: '₹', suffix: ' Cr', label: 'Revenue', sub: 'Analyzed', decimals: 2 },
  { value: 52314, prefix: '', suffix: '', label: 'Transactions', sub: 'Processed' },
  { value: 3247, prefix: '', suffix: '', label: 'SKUs', sub: 'Audited' },
  { value: 100, prefix: '₹', suffix: 'L', label: 'Annual Impact', sub: 'Projected' },
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden grain"
      style={{ background: 'linear-gradient(135deg, #0D1A14 0%, #1A3A2A 50%, #0F2418 100%)' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45,90,61,0.3) 0%, transparent 70%)',
        }}
      />

      {/* Animated grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-8 flex flex-col items-center text-center">
        {/* Academic Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
          <span className="font-ui text-xs font-bold tracking-widest uppercase text-saffron">
            IIT Madras · BDM Capstone 2025 · Roll No: 22f1001645
          </span>
        </div>

        {/* Main Title */}
        <h1
          className="font-display font-black text-cream mb-4 leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.02em' }}
        >
          Pure&apos;O Naturals
        </h1>
        <h2
          className="font-display italic text-gold/80 mb-6"
          style={{ fontSize: 'clamp(1.2rem, 3vw, 2.4rem)', letterSpacing: '0.01em' }}
        >
          Strategic Intelligence Report
        </h2>

        {/* Gold rule */}
        <div className="w-24 h-0.5 bg-gold mb-6 gold-rule" />

        <p className="font-body text-silver/80 text-lg max-w-2xl mb-2 leading-relaxed">
          A 6-Month Data Forensics Study · Branch 0007-ANJANEYA NAGER · Bangalore
        </p>
        <p className="font-ui text-silver/50 text-sm tracking-wider mb-12">
          April – September 2025 · 183 Trading Days
        </p>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mb-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card text-center"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div
                className="font-display font-black text-saffron leading-none mb-2"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
              >
                <AnimatedCounter
                  end={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals || 0}
                  duration={2200}
                />
              </div>
              <div className="font-ui font-bold text-cream text-sm tracking-wide">{s.label}</div>
              <div className="font-body text-silver/60 text-xs mt-1">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="#overview"
            className="px-8 py-3.5 bg-moss hover:bg-sage text-cream font-ui font-bold text-sm tracking-wide rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-moss/30 hover:-translate-y-0.5"
          >
            Read the Full Analysis
          </a>
          <a
            href="#downloads"
            className="px-8 py-3.5 border border-gold/50 hover:border-gold text-gold hover:bg-gold hover:text-ink font-ui font-bold text-sm tracking-wide rounded-full transition-all duration-300"
          >
            Download Reports
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 text-silver/40">
          <span className="font-ui text-xs tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="relative z-10 border-t border-gold/15 bg-black/20 py-3 mt-auto">
        <div className="marquee-container">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-6">
                <span className="font-ui text-xs font-bold tracking-widest uppercase text-gold/70">
                  {item}
                </span>
                <span className="text-gold/30">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
