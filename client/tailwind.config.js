/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bookingBlue : "#003b95"
      },
      maxWidth:{
        'container': '1200px',
      }
    },
  },
  plugins: [],
}

