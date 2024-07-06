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
        <div class="flex items-center pt-2">
          <CalendarDays class="mr-2 h-4 w-4 opacity-70" />
          <span class="text-xs text-muted-foreground">
            Joined January 2014
          </span>
        </div>
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
