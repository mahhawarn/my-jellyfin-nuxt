/** @type {import('tailwindcss').Config} */
module.exports = {
  // tailwindを適用したいファイル群を指定
  content: [],
  theme: {
    extend: {
      spacing: {
        '1/10': '10%',
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      font1: ['font1', 'Arial'],
      gfont: ['gfont', '源ノ角ゴシック JP'],
    },
  },

  plugins: [require('@tailwindcss/typography')],
};
