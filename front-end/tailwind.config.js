/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure this path matches your project structure
  theme: {
    extend: {
      animation: {
        flow: "flow 10s ease-in-out infinite",
        'bounce-slow': "bounce 6s infinite",
        'spin-slow': "spin 8s linear infinite",
        fadeIn: "fadeIn 2s ease-out",
      },
      keyframes: {
        flow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
