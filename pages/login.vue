<template>
  <div class="flex w-full h-full">
    <div class="container flex h-screen items-center justify-center">
      <Card class="bg-white p-10">
        <CardContent>
          <div
            class="flex flex-col gap-5 justify-center items-center min-w-[50%] min-h-[50%]"
          >
            <h1 class="text-2xl font-semibold text-black">Welcome back</h1>
            <div class="bg-black p-5 rounded-lg flex gap-3">
              <Icon name="mdi:github" color="white" size="24px"></Icon>
              <NuxtLink to="api/auth/github" external class="text-white"
                >Login with github</NuxtLink
              >
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
</script>

<style></style>
