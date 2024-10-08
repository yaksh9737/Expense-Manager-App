module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#1E1E2F', // Main background color
        'modal-bg': '#555577', // Modals/Boxes background color
        'title-gold': '#FFD700', // Titles color
        'button-border': '#1E90FF', // Outlined buttons border color
        'button-hover-bg': '#1E90FF', // Outlined buttons hover background color
        'hover-text': '#1E90FF', // Hover text color
      },
    },
  },
  plugins: [],
};