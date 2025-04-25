import { useFetchByBaseURL } from "~/composables/fetch-by-base-url";
import { Method } from "#shared/enum/method.enum";
import { getCookie } from "#shared/utils/get-cookie";
import type { Favorite } from "#shared/types/favorite";
import type { Pagination } from "#shared/types/pagination";
import { useAuthorization } from "~/composables/use-authorization";
import type { Error } from "#shared/types/error";
import { ApiStatus } from "#shared/enum/api-status";

export const useFavorites = () => {
  const { refresh } = useAuthorization();
  const getAllFavorites = async (): Promise<Pagination<Favorite> | null> => {
    try {
      return await getFavorites();
    } catch (error: unknown) {
      if ((error as Error).status === ApiStatus.Unauthorized) {
        await refresh();
        return await getFavorites();
      }
      return null;
    }
  };

  const getFavorites = async (): Promise<Pagination<Favorite>> => {
    return await useFetchByBaseURL<Pagination<Favorite>>("favorites/", {
      method: Method.GET,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  };

  return {
    getAllFavorites,
  };
};
