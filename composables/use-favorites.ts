import { useFetchByBaseURL } from "~/composables/fetch-by-base-url";
import { Method } from "#shared/enum/method.enum";
import { getCookie } from "#shared/utils/get-cookie";
import type { Favorite } from "#shared/types/favorite";
import type { Pagination } from "#shared/types/pagination";
import { useAuthorization } from "~/composables/use-authorization";
import type { Error } from "#shared/types/error";
import { ApiStatus } from "#shared/enum/api-status";

// Сервис для работы с API "Избранное"
export const useFavorites = () => {
  const { refresh } = useAuthorization();

  /**
   * Метод для работы с API "Избранное"
   * Когда метод возвращает 401 (Unauthorized), отправляется запрос на обновление токена
   */
  const getAllFavorites = async (): Promise<Pagination<Favorite> | null> => {
    try {
      return await getFavoritesAPI();
    } catch (error: unknown) {
      if ((error as Error).status === ApiStatus.Unauthorized) {
        await refresh();
        return await getFavoritesAPI();
      }
      return null;
    }
  };

  // Метод для получения всех данных об избранном
  const getFavoritesAPI = async (): Promise<Pagination<Favorite>> => {
    return await useFetchByBaseURL<Pagination<Favorite>>("favorites/", {
      method: Method.GET,
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  };

  return {
    getAllFavorites,
  };
};
