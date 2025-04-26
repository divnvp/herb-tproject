// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
  ],

  css: ["/assets/css/main.css"],
  nitro: {
    devProxy: {
      "/api/": {
        target: "https://herb.tproject.su/api/",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
        },
        prependPath: true,
        changeOrigin: true,
      },
    },
  },
  routeRules: {
    "/api/**": { proxy: { to: "https://herb.tproject.su/api/**" } },
  },
});
