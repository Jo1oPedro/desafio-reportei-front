<template>
  <div class="container flex">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Line } from "vue-chartjs";

const chartData = ref({
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "rgb(255,255,224)",
      data: [40, 39, 10, 40, 39, 99, 40],
      tension: 0.1,
      borderColor: "rgb(123,240,0)",
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    custom_canvas_background_color: {
      color: "black",
    },
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 400px;
}
</style>
