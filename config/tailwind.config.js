/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/views/**/*.{html.erb,html.haml,html.slim}',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-background': "url('/assets/background.jpeg')",
      },
    },
  },
  plugins: [],
}