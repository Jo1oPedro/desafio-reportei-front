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
              Use in case you have created a new repository and the total of
              repositories here don"t reflect it
            </template>
          </LayoutHoverCard>
          <div>
            <label for="itemPerPagePagination"
              >Choose the quantity per page:
            </label>
            <select
              id="itemPerPagePagination"
              v-model="selectedPaginationOption"
              @change="handlePaginationChange"
              class="text-black"
            >
              <option
                v-for="option in paginationOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
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
          :itemsPerPage="selectedPaginationOption"
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

const selectedPaginationOption = ref(5);
const paginationOptions = [5, 10, 15, 20, 25];
async function handlePaginationChange() {
  response.value = await getUserRepositories(
    1,
    +selectedPaginationOption.value
  );
}

const { getUserRepositories } = useGithubStore();
const { error } = storeToRefs(useGithubStore());
const response = ref(
  await getUserRepositories(1, selectedPaginationOption.value)
);
const total = ref(
  response.value.total_pages_number * selectedPaginationOption.value
);
const page = ref(1);
async function handlePageUpdate(newPage: number) {
  if (page.value == newPage) {
    return;
  }
  page.value = newPage;
  response.value = await getUserRepositories(
    page.value,
    selectedPaginationOption.value
  );
  total.value =
    response.value.total_pages_number * selectedPaginationOption.value;
}
async function handleNoCachedGetAllRepositorysRequest() {
  response.value = await getUserRepositories(
    page.value,
    selectedPaginationOption.value,
    0
  );
  total.value =
    response.value.total_pages_number * selectedPaginationOption.value;
}
</script>

<style scoped></style>
