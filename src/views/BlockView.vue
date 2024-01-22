<script setup lang="ts">
import BlockSearchItem from "@/components/BlockSearchItem.vue";
import { searchBlock } from "@/types/data";
import { reactive, ref, watch } from "vue";

const query = ref("");
const result = ref<
  {
    name: string;
    link: string;
  }[]
>([]);
const blocklist = reactive<string[]>([]);
const enablePretty = ref(true);

const onClickResultBuilder = (name: string) => {
  return () => {
    blocklist.push(name);
  };
};
watch(
  () => query.value,
  () => {
    if (query.value.length > 0) {
      result.value = searchBlock(query.value);
    } else {
      result.value = [];
    }
  },
);
</script>
<template>
  <article
    className="prose prose-base dark:prose-invert prose-neutral my-20 mx-5 md:mx-10"
  >
    <p>
      -------------------------------------------------------------------------------
      -------------------------------------------------------------------------------
    </p>
    <div className="px-2">
      <div className="flex h-16 w-full items-center justify-center py-2">
        <input
          type="text"
          id="blocksearbar"
          placeholder="Search Block"
          className="dark:bg-vuebg-dark border-2 w-full h-full mx-4 rounded-md px-2"
          v-model="query"
        />
      </div>
      <div
        v-if="result.length > 0"
        className="flex space-x-2 w-full flex-wrap justify-start max-h-40 overflow-y-auto"
      >
        <div
          role="button"
          v-for="term in result"
          :key="'search-result' + term.name"
          :onClick="onClickResultBuilder(term.name)"
        >
          <p>{{ term.name }}</p>
        </div>
      </div>
      <BlockSearchItem
        :enable-pretty="enablePretty"
        v-for="name in blocklist"
        :key="'block-search-item' + name"
        :name="name"
      />
    </div>
  </article>
</template>
