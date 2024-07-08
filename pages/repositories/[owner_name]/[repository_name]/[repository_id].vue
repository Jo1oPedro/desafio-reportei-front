<template>
  <div class="container w-full">
    <!--<LayoutRepository :repository="repository"></LayoutRepository>-->
    <!--<div v-for="repository in repositories" class="container">
      <p class="text-white">{{ repository.url }}</p>
    </div>-->
    <LayoutAlert v-if="error.message" :error="error" />
    <div class="min-h-[300px]" v-else>
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { useGithubStore } from "@/stores/github";

const { owner_name, repository_name, repository_id } = useRoute().params;

const { getSpecificUserRepository, getRepositoryCommits } = useGithubStore();
const { error } = storeToRefs(useGithubStore());

const repositories = ref(
  await getSpecificUserRepository(owner_name, repository_name, repository_id)
);

const commits = ref(
  await getRepositoryCommits(owner_name, repository_name, repository_id)
);

const dates = [];
const totalCommits = [];
Object.keys(commits.value).forEach((key) => {
  dates.push(formatDate(key));
  totalCommits.push(commits.value[key]);
});

function formatDate(key) {
  const str = key.toString();
  return `${str.slice(0, 2)}-${str.slice(2, 4)}-${str.slice(4, 6)}`;
}

import { ref } from "vue";
import { Line } from "vue-chartjs";

const chartData = ref({
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
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

function dale() {
  chartData.value = {
    labels: ["cascata", "dale"],
    datasets: [
      {
        label: "Commits",
        backgroundColor: "rgb(255,255,224)",
        data: [3, 4],
        tension: 0.1,
        borderColor: "rgb(123,240,0)",
      },
    ],
  };
}
</script>

<style></style>
