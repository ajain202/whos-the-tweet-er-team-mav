const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['SF Mono', 'Roboto Mono', 'monospace', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        'lightest-navy': '#233554',
        'lightest-slate': '#ccd6f6',
      },
    },
  },
  plugins: [],
};
