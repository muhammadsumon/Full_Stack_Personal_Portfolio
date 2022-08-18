module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { min: "480px" },
      md: { min: "768px" },
      lg: { min: "992px" },
      xl: { min: "1200px" }
    },
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
      jost: ["Jost", "sans-serif"],
      mulish: ["Mulish", "sans-serif"],
    },
    extend: {
      screens: {
        smMax: { max: "479px" },
        mdMax: { max: "767px" },
        lgMax: { max: "991px" }
      },
      colors: {
        primary: "#19A74B",
        secondary: "#333333",
        black85: "rgba(0, 0, 0, 0.81)",
        gray: {
          50: "rgba(0, 0, 0, 0.58)",
          100: "#CACBD5",
          400: "rgba(51, 51, 51, 0.7)",
          900: "#333333",
        },
        green: {
          40: "rgba(141, 255, 146, 0.55)",
          50: "#9effa8",
          100: "#85ff91",
          200: "#19a74b",
        },
        blue: {
          400: "#3F4DD1",
        },
      },
      boxShadow: {
        skill: "0px 1.5px 3.5px rgba(14, 38, 255, 0.12)",
        service: "0px 1px 8px rgba(0, 0, 0, 0.11)",
        portfolio: "0px 16.5px 20.9px 4.4px rgba(0, 0, 0, 0.04)"
      },
    },
  },
  darkMode: "class",
  plugins: [require('tailwind-scrollbar-hide')],
};
