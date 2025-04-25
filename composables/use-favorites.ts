import { Method } from "#shared/enum/method.enum";

export const useFavorites = () => {
  const getAllFavorites = async () => {
    try {
      await useFetchByBaseURL("favorites/", {
        method: Method.GET,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getAllFavorites,
  };
};
