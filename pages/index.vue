<template>
  <div class="container flex flex-col gap-3">
    <Input type="text" name="repositoryName" placeholder="Find a repository" />
    <GithubRepository v-for="dale in 3" :key="dale" :id="dale"></GithubRepository>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useGithubStore } from "@/stores/github";

const { getAuthenticatedUser } = useGithubStore();
getAuthenticatedUser();
</script>

<style scoped>

</style>
