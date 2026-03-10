import type { Metadata } from 'next'
import { Playfair_Display, DM_Mono, Lora, Syne } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Pure'O Naturals — BDM Capstone | IIT Madras Strategic Intelligence Report",
  description: "6-month POS data forensics of Pure'O Naturals Bangalore. 52,314 transactions, ₹2.54 crore analyzed. IIT Madras BDM Capstone 2025 by 22f1001645. ₹72–100L projected annual impact.",
  keywords: "IIT Madras, BDM Capstone, Pure O Naturals, data analysis, retail analytics, Bangalore",
  authors: [{ name: 'SVCAN', url: 'https://study.iitm.ac.in' }],
  openGraph: {
    title: "Pure'O Naturals — Strategic Intelligence Report",
    description: "52,314 transactions · ₹2.54 Crore · 3,247 SKUs · ₹72–100L Projected Annual Impact",
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pure'O Naturals BDM Capstone — IIT Madras",
    description: "6-month POS data forensics. ₹72–100L projected annual impact.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${dmMono.variable} ${lora.variable} ${syne.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
