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
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://herb.tproject.su/api/",
    },
  },
});
