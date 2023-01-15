/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "360px",
        smd: "420px",
      },
      fontFamily: {
        body: ["Sora", "sans-serif"],
        main: ["Ubuntu", "sans-serif"],
      },
      width: {
        1600: "1600px",
        400: "400px",
        450: "450px",
        210: "210px",
        550: "550px",
        260: "260px",
        650: "650px",
      },
      height: {
        600: "600px",
        280: "280px",
        900: "900px",
        458: "458px",
      },
      top: {
        "50%": "50%",
      },
      backgroundColor: {
        primary: "#F1F1F2",
        blur: "#030303",
      },
      colors: {
        primary: "rgb(22, 24, 35)",
        gray: {
          light: "#E6E6E6",
          dark: "#5B5861",
        },
        pink: "#E9CCBE",
        green: {
          prime: "#556b2f",
        },
      },
      height: {
        "88vh": "88vh",
      },
      fontSize: {
        title: "16px",
      },
      backgroundImage: {
        "blurred-img":
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaaJ7s4lqcBF4IDROVPzrlL5fexcwRmDlnuEYQenWTt1DejFY5kmYDref2a0Hp2eE4aw&usqp=CAU')",
      },
    },
  },
  plugins: [],
};
