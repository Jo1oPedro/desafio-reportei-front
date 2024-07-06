<template>
  <NuxtLink
    :to="`/repositories/${repository.owner.login}/${repository.name}/${repository.id}`"
  >
    <div class="w-full">
      <div class="flex flex-col gap-2 border-y-2 border-blue-400 w-full p-4">
        <div class="flex flex-col sm:flex-row gap-3 pb-1">
          <h1 class="p-0 truncate">{{ repository.name }}</h1>
          <p class="rounded-full bg-gray-300 px-3 text-sm text-black">
            {{ repository.private ? "Private" : "Public" }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <div class="rounded-full w-2 h-2 bg-green-400"></div>
          <Badge>{{ repository.language ?? "X" }}</Badge>
          <p class="truncate">{{ repository.description }}</p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
const props = defineProps({
  repository: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
