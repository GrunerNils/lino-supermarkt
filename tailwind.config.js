/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#FFED00',
        'brand-yellow-dark': '#F0DC00',
        'brand-red': '#E2001A',
        'brand-green': '#4CAF50',
        'brand-green-dark': '#388E3C',
        'text-dark': '#1A1A1A',
        'bg-page': '#F5F5F5',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
