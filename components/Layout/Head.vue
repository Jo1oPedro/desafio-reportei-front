<template>
  <div
    class="sticky top-0 z-40 bg-gray-300 flex justify-between items-center gap-3 border-b-2"
  >
    <div>
      <Button @click="toggleSidebar()" class="bg-transparent hover:bg-gray-400">
        <Icon name="mdi:show" size="20" color="black"></Icon>
      </Button>
    </div>

    <div class="flex">
      <Button @click="logout()" class="bg-transparent hover:bg-gray-400">
        <Icon name="majesticons:logout" size="20" :color="iconColor"></Icon>
      </Button>
      <ColorModeToogle></ColorModeToogle>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

const colorMode = useColorMode();
const iconColor = ref(colorMode.value === "dark" ? "white" : "black");
watch(colorMode, function () {
  iconColor.value = colorMode.value === "dark" ? "white" : "black";
});

const emit = defineEmits(["toggleSidebar"]);
function toggleSidebar() {
  emit("toggleSidebar");
}

const { logUserOut } = useAuthStore();
function logout() {
  logUserOut();
}
</script>

<style></style>
