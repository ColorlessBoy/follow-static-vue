<script setup lang="ts">
import FollowLogoIcon from "./icons/FollowLogoIcon.vue";
</script>

<template>
  <RouterLink to="/">
    <div className="flex h-7 items-center justify-center gap-x-2 transition">
      <FollowLogoIcon className="h-7 w-7" />
      <p className="text-lg text-neutral-700">Follow</p>
    </div>
  </RouterLink>
</template>
