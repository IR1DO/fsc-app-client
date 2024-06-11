/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        noto_serif: [
          '"Noto Serif Simplified Chinese"',
          ...defaultTheme.fontFamily.serif,
        ],
        noto_sans: [
          '"Noto Sans Simplified Chinese"',
          ...defaultTheme.fontFamily.mono,
        ],
        msz: ['"Ma Shan Zheng"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [daisyui],
};
