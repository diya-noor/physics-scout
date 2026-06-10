import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#F5A800',
          light: '#FFD166',
          dark: '#C47F00',
        },
        blue: {
          DEFAULT: '#1565C0',
          light: '#2196F3',
          dark: '#0D47A1',
        },
        background: '#060810',
        surface: {
          1: '#0D1117',
          2: '#141A24',
          3: '#1C2333',
        },
        text: {
          primary: '#E8EAF0',
          secondary: '#A8ABBE',
          muted: '#8B91A8',
        },
      },
      borderColor: {
        DEFAULT: 'rgba(245, 168, 0, 0.12)',
        hover: 'rgba(245, 168, 0, 0.30)',
        blue: 'rgba(33, 150, 243, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config
