import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "@/components/BaseLayout.vue";
import Home from "../views/HomeView.vue";
import Raffle from "../views/RaffleStartView.vue";
import RaffleSetting from "../views/RaffleSettingView.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: BaseLayout,
      children: [
        {
          path: "home",
          component: Home,
        },
        {
          path: "raffle",
          name: "RaffleStart",
          component: Raffle,
          props: true,
        },
        {
          path: "raffleSetting",
          component: RaffleSetting,
        },
      ],
    },
  ],
});

export default router;
