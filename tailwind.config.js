/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing :{
        "100" :"30rem"
      },boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors :{
        "customcolor" : "f0f0f0"
      }
    },
  },
  plugins: [],
}


