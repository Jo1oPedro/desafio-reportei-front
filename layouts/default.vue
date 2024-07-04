<template>
  <div class="flex w-full h-fit absolute">
    <transition name="sidebar">
      <LayoutSidebar
        v-if="sidebarOpen"
        @toggle-sidebar="toggleSidebar()"
      ></LayoutSidebar>
    </transition>

    <div class="w-full flex flex-col h-full relative">
      <LayoutHead @toggle-sidebar="toggleSidebar()"></LayoutHead>

      <!-- Spacer to account for the fixed header height -->
      <div class="pt-6">
        <div class="relative">
          <div class="absolute top-0 right-0"></div>
        </div>

        <div class="grow flex">
          <slot />
        </div>
      </div>
    </div>
    <div class="absolute top-0 right-0">
      <Toaster />
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarOpen = ref(false);
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
</script>

<style>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.4s;
}
.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
