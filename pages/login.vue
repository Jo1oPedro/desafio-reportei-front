<template>
  <div class="flex w-full h-full">
    <div class="container flex h-screen items-center justify-center">
      <div
        class="flex flex-col gap-5 justify-center items-center min-w-[50%] min-h-[50%]"
      >
        <h1 class="text-2xl font-semibold text-black">Welcome back</h1>
        <div class="bg-gray-200 p-5 rounded-full flex gap-3">
          <img
            src="//d9hhrg4mnvzow.cloudfront.net/try.digitalocean.com/cloud/22e16791-github-icon.svg"
            alt=""
          />
          <NuxtLink to="api/auth/github" external class="text-black"
            >Login with github</NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="flex bg-orange-200 w-full h-screen">
      <img src="~/public/img/loveCode.jpg" class="w-full h-full" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});
</script>

<style></style>
