<script setup lang="ts">
const { text } = defineProps<{
  text: string;
}>();
</script>

<template>
  <div role="button" className="w-16 border-2 rounded-md">
    {{ text }}
  </div>
</template>
