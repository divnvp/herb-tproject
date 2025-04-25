export const useFetchByBaseURL = async <T>(
  request: NitroFetchRequest,
  opts?: FetchOptions,
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
