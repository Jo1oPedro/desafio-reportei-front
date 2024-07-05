<template>
  <div
    :class="backgroundColor"
    class="m-0 p-0 fixed z-50 w-full md:w-[220px] h-full flex flex-col gap-2 md:border-r-2"
  >
    <header
      class="flex items-center gap-2 hover:scale-[101%] transition cursor-pointer"
    >
      <div class="flex items-center gap-2">
        <LayoutLogo />
        <p class="font-bold text-sm md:text-base">Github Analyzer</p>
      </div>
      <Icon name="mdi:hide" size="20" @click="toggleSidebar()"></Icon>
    </header>
    <div class="flex gap-2 flex-col p-2">
      <NuxtLink
        v-for="item in items"
        :key="item.title"
        :to="item.path"
        class="flex items-center gap-2 px-2 py-1 rounded hover:scale-[101%] transition cursor-pointer border-b-2"
        @click="toggleSidebar"
      >
        <Icon :name="item.icon" />
        <span>{{ item.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["toggleSidebar"]);

function toggleSidebar() {
  emit("toggleSidebar");
}

const colorMode = useColorMode();
const backgroundColor = ref(
  colorMode.value === "dark" ? "bg-[#0C1117]" : "bg-white"
);
watch(colorMode, function () {
  backgroundColor.value = colorMode.value === "dark" ? "bg-black" : "bg-white";
});

const items = ref([
  {
    title: "Home",
    path: "/",
    icon: "material-symbols:home",
  },
]);
</script>

<style></style>
