<template>
  <div class="container">
    <LayoutAlert v-if="error.message" :error="error" />
    <div v-else>
      <div class="container flex flex-col gap-3">
        <div class="flex gap-3 flex-col items-center sm:flex-row mb-4">
          <Input
            type="text"
            name="repositoryName"
            placeholder="Find a repository"
            class="sm:max-w-[50%] border-2 border-blue-300"
          />
          <LayoutHoverCard>
            <template v-slot:trigger>
              <Button @click="handleNoCachedGetAllRepositorysRequest"
                >Refresh repositories</Button
              >
            </template>
            <template v-slot:message>
              Use in case you have created a new repository and can"t find it
              here
            </template>
          </LayoutHoverCard>
        </div>
        <GithubRepositoryCard
          v-for="repository in response.repositories"
          :key="repository.id"
          :repository="repository"
          class="mb-2"
        ></GithubRepositoryCard>
      </div>
      <div class="flex justify-center items-center mt-4">
        <LayoutPagination
          :total="total"
          :itemsPerPage="2"
          @update:page="handlePageUpdate"
          class="max-w-[80%]"
        ></LayoutPagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
console.log(useCookie("token").value);
import { useGithubStore } from "@/stores/github";
import { storeToRefs } from "pinia";

const { getUserRepositories } = useGithubStore();
const { error } = storeToRefs(useGithubStore());

const response = ref(await getUserRepositories(1, 2));
const total = ref(response.value.total_pages_number * 2);
const page = ref(1);

async function handlePageUpdate(newPage: number) {
  if (page.value == newPage) {
    return;
  }
  page.value = newPage;
  response.value = await getUserRepositories(page.value, 2);
}
async function handleNoCachedGetAllRepositorysRequest() {
  response.value = await getUserRepositories(page.value, 2, 0);
}
//console.log(response.value.repositories);
</script>

<style scoped></style>
