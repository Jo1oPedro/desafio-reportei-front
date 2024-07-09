<template>
  <div class="container w-full">
    <LayoutAlert v-if="error.message" :error="error.message" />
    <div v-else>
      <div class="flex justify-between mb-2">
        <div>Total de commits: {{ totalCommitsNumber }}</div>
        <LayoutHoverCard>
          <template v-slot:trigger>
            <Button @click="handleNoCachedCommitsRequest"
              >Refresh commits</Button
            >
          </template>
          <template v-slot:message>
            Use in case you have new commits in the last 24hrs that are not
            showing here
          </template>
        </LayoutHoverCard>
      </div>
      <div v-if="loading">
        <Skeleton class="min-h-[300px]" />
      </div>
      <div v-else class="min-h-[300px]">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Skeleton } from "@/components/ui/skeleton";
import { useGithubStore } from "@/stores/github";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { Line } from "vue-chartjs";

const { owner_name, repository_name, repository_id } = useRoute().params;

const { getUserRepository, getRepositoryCommits } = useGithubStore();
const { error, loading } = storeToRefs(useGithubStore());

const repositories = ref(null);
const commits = ref(null);
const totalCommitsNumber = ref(0);

onMounted(async () => {
  try {
    repositories.value = await getUserRepository(repository_name);
    commits.value = await getRepositoryCommits(
      owner_name,
      repository_name,
      repository_id
    );
    buildGraph(chartData, commits, totalCommitsNumber);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

function formatDate(key) {
  const str = key.toString();
  return `${str.slice(0, 2)}-${str.slice(2, 4)}-${str.slice(4, 6)}`;
}

async function handleNoCachedCommitsRequest() {
  commits.value = await getRepositoryCommits(
    owner_name,
    repository_name,
    repository_id,
    "no-cache"
  );

  buildGraph(chartData, commits, totalCommitsNumber);
}

function buildGraph(chartData, commits, totalCommitsNumber) {
  const dates = [];
  const totalCommits = [];
  totalCommitsNumber.value = 0;

  Object.keys(commits.value).forEach((key) => {
    dates.push(formatDate(key));
    totalCommits.push(commits.value[key]);
    totalCommitsNumber.value += commits.value[key];
  });
  chartData.value = {
    labels: dates,
    datasets: [
      {
        label: "Commits",
        backgroundColor: "rgb(255,255,224)",
        data: totalCommits,
        tension: 0.1,
        borderColor: "rgb(123,240,0)",
      },
    ],
  };
}

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Commits",
      backgroundColor: "rgb(255,255,224)",
      data: [],
      tension: 0.1,
      borderColor: "rgb(123,240,0)",
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
</script>

<style scoped></style>
