/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,html}'],
  future: {
    // Su touch (mobile) non esiste un vero hover: toccando un link, il
    // browser applica comunque lo stato :hover e lo lascia "incastrato"
    // finché non si tocca altrove — es. il tasto social restava bianco
    // al ritorno da Instagram/Facebook. Con questo flag le utility hover:
    // si attivano solo sui dispositivi con hover reale (mouse).
    hoverOnlyWhenSupported: true
  },
  theme: {
    extend: {
      colors: {
        ink: '#1a1710',
        paper: '#f6f1e6',
        paper2: '#efe7d6',
        tomato: {
          DEFAULT: '#b8321c',
          bright: '#d8481f',
          deep: '#7a1f12'
        },
        olive: {
          DEFAULT: '#4b5738',
          light: '#7c8a5e',
          dark: '#333c26'
        },
        gold: '#c19a4b',
        placeholder: {
          DEFAULT: '#2f5b3f',
          light: '#3c6e4c',
          dark: '#20402c'
        }
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif']
      },
      letterSpacing: {
        widest2: '0.35em'
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
};
