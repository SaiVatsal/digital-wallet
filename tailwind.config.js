/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fintech: {
          950: '#09090b',
          900: '#121215',
          800: '#18181b',
          700: '#27272a',
          neon: '#22c55e',
          lime: '#4ade80',
          emerald: '#10b981',
          accent: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
