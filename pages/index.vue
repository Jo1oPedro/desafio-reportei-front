<template>
  <div class="container">
    <LayoutAlert v-if="error.message" :error="error" />
    <div class="container flex flex-col gap-3" v-else>
      <Input
        type="text"
        name="repositoryName"
        placeholder="Find a repository"
      />
      <GithubRepository
        v-for="repository in repositories"
        :key="repository.id"
        :repository="repository"
      ></GithubRepository>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGithubStore } from "@/stores/github";
import { storeToRefs } from "pinia";

const { getAllUserRepositories } = useGithubStore();
const { error } = storeToRefs(useGithubStore());
const repositories = await getAllUserRepositories();
</script>

<style scoped></style>
