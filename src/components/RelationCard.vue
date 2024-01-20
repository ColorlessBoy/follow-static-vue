<script setup lang="ts">
import { ChevronRight, ChevronDown } from "lucide-vue-next";
import { ref } from "vue";
const isExpanded = ref(false);
import { setmmBlockMap } from "@/types/data";

const { title, nameList } = defineProps<{
  title: string;
  nameList: string[];
}>();
const onClick = () => {
  isExpanded.value = !isExpanded.value;
};

const linkList = nameList
  .map((name) => {
    const titleId = setmmBlockMap.get(name);
    return [name, `/file/${titleId}#${name}`];
  })
  .filter((a) => {
    return a[1] !== undefined;
  });
</script>

<template>
  <div className="flex-col">
    <div
      role="button"
      className="flex h-8 w-full items-center justify-start"
      :onClick="onClick"
    >
      <ChevronDown v-if="isExpanded" />
      <ChevronRight v-else />
      {{ title }}
    </div>
    <div v-if="isExpanded" className="px-2 rounded-md border-2">
      <div
        className="flex space-x-2 w-full flex-wrap justify-start max-h-40 overflow-y-auto"
      >
        <div v-for="link in linkList" :key="link[0]">
          <RouterLink :to="link[1]">{{ link[0] }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
