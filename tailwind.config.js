module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      fontFamily: {
        noto: ['Noto Sans TC', 'sans-serif'],
      },
      colors: {
        primary: '#FFD370',
        dark: '#333333',
        light: '#9F9A91',
      },
      backgroundImage: {
        logo: "url('/src/images/logo.svg')",
        linear:
          'linear-gradient(173deg, #FFD370 5.12%, #FFD370 53.33%, #FFD370 53.44%, #FFF 53.45%, #FFF 94.32%)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
