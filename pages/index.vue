<template>
  <div class="container">
    <LayoutAlert v-if="error.message" :error="error" />
    <div v-else>
      <div class="container flex flex-col gap-3">
        <Input
          type="text"
          name="repositoryName"
          placeholder="Find a repository"
        />
        <GithubRepositoryCard
          v-for="repository in repositories"
          :key="repository.id"
          :repository="repository"
        ></GithubRepositoryCard>
      </div>
      <div class="flex justify-center items-center mt-4">
        <LayoutPagination
          :total="7"
          :itemsPerPage="5"
          @update:page="handlePageUpdate"
        ></LayoutPagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGithubStore } from "@/stores/github";
import { storeToRefs } from "pinia";

const { getUserRepositories } = useGithubStore();
const { error } = storeToRefs(useGithubStore());

const repositories = ref(await getUserRepositories(1, 5));
const page = ref(1);

async function handlePageUpdate(newPage: number) {
  if (page.value == newPage) {
    return;
  }
  page.value = newPage;
  repositories.value = await getUserRepositories(page.value, 5);
}
</script>

<style scoped></style>
