<script setup lang="ts">
import CodeCardButton from "./CodeCardButton.vue";
import ProofDetailCard from "./ProofDetailCard.vue";
const { name, origin, pretty, enablePretty, onClick } = defineProps<{
  name: string;
  origin: string;
  pretty: string;
  enablePretty: boolean;
  onClick: () => void;
}>();
const isThm = origin.startsWith("thm");
</script>

<template>
  <div className="flex-col">
    <div
      v-if="pretty.length > 0"
      className="flex justify-start text-center text-sm"
    >
      <CodeCardButton v-if="enablePretty" text="Pretty" :onclick="onClick" />
      <CodeCardButton v-else text="Origin" :onClick="onClick" />
    </div>
    <pre className="flex h-auto my-0 rounded-md text-wrap"> 
      <p v-if="enablePretty && pretty.length > 0" v-html="pretty"></p> 
      <p v-else v-html="origin"></p> 
    </pre>
    <ProofDetailCard v-if="isThm" :name="name" :enable-pretty="enablePretty" />
  </div>
</template>
