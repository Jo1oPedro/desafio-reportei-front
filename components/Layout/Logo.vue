<template>
  <div class="overflow-hidden rounded-full w-[45px]">
    <img :src="avatar_url" alt="logo" />
  </div>
</template>

<script lang="ts" setup>
const avatar_url = useCookie("authenticatedUser").value.avatar_url;
</script>

<style></style>
