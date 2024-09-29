/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {colors: {
      '0077b6': '#0077b6', // Add your custom color here
    },
    container:{
      padding:'10rem'
    }
  }
  },
  plugins: [],
}

