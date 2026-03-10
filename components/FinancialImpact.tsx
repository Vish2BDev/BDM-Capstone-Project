'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import ScrollReveal from './ScrollReveal'
import AnimatedCounter from './AnimatedCounter'

const waterfallData = [
  { name: 'Repricing', value: 35, fill: '#2D5A3D' },
  { name: 'Pricing Std.', value: 14.4, fill: '#4A7C5E' },
  { name: 'SKU Save', value: 15, fill: '#6B9E7A' },
  { name: 'Inventory', value: 10.5, fill: '#C8922A' },
  { name: 'Liquidation', value: 9.8, fill: '#E8A73A' },
  { name: 'Total', value: 85, fill: '#F5B84A' },
]

const accumulationData = [
  { month: 'M1', conservative: 0, base: 0, upside: 0 },
  { month: 'M2', conservative: 1.2, base: 1.8, upside: 2.5 },
  { month: 'M3', conservative: 3.8, base: 5.5, upside: 7.2 },
  { month: 'M4', conservative: 7.5, base: 11, upside: 14.5 },
  { month: 'M5', conservative: 12, base: 17.5, upside: 23 },
  { month: 'M6', conservative: 18, base: 26, upside: 34 },
  { month: 'M7', conservative: 25, base: 36, upside: 47 },
  { month: 'M8', conservative: 35, base: 49, upside: 63 },
  { month: 'M9', conservative: 45, base: 62, upside: 79 },
  { month: 'M10', conservative: 55, base: 73, upside: 88 },
  { month: 'M11', conservative: 65, base: 80, upside: 96 },
  { month: 'M12', conservative: 72, base: 85, upside: 100 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0D0D0B', border: '1px solid rgba(200,146,42,0.4)', borderRadius: 8, padding: '10px 14px' }}>
        <p style={{ fontFamily: 'var(--font-syne)', fontSize: 11, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 13, color: '#F5B84A', margin: '2px 0' }}>
            ₹{p.value.toLocaleString()}L — <span style={{ color: '#A0AEC0', fontSize: 11 }}>{p.name}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

const scenarios = [
  {
    label: 'Conservative',
    total: 72,
    totalLabel: '₹72 Lakhs',
    roi: '1,100%',
    payback: '3 weeks',
    items: [
      { name: 'Repricing (Tier 1+2)', value: '₹28 L' },
      { name: 'Pricing Std (X-MR)', value: '₹14.4 L' },
      { name: 'SKU Rationalization', value: '₹12 L' },
      { name: 'Inventory Optimization', value: '₹8.8 L' },
      { name: 'Stock Liquidation', value: '₹8.5 L' },
    ],
    color: '#2D5A3D',
    highlight: false,
  },
  {
    label: 'Base Case',
    total: 85,
    totalLabel: '₹85 Lakhs',
    roi: '1,600%',
    payback: '3 weeks',
    items: [
      { name: 'Repricing (Tier 1+2)', value: '₹35 L' },
      { name: 'Pricing Std (X-MR)', value: '₹14.4 L' },
      { name: 'SKU Rationalization', value: '₹15 L' },
      { name: 'Inventory Optimization', value: '₹10.5 L' },
      { name: 'Stock Liquidation', value: '₹9.8 L' },
    ],
    color: '#C8922A',
    highlight: true,
  },
  {
    label: 'Upside',
    total: 100,
    totalLabel: '₹100 Lakhs',
    roi: '2,400%',
    payback: '3 weeks',
    items: [
      { name: 'Repricing (Tier 1+2)', value: '₹42 L' },
      { name: 'Pricing Std (X-MR)', value: '₹14.4 L' },
      { name: 'SKU Rationalization', value: '₹18 L' },
      { name: 'Inventory Optimization', value: '₹12.1 L' },
      { name: 'Stock Liquidation', value: '₹11.2 L' },
    ],
    color: '#6B9E7A',
    highlight: false,
  },
]

const risks = [
  { risk: 'Staff resistance to repricing', impact: '−₹5–8L', mitigation: 'Phased implementation + change mgmt' },
  { risk: 'Seasonal demand spike misalignment', impact: '−₹3–6L', mitigation: 'Dynamic ROP reviews monthly' },
  { risk: 'Supplier price pass-through', impact: '−₹2–4L', mitigation: 'Annual price review contracts' },
  { risk: 'Customer attrition from price hikes', impact: '−₹4–7L', mitigation: 'Max 25% increase per SKU in Wk 1' },
]

export default function FinancialImpact() {
  return (
    <section
      id="impact"
      className="py-24 lg:py-36"
      style={{ background: 'var(--cream)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="badge text-gold border border-gold/30 bg-gold/8 mb-4 inline-flex">
              Financial Impact
            </span>
            <h2
              className="font-display font-bold text-ink mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              The Business Case
            </h2>
            <div className="w-16 h-0.5" style={{ background: 'var(--gold)' }} />
          </div>
        </ScrollReveal>

        {/* Three Scenario Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {scenarios.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 100}>
              <div
                className={`rounded-2xl overflow-hidden h-full transition-all duration-300 ${s.highlight ? 'ring-2' : ''}`}
                style={{
                  background: s.highlight ? `${s.color}12` : 'white',
                  border: `1px solid ${s.color}40`,
                  outline: s.highlight ? `2px solid ${s.color}` : undefined,
                }}
              >
                {s.highlight && (
                  <div
                    className="px-4 py-2 text-center font-ui font-bold text-xs tracking-widest uppercase text-ink"
                    style={{ background: s.color }}
                  >
                    ★ Most Likely Outcome
                  </div>
                )}
                <div className="p-8">
                  <div className="font-ui font-semibold text-sm tracking-widest uppercase mb-2" style={{ color: s.color }}>
                    {s.label}
                  </div>
                  <div
                    className="font-display font-black leading-tight mb-1"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: s.color }}
                  >
                    <AnimatedCounter end={s.total} prefix="₹" suffix=" L" duration={2000} />
                  </div>
                  <div className="font-body text-slate/70 text-sm mb-6">Annual Net Benefit</div>

                  <div className="space-y-3 mb-6 pb-6 border-b" style={{ borderColor: `${s.color}20` }}>
                    {s.items.map((item) => (
                      <div key={item.name} className="flex justify-between items-center">
                        <span className="font-body text-slate text-sm">{item.name}</span>
                        <span className="font-mono font-medium text-sm" style={{ color: s.color }}>{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-xl" style={{ background: `${s.color}10` }}>
                      <div className="font-display font-black text-lg" style={{ color: s.color }}>{s.roi}</div>
                      <div className="font-ui text-xs text-slate/60 mt-1">ROI</div>
                    </div>
                    <div className="text-center p-3 rounded-xl" style={{ background: `${s.color}10` }}>
                      <div className="font-display font-black text-lg" style={{ color: s.color }}>{s.payback}</div>
                      <div className="font-ui text-xs text-slate/60 mt-1">Payback</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ROI Callout */}
        <ScrollReveal>
          <div
            className="mb-16 p-10 rounded-2xl text-center border-2"
            style={{
              background: 'linear-gradient(135deg, rgba(200,146,42,0.06) 0%, rgba(45,90,61,0.06) 100%)',
              borderColor: 'rgba(200,146,42,0.4)',
            }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: 'Implementation Cost', value: '₹4–6 Lakhs', sub: 'One-time investment' },
                { label: 'Conservative ROI', value: '1,100%', sub: 'Over 12 months' },
                { label: 'Payback Period', value: '3–5 Weeks', sub: 'Breakeven point' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div
                    className="font-display font-black mb-1"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--gold)' }}
                  >
                    {item.value}
                  </div>
                  <div className="font-ui font-bold text-ink text-sm tracking-wide">{item.label}</div>
                  <div className="font-body text-slate/60 text-xs mt-1">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Recharts: Benefit Components Bar Chart */}
        <ScrollReveal>
          <div className="mb-16">
            <h3 className="font-ui font-bold text-forest text-lg mb-2 tracking-wide">
              Base Case — Benefit Components (₹ Lakhs)
            </h3>
            <p className="font-body text-slate/60 text-sm mb-6">
              Breakdown of the ₹85 Lakhs Base Case annual benefit by initiative category
            </p>
            <div
              className="p-6 rounded-xl border"
              style={{ background: 'white', borderColor: 'rgba(45,90,61,0.2)' }}
            >
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={waterfallData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontFamily: 'var(--font-syne, sans-serif)', fontSize: 11, fill: '#4A5568', fontWeight: 600 }}
                    axisLine={{ stroke: 'rgba(45,90,61,0.2)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: 10, fill: '#A0AEC0' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${v}L`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {waterfallData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollReveal>

        {/* Recharts: Monthly Accumulation Line Chart */}
        <ScrollReveal>
          <div className="mb-16">
            <h3 className="font-ui font-bold text-forest text-lg mb-6 tracking-wide">
              Benefits Accumulation — Month by Month
            </h3>
            <div
              className="p-6 rounded-xl border"
              style={{ background: 'white', borderColor: 'rgba(45,90,61,0.2)' }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={accumulationData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: 10, fill: '#A0AEC0' }}
                    axisLine={{ stroke: 'rgba(45,90,61,0.15)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontFamily: 'var(--font-dm-mono, monospace)', fontSize: 10, fill: '#A0AEC0' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${v}L`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontFamily: 'var(--font-syne, sans-serif)', fontSize: 11, paddingTop: 12 }}
                    formatter={(value) => <span style={{ color: '#4A5568', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{value}</span>}
                  />
                  <ReferenceLine y={72} stroke="#2D5A3D" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: '₹72L', position: 'right', fill: '#2D5A3D', fontSize: 10 }} />
                  <ReferenceLine y={85} stroke="#C8922A" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: '₹85L', position: 'right', fill: '#C8922A', fontSize: 10 }} />
                  <ReferenceLine y={100} stroke="#6B9E7A" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: '₹100L', position: 'right', fill: '#6B9E7A', fontSize: 10 }} />
                  <Line type="monotone" dataKey="conservative" name="Conservative" stroke="#2D5A3D" strokeWidth={2.5} dot={{ r: 3, fill: '#2D5A3D' }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="base" name="Base Case" stroke="#C8922A" strokeWidth={3} dot={{ r: 3, fill: '#C8922A' }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="upside" name="Upside" stroke="#6B9E7A" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 2, fill: '#6B9E7A' }} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
              <p className="font-body text-slate/50 text-xs text-center mt-2 italic">
                X-axis: Month 1–12 post-implementation · Y-axis: Cumulative net benefit (₹ Lakhs)
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Risk Table */}
        <ScrollReveal>
          <div>
            <h3 className="font-ui font-bold text-forest text-lg mb-4 tracking-wide">Risk Sensitivity Analysis</h3>
            <div className="rounded-xl overflow-hidden border border-moss/20">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Risk Factor</th>
                    <th>Conservative Impact</th>
                    <th>Mitigation</th>
                  </tr>
                </thead>
                <tbody>
                  {risks.map((r) => (
                    <tr key={r.risk}>
                      <td className="font-body">{r.risk}</td>
                      <td className="font-mono font-bold text-terracotta">{r.impact}</td>
                      <td className="font-body text-sage text-sm">{r.mitigation}</td>
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
