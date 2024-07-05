<template>
  <div>
    <!--<LayoutRepository :repository="repository"></LayoutRepository>-->
    dale123
  </div>
</template>

<script setup>
import { useGithubStore } from "@/stores/github";

const { owner_name, repository_name, repository_id } = useRoute().params;

const { getSpecificUserRepository } = useGithubStore();

const repository = getSpecificUserRepository(
  owner_name,
  repository_name,
  repository_id
);
console.log(repository);
</script>

<style></style>
