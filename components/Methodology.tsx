'use client'

import Image from 'next/image'
import ScrollReveal from './ScrollReveal'

const pipelineSteps = [
  {
    step: '01',
    title: 'POS Export',
    desc: '6 CSV files · 183 days',
    detail: 'Raw SalesDetail.rpt.csv exports',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Cleaning',
    desc: '52,314 rows · QA: 8/8 ✓',
    detail: '3 duplicates removed, nulls handled',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Analysis',
    desc: '6 techniques applied',
    detail: 'Python · pandas · numpy · scipy',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Synthesis',
    desc: '3-pillar strategy',
    detail: '₹72–100L annual impact',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
]

const qaChecks = [
  { check: 'Revenue sum consistency', status: 'PASS' },
  { check: 'Date range coverage (183 days)', status: 'PASS' },
  { check: 'Missing critical columns', status: 'PASS' },
  { check: 'Duplicate removal (3 found, removed)', status: 'PASS' },
  { check: 'Outlier handling (IQR flagging)', status: 'PASS' },
  { check: 'Category mapping (98.5%)', status: 'PASS' },
  { check: 'Manual receipt audit (100 rows)', status: 'PASS' },
  { check: 'Pipeline reproducibility (3× runs)', status: 'PASS' },
]

const techniques = [
  {
    name: 'Descriptive Statistics',
    formula: 'CV = σ/μ × 100',
    result: 'Portfolio CV: 180.9%',
    color: '#4A7C5E',
  },
  {
    name: 'ABC / Pareto Classification',
    formula: 'Cumulative Revenue %',
    result: 'Class A (652 SKUs) = 70.2% rev',
    color: '#C8922A',
  },
  {
    name: 'CV Volatility Analysis',
    formula: 'ROP = μ·LT + Z·σ·√LT',
    result: '746 high-risk SKUs flagged',
    color: '#E8873A',
  },
  {
    name: 'P10 Margin Proxy',
    formula: 'Margin ≈ 1 − P10(price)/Avg(price)',
    result: '869 below-floor, 95 negative',
    color: '#E74C3C',
  },
  {
    name: 'Price Variance Index',
    formula: 'PVI = Var(price)/(Revenue/Qty)',
    result: '36.6% avg variance',
    color: '#3498DB',
  },
  {
    name: 'Risk Stratification',
    formula: 'Score = (CV + Gap + DSLS/10)/3',
    result: 'RED / YELLOW / GREEN / BLUE',
    color: '#9B59B6',
  },
]

const techStack = [
  {
    name: 'Python 3.x',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.24l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09z"/>
      </svg>
    ),
  },
  {
    name: 'pandas',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="3" width="7" height="18" rx="1"/>
        <rect x="14" y="3" width="7" height="18" rx="1"/>
        <rect x="8" y="8" width="8" height="2"/>
        <rect x="8" y="14" width="8" height="2"/>
      </svg>
    ),
  },
  {
    name: 'numpy',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="8" height="8"/><rect x="13" y="3" width="8" height="8"/>
        <rect x="3" y="13" width="8" height="8"/><rect x="13" y="13" width="8" height="8"/>
      </svg>
    ),
  },
  {
    name: 'matplotlib',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 20 L7 10 L11 14 L15 6 L21 20"/>
        <line x1="3" y1="20" x2="21" y2="20"/>
      </svg>
    ),
  },
  {
    name: 'seaborn',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 18 Q8 4 12 12 Q16 20 21 6"/>
      </svg>
    ),
  },
  {
    name: 'scipy',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M9 9 Q12 6 15 12 Q18 18 12 15 Q6 12 9 9Z"/>
      </svg>
    ),
  },
  {
    name: 'Next.js 14',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.683.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C22.668 5.825 19.46 2.04 15.11.637c-.773-.249-1.594-.42-2.521-.525-.302-.033-2.017-.047-2.017-.112zm4.868 7.165c.123.062.223.171.286.307l.065.134.073 4.608.072 4.607 2.365-3.63 2.367-3.63.072-.094a.498.498 0 0 1 .174-.145c.097-.048.135-.051.54-.051h.472l.096.065a.468.468 0 0 1 .144.145l.054.109-.005 6.549-.006 6.551-.062.125a.448.448 0 0 1-.207.21c-.068.036-.155.048-.404.048h-.327a.62.62 0 0 1-.365-.13.52.52 0 0 1-.168-.194c-.022-.051-.029-1.023-.029-3.61v-3.547l-2.35 3.607-2.353 3.608-.065.109a.546.546 0 0 1-.207.196.592.592 0 0 1-.282.05.636.636 0 0 1-.38-.126.516.516 0 0 1-.167-.193c-.024-.054-.029-1.006-.029-6.612V7.21l.063-.131a.468.468 0 0 1 .232-.214c.095-.044.131-.048.507-.048.38 0 .412.004.507.048z"/>
      </svg>
    ),
  },
  {
    name: 'Recharts',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="4" y1="20" x2="4" y2="12"/>
        <line x1="9" y1="20" x2="9" y2="8"/>
        <line x1="14" y1="20" x2="14" y2="14"/>
        <line x1="19" y1="20" x2="19" y2="4"/>
        <line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    ),
  },
]

export default function Methodology() {
  return (
    <section
      id="methodology"
      className="py-24 lg:py-36"
      style={{ background: 'var(--forest)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
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
              Data & Methodology
            </span>
            <h2
              className="font-display font-bold text-cream mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              From Raw POS to Strategy
            </h2>
            <div className="flex justify-center">
              <div className="w-16 h-0.5" style={{ background: 'var(--gold)' }} />
            </div>
          </div>
        </ScrollReveal>

        {/* Pipeline */}
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {pipelineSteps.map((step, i) => (
              <div key={step.step} className="relative">
                <div
                  className="rounded-xl p-6 h-full border transition-all duration-300 hover:border-gold/40"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(200,146,42,0.2)',
                  }}
                >
                  <span className="block mb-3 text-gold/70">{step.icon}</span>
                  <span className="font-mono text-gold/60 text-xs font-medium block mb-1">
                    STEP {step.step}
                  </span>
                  <h4 className="font-ui font-bold text-cream text-sm tracking-wide mb-2">
                    {step.title}
                  </h4>
                  <p className="font-mono text-silver/70 text-xs">{step.desc}</p>
                  <p className="font-body text-silver/40 text-xs mt-1 italic">{step.detail}</p>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-gold/50 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* QA Log */}
          <ScrollReveal>
            <div>
              <h3 className="font-ui font-bold text-cream text-lg tracking-wide mb-5">
                Data Quality Assurance Log
              </h3>
              <div
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: 'rgba(200,146,42,0.2)' }}
              >
                <table className="data-table data-table-dark" style={{ background: 'transparent' }}>
                  <thead>
                    <tr>
                      <th style={{ background: 'rgba(26,58,42,0.8)' }}>Quality Check</th>
                      <th style={{ background: 'rgba(26,58,42,0.8)' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qaChecks.map((row) => (
                      <tr key={row.check}>
                        <td className="font-body text-silver/80">{row.check}</td>
                      <td>
                          <span className="flex items-center gap-2 font-mono font-bold text-xs" style={{ color: '#4CAF50' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal delay={100}>
            <div>
              <h3 className="font-ui font-bold text-cream text-lg tracking-wide mb-5">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-ui font-semibold transition-all duration-200 hover:border-gold/40 hover:bg-gold/5"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      color: 'var(--cream)',
                    }}
                  >
                    <span>{tech.icon}</span>
                    <span className="text-xs tracking-wide">{tech.name}</span>
                  </div>
                ))}
              </div>

              {/* Formula blocks sample */}
              <div className="space-y-3">
                <div className="formula-block">
                  <div className="text-silver/60 text-xs font-ui mb-1 uppercase tracking-widest">Dynamic Reorder Point</div>
                  <div>ROP = μ·LT + Z·σ·√LT</div>
                  <div className="text-saffron/70 mt-1">SS = Z × σ_demand × √Lead_Time</div>
                </div>
                <div className="formula-block">
                  <div className="text-silver/60 text-xs font-ui mb-1 uppercase tracking-widest">X-MR Control Limits</div>
                  <div>UCL = X̄ + 2.66 × MR̄</div>
                  <div className="text-saffron/70 mt-1">LCL = X̄ − 2.66 × MR̄</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Six Technique Cards */}
        <ScrollReveal>
          <h3 className="font-ui font-bold text-cream text-lg tracking-wide mb-6">
            Six Analytical Techniques
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {techniques.map((tech, i) => (
              <div
                key={tech.name}
                className="p-6 rounded-xl border card-hover"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: `${tech.color}25`,
                  borderLeftWidth: '4px',
                  borderLeftColor: tech.color,
                }}
              >
                <span
                  className="font-ui font-black text-2xl mb-3 block"
                  style={{ color: tech.color }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-ui font-bold text-cream text-sm mb-3">{tech.name}</h4>
                <div
                  className="font-mono text-sm px-3 py-2 rounded mb-3"
                  style={{
                    background: 'rgba(13,13,11,0.5)',
                    color: 'var(--saffron)',
                    borderLeft: `2px solid ${tech.color}`,
                  }}
                >
                  {tech.formula}
                </div>
                <p className="font-body text-silver/60 text-xs italic">{tech.result}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* WBS & Gantt */}
        <ScrollReveal>
          <div>
            <h3 className="font-ui font-bold text-cream text-lg tracking-wide mb-4">
              Project Timeline — Work Breakdown Structure
            </h3>
            <div
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: 'rgba(200,146,42,0.2)' }}
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
            <p className="font-mono text-silver/50 text-xs mt-2 text-center tracking-wide">
              FIG. 2 — Work Breakdown Structure & Project Gantt · 12-Week Capstone Timeline
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
