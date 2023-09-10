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
      },
    },
  },
  plugins: [],
};
