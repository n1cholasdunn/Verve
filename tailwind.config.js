/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    // './app/screens/*.{js,jsx,ts,tsx}', old route for nested screen folder
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
