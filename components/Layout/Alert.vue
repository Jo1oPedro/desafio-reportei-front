<template>
  <Alert class="flex items-center justify-center gap-3 flex-col border-red-500">
    <AlertTitle>{{ error.title }}</AlertTitle>
    <AlertDescription>
      {{ error.message }}
    </AlertDescription>
  </Alert>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
defineProps({
  error: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
