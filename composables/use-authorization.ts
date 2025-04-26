import { useFetchByBaseURL } from "~/composables/fetch-by-base-url";
import { Method } from "#shared/enum/method.enum";
import type { AccessToken, AuthData } from "#shared/types/auth";
import { getCookie } from "#shared/utils/get-cookie";
import { setCookie } from "#shared/utils/set-cookie";

// Сервис для работы с API авторизации
export const useAuthorization = () => {
  // Флаг для определения типа запроса: с авторизацией или без
  const isAuth = ref(false);

  /**
   * Метод для инициализации авторизации.
   * Если пользователь авторизован или выполнил запрос без авторизации, то токен не обновляется
   */
  const initAuth = async () => {
    if (getCookie("accessToken") || isAuth.value === false) {
      return;
    }

    try {
      await refresh();
    } catch (e) {
      console.log(e);
    }
  };

  // Метод для авторизации пользователя в системе
  const onAuth = async (body: AuthData) => {
    try {
      await useFetchByBaseURL<AccessToken>("token/", {
        method: Method.POST,
        body,
      }).then((result) => {
        setCookie("accessToken", result.access);
        isAuth.value = true;
      });
    } catch (e) {
      console.log(e);
    }
  };

  // Метод для обновления токена авторизации
  const refresh = async () => {
    try {
      await useFetchByBaseURL<AccessToken | null>("token/refresh/", {
        method: Method.POST,
      }).then((result) => {
        if (result?.access) {
          setCookie("accessToken", "", { expires: 0 });
          setCookie("accessToken", result.access);
          isAuth.value = true;
        }
      });
    } catch {
      await logout();
    }
  };

  // Метод для выхода пользователя из системы
  const logout = async () => {
    try {
      await useFetchByBaseURL("logout/", {
        method: Method.GET,
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      setCookie("accessToken", "", { expires: 0 });
      isAuth.value = false;
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
