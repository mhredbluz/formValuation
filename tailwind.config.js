/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    './vueform.config.js', // or where `vueform.config.js` is located
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        // Definindo as cores do tema escuro
        primary: '#ffffff', // Cor primária para links e botões
        accent: '#262626', // Cor de destaque para elementos interativos
        dark: {
          bg: '#191919', // Cor de fundo
          text: '#ffffff', // Cor do texto
          border: '#4a5568', // Cor da borda
          placeholder: '#a0aec0', // Cor do espaço reservado
        }
      },
    },
  },
  plugins: [
    require('@vueform/vueform/tailwind'),
  ]
}