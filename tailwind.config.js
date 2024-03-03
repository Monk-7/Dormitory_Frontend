const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        prim: "#FFD900",
        prim2: "#E4BD00",
        a: "#000000",
        sec: "#FFA400",
        sec2: "#E88E00",
        b: "#5D3F18",
        som: "#FFA551",
        som2: "#EA8F45",
        c: "#190B02",
        navy: "#060023",
        navy2: "#454364",
        d: "#ffffff",
        tao: "#E8E8E8",
        tao2: "#B5B5B5",
        e: "#4F4F4F",
        success: "#00A96E",
        clock: "#FFA400",
      },
    },
    fontFamily: { sans: ["Montserrat", "monospace"] },
  },
  plugins: [],
});
