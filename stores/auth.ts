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
      useRouter().push("/login");
    },
  },
});
