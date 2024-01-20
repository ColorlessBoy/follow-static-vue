<script setup lang="ts">
import { fetchBlockFile, type FollowBlock } from "@/types/data";
import { ChevronRight, ChevronDown } from "lucide-vue-next";
import { ref, watch } from "vue";

const followBlockData = ref<FollowBlock>();
const isExpanded = ref(false);

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
      className="flex h-8 w-full items-center justify-start"
      :onClick="onClick"
    >
      <ChevronDown v-if="isExpanded" />
      <ChevronRight v-else />
      Proof Details
    </div>
    <div v-if="isExpanded" className="px-2 rounded-md border-2">
      <details
        v-for="(proofblock, idx) in followBlockData?.proof"
        :key="idx"
        className="space-y-0"
      >
        <summary>
          {{ enablePretty ? proofblock.stmt.pretty : proofblock.stmt.origin }}
        </summary>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <pre className="m-0 rounded-md w-full px-2 py-0"> 
            <p v-html="enablePretty ? proofblock.body.pretty : proofblock.body.origin" className="text-wrap p-0 m-0"></p>
          </pre>
          <pre className="m-0 rounded-md w-full px-2 py-0"> 
            <p v-html="enablePretty ? proofblock.body.pretty : proofblock.body.origin" className="text-wrap p-0 m-0"></p>
          </pre>
        </div>
      </details>
    </div>
  </div>
</template>
