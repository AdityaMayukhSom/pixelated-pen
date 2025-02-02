import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    rootTag: "body",
    head: {
      bodyAttrs: {
        class: ["min-h-svh", "scroll-smooth", "font-display"],
      },
    },
  },
  spaLoadingTemplate: false,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ["~/assets/css/main.css", "~/assets/css/highlightjs.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["@nuxt/fonts", "@nuxt/content"],
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
  content: {
    watch: {
      enabled: false,
    },
    build: {
      markdown: {
        highlight: {},
      },
    },
  },
});
