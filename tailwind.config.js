/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        navy: 'rgb(var(--c-navy) / <alpha-value>)',
        sun: 'rgb(var(--c-sun) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        gold: 'rgb(var(--c-gold) / <alpha-value>)',
        sand: 'rgb(var(--c-sand) / <alpha-value>)',
        jungle: 'rgb(var(--c-jungle) / <alpha-value>)',
        wa: 'rgb(var(--c-wa) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        body: ['Sora', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      fontWeight: {
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
      },
      boxShadow: {
        card: '0 18px 50px -20px rgba(0,0,0,0.75)',
        lift: '0 30px 60px -25px rgba(0,0,0,0.85)',
        glow: '0 0 0 1px rgba(201,162,39,0.4), 0 20px 50px -20px rgba(255,196,0,0.25)',
      },
      keyframes: {
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        pulseSoft: {
          '0%,100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(37,211,102,0.55)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 14px rgba(37,211,102,0)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'spin-slow': 'spinSlow 30s linear infinite',
        'pulse-soft': 'pulseSoft 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
