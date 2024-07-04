<template>
  <div
    class="sticky top-0 z-40 bg-[#0C1117] flex justify-between items-center gap-3 border-b-2"
  >
    <div>
      <Button @click="toggleSidebar()" class="bg-transparent hover:bg-gray-400">
        <Icon name="mdi:show" size="20" color="white"></Icon>
      </Button>
    </div>

    <div class="flex">
      <Button @click="logout()" class="bg-transparent hover:bg-gray-400">
        <Icon name="majesticons:logout" size="20" color="white"></Icon>
      </Button>
      <ColorModeToogle></ColorModeToogle>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

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
