/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm': '#FF6D02',
      },
      gridAutoRows: {
        // Defines a base height for the grid rows, replicating your SCSS setup
        'gallery': '150px',
      },
      keyframes: {
        // Defines the custom animation for the text overlay
        'move-down': {
          '0%': { top: '10%' },
          '50%': { top: '35%' },
          '100%': { top: '50%' },
        }
      },
      animation: {
        // Makes the keyframe usable as a class, e.g., animate-move-down
        'move-down': 'move-down 0.3s linear',
      }
    },
  },
  plugins: [],
}