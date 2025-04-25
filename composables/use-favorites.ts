import { useFetchByBaseURL } from "~/composables/fetch-by-base-url";
import { Method } from "#shared/enum/method.enum";

export const useFavorites = () => {
  const getAllFavorites = async (): Promise<Pagination<Favorite>> => {
    try {
      return await useFetchByBaseURL<Pagination<Favorite>>("favorites/", {
        method: Method.GET,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      return null;
    }
  };

  return {
    getAllFavorites,
  };
};
