import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
// 坑
//import 'element-plus/lib/theme-chalk/index.css'
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(ElementPlus);
app.mount("#app");
