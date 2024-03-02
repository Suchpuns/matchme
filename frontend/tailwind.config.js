/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-cream': '#FBEED3',
        'card-blue' : 'rgba(179, 227, 242, 0.7)',
        'card-orange' : 'rgba(244, 203, 154, 0.7)',
        'card-green' : 'rgba(150, 234, 198, 0.7)',
      }
    },
  },
  plugins: [],
}

