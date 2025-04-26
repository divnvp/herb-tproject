export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast();

  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    toast.add({
      title: "Ошибка",
      description: info,
      color: "error",
    });
  };

  nuxtApp.hook("vue:error", (error, instance, info) => {
    toast.add({
      title: "Ошибка",
      description: info,
      color: "error",
    });
  });
});
