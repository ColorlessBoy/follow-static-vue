<script setup lang="ts">
import { type FollowFile } from "@/types/data";
const { fileData, currentPath } = defineProps<{
  fileData: FollowFile;
  currentPath: string;
}>();
</script>

<template>
  <div
    className="fix top-0 px-2 mx-6 h-8 flex flex-wrap overflow-y-auto border-2 rounded-md space-x-2 justify-start bg-vuebg-light text-vuefg-light dark:bg-vuebg-dark dark:text-vuefg-dark"
  >
    <div v-for="block in fileData.blocks" :key="block.name">
      <RouterLink :to="currentPath + '#' + block.name">
        {{ block.name }}
      </RouterLink>
    </div>
  </div>
</template>
