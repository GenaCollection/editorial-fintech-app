/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        manrope:  ['Manrope', 'sans-serif'],
      },
      keyframes: {
        'fade-in':    { from: { opacity: 0 }, to: { opacity: 1 } },
        'fade-up':    { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'none' } },
        'slide-up':   { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'none' } },
        'slide-down': { from: { opacity: 0, transform: 'translateY(-8px)' }, to: { opacity: 1, transform: 'none' } },
        'pulse-soft': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.6 } }
      },
      animation: {
        'fade-in':    'fade-in .2s ease-out both',
        'fade-up':    'fade-up .45s cubic-bezier(.2,.8,.2,1) both',
        'slide-up':   'slide-up .3s cubic-bezier(.2,.8,.2,1) both',
        'slide-down': 'slide-down .2s ease-out both',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
