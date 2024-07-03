<template>
  <div class="container flex flex-col gap-3">
    <Input type="text" name="repositoryName" placeholder="Find a repository" />
    <GithubRepository v-for="dale in 3" :key="dale" :id="dale"></GithubRepository>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";

const token = useCookie("token");
const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token.value}`,
    "Content-Type": "application/json",
  },
});
const response = await axiosInstance.get("http://nginx:8888/api/github/repositories");
console.log(response);
</script>

<style scoped>

</style>
