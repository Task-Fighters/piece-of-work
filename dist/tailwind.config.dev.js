"use strict";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif']
    },
    extend: {
      width: {
        128: '32%',
        129: '49%'
      },
      opacity: {
        10: '.10'
      }
    }
  },
  plugins: [require('tw-elements/dist/plugin.cjs')],
  darkMode: 'class'
};