import type { NitroFetchRequest } from "nitropack";

export const useFetchByBaseURL = async <T>(
  request: NitroFetchRequest,
  opts?: object,
): Promise<T> => {
  const config = useRuntimeConfig();

  try {
    return await $fetch<T>(request, {
      baseURL: config.public.baseURL,
      ...opts,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
