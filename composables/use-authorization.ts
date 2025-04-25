import { useFetchByBaseURL } from "~/composables/fetch-by-base-url";
import { Method } from "#shared/enum/method.enum";
import type { AuthData } from "#shared/types/auth";

export const useAuthorization = () => {
  const accessToken = ref("");
  const refreshToken = ref("");

  const initAuth = async () => {
    if (accessToken.value) {
      return;
    }

    try {
      await refresh();
    } catch {
      console.log(e);
    }
  };

  const onAuth = async (body: AuthData) => {
    try {
      await useFetchByBaseURL("token/", {
        method: Method.POST,
        body,
      }).then((result) => (accessToken.value = result.data.value.access));
    } catch (e) {
      console.log(e);
    }
  };

  const refresh = async () => {
    if (refreshToken.value) {
      return;
    }

    try {
      await useFetchByBaseURL("token/refresh/", {
        method: Method.POST,
      }).then((result) => (accessToken.value = result.data.value));
    } catch {
      await logout();
    }
  };

  const logout = async () => {
    try {
      await useFetchByBaseURL("logout/", {
        method: Method.POST,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    isAuthenticated: computed(() => !!accessToken.value),
    initAuth,
    onAuth,
    logout,
  };
};
