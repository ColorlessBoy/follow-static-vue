<script setup lang="ts">
import {
  fetchBlockFile,
  getCodeOriginAndPretty,
  type FollowBlock,
} from "@/types/data";
import { ChevronRight, ChevronDown, X } from "lucide-vue-next";
import { ref, watch } from "vue";
import ProofDetailCard from "./ProofDetailCard.vue";
import BlockSearchRelation from "./BlockSearchRelation.vue";
import CodeDetailCard from "./CodeDetailCard.vue";
import { useBlockMenu } from "@/stores/blockMenu";

const followBlockData = ref<FollowBlock>();
const codeOrigin = ref<string>("");
const codePretty = ref<string>("");

const { id, enablePretty, onDelete } = defineProps<{
  id: number;
  enablePretty: boolean;
  onDelete: () => void;
}>();
const blockMenu = useBlockMenu();
const blockMenuRoot = blockMenu.getById(id);
const onClick = () => {
  if (blockMenuRoot) {
    blockMenuRoot.isExpanded = !blockMenuRoot.isExpanded;
  }
};

watch(
  () => blockMenuRoot?.isExpanded,
  async (isExpanded) => {
    try {
      if (isExpanded && followBlockData.value === undefined && blockMenuRoot) {
        const data = await fetchBlockFile(blockMenuRoot.name as string);
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
      <ChevronDown v-if="blockMenuRoot?.isExpanded" />
      <ChevronRight v-else />
      <div className="flex w-full items-center justify-between">
        {{ blockMenuRoot?.name }}
        <button
          className=" flex items-center justify-center w-6 h-6 rounded-full mr-2 hover:border-2"
          :onClick="onDelete"
        >
          <X />
        </button>
      </div>
    </div>
    <div v-if="followBlockData" className="pl-2">
      <div :className="blockMenuRoot?.isExpanded ? 'block' : 'hidden'">
        <CodeDetailCard
          :origin="codeOrigin"
          :pretty="codePretty"
          :enablePretty="enablePretty"
        />
        <ProofDetailCard
          v-if="followBlockData && followBlockData.proof.length > 0"
          :name="followBlockData.name"
          :enablePretty="enablePretty"
          :data="followBlockData"
        />
        <BlockSearchRelation
          title="Parent"
          v-if="blockMenuRoot"
          :id="blockMenuRoot.id"
          :nameList="followBlockData.parent"
          :enablePretty="enablePretty"
        />
      </div>
    </div>
  </div>
</template>
