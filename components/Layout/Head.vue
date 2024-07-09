<template>
  <div class="sticky top-0 z-40 bg-[#0C1117] flex-col border-b-2">
    <div class="flex justify-between items-center gap-3">
      <div>
        <Button
          @click="toggleSidebar()"
          class="bg-transparent hover:bg-gray-400"
        >
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
    <div class="flex ml-4 gap-2">
      <Icon name="ph:book-bold" size="20" color="white"></Icon>
      <p class="text-white text-sm">Repositories: {{ total_repositories }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { useGithubStore } from "@/stores/github";
import { storeToRefs } from "pinia";

const emit = defineEmits(["toggleSidebar"]);
function toggleSidebar() {
  emit("toggleSidebar");
}

const total_repositories = ref(0);
onMounted(() => {
  const { total_public_repositories } = storeToRefs(useGithubStore());
  total_repositories.value = total_public_repositories;
});

const { logUserOut } = useAuthStore();
function logout() {
  logUserOut();
}
</script>

<style></style>
