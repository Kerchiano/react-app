/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        labelCol: "#797878",
      },
      borderRadius: {
        borderCircle: "50px",
        borderFourth: "4px",
      },
      minWidth: {
        middle: '60%'
      },
      maxWidth: {
        middle: '60%'
      },
      spacing: {
        'bot-20': '-20px'
      },
      flexBasis: {
        '30%': '30%',
        '45%': '45%',
      },
      padding: {
        '1px': '1px'
      },
      screens: {
        'xs': '480px',
        'xm': '300px',
        'x-zero': '0px',
      }
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
