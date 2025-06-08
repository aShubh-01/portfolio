/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', 'sans-serif'],
        'jetbrains': ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        'primary': {
          50: '#f0f4ff',
          100: '#e0e7ff',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
        },
        'secondary': {
          500: '#764ba2',
          600: '#6b46c1',
          700: '#553c9a',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(90deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
          '75%': { transform: 'translateY(-10px) rotate(270deg)' },
          '100%': { transform: 'translateY(0px) rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}