<template>
  <div class="container flex flex-col gap-3">
    <Input type="text" name="repositoryName" placeholder="Find a repository" />
    <GithubRepository
      v-for="repository in repositories"
      :key="repository.id"
      :repository="repository"
    ></GithubRepository>
  </div>
</template>

<script setup lang="ts">
import { useGithubStore } from "@/stores/github";

const { getAllUserRepositories } = useGithubStore();
const repositories = await getAllUserRepositories();
</script>

<style scoped></style>
