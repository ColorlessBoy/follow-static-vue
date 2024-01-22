<script setup lang="ts">
import { ChevronDown, ChevronRight } from "lucide-vue-next";
import { ref } from "vue";

const { origin, pretty, enablePretty } = defineProps<{
  origin: string;
  pretty: string;
  enablePretty: boolean;
}>();
const isExpanded = ref(true);
const onClick = () => {
  isExpanded.value = !isExpanded.value;
};
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
      Code
    </div>
    <pre v-if="isExpanded" className="flex h-auto my-0 rounded-md text-wrap"> 
    <p v-if="enablePretty && pretty.length > 0" v-html="pretty"></p> 
    <p v-else v-html="origin"></p> 
  </pre>
  </div>
</template>
