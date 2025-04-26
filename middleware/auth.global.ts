import { useAuthorization } from "~/composables/use-authorization";

export default defineNuxtRouteMiddleware(async (to) => {
  // Пропустить проверку на сервере, так как нужна только клиентская сторона
  if (import.meta.server) {
    return;
  }

  const { isAuthenticated, initAuth } = useAuthorization();
  await initAuth();

  if (!isAuthenticated.value && to.path !== "/auth") {
    return navigateTo("/auth");
  }
});
