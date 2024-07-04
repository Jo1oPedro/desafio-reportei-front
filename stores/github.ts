import { defineStore } from "pinia";

export const useGithubStore = defineStore({
  id: "myGithubStore",
  state: () => ({
    loading: false,
    error: "",
  }),
  actions: {
    async getAllUserRepositories() {
      const token = useCookie("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      };
      const { data, error } = await useFetch(
        "http://nginx:8888/api/github/repositories",
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      if (error.value) {
        this.error = error.value.data;
      }
      return data.value;
    },
  },
});
