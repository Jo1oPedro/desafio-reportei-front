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
    async getUserRepositories(page = 1, per_page = 10, cache = 1) {
      this.loading = true;
      const token = useCookie("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      };

      const response = await this.makeRequest(
        `http://localhost:8888/api/github/repositories?page=${page}&per_page=${per_page}&cache=${cache}`,
        config
      );

      this.total_public_repositories = response.total_public_repositories;
      return response;
    },
    async getUserRepository(name: string) {
      this.loading = true;
      const token = useCookie("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      };

      const response = await this.makeRequest(
        `http://localhost:8888/api/github/repository/${name}`,
        config
      );

      return response;
    },
    async getSpecificUserRepository(repository_name: string) {
      this.loading = true;
      const token = useCookie("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      };

      const response = await this.makeRequest(
        `http://localhost:8888/api/github/repository/${repository_name}`,
        config
      );

      return response;
    },
    async getRepositoryCommits(
      owner_name: string,
      repository_name: string,
      repository_id: string
    ) {
      this.loading = true;
      const token = useCookie("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      };

      const response = await this.makeRequest(
        `http://localhost:8888/api/github/repository/commits/${owner_name}/${repository_name}/${repository_id}`,
        config
      );

      return response;
    },
    async makeRequest(url: string, config: object) {
      try {
        this.error = {};
        const response = await axios.get(url, config);
        this.loading = false;
        return response.data;
      } catch (error) {
        this.loading = false;
        this.error.message = error.response
          ? error.response.data.message
          : error.message;
        return [];
      }
    },
  },
});
