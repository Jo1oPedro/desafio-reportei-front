// plugins/backgroundPlugin.ts
import { Chart, Plugin } from "chart.js";
import { ref } from "vue";

const backgroundColor = ref("black");

const backgroundPlugin: Plugin = {
  id: "custom_canvas_background_color",
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = backgroundColor.value;
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

export { backgroundColor };

export default defineNuxtPlugin((nuxtApp) => {
  Chart.register(backgroundPlugin);
});
