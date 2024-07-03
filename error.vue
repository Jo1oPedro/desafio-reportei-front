<template>
  <div class="flex h-full flex-col items-center justify-center">
    <div class="mx-auto grid max-w-sm items-center text-center">
      <div class="mb-10 md:mb-0 md:text-3xl">
        <p class="text-6xl">Ooops.</p>
        <p class="mt-7">{{ error.statusCode }}</p>
        <p class="mt-7">{{ error.message }}</p>
      </div>
    </div>
    <div class="mt-7 flex items-center justify-center md:min-w-10">
      <UiButton color="emerald" variant="outline" @click="handleClearError"
        >Go home</UiButton
      >
    </div>
  </div>
</template>

<script setup>
defineProps(["error"]);

const handleClearError = () => clearError({ redirect: "/" });
</script>

<style></style>
