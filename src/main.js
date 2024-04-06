import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// 將 Element Plus 的圖示組件註冊到應用程式中
for (const [name, comp] of Object.entries(ElementPlusIconsVue)) {
  app.component(name, comp);
}

// 使用路由器和 Element Plus
app.use(router);
app.use(ElementPlus);

// 將應用程式掛載到 #app 上
app.mount("#app");
