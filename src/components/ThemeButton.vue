<script setup lang="ts">
import { useColorMode, useCycleList } from "@vueuse/core";
import { watch } from "vue";
import { Sun, Moon, SunMoon } from "lucide-vue-next";
const mode = useColorMode({ emitAuto: true });
const { state, next } = useCycleList(["auto", "dark", "light"], {
  initialValue: mode.value,
});
watch([state], () => (mode.value = state.value as any));
</script>

<template>
  <button @click="next()">
    <Sun v-if="state === 'light'" />
    <Moon v-if="state === 'dark'" />
    <SunMoon v-if="state === 'auto'" />
  </button>
</template>
