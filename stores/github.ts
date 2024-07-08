import { defineStore } from "pinia";
import axios from "axios";

export const useGithubStore = defineStore({
  id: "myGithubStore",
  state: () => ({
    loading: false,
    error: {},
  }),
  actions: {
    async getUserRepositories(page = 1, per_page = 10, cache = "cache") {
      this.error = {};
      this.loading = true;
      const token = useCookie("token");
      const config = {
        headers: {
          "Cache-Control": cache,
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios
        .get(
          `http://localhost:8888/api/github/repositories?page=${page}&per_page=${per_page}`,
          config
        )
        .catch((error) => {
          this.error.message = error.response.data.message;
          return [];
        });

      const total_public_repositories = useCookie("total_public_repositories");
      total_public_repositories.value = response.data.total_public_repositories;
      this.loading = false;
      return response.data;
    },
    async getUserRepository(name: string) {
      this.error = {};
      this.loading = true;
      const token = useCookie("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios
        .get(`http://localhost:8888/api/github/repository/${name}`, config)
        .catch((error) => {
          if (error.response.status == 404) {
            this.error.specificRepositoryError = error.response.data.message;
            return [];
          }
          this.error.message = error.response.data.message;
          return [];
        });

      this.loading = false;
      return response.data;
    },
    async getRepositoryCommits(
      owner_name: string,
      repository_name: string,
      repository_id: string
    ) {
      this.error = {};
      this.loading = true;
      const token = useCookie("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios
        .get(
          `http://localhost:8888/api/github/repository/commits/${owner_name}/${repository_name}/${repository_id}`,
          config
        )
        .catch((error) => {
          this.error.message = error.response.data.message;
          return [];
        });

      this.loading = false;
      return response?.data ?? [];
    },
  },
});
