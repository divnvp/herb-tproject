export const useAuthorization = () => {
  const localAccessToken = useState<string>("accessToken", () => "");

  const initializeAuth = async () => {
    if (localAccessToken.value) return;
  };

  return {
    isAuthenticated: computed(() => !!localAccessToken.value),
    initializeAuth,
  };
};
