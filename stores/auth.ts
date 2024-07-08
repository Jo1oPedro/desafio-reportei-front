import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "myAuthStore",
  actions: {
    getAuthenticatedUser() {
      return useCookie("authenticatedUser").value;
    },
    logUserOut() {
      const token = useCookie("token");
      token.value = null;
      const authenticatedUser = useCookie("authenticatedUser");
      authenticatedUser.value = null;
      const total_public_repositories = useCookie("total_public_repositories");
      total_public_repositories.value = null;
      useRouter().push("/login");
    },
  },
});
