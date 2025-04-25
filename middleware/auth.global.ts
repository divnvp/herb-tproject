import { useAuthorization } from "~/composables/use-authorization";

export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, initializeAuth } = useAuthorization();
  await initializeAuth();

  if (!isAuthenticated.value && to.path !== "/auth") {
    return navigateTo("/auth");
  }
});
