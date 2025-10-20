/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'cyan-primary': '#7CD9CE',
        'cyan-secondary': '#2E7588',
        'cyan-tertiary': '#061C36'
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
      keyframes: {
        'animated-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },

        'animated-gradient-reverse': {
          '0%': { backgroundPosition: '100% 50%' }, // Começa na direita
          '50%': { backgroundPosition: '0% 50%' },   // Vai para a esquerda
          '100%': { backgroundPosition: '100% 50%' }, // Volta
        },
      },
      animation: {
        gradient: 'animated-gradient 20s ease infinite',
      },
    },
  },
  plugins: [],
}
