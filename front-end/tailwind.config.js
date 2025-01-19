module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // All files in src with these extensions
    "./public/index.html", // Include your HTML file(s)
  ],
  theme: {
    extend: {
      animation: {
        gradient: "gradient 6s ease infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
      },
    },
  },
  plugins: [],
};
