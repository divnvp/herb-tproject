import { useAuthorization } from "~/composables/use-authorization";

export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, initAuth } = useAuthorization();
  await initAuth();

  if (!isAuthenticated.value && to.path !== "/auth") {
    return navigateTo("/auth");
  }
});
