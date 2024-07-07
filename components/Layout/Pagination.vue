<template>
  <Pagination
    v-slot="{ page }"
    :total="total"
    :sibling-count="1"
    show-edges
    :default-page="1"
    :itemsPerPage="itemsPerPage"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst @click="handlePageUpdate(1)" />
      <PaginationPrev @click="handlePageUpdate(page - 1)" />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
            @click="handlePageUpdate(item.value)"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @click="handlePageUpdate(page + 1)" />
      <PaginationLast
        @click="handlePageUpdate(Math.ceil(total / itemsPerPage))"
      />
    </PaginationList>
  </Pagination>
</template>

<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:page"]);

function handlePageUpdate(page: Number) {
  emit("update:page", page);
}
</script>
