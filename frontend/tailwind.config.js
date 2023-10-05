const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#282828', // dark
          text: '#ffffff',    // text-white
        },
      },
    },
  },
  plugins: [],
});