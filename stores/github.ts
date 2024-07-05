import { defineStore } from "pinia";
import axios from "axios";

export const useGithubStore = defineStore({
  id: "myGithubStore",
  state: () => ({
    loading: false,
    error: {},
  }),
  actions: {
    async getUserRepositories(page = 1, per_page = 10) {
      const token = useCookie("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      };

      return this.makeRequest(
        `http://localhost:8888/api/github/repositories?page=${page}&per_page=${per_page}`,
        config
      );
    },
    async getSpecificUserRepository(
      owner_name: string,
      repository_name: string,
      repository_id: string
    ) {
      const token = useCookie("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      };

      return this.makeRequest(
        `http://localhost:8888/api/github/repositories/${owner_name}/${repository_name}/${repository_id}`,
        config
      );
    },
    async makeRequest(url: string, config: object) {
      try {
        this.loading = true;
        const response = await axios.get(url, config);
        this.loading = false;
        return response.data;
      } catch (error) {
        this.loading = false;
        this.error.title = "Erro ao recuperar os repositorios";
        this.error.message = error.response
          ? error.response.data
          : error.message;
        return [];
      }
    },
  },
});
