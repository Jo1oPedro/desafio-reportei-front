<template>
  <HoverCard>
    <HoverCardTrigger>
      <slot name="trigger"></slot>
    </HoverCardTrigger>
    <HoverCardContent>
      <div class="space-y-1">
        <p class="text-sm">
          <slot name="message"></slot>
        </p>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>

<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
</script>
