import { defineStore } from "pinia";

export const useGithubStore = defineStore({
  id: "myGithubStore",
  state: () => ({
    loading: false,
    error: {},
    page: 1,
  }),
  actions: {
    async getUserRepositories(page = 1, per_page = 10) {
      const token = useCookie("token");
      try {
        this.loading = true;
        this.error = {};

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const data = await $fetch(
          `http://localhost:7070/api/github/repositories`,
          {
            params: { page, per_page },
            headers: config.headers,
          }
        );

        console.log("Repositories fetched:", data);
        return data;
      } catch (error) {
        this.error.title = "Erro ao recuperar os repositorios";
        this.error.message = error.data;
        return [];
      } finally {
        this.loading = false;
      }
    },
  },
});
