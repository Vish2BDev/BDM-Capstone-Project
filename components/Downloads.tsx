'use client'

import ScrollReveal from './ScrollReveal'

const downloads = [
  {
    icon: '📄',
    name: 'Final Report',
    format: 'DOCX',
    size: '~2.4 MB',
    desc: '9-section consulting-grade report with full analysis, strategy, and financial projections.',
    href: '/assets/reports/22f1001645- Final_Report.docx',
    badge: 'FINAL',
    badgeColor: '#2D5A3D',
    primary: true,
  },
  {
    icon: '📊',
    name: 'Midterm Report',
    format: 'PDF',
    size: '~1.8 MB',
    desc: 'EDA + ADA analysis, volatility study, margin analysis, and X-MR control charts.',
    href: '/assets/reports/22f1001645- Midterm_Report.pdf',
    badge: 'MIDTERM',
    badgeColor: '#C8922A',
  },
  {
    icon: '📝',
    name: 'BDM Proposal',
    format: 'PDF',
    size: '~900 KB',
    desc: 'Problem identification, SMART objectives, methodology design, and WBS/Gantt.',
    href: '/assets/reports/22f1001645- BDM_Proposal_.pdf',
    badge: 'PROPOSAL',
    badgeColor: '#4A7C5E',
  },
  {
    icon: '📊',
    name: 'Viva Presentation',
    format: 'PPTX',
    size: '~5.2 MB',
    desc: '32-slide defense presentation covering all 5 problems, 3 pillars, and financial impact.',
    href: '/assets/reports/BDM PPT viva.pptx',
    badge: 'PPTX',
    badgeColor: '#9B59B6',
  },
  {
    icon: '🐍',
    name: 'EDA Python Script',
    format: 'PY',
    size: '~48 KB',
    desc: 'Complete exploratory data analysis pipeline — cleaning, CV analysis, ABC classification.',
    href: '/assets/scripts/pure_o_naturals_eda.py',
    badge: 'CODE',
    badgeColor: '#3498DB',
  },
  {
    icon: '🐍',
    name: 'ADA Pipeline',
    format: 'PY',
    size: '~32 KB',
    desc: 'Advanced analytics: margin stratification, PVI index, X-MR charts, risk scoring.',
    href: '/assets/scripts/ada_pipeline.py',
    badge: 'CODE',
    badgeColor: '#3498DB',
  },
]

export default function Downloads() {
  return (
    <section
      id="downloads"
      className="py-24 lg:py-36"
      style={{ background: 'var(--ink)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16">
            <span
              className="badge border mb-4 inline-flex"
              style={{ borderColor: 'rgba(200,146,42,0.3)', background: 'rgba(200,146,42,0.1)', color: 'var(--saffron)' }}
            >
              Downloads
            </span>
            <h2
              className="font-display font-bold text-cream mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Everything, Open-Source
            </h2>
            <div className="w-16 h-0.5" style={{ background: 'var(--gold)' }} />
            <p className="font-body text-silver/60 max-w-xl mt-4">
              Reports, code, and data — fully available for review and academic reference.
            </p>
          </div>
        </ScrollReveal>

        {/* GitHub Banner */}
        <ScrollReveal>
          <div
            className="mb-12 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(200,146,42,0.3)' }}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">⚡</div>
              <div>
                <h3 className="font-ui font-bold text-cream text-lg">GitHub Repository</h3>
                <p className="font-body text-silver/60 text-sm">Full source code, analysis scripts, and raw data · MIT License</p>
              </div>
            </div>
            <a
              href="https://github.com/Vish2BDev/BDM-Capstone-Project"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-6 py-3 rounded-xl font-ui font-bold text-sm tracking-wide text-ink transition-all duration-200 hover:scale-105"
              style={{ background: 'var(--gold)' }}
            >
              View on GitHub →
            </a>
          </div>
        </ScrollReveal>

        {/* Download Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {downloads.map((file, i) => (
            <ScrollReveal key={file.name} delay={i * 80}>
              <div
                className={`group rounded-2xl p-6 border h-full flex flex-col transition-all duration-300 card-hover ${
                  file.primary ? 'ring-1 ring-gold/40' : ''
                }`}
                style={{
                  background: file.primary ? 'rgba(45,90,61,0.12)' : 'rgba(255,255,255,0.04)',
                  borderColor: file.primary ? 'rgba(45,90,61,0.4)' : 'rgba(255,255,255,0.08)',
                }}
              >
                {/* Icon + Badge */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{file.icon}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="badge text-xs"
                      style={{
                        background: `${file.badgeColor}20`,
                        color: file.badgeColor,
                        border: `1px solid ${file.badgeColor}40`,
                      }}
                    >
                      {file.badge}
                    </span>
                    <span className="font-mono text-xs text-silver/40">{file.format}</span>
                  </div>
                </div>

                {/* Name & Desc */}
                <h4 className="font-ui font-bold text-cream text-base mb-2">{file.name}</h4>
                <p className="font-body text-silver/60 text-sm leading-relaxed flex-1 mb-4">{file.desc}</p>

                {/* Size + Download */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-silver/40 text-xs">{file.size}</span>
                  <a
                    href={file.href}
                    download
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-ui font-bold text-xs transition-all duration-200 group-hover:scale-105"
                    style={{
                      background: file.primary ? 'var(--moss)' : 'rgba(200,146,42,0.15)',
                      color: file.primary ? 'var(--cream)' : 'var(--saffron)',
                      border: file.primary ? 'none' : '1px solid rgba(200,146,42,0.3)',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Data CSV Note */}
        <ScrollReveal>
          <div
            className="mt-8 p-5 rounded-xl border text-center"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
          >
            <p className="font-body text-silver/50 text-sm">
              Raw CSV data (cleaned_sales.csv, wastage_risk.csv, et al.) available in the GitHub repository ·
              <span className="font-mono text-silver/40"> data/ </span>
              · Used under written authorization from Pure&apos;O Naturals for academic purposes only.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
