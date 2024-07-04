<template>
  <div class="w-full">
    <div class="bg-gray-200 rounded-full w-full p-4">
      <div class="flex gap-3 pb-1">
        <h1 class="p-0 text-black">{{ repository.full_name }}</h1>
        <p class="rounded-full bg-gray-300 px-3 text-sm text-black">
          {{ repository.private ? "Private" : "Public" }}
        </p>
      </div>
      <div class="flex items-center gap-3">
        <div class="rounded-full w-2 h-2 bg-green-400"></div>
        <p>{{ repository.language ?? "X" }}</p>
        <p class="truncate">{{ repository.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  repository: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
