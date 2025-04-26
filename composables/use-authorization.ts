import { Method } from "#shared/enum/method.enum";
import type { AccessToken, AuthData } from "#shared/types/auth";
import type { Error } from "#shared/types/error";
import { ApiStatus } from "#shared/enum/api-status";

// Сервис для работы с API авторизации
export const useAuthorization = () => {
  // Флаг для определения типа запроса: с авторизацией или без
  const isAuth = ref(false);
  const toast = useToast();

  /**
   * Метод для инициализации авторизации.
   * Если пользователь авторизован или выполнил запрос без авторизации, то токен не обновляется
   */
  const initAuth = async () => {
    if (localStorage.getItem("accessToken") || isAuth.value === false) {
      return;
    }

    try {
      await refresh();
    } catch (e) {
      toast.add({
        title: "Ошибка",
        color: "error",
        description: ((e as Error).data?.detail as string) ?? "",
      });
    }
  };

  // Метод для авторизации пользователя в системе
  const onAuth = async (body: AuthData) => {
    try {
      await $fetch<AccessToken>("/api/token/", {
        method: Method.POST,
        body,
      }).then((result) => {
        localStorage.setItem("accessToken", result.access);
        isAuth.value = true;
      });
    } catch (e) {
      toast.add({
        title: "Ошибка",
        color: "error",
        description: ((e as Error).data?.detail as string) ?? "",
      });
    }
  };

  // Метод для обновления токена авторизации
  const refresh = async () => {
    try {
      await $fetch<AccessToken | null>("/api/token/refresh/", {
        method: Method.POST,
      }).then((result) => {
        if (result?.access) {
          localStorage.removeItem("accessToken");
          localStorage.setItem("accessToken", result.access);
          isAuth.value = true;
        }
      });
    } catch {
      navigateTo("/auth");
    }
  };

  /**
   * Метод для работы с API выхода пользователя из системы
   * Когда метод возвращает 401 (Unauthorized), отправляется запрос на обновление токена
   */
  const logout = async () => {
    try {
      await logoutAPI();
    } catch (e) {
      if ((e as Error).status === ApiStatus.Unauthorized) {
        await refresh();
      } else {
        toast.add({
          title: "Ошибка",
          color: "error",
          description: ((e as Error).data?.detail as string) ?? "",
        });
      }
    }
  };

  // Метод для выхода пользователя из системы
  const logoutAPI = async () => {
    await $fetch("/api/logout/", {
      method: Method.GET,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    localStorage.removeItem("accessToken");
    isAuth.value = false;
  };

  return {
    isAuthenticated: computed(() => !!localStorage.getItem("accessToken")),
    initAuth,
    onAuth,
    logout,
    refresh,
  };
};
