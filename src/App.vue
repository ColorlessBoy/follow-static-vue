<script setup lang="ts">
import { RouterView } from "vue-router";
import TheSidebar from "./components/TheSidebar.vue";
</script>

<template>
  <div
    className="z-0 fixed top-0 left-0 h-screen w-screen bg-vuebg-light text-vuefg-light dark:bg-vuebg-dark dark:text-vuefg-dark"
  ></div>
  <div
    className="flex justify-center h-full w-full bg-vuebg-light text-vuefg-light dark:bg-vuebg-dark dark:text-vuefg-dark"
  >
    <TheSidebar />
    <div className="z-10 h-full overflow-auto">
      <RouterView />
    </div>
  </div>
</template>
