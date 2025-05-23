// ✅ Correct tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "vegnar-green": "#006325",
        "vegnar-light": "#f0fdf4", // 🌿 Replace this with your actual brand green
      },
    },
  },
  plugins: [],
};
