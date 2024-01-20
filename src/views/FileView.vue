<script setup lang="ts">
import { RouterLink, onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref, watch } from "vue";
import { fetchJsonFile, type FollowFile } from "@/types/data";
import CodeCard from "@/components/CodeCard.vue";
import TocList from "@/components/TocList.vue";
import RelationCard from "@/components/RelationCard.vue";
import { ArrowUpFromLine } from "lucide-vue-next";

const route = useRoute();
const fileData = ref<FollowFile>(route.meta.data as FollowFile);
const currentPath = ref<string>(route.path);
const enablePretty = ref(true);
const onClick = () => {
  enablePretty.value = !enablePretty.value;
};
watch(
  () => route.params.id,
  async (newId) => {
    try {
      currentPath.value = route.path;
      const data = await fetchJsonFile(newId as string);
      if (data) {
        fileData.value = data;
      }
    } catch (e) {
      console.error(e);
    }
  },
);
onBeforeRouteUpdate(async (to, from) => {
  if (to.name === "file" && to.params.id !== from.params.id) {
    try {
      currentPath.value = route.path;
      const data = await fetchJsonFile(to.params.id as string);
      if (data) {
        fileData.value = data;
      }
    } catch (e) {
      console.error(e);
    }
  }
});
</script>
<template>
  <RouterLink
    :to="currentPath + '#toclist'"
    className="fixed bottom-10 right-10 border-2 rounded-md w-10 h-10 flex items-center justify-center"
  >
    <ArrowUpFromLine />
  </RouterLink>
  <div className="flex-col justify-center overflow-auto">
    <article
      className="prose prose-base dark:prose-invert prose-neutral my-20 mx-5 md:mx-10"
    >
      <TocList
        v-if="fileData.blocks.length > 0"
        id="toclist"
        :file-data="fileData"
        :current-path="currentPath"
      />
      <h1 className="border-b-2 py-8">{{ fileData.title }}</h1>
      <p v-if="fileData.content">{{ fileData.content }}</p>
      <div v-if="fileData.blocks">
        <div v-for="block in fileData.blocks" :key="block.name">
          <h2 :id="block.name">
            <RouterLink :to="currentPath + '#' + block.name">
              {{ block.name }}
            </RouterLink>
          </h2>
          <p v-if="block.content">{{ block.content }}</p>
          <CodeCard
            :name="block.name"
            :origin="block.origin"
            :pretty="block.pretty"
            :enable-pretty="enablePretty"
            :on-click="onClick"
          />
          <RelationCard
            v-if="block.parent.length > 0"
            :name-list="block.parent"
            title="Parent"
          />
          <RelationCard
            v-if="block.children.length > 0"
            :name-list="block.children"
            title="Child"
          />
        </div>
      </div>
    </article>
  </div>
</template>
