<script setup lang="ts">
import { ref } from "vue";
import { ChevronRight, ChevronDown, Dot } from "lucide-vue-next";
import type { FollowContent } from "@/types/data";
import { twMerge } from "tailwind-merge";

const { content } = defineProps<{
  content: FollowContent;
}>();

const link = `/file/${content.index}`;
const isExpanded = ref(false);
const onClick = () => {
  isExpanded.value = !isExpanded.value;
};

import { watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const isCurrentOpenFile = ref(false);
const style = ref(
  twMerge(
    "flex h-4 w-4 items-center justify-between rounded-full",
    isCurrentOpenFile.value && "border-2",
  ),
);
watch(
  () => isCurrentOpenFile.value,
  () => {
    style.value = twMerge(
      "flex h-4 w-4 items-center justify-between rounded-full",
      isCurrentOpenFile.value && "border-2",
    );
  },
  { immediate: true },
);
watch(
  () => [route.name, route.params.id],
  () => {
    if (route.name === "file") {
      const id = Number(route.params.id as string);
      if (
        id === content.index ||
        (id > content.index && id <= content.lastChild)
      ) {
        isExpanded.value = true;
      }
      if (id === content.index) {
        isCurrentOpenFile.value = true;
      } else {
        isCurrentOpenFile.value = false;
      }
    } else {
      isExpanded.value = false;
      isCurrentOpenFile.value = false;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div className="pl-2 py-1 w-full flex-col items-start justify-start">
    <div
      className="flex w-full items-start justify-start space-x-2 pr-2 leading-4"
    >
      <div role="button" :className="style" :onClick="onClick">
        <Dot v-if="content.children.length === 0" />
        <ChevronDown v-else-if="isExpanded" />
        <ChevronRight v-else />
      </div>
      <RouterLink :to="link" :onclick="onClick">{{ content.title }}</RouterLink>
    </div>
    <ul v-if="isExpanded && content.children.length > 0">
      <li v-for="childcontent in content.children" :key="childcontent.index">
        <ContentItem :content="childcontent" />
      </li>
    </ul>
  </div>
</template>
