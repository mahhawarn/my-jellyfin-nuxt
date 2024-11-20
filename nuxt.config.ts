import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
    devtools: {enabled: false},

    app: {
        layoutTransition: {
            name: 'layout',
            mode: 'default',
        },
    },

    modules: ['@nuxtjs/tailwindcss'],
    css: ["bootstrap/dist/css/bootstrap.min.css"],
    vite: {
        plugins: [svgLoader()],
    },

    routeRules: {
        '/': {prerender: true},
    },

    compatibilityDate: '2024-09-28',
});