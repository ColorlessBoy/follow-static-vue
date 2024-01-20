<script setup lang="ts">
import type { FollowContent } from "@/types/data";
import ContentItem from "./ContentItem.vue";
const { content } = defineProps<{
  content: FollowContent;
}>();
</script>

<template>
  <div>
    <h2
      className="w-full h-12 flex justify-center items-center text-lg font-bold font-sans uppercase"
    >
      {{ content.title }}
    </h2>
    <ul>
      <li v-for="childcontent in content.children" :key="childcontent.index">
        <ContentItem :content="childcontent" />
      </li>
    </ul>
  </div>
</template>
