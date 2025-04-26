/**
 * Метод для отправки запросов через заданный baseURL вместо localhost.
 * Использовать вместо $fetch / useFetch
 * @param request - путь запроса, передаётся в виде строки
 * @param opts - параметры запроса, передаются в виде объекта
 */
export const useFetchByBaseURL = async <T>(
  request: string,
  opts?: Parameters<typeof $fetch<T>>[1],
): Promise<T> => {
  const config = useRuntimeConfig();

  try {
    return await $fetch<T>(request, {
      baseURL: config.public.apiBase,
      ...opts,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
