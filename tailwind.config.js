const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['SF Mono', 'Roboto Mono', 'monospace', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        'dark-slate': '#495670',
        'lightest-navy': '#233554',
        'lightest-slate': '#ccd6f6',
      },
    },
  },
  plugins: [],
};
