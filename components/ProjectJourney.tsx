'use client'

import Image from 'next/image'
import ScrollReveal from './ScrollReveal'

const stages = [
  {
    stage: '01',
    title: 'Proposal',
    date: 'October 2025',
    deliverable: 'Problem identification, SMART objectives, methodology design, and complete data authorization from branch owner.',
    artifacts: ['WBS & Gantt Chart', '4 Problems Prioritized', 'Methodology Plan', 'Data Authorization — NOC', 'Literature Review', 'SMART Objectives'],
    color: '#2D5A3D',
    icon: '📝',
    link: '/assets/reports/22f1001645- BDM_Proposal_.pdf',
    linkLabel: 'View Proposal PDF',
  },
  {
    stage: '02',
    title: 'Midterm Report',
    date: 'November 8, 2025',
    deliverable: 'Full EDA complete, all 6 ADA techniques applied, volatility + margin analysis, 5 problems fully quantified.',
    artifacts: ['6 Section 6 Figures', 'X-MR Charts (20+)', 'Category Reclassification (98.5%)', 'Field Research + Videos', 'ABC/Pareto Analysis', 'CV Volatility Flagging'],
    color: '#C8922A',
    icon: '📊',
    current: true,
    link: '/assets/reports/22f1001645- Midterm_Report.pdf',
    linkLabel: 'View Midterm PDF',
  },
  {
    stage: '03',
    title: 'Final Report',
    date: 'December 2025',
    deliverable: '3-pillar strategy, ₹72–100L financial projections, master 9-section consulting report, portfolio website.',
    artifacts: ['9-Section Consulting Report', 'Full Visualization Gallery', 'Vercel Deployment', '₹72–100L Annual Roadmap', '12-Week Implementation Plan', 'Risk Sensitivity Analysis'],
    color: '#1A3A6A',
    icon: '🎯',
    link: '/assets/reports/22f1001645- Final_Report.docx',
    linkLabel: 'Download Final Report',
  },
]

export default function ProjectJourney() {
  return (
    <section
      id="journey"
      className="py-24 lg:py-36"
      style={{ background: 'var(--parchment)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16">
            <span className="badge text-moss border border-moss/30 bg-moss/8 mb-4 inline-flex">
              Project Journey
            </span>
            <h2
              className="font-display font-bold text-ink mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Proposal → Midterm → Final
            </h2>
            <div className="w-16 h-0.5" style={{ background: 'var(--gold)' }} />
            <p className="font-body text-slate/70 max-w-2xl mt-4 leading-relaxed">
              Three formal submission stages spanning October–December 2025. Each stage built on the last,
              escalating from problem discovery to quantified strategy.
            </p>
          </div>
        </ScrollReveal>

        {/* Stage Cards */}
        <div className="relative">
          {/* Connecting Line */}
          <div
            className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 z-0"
            style={{ background: 'linear-gradient(90deg, var(--moss), var(--gold), #1A3A6A)' }}
          />

          <div className="grid lg:grid-cols-3 gap-8 relative z-10 mb-16">
            {stages.map((s, i) => (
              <ScrollReveal key={s.stage} delay={i * 150}>
                <div
                  className={`relative rounded-2xl overflow-hidden ${s.current ? 'ring-2' : ''}`}
                  style={{
                    background: 'white',
                    border: `1px solid ${s.color}30`,
                    ...(s.current ? { outline: `2px solid ${s.color}` } : {}),
                  }}
                >
                  {s.current && (
                    <div
                      className="px-4 py-2 text-center font-ui font-bold text-xs tracking-widest uppercase text-white"
                      style={{ background: s.color }}
                    >
                      ★ Key Milestone
                    </div>
                  )}
                  <div className="p-8">
                    {/* Stage Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                        style={{ background: `${s.color}15` }}
                      >
                        {s.icon}
                      </div>
                      <div>
                        <div className="font-mono text-xs mb-1" style={{ color: s.color }}>
                          STAGE {s.stage}
                        </div>
                        <h3 className="font-display font-bold text-ink text-xl">{s.title}</h3>
                        <div className="font-body text-slate/60 text-sm mt-1">{s.date}</div>
                      </div>
                    </div>

                    {/* Deliverable */}
                    <p className="font-body italic text-slate/80 text-sm mb-6 leading-relaxed border-l-4 pl-4" style={{ borderColor: s.color }}>
                      {s.deliverable}
                    </p>

                    {/* Artifacts */}
                    <div className="space-y-2 mb-6">
                      {s.artifacts.map((art) => (
                        <div key={art} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                          <span className="font-mono text-xs text-slate/70">{art}</span>
                        </div>
                      ))}
                    </div>

                    {/* Download Link */}
                    <a
                      href={s.link}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-ui font-bold text-xs tracking-wide transition-all duration-200 hover:scale-105"
                      style={{
                        background: `${s.color}15`,
                        color: s.color,
                        border: `1px solid ${s.color}30`,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                      {s.linkLabel}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* WBS & Gantt Embed */}
        <ScrollReveal>
          <div>
            <h3 className="font-ui font-bold text-ink text-lg tracking-wide mb-4 flex items-center gap-3">
              <span className="text-gold">📐</span> Work Breakdown Structure &amp; Project Gantt
            </h3>
            <div
              className="rounded-xl overflow-hidden border shadow-lg cursor-zoom-in chart-wrap"
              style={{ borderColor: 'rgba(45,90,61,0.25)' }}
            >
              <Image
                src="/assets/gantt/WBS & GANTT.png"
                alt="Work Breakdown Structure & Project Gantt — 12-Week Implementation"
                width={1200}
                height={500}
                className="responsive-img"
                style={{ background: 'var(--parchment)' }}
              />
            </div>
            <p className="font-mono text-slate/50 text-xs mt-2 text-center tracking-wide">
              FIG. 2 — Work Breakdown Structure &amp; Project Gantt · 12-Week Capstone Timeline
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}


