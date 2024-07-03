// plugins/chart.ts
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import backgroundPlugin from "./backgroundPlugin";

export default defineNuxtPlugin((nuxtApp) => {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    backgroundPlugin
  );
});
