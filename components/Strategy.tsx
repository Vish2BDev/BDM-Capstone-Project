'use client'

import ScrollReveal from './ScrollReveal'

const kpiCurrent = [
  { kpi: 'Active SKUs', current: '3,247', target: '≤1,800', delta: '−44%', good: true },
  { kpi: 'Stockout Frequency', current: 'Baseline', target: '−40%', delta: '↓', good: true },
  { kpi: 'Negative-margin SKUs', current: '95', target: '0', delta: '−100%', good: true },
  { kpi: 'Avg Price Variance', current: '36.6%', target: '≤15%', delta: '−59%', good: true },
  { kpi: 'Dormant SKUs (>90d)', current: '97', target: '≤10', delta: '−90%', good: true },
]

const timeline = [
  { week: 'Wk 1–2', action: 'Identify & tag 97 dormant SKUs', pillar: 1, color: '#2D5A3D' },
  { week: 'Wk 3–4', action: 'Liquidate dormant stock, free ₹8.3L', pillar: 1, color: '#2D5A3D' },
  { week: 'Wk 5–6', action: 'Tier 1 repricing: 95 negative-margin SKUs +15–25%', pillar: 2, color: '#8B4513' },
  { week: 'Wk 7–8', action: 'Discontinue 600 Class C tail SKUs', pillar: 1, color: '#2D5A3D' },
  { week: 'Wk 9–10', action: 'Deploy dynamic ROP for top 100 SKUs', pillar: 3, color: '#1A3A6A' },
  { week: 'Wk 11', action: 'POS price-floor controls on top 20 misaligned', pillar: 2, color: '#8B4513' },
  { week: 'Wk 12', action: 'Full KPI review & strategy adjustment', pillar: 0, color: '#C8922A' },
]

const slTiers = [
  { type: 'Class A Stable', z: '1.645', sl: '95%', example: 'Milk, Eggs' },
  { type: 'Class A Moderate', z: '1.96', sl: '97.5%', example: 'Fruits' },
  { type: 'Class A High Volatile', z: '2.33', sl: '99%', example: 'ANAR, Mango' },
  { type: 'Festival / High-Value', z: '2.576', sl: '99.5%', example: 'Alphonso, Gift baskets' },
]

export default function Strategy() {
  return (
    <section
      id="strategy"
      className="py-24 lg:py-36 relative overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Glow effects */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #2D5A3D 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="badge border mb-4 inline-flex" style={{ borderColor: 'rgba(200,146,42,0.3)', background: 'rgba(200,146,42,0.1)', color: 'var(--saffron)' }}>
              Three-Pillar Strategy
            </span>
            <h2 className="font-display font-bold text-cream mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              The Recovery Roadmap
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-0.5" style={{ background: 'var(--gold)' }} />
            </div>
            <p className="font-body text-silver/60 max-w-2xl mx-auto text-lg">
              Three coordinated interventions. Twelve weeks. ₹72–100 Lakhs recovered.
            </p>
          </div>
        </ScrollReveal>

        {/* Three Pillar Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {/* Pillar 1 */}
          <ScrollReveal delay={0}>
            <div className="rounded-2xl overflow-hidden h-full" style={{ background: 'linear-gradient(160deg, #1A3A2A 0%, #0D2018 100%)', border: '1px solid rgba(45,90,61,0.5)' }}>
              <div className="p-8">
                <div className="text-4xl mb-4">🌿</div>
                <div className="font-ui font-black text-fern/60 text-xs tracking-widest uppercase mb-2">Pillar 01</div>
                <h3 className="font-display font-bold text-cream text-xl mb-2">SKU Rationalization</h3>
                <div className="font-mono text-saffron text-sm mb-6">3,247 → 1,800 SKUs · 12 weeks · &lt;3% revenue impact</div>

                <div className="space-y-4 mb-6">
                  {[
                    { phase: 'Phase 1 · Wk 1–4', desc: 'Liquidate 97+ dormant SKUs', impact: '₹8.3L freed' },
                    { phase: 'Phase 2 · Wk 5–8', desc: 'Discontinue 600 Class C tail', impact: '−18% portfolio' },
                    { phase: 'Phase 3 · Wk 9–12', desc: 'Consolidate 845 duplicates', impact: 'Cleaner ops' },
                  ].map((ph) => (
                    <div key={ph.phase} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '3px solid rgba(107,158,122,0.5)' }}>
                      <div className="font-ui font-bold text-fern text-xs tracking-wide">{ph.phase}</div>
                      <div className="font-body text-silver/80 text-sm mt-1">{ph.desc}</div>
                      <div className="font-mono text-saffron text-xs mt-1">{ph.impact}</div>
                    </div>
                  ))}
                </div>

                {/* DSLS Protocol */}
                <div className="p-3 rounded-lg" style={{ background: 'rgba(200,146,42,0.08)', border: '1px solid rgba(200,146,42,0.2)' }}>
                  <div className="font-ui font-bold text-gold text-xs mb-2 tracking-widest uppercase">DSLS Protocol</div>
                  <div className="flex items-center gap-2 text-xs font-mono text-silver/70">
                    <span className="px-2 py-1 rounded bg-sage/20 text-sage">Day 30: Flag</span>
                    <span>→</span>
                    <span className="px-2 py-1 rounded bg-honey/20 text-honey">Day 42: Discount</span>
                    <span>→</span>
                    <span className="px-2 py-1 rounded bg-terracotta/20 text-terracotta">Day 60: Remove</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 2 */}
          <ScrollReveal delay={100}>
            <div className="rounded-2xl overflow-hidden h-full" style={{ background: 'linear-gradient(160deg, #2A1500 0%, #1A0D00 100%)', border: '1px solid rgba(139,69,19,0.5)' }}>
              <div className="p-8">
                <div className="text-4xl mb-4">₹</div>
                <div className="font-ui font-black text-honey/60 text-xs tracking-widest uppercase mb-2">Pillar 02</div>
                <h3 className="font-display font-bold text-cream text-xl mb-2">Pricing & Margin Optimization</h3>
                <div className="font-mono text-saffron text-sm mb-6">₹28–42L annual recovery · Tiered repricing · POS controls</div>

                <div className="space-y-4 mb-6">
                  {[
                    { tier: 'Tier 1 · Immediate', desc: '95 negative-margin SKUs', action: 'Price +15–25% or discontinue' },
                    { tier: 'Tier 2 · Gradual', desc: '751 below-floor SKUs', action: '+2% tranches every 2 weeks' },
                    { tier: 'Tier 3 · Control', desc: 'Top 20 misaligned SKUs', action: 'UCL/LCL POS controls' },
                  ].map((t) => (
                    <div key={t.tier} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', borderLeft: '3px solid rgba(232,167,58,0.5)' }}>
                      <div className="font-ui font-bold text-honey text-xs tracking-wide">{t.tier}</div>
                      <div className="font-body text-silver/80 text-sm mt-1">{t.desc}</div>
                      <div className="font-mono text-saffron/80 text-xs mt-1">{t.action}</div>
                    </div>
                  ))}
                </div>

                <div className="formula-block">
                  <div className="text-silver/40 text-xs font-ui mb-1 uppercase tracking-widest">Shewhart Control Limits</div>
                  <div>UCL = X̄ + 2.66 × MR̄</div>
                  <div className="text-saffron/70">LCL = X̄ − 2.66 × MR̄</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Pillar 3 */}
          <ScrollReveal delay={200}>
            <div className="rounded-2xl overflow-hidden h-full" style={{ background: 'linear-gradient(160deg, #0A1830 0%, #060E1A 100%)', border: '1px solid rgba(26,58,106,0.5)' }}>
              <div className="p-8">
                <div className="text-4xl mb-4">📊</div>
                <div className="font-ui font-black text-blue-400/60 text-xs tracking-widest uppercase mb-2">Pillar 03</div>
                <h3 className="font-display font-bold text-cream text-xl mb-2">Dynamic Inventory Management</h3>
                <div className="font-mono text-saffron text-sm mb-6">−40% stockout rate · Dynamic ROP · CV-weighted safety stock</div>

                <div className="formula-block mb-6">
                  <div className="text-silver/40 text-xs font-ui mb-1 uppercase tracking-widest">Dynamic Reorder Point Formula</div>
                  <div className="text-saffron text-lg">ROP = μ·LT + Z·σ·√LT</div>
                  <div className="text-silver/60 mt-2">SS = Z × σ_demand × √Lead_Time</div>
                </div>

                <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(200,146,42,0.08)', border: '1px solid rgba(200,146,42,0.2)' }}>
                  <div className="font-ui font-bold text-gold text-xs mb-3 tracking-widest uppercase">ANAR Worked Example</div>
                  <div className="space-y-1 font-mono text-xs text-silver/80">
                    <div>μ = 14.2 kg/day · σ = 6.8 kg/day</div>
                    <div>LT = 1 day · Z = 2.33 (99%)</div>
                    <div className="text-saffron mt-2">SS = 2.33 × 6.8 × √1 = 15.8 kg</div>
                    <div className="text-saffron">ROP = 14.2 + 15.8 = <strong>30 kg</strong></div>
                    <div className="text-fern/70">(old fixed ROP was 20 kg → +50% buffer)</div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(26,58,106,0.4)' }}>
                  <table className="data-table" style={{ background: 'rgba(6,14,26,0.5)' }}>
                    <thead><tr><th style={{ background: 'rgba(26,58,106,0.8)' }}>Type</th><th style={{ background: 'rgba(26,58,106,0.8)' }}>Z</th><th style={{ background: 'rgba(26,58,106,0.8)' }}>SL</th></tr></thead>
                    <tbody>
                      {slTiers.map((t) => (
                        <tr key={t.type}>
                          <td className="font-body text-silver/80 text-xs">{t.type}</td>
                          <td className="font-mono text-saffron">{t.z}</td>
                          <td className="font-mono font-bold text-fern">{t.sl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Implementation Timeline */}
        <ScrollReveal>
          <div className="mb-16">
            <h3 className="font-ui font-bold text-cream text-lg mb-6 tracking-wide">12-Week Implementation Timeline</h3>
            <div className="relative overflow-x-auto">
              <div className="flex gap-3 pb-4 min-w-max lg:flex-wrap lg:min-w-0">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 lg:flex-shrink rounded-xl p-4 min-w-[160px] lg:min-w-0 lg:flex-1 border transition-all duration-200 hover:scale-105"
                    style={{
                      background: `${item.color}18`,
                      borderColor: `${item.color}40`,
                    }}
                  >
                    <div className="font-mono text-xs mb-2" style={{ color: item.color }}>{item.week}</div>
                    <p className="font-body text-silver/80 text-xs leading-relaxed">{item.action}</p>
                    {item.pillar > 0 && (
                      <div className="mt-2 font-ui text-xs font-bold" style={{ color: `${item.color}80` }}>
                        PILLAR {item.pillar}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* KPI Dashboard */}
        <ScrollReveal>
          <div>
            <h3 className="font-ui font-bold text-cream text-lg mb-6 tracking-wide">Post-Implementation KPI Targets</h3>
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(200,146,42,0.2)' }}>
              <table className="data-table data-table-dark">
                <thead>
                  <tr>
                    <th>KPI</th>
                    <th>Current State</th>
                    <th>Target (12 Weeks)</th>
                    <th>Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {kpiCurrent.map((row) => (
                    <tr key={row.kpi}>
                      <td className="font-body font-medium">{row.kpi}</td>
                      <td className="font-mono text-terracotta">{row.current}</td>
                      <td className="font-mono text-sage font-bold">{row.target}</td>
                      <td>
                        <span className="font-mono font-bold text-xs px-2 py-1 rounded" style={{ background: 'rgba(74,124,94,0.15)', color: 'var(--sage)' }}>
                          {row.delta}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
