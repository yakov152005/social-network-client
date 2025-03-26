/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            keyframes: {
                shine: {
                    '0%': { left: '-75%' },
                    '50%': { left: '125%' },
                    '100%': { left: '125%' },
                },
            },
            animation: {
                shine: 'shine 5s ease-in-out infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
        },
    },
    corePlugins: {
        preflight: true,
    },

    plugins: [

        plugin(function ({ addBase }) {

            addBase({

                'img': {
                    margin: 'initial',
                    padding: 'initial',
                    display: 'inline',
                    verticalAlign: 'initial',
                    maxWidth: 'none',
                    height: 'auto',
                },

                'button': {
                    all: 'unset',
                },

                'svg, img, emoji, video': {
                    verticalAlign: 'initial',
                },

                'html, body': {
                    margin: '0',
                    padding: '0',
                },

                'h1, h2, h3, h4, h5, h6, p': {
                    margin: 'initial',
                    padding: 'initial',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                },

                'input, textarea, select, button': {
                    margin: 'initial',
                    padding: 'initial',
                    border: 'initial',
                    background: 'initial',
                    color: 'inherit',
                    font: 'inherit',
                },
            });
        }),
    ],
};