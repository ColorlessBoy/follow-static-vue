import { ref } from "vue";
import { defineStore } from "pinia";

export const useSidebarExpanded = defineStore(
  "sidebarExpanded",
  () => {
    const expanded = ref(false);
    function change() {
      expanded.value = !expanded.value;
    }
    return { expanded, change };
  },
  { persist: true },
);
