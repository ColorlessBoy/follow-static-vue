<script setup lang="ts">
import { ChevronRight, ChevronDown } from "lucide-vue-next";
import { ref } from "vue";
import BlockSearchItem from "./BlockSearchItem.vue";
import { useBlockMenu } from "@/stores/blockMenu";
const isExpanded = ref(false);

const { id, title, nameList, enablePretty } = defineProps<{
  id: number;
  title: string;
  nameList: string[];
  enablePretty: boolean;
}>();

const blockMenu = useBlockMenu();
const blockMenuRoot = blockMenu.getById(id);

const onClick = () => {
  isExpanded.value = !isExpanded.value;
};

const onClickResultBuilder = (name: string) => {
  return () => {
    if (blockMenuRoot) {
      blockMenu.addMenu(blockMenuRoot.id, name);
    }
  };
};
const onDeleteBuilder = (id: number) => {
  return () => {
    blockMenu.deleteById(id);
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
  </div>
  <div v-if="blockMenuRoot && blockMenuRoot.children.length > 0">
    <div
      v-for="id in blockMenuRoot.children"
      :key="'block-search-relation' + id"
    >
      <BlockSearchItem
        :enablePretty="enablePretty"
        :id="id"
        :onDelete="onDeleteBuilder(id)"
      />
    </div>
  </div>
</template>
