<script setup lang="ts">
import setmmContent from "@/assets/follow-setmm-json/content.json";
import FollowLogo from "./FollowLogo.vue";
import ThemeButton from "./ThemeButton.vue";
import ContentList from "./ContentList.vue";
import TheSearchBar from "./TheSearchBar.vue";
import { ArrowRight, XCircle } from "lucide-vue-next";
import { twMerge } from "tailwind-merge";
import { useSidebarExpanded } from "@/stores/sidebar";

const sidebarExpanded = useSidebarExpanded();

const onClick = () => {
  sidebarExpanded.change();
};
</script>

<template>
  <div>
    <button
      className="z-20 fixed top-0 left-0 w-8 h-8 block border-2 rounded-md bg-vuebg-light text-vuefg-light dark:bg-vuebg-dark dark:text-vuefg-dark"
      :onclick="onClick"
    >
      <ArrowRight />
    </button>
    <aside
      id="sidebar"
      :className="
        twMerge(
          'hidden fixed  top-0 left-0 z-30 h-screen w-[75%] max-w-80 overflow-y-auto bg-vuebg-light dark:bg-vuebg-dark flex-col justify-items-center',
          sidebarExpanded.expanded && 'block',
        )
      "
      aria-label="Sidebar"
    >
      <div
        className="flex h-12 w-full items-center border-b bg-slate-100 pl-4 shadow-sm justify-between"
      >
        <FollowLogo />
        <div className="border-2 rounded-md px-2">
          <RouterLink to="/block">Block</RouterLink>
        </div>
        <div className="flex items-center justify-between space-x-2">
          <ThemeButton />
          <button :onclick="onClick">
            <XCircle />
          </button>
        </div>
      </div>
      <TheSearchBar />
      <ContentList :content="setmmContent" />
    </aside>
  </div>
</template>
