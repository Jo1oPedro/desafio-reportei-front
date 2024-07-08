<template>
  <Alert class="flex items-center justify-center gap-3 flex-col border-red-500">
    <AlertDescription class="text-2xl">
      {{ error }}
    </AlertDescription>
  </Alert>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
defineProps({
  error: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
