import { Method } from "#shared/enum/method.enum";
import type { Favorite } from "#shared/types/favorite";
import type { Pagination } from "#shared/types/pagination";
import { useAuthorization } from "~/composables/use-authorization";
import type { Error } from "#shared/types/error";
import { ApiStatus } from "#shared/enum/api-status";

// Сервис для работы с API "Избранное"
export const useFavorites = () => {
  const { refresh } = useAuthorization();
  const toast = useToast();

  /**
   * Метод для работы с API "Избранное"
   * Когда метод возвращает 401 (Unauthorized), отправляется запрос на обновление токена
   */
  const getAllFavorites = async (): Promise<Pagination<Favorite> | null> => {
    try {
      return await getFavoritesAPI();
    } catch (e: unknown) {
      if ((e as Error).status === ApiStatus.Unauthorized) {
        await refresh();
        return await getFavoritesAPI();
      }
      toast.add({
        title: "Ошибка",
        color: "error",
        description: ((e as Error).data?.detail as string) ?? "",
      });
      return null;
    }
  };

  // Метод для получения всех данных об избранном
  const getFavoritesAPI = async (): Promise<Pagination<Favorite>> => {
    return await $fetch<Pagination<Favorite>>("/api/favorites/", {
      method: Method.GET,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  };

  return {
    getAllFavorites,
  };
};
