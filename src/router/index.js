import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "@/components/BaseLayout.vue";
import HomePage from "../views/HomePage.vue";
import RafflePage from "../views/RafflePage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: BaseLayout,
      children: [
        {
          path: "home",
          component: HomePage,
        },
        {
          path: "raffle",
          component: RafflePage,
        },
      ],
    },
  ],
});

export default router;
