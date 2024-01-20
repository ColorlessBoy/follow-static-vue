import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import FileView from "@/views/FileView.vue";
import { fetchJsonFile } from "@/types/data";

export const fetchDataRouter = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  try {
    const data = await fetchJsonFile(to.params.id as string);
    if (data === undefined) {
      console.error("File does not exist.");
      next("/not-found");
    }
    to.meta.data = data;
    next();
  } catch (error) {
    console.error("Error fetching data:", error);
    next("/not-found");
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/file/:id",
      name: "file",
      component: FileView,
      beforeEnter: fetchDataRouter,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
