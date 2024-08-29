/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#f8f9fa',
        primary: '#007bff',
        secondary: '#6c757d',
        success: '#28a745',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8',
        dark: '#343a40',
        teal: {
          light: '#e0f2f1',
          DEFAULT: '#009688',
          dark: '#004d40',
        },
      },
    },
  },
  plugins: [],
}
