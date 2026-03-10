'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const navLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#problems', label: 'Problems' },
  { href: '#methodology', label: 'Methodology' },
  { href: '#analysis', label: 'Analysis' },
  { href: '#strategy', label: 'Strategy' },
  { href: '#impact', label: 'Impact' },
  { href: '#proof', label: 'Proof' },
  { href: '#downloads', label: 'Downloads' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-frosted' : 'nav-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 group">
          <Image
            src="/assets/logo/pureo-logo.svg"
            alt="Pure'O Naturals"
            width={110}
            height={36}
            className="h-9 w-auto brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
            priority
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-xs font-ui font-semibold tracking-widest uppercase text-silver/70 hover:text-saffron transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#downloads"
          className="hidden lg:flex items-center gap-2 px-4 py-2 border border-gold/40 rounded-full text-xs font-ui font-bold tracking-wide text-gold hover:bg-gold hover:text-ink transition-all duration-200"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          Download Report
        </a>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-silver hover:text-gold transition-colors p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            {menuOpen ? (
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            ) : (
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-ink/95 backdrop-blur-lg border-t border-gold/10 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-ui font-semibold tracking-wider uppercase text-silver hover:text-saffron border-b border-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
