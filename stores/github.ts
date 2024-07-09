import { defineStore } from "pinia";
import axios from "axios";

export const useGithubStore = defineStore({
  id: "myGithubStore",
  state: () => ({
    loading: false,
    error: {},
    total_public_repositories: 0,
  }),
  actions: {
    async getUserRepositories(page = 1, per_page = 10, cache = "cache") {
      const runtimeConfig = useRuntimeConfig();
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
          `${runtimeConfig.public.url}/api/github/repositories?page=${page}&per_page=${per_page}`,
          config
        )
        .catch((error) => {
          this.error.message = error.response.data.message;
          return [];
        });

      this.total_public_repositories = response.data.total_public_repositories;

      this.loading = false;
      return response.data;
    },
    async getUserRepository(name: string) {
      const runtimeConfig = useRuntimeConfig();
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
          `${runtimeConfig.public.url}/api/github/repository/${name}`,
          config
        )
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
      repository_name: string,
      repository_id: string,
      cache: "cache"
    ) {
      const runtimeConfig = useRuntimeConfig();
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
          `${runtimeConfig.public.url}/api/github/repository/commits/${repository_name}/${repository_id}`,
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
