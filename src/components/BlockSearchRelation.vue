<script setup lang="ts">
import { ChevronRight, ChevronDown } from "lucide-vue-next";
import { reactive, ref } from "vue";
import BlockSearchItem from "./BlockSearchItem.vue";
const isExpanded = ref(false);

const { title, nameList, enablePretty } = defineProps<{
  title: string;
  nameList: string[];
  enablePretty: boolean;
}>();
const onClick = () => {
  isExpanded.value = !isExpanded.value;
};

const blocklist = reactive<string[]>([]);
const onClickResultBuilder = (name: string) => {
  return () => {
    blocklist.push(name);
  };
};
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
        <div
          role="button"
          v-for="name in nameList"
          :key="'block-search-relation-namelist' + name"
          :onClick="onClickResultBuilder(name)"
        >
          {{ name }}
        </div>
      </div>
    </div>
    <div v-if="blocklist.length > 0">
      <div v-for="name in blocklist" :key="'block-search-relation' + name">
        <BlockSearchItem :enablePretty="enablePretty" :name="name" />
      </div>
    </div>
  </div>
</template>
