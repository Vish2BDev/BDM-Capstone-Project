/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0D0D0B',
        cream: '#F5F0E8',
        parchment: '#EDE5D0',
        forest: '#1A3A2A',
        moss: '#2D5A3D',
        sage: '#4A7C5E',
        fern: '#6B9E7A',
        gold: '#C8922A',
        honey: '#E8A73A',
        saffron: '#F5B84A',
        terracotta: '#C45A3A',
        rust: '#9E3A22',
        slate: '#4A5568',
        silver: '#A0AEC0',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        lora: ['Lora', 'Georgia', 'serif'],
        mono: ['DM Mono', 'JetBrains Mono', 'Fira Code', 'monospace'],
        syne: ['Syne', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'count-up': 'countUp 2s ease-out forwards',
        'slide-in': 'slideIn 0.8s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(40px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        },
        slideIn: {
          'from': { transform: 'scaleX(0)', transformOrigin: 'left' },
          'to': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
