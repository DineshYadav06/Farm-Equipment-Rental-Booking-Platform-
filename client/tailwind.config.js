/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#2ecc71',
          blue:  '#3498db',
        },
        dark: {
          bg:      '#121212',
          surface: '#1e1e1e',
        },
        light: {
          bg:      '#f4f6f8',
          surface: '#ffffff',
        },
        accent:  '#f1c40f',
        danger:  '#e74c3c',
        success: '#2ecc71',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      backdropBlur: {
        glass: '15px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.2)',
        card:  '0 4px 15px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
