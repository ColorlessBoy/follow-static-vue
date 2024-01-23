<script setup lang="ts">
import { searchBlockByName } from "@/types/data";
import { ref, watch } from "vue";

const query = ref("");
const result = ref<
  {
    name: string;
    link: string;
  }[]
>([]);
watch(
  () => query.value,
  () => {
    if (query.value.length > 0) {
      result.value = searchBlockByName(query.value);
    } else {
      result.value = [];
    }
  },
);
</script>

<template>
  <div className="px-2">
    <div className="flex h-12 w-full items-center justify-center py-2">
      <input
        type="text"
        id="blocksearbar"
        placeholder="Search Block By Name"
        className="dark:bg-vuebg-dark border-2 w-full h-full mx-4 rounded-md px-2"
        v-model="query"
      />
    </div>
    <div
      v-if="result.length > 0"
      className="flex space-x-2 w-full flex-wrap justify-start max-h-40 overflow-y-auto"
    >
      <div v-for="term in result" :key="term.name">
        <RouterLink :to="term.link">{{ term.name }}</RouterLink>
      </div>
    </div>
  </div>
</template>
