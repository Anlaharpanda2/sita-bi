/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#800000',
          '50': '#f2e6e6',
          '100': '#e6cccc',
          '200': '#d9b3b3',
          '300': '#cc9999',
          '400': '#bf8080',
          '500': '#b36666',
          '600': '#a64d4d',
          '700': '#993333',
          '800': '#8c1a1a',
          '900': '#800000',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out 1.5s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
