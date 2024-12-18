/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {

    colors: {

      green: {
        50:'#f4f9f0',
        100: '#F5F8EF',
        200:'#91B683',
        300:'#526E48',
        400:'#22371B',
        500:'#070F04'
      },
    },
    extend: {
      colors: {

        green: {
          50:'#f4f9f0',
          100: '#F5F8EF',
          200:'#91B683',
          300:'#526E48',
          400:'#22371B',
          500:'#070F04'
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

