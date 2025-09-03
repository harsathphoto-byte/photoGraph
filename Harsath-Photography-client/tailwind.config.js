/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-gold': '#B8860B',
        'primary-dark': '#111111',
        'gold': {
          400: '#B8860B',
          500: '#c1922f',
        },
        'dark': {
          900: '#111111',
          800: '#1a1a1a',
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      boxShadow: {
        'gold': '0 10px 30px rgba(214, 163, 62, 0.3)',
        'gold-lg': '0 15px 35px rgba(214, 163, 62, 0.2)',
      },
    },
  },
  plugins: [],
}
