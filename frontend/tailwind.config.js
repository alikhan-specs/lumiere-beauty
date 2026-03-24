export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#fdfcfa',
          100: '#faf7f2',
          200: '#f6f2ec',
          300: '#ede5d8',
          400: '#dfd2be',
          500: '#cdbea1',
          600: '#b09a7a',
          DEFAULT: '#f6f2ec',
        },
        burgundy: {
          50:  '#fdf2f5',
          100: '#fbe0e8',
          200: '#f5b8cb',
          300: '#e8849f',
          400: '#d45a78',
          500: '#b83c5c',
          600: '#8b2e4e',
          700: '#6b1e38',
          800: '#4e1228',
          900: '#340a1a',
          DEFAULT: '#8b2e4e',
        },
        gold: {
          50:  '#fdf9f3',
          100: '#f9f0e0',
          200: '#f0dab8',
          300: '#e3c08a',
          400: '#cfa460',
          500: '#a67c52',
          600: '#7f5c38',
          700: '#5e4228',
          800: '#3e2a18',
          900: '#24170c',
          DEFAULT: '#a67c52',
        },
        ink: {
          50:  '#f5f2ef',
          100: '#e8e0d8',
          200: '#c8b8aa',
          300: '#a08878',
          400: '#786050',
          500: '#4e3c30',
          600: '#2e2018',
          700: '#1e150f',
          800: '#18110e',
          900: '#100a08',
          DEFAULT: '#18110e',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Jost"', 'system-ui', 'sans-serif'],
        italic:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      animation: {
        'fade-up':  'fadeUp 0.72s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':  'fadeIn 0.45s ease forwards',
        'shimmer':  'shimmer 2.2s infinite',
        'marquee':  'marquee 50s linear infinite',
        'spin':     'spin 0.8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      maxWidth: {
        '7xl': '80rem',
        '8xl': '90rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
}
