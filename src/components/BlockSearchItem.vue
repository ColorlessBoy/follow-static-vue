<script setup lang="ts">
import {
  fetchBlockFile,
  getCodeOriginAndPretty,
  type FollowBlock,
} from "@/types/data";
import { ChevronRight, ChevronDown } from "lucide-vue-next";
import { ref, watch } from "vue";
import ProofDetailCard from "./ProofDetailCard.vue";
import BlockSearchRelation from "./BlockSearchRelation.vue";

const followBlockData = ref<FollowBlock>();
const isExpanded = ref(false);
const codeOrigin = ref<string>("");
const codePretty = ref<string>("");

const { name, enablePretty } = defineProps<{
  name: string;
  enablePretty: boolean;
}>();
const onClick = () => {
  isExpanded.value = !isExpanded.value;
};

watch(
  () => isExpanded.value,
  async (isExpanded) => {
    try {
      if (isExpanded && followBlockData.value === undefined) {
        const data = await fetchBlockFile(name as string);
        if (data) {
          followBlockData.value = data;
          const code = getCodeOriginAndPretty(data);
          if (code) {
            codeOrigin.value = code.origin;
            codePretty.value = code.pretty;
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
);
</script>

<template>
  <div className="flex-col w-full">
    <div
      role="button"
      className="flex h-12 w-full items-center justify-start border-2 rounded-md"
      :onClick="onClick"
    >
      <ChevronDown v-if="isExpanded" />
      <ChevronRight v-else />
      {{ name }}
    </div>
    <div v-if="isExpanded && followBlockData" className="pl-2">
      <pre className="flex h-auto my-0 rounded-md text-wrap"> 
        <p v-if="enablePretty && codePretty.length > 0" v-html="codePretty"></p> 
        <p v-else v-html="codeOrigin"></p> 
      </pre>
      <ProofDetailCard
        v-if="followBlockData && followBlockData.proof.length > 0"
        :name="name"
        :enablePretty="enablePretty"
        :data="followBlockData"
      />
      <BlockSearchRelation
        title="Parent"
        :nameList="followBlockData.parent"
        :enablePretty="enablePretty"
      />
    </div>
  </div>
</template>
