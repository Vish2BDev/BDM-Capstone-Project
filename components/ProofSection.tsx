'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'

const photos = [
  { src: '/assets/proof/photos/20251108_154336.jpg', caption: "Pure'O Naturals Store Front — Anjaneya Nagar, Bangalore", date: 'Nov 8, 2025' },
  { src: '/assets/proof/photos/20251108_155027.jpg', caption: 'Discussion with Branch Owner', date: 'Nov 8, 2025' },
  { src: '/assets/proof/photos/20251108_155038.jpg', caption: 'POS Terminal & Billing Counter', date: 'Nov 8, 2025' },
  { src: '/assets/proof/photos/20251108_155044.jpg', caption: 'Store Interior — Vegetable & Fruit Aisle', date: 'Nov 8, 2025' },
  { src: '/assets/proof/photos/IMG20251108155936.jpg', caption: 'Interaction During Store Hours', date: 'Nov 8, 2025' },
  { src: '/assets/proof/photos/IMG20251108155950_BURST000_COVER.jpg', caption: 'Owner Presenting Sales Reports', date: 'Nov 8, 2025' },
  { src: '/assets/proof/photos/IMG20251108155956.jpg', caption: 'SalesDetail Export — Data Documentation', date: 'Nov 8, 2025' },
  { src: '/assets/proof/photos/NOC Letter.jpg', caption: 'No Objection Certificate — Signed by Branch Owner', date: 'Nov 10, 2025', isNOC: true },
]

const BASE_VIDEO_URL = 'https://github.com/Vish2BDev/BDM-Capstone-Project/releases/download/v1.0-videos'

const videos = [
  {
    src: `${BASE_VIDEO_URL}/Owner%20Interaction%20Video_Actual.mp4`,
    title: 'Owner Interview — Primary Data Discussion',
    desc: '45-minute structured interview covering business pain points, data authorization, and operational context.',
    date: 'November 8, 2025',
    badge: 'PRIMARY EVIDENCE',
  },
  {
    src: `${BASE_VIDEO_URL}/Store%20Tour%20-%20Overall%20Walkthrough.mp4`,
    title: 'Store Walkthrough — Branch 0007',
    desc: 'Physical store tour documenting store layout, shelf organization, POS terminal, and product category placement.',
    date: 'November 8, 2025',
    badge: 'FIELD EVIDENCE',
  },
  {
    src: `${BASE_VIDEO_URL}/Store%20Tour%20-%20Interaction%20with%20Cashier.mp4`,
    title: 'POS System Demo — Data Collection Process',
    desc: 'Interaction with cashier demonstrating POS workflow and SalesDetail export process.',
    date: 'November 8, 2025',
    badge: 'PROCESS DOC',
  },
  {
    src: `${BASE_VIDEO_URL}/Proof_Data_Acquisition_Process.mp4`,
    title: 'Data Acquisition — Live POS Export',
    desc: 'Screen-recorded demonstration of exporting SalesDetail.rpt.csv files from the branch POS system.',
    date: 'November 8, 2025',
    badge: 'DATA TRAIL',
  },
]

export default function ProofSection() {
  const [lightboxPhoto, setLightboxPhoto] = useState<typeof photos[0] | null>(null)

  return (
    <section
      id="proof"
      className="py-24 lg:py-36"
      style={{ background: 'var(--forest)' }}
    >
      {/* Photo Lightbox */}
      {lightboxPhoto && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxPhoto(null)}
        >
          <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxPhoto(null)}
              className="block ml-auto mb-2 text-silver/60 hover:text-cream font-ui text-sm transition-colors"
            >
              ✕ Close
            </button>
            <div className="rounded-2xl overflow-hidden border border-gold/20">
              <Image
                src={lightboxPhoto.src}
                alt={lightboxPhoto.caption}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                style={{ maxHeight: '80vh', background: 'black' }}
              />
              <div className="px-6 py-4" style={{ background: 'var(--ink)' }}>
                <p className="font-display italic text-cream/80 text-base">{lightboxPhoto.caption}</p>
                <p className="font-mono text-silver/40 text-xs mt-1">{lightboxPhoto.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span
              className="badge border mb-4 inline-flex"
              style={{ borderColor: 'rgba(200,146,42,0.3)', background: 'rgba(200,146,42,0.1)', color: 'var(--saffron)' }}
            >
              Field Research & Proof of Work
            </span>
            <h2
              className="font-display font-bold text-cream mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Primary Data. Verified.
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-0.5" style={{ background: 'var(--gold)' }} />
            </div>
            <p className="font-body text-silver/60 max-w-2xl mx-auto">
              Every data point traced to a physical transaction. Every method verified at source.
            </p>
          </div>
        </ScrollReveal>

        {/* Owner Interaction Videos */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="font-ui font-bold text-cream text-lg mb-6 tracking-wide flex items-center gap-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Owner Interaction Videos
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {videos.map((video, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden border card-hover"
                  style={{ background: 'rgba(13,13,11,0.6)', borderColor: 'rgba(200,146,42,0.2)' }}
                >
                  <div className="video-container">
                    <video
                      controls
                      preload="metadata"
                      className="w-full"
                      style={{ maxHeight: '280px', background: 'black' }}
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="badge text-xs"
                        style={{ background: 'rgba(200,146,42,0.15)', color: 'var(--saffron)', border: '1px solid rgba(200,146,42,0.3)' }}
                      >
                        {video.badge}
                      </span>
                      <span className="font-mono text-silver/40 text-xs">{video.date}</span>
                    </div>
                    <h4 className="font-ui font-bold text-cream text-sm mb-2">{video.title}</h4>
                    <p className="font-body text-silver/60 text-xs leading-relaxed">{video.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Field Photo Gallery */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="font-ui font-bold text-cream text-lg mb-6 tracking-wide flex items-center gap-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> Field Research Photos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                    photo.isNOC ? 'col-span-2 md:col-span-1 ring-2 ring-gold/60' : ''
                  }`}
                  onClick={() => setLightboxPhoto(photo)}
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="font-display italic text-cream text-xs leading-tight">{photo.caption}</p>
                  </div>
                  {photo.isNOC && (
                    <div className="absolute top-2 left-2 px-2 py-1 rounded font-ui font-bold text-xs bg-gold text-ink">
                      NOC
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="font-body text-silver/40 text-xs mt-3 text-center italic">
              Click any photo to enlarge · Field visit: November 8, 2025 · Branch 0007-ANJANEYA NAGER
            </p>
          </div>
        </ScrollReveal>

        {/* Minutes of Meeting */}
        <ScrollReveal>
          <div className="mb-20">
            <h3 className="font-ui font-bold text-cream text-lg mb-6 tracking-wide flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              Meeting Notes
            </h3>
            <div
              className="rounded-2xl border p-8 flex flex-col md:flex-row items-start md:items-center gap-8"
              style={{ background: 'rgba(13,13,11,0.5)', borderColor: 'rgba(200,146,42,0.2)' }}
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(200,146,42,0.12)', border: '1px solid rgba(200,146,42,0.3)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div className="flex-1">
                <h4 className="font-ui font-bold text-cream text-base mb-2">Formal Meeting Notes — Documented Digitally</h4>
                <p className="font-body text-silver/70 text-sm leading-relaxed mb-4">
                  The Minutes of Meeting (MOM) from the field visit on November 8, 2025 were formally documented in a structured Word document — covering data access confirmation, business problem discovery, and agreed deliverables.
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono text-silver/50 mb-5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60"/>
                    Format: MS Word (.docx)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60"/>
                    Date: November 8, 2025
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/60"/>
                    Parties: Student · Branch Owner
                  </span>
                </div>
                <a
                  href="/assets/proof/MOM_Field_Notes_PureO_Naturals.docx"
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-ui font-medium transition-all duration-200"
                  style={{ background: 'rgba(200,146,42,0.15)', color: 'var(--gold)', border: '1px solid rgba(200,146,42,0.35)' }}
                  onMouseOver={e => (e.currentTarget.style.background = 'rgba(200,146,42,0.25)')}
                  onMouseOut={e => (e.currentTarget.style.background = 'rgba(200,146,42,0.15)')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download MOM Document
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Academic Credentials */}
        <ScrollReveal>
          <div>
            <h3 className="font-ui font-bold text-cream text-lg mb-6 tracking-wide flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--saffron)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              Academic Credentials
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'BDM Proposal', sub: 'Submitted October 2025 · IIT Madras BDM Program', link: '/assets/reports/22f1001645- BDM_Proposal_.pdf', linkLabel: 'Download PDF' },
                { title: 'BDM Midterm Report', sub: 'Submitted November 8, 2025 · IIT Madras BDM Program', link: '/assets/reports/22f1001645- Midterm_Report.pdf', linkLabel: 'Download PDF' },
              ].map((cred, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl border flex gap-5 items-center"
                  style={{ background: 'rgba(13,13,11,0.6)', borderColor: 'rgba(200,146,42,0.25)' }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(200,146,42,0.12)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-ui font-bold text-cream text-sm mb-1">{cred.title}</h4>
                    <p className="font-body text-silver/60 text-xs mb-3">{cred.sub}</p>
                    <a
                      href={cred.link}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-ui font-bold transition-all duration-200 hover:scale-105"
                      style={{ background: 'rgba(200,146,42,0.2)', color: 'var(--saffron)', border: '1px solid rgba(200,146,42,0.3)' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                      </svg>
                      {cred.linkLabel}
                    </a>
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
