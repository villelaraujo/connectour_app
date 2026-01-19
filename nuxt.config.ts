// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  serverDir: 'app/server',
  app: {
    head: {
      title: 'Connectour',
      meta: [
        { name: 'description', content: 'Make your connection worldwide'},
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico'},
        { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
        { href: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet'}, 
      ]
    }
  }
})
