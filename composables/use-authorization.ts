import { useFetchByBaseURL } from "~/composables/fetch-by-base-url";
import { Method } from "#shared/enum/method.enum";
import type { AccessToken, AuthData } from "#shared/types/auth";
import { getCookie } from "#shared/utils/get-cookie";
import { setCookie } from "#shared/utils/set-cookie";

export const useAuthorization = () => {
  const initAuth = async () => {
    if (getCookie("accessToken")) {
      return;
    }

    try {
      await refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const onAuth = async (body: AuthData) => {
    try {
      await useFetchByBaseURL<AccessToken>("token/", {
        method: Method.POST,
        body,
      }).then((result) => {
        setCookie("accessToken", result.access);
      });
    } catch (e) {
      console.log(e);
    }
  };

  const refresh = async () => {
    try {
      await useFetchByBaseURL<AccessToken | null>("token/refresh/", {
        method: Method.POST,
      }).then((result) => {
        if (result?.access) {
          setCookie("accessToken", "", { expires: 0 });
          setCookie("accessToken", result.access);
        }
      });
    } catch {
      await logout();
    }
  };

  const logout = async () => {
    try {
      await useFetchByBaseURL("logout/", {
        method: Method.POST,
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        credentials: "include",
      });
      setCookie("accessToken", "", { expires: 0 });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    isAuthenticated: computed(() => !!getCookie("accessToken")),
    initAuth,
    onAuth,
    logout,
    refresh,
  };
};
