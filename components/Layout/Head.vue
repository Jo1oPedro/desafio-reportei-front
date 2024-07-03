<template>
  <div
    class="sticky top-0 z-40 bg-gray-300 flex justify-between items-center gap-3 border-b-2"
  >
    <div>
      <Button @click="toggleSidebar()" class="bg-transparent hover:bg-gray-400">
        <Icon :name="eyeIcon" size="20" :color="black"></Icon>
      </Button>
    </div>

    <ColorModeToogle></ColorModeToogle>
  </div>
</template>

<script lang="ts" setup>
defineProps(["eyeIcon"]);
const emit = defineEmits(["toggleSidebar"]);

const colorMode = useColorMode();

const iconColor = ref(colorMode.value === "dark" ? "white" : "black");
watch(colorMode, function () {
  iconColor.value = colorMode.value === "dark" ? "white" : "black";
});

function toggleSidebar() {
  emit("toggleSidebar");
}
</script>

<style></style>
