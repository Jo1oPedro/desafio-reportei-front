<template>
    <div class="flex flex-col gap-0 w-full">
        <div class="bg-gray-200 rounded-full w-full p-4">
            <div class="flex gap-3">
                <h1 class="p-0 text-black">Titulo do repositorio</h1>
                <p class="rounded-full bg-gray-300 px-3 text-sm text-black">Privado</p>
            </div>
            <div class="flex items-center gap-3">
                <div class="rounded-full w-2 h-2 bg-green-400"></div>
                <p>Descrição do repositorio</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    required: true,
  },
});

console.log("O id é: " + props.id);
</script>

<style scoped>

</style>
