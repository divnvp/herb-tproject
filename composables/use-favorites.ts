import { Method } from "#shared/enum/method.enum";

export const useFavorites = () => {
  const getAllFavorites = async () => {
    try {
      await useFetchByBaseURL("favorites/", {
        method: Method.GET,
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
        credentials: "include",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getAllFavorites,
  };
};
