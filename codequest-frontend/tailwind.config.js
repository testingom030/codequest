/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {      colors: {
        'stackoverflow-orange': '#F48024',
        'stackoverflow-black': '#242729',
        'stackoverflow-gray': '#6A737C',
        'stackoverflow-blue': '#0077CC',
        'stackoverflow-powder': '#E1ECF4',
        'stackoverflow-red': '#C91D2E',
        'stackoverflow-green': '#48A868',
        'stackoverflow-yellow': '#FFF8DC',
        'stackoverflow-light': '#F1F2F3',
        'stackoverflow-border': '#D6D9DC',
        'stackoverflow-link': '#0074CC',
        'stackoverflow-hover': '#0A95FF',
        'stackoverflow-visited': '#0063BF',
        'stackoverflow-btn': {
          DEFAULT: '#0A95FF',
          hover: '#0074CC',
          dark: '#0063BF',
        },
      },      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Liberation Sans', 'sans-serif'],
      },
      fontSize: {
        xs: ['11px', '13px'],
        sm: ['12px', '15px'],
        base: ['13px', '17px'],
        lg: ['15px', '19px'],
        xl: ['17px', '22px'],
        '2xl': ['19px', '24px'],
        '3xl': ['21px', '27px'],
      },      boxShadow: {
        'stackoverflow': '0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0,0%,0%,0.05), 0 2px 8px hsla(0,0%,0%,0.05)',
        'stackoverflow-button': 'inset 0 1px 0 0 hsla(0,0%,100%,0.4)',
        'stackoverflow-card': '0 1px 3px #0000000f, 0 4px 6px #0000000f',
      },
      spacing: {
        'stackoverflow-header': '50px',
        'stackoverflow-sidebar': '164px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
