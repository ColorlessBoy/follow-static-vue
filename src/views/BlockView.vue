<script setup lang="ts">
import BlockSearchItem from "@/components/BlockSearchItem.vue";
import CodeCardButton from "@/components/CodeCardButton.vue";
import { useBlockMenu } from "@/stores/blockMenu";
import { searchBlockByName, searchBlockByTarget } from "@/types/data";
import { ref, watch } from "vue";
import { debounce } from "lodash";

const query = ref("");
const result = ref<
  {
    name: string;
    target?: string;
    link?: string;
  }[]
>([]);
const blockMenu = useBlockMenu();
const blockMenuRoot = blockMenu.getById(0);
const enablePretty = ref(true);

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

const isSearchByTarget = ref(false);

const onChangeSearchBy = () => {
  isSearchByTarget.value = !isSearchByTarget.value;
};

const onClickOriginPretty = () => {
  enablePretty.value = !enablePretty.value;
};

const debounceSearch = debounce((query) => {
  console.log(query);
  result.value = searchBlockByTarget(query);
}, 500);

watch(
  () => [query.value, isSearchByTarget.value],
  async () => {
    if (query.value.length > 0) {
      if (isSearchByTarget.value) {
        debounceSearch(query.value);
      } else {
        result.value = searchBlockByName(query.value);
      }
    } else {
      result.value = [];
    }
  },
);
</script>
<template>
  <article
    className="prose prose-base dark:prose-invert prose-neutral mt-20 mx-5 md:mx-10 mb-[100vh]"
  >
    <p>
      ------------------------------------------------------------------------------------------
    </p>
    <div className="px-2">
      <div
        className="flex h-16 w-full items-center justify-center py-2 space-x-1"
      >
        <button
          @click="onChangeSearchBy"
          className="flex items-center justify-center border-2 rounded-md h-12 w-16"
        >
          {{ isSearchByTarget ? "Target" : "Name" }}
        </button>
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
        className="flex space-x-2 w-full flex-wrap justify-between px-2 max-h-40 overflow-y-auto leading-0 border-2 rounded-md my-2"
      >
        <div
          role="button"
          v-for="term in result"
          :key="'search-result' + term.name"
          :onClick="onClickResultBuilder(term.name)"
          className="flex h-8 my-0 py-0 items-center justify-center"
        >
          {{ term.name }}
        </div>
      </div>
      <div className="flex justify-start text-center text-sm py-2">
        <CodeCardButton
          :text="enablePretty ? 'Pretty' : 'Origin'"
          :onclick="onClickOriginPretty"
        />
      </div>
      <BlockSearchItem
        :enable-pretty="enablePretty"
        v-for="id in blockMenuRoot?.children"
        :key="'block-search-item' + id"
        :id="id"
        :onDelete="onDeleteBuilder(id)"
      />
    </div>
  </article>
</template>
