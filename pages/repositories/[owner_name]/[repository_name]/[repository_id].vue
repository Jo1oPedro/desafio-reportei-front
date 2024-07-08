<template>
  <div class="container w-full">
    <LayoutAlert v-if="error.message" :error="error.message" />
    <div v-else>
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

onMounted(async () => {
  try {
    repositories.value = await getUserRepository(repository_name);
    commits.value = await getRepositoryCommits(
      owner_name,
      repository_name,
      repository_id
    );

    const dates = [];
    const totalCommits = [];
    Object.keys(commits.value).forEach((key) => {
      dates.push(formatDate(key));
      totalCommits.push(commits.value[key]);
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
});
</script>

<style scoped></style>
