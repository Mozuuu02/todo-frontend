/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // ✅ this is required
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
