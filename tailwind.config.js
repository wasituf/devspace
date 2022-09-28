/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /(bg)-(yellow|blue|green|purple|red)-./,
    },
  ],
  theme: {
    extend: {
      screens: {
        md: '1000px',
        lg: '1200px',
      },
    },
  },
  plugins: [],
}
