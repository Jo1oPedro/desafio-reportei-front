<template>
  <div class="container">
    <LayoutAlert v-if="error.message" :error="error.message" />
    <div>
      <div class="flex flex-col gap-3">
        <div class="flex gap-3 flex-col items-center sm:flex-row mb-4">
          <Input
            type="text"
            name="repositoryName"
            placeholder="Find a repository"
            class="sm:max-w-[50%] border-2 border-blue-300"
            v-model.trim="repositoryName"
            v-on:keyup.enter="getSpecifiedRepository"
          />
          <LayoutHoverCard>
            <template v-slot:trigger>
              <Button @click="handleNoCachedGetAllRepositorysRequest"
                >Refresh repositories</Button
              >
            </template>
            <template v-slot:message>
              Use in case you have created a new repository and the total of
              repositories don"t reflect it
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

        <LayoutAlert
          v-if="error.specificRepositoryError"
          :error="error.specificRepositoryError"
        />
        <div v-else>
          <div v-if="!loading" class="flex flex-col gap-3">
            <GithubRepositoryCard
              v-for="repository in response?.repositories"
              :key="repository.id"
              :repository="repository"
              class="mb-2"
            ></GithubRepositoryCard>
            <div class="flex justify-center items-center mt-4">
              <LayoutPagination
                :total="total"
                :itemsPerPage="selectedPaginationOption"
                :page="page"
                @update:page="handlePageUpdate"
                class="max-w-[80%]"
              ></LayoutPagination>
            </div>
          </div>
          <div v-else>
            <div class="w-full">
              <Skeleton
                class="w-full h-[100px] mt-3"
                v-for="quantity in selectedPaginationOption"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGithubStore } from "@/stores/github";
import { storeToRefs } from "pinia";
import { Skeleton } from "@/components/ui/skeleton";

const selectedPaginationOption = ref(5);
const paginationOptions = [5, 10, 15, 20, 25];
const page = ref(1);

const { getUserRepositories, getUserRepository } = useGithubStore();
const { error, loading } = storeToRefs(useGithubStore());
const response = ref(null);
const total = ref(0);

onMounted(async () => {
  try {
    response.value = await getUserRepositories(
      1,
      selectedPaginationOption.value
    );
    total.value =
      response.value.total_pages_number * selectedPaginationOption.value;
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

async function handlePaginationChange() {
  page.value = 1;
  response.value = await getUserRepositories(
    page.value,
    +selectedPaginationOption.value
  );
  total.value =
    response.value.total_pages_number * selectedPaginationOption.value;
}

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
    "no-cache"
  );
  total.value =
    response.value.total_pages_number * selectedPaginationOption.value;
}

const repositoryName = ref("");
async function getSpecifiedRepository() {
  if (repositoryName.value !== "") {
    response.value.repositories = ref([
      await getUserRepository(repositoryName.value),
    ]);
    total.value = 1;
    return;
  }
  response.value = await getUserRepositories(
    page.value,
    selectedPaginationOption.value
  );
  total.value =
    response.value.total_pages_number * selectedPaginationOption.value;
}
</script>

<style scoped></style>
