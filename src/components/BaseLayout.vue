<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-header style="text-align: right; font-size: 12px">
      <div class="toolbar">
        <el-dropdown>
          <el-icon
            :size="20"
            color="#FFFFFF"
            style="margin-right: 8px; margin-top: 1px"
            ><Setting
          /></el-icon>
          <!-- <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template> -->
        </el-dropdown>
        <span class="login-name">Alex</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-openeds="['1', '3']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><DataLine /></el-icon>功能列
              </template>
              <router-link class="router-link" to="/raffle" index="1-1"
                ><el-menu-item>自製集單</el-menu-item></router-link
              >

              <router-link class="router-link" to="/home" index="1-2"
                ><el-menu-item>一番賞集單</el-menu-item></router-link
              >
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
    <el-footer
      >Copyright © 2024 TiffanyLin (AlexJapanStore). All rights
      reserved.</el-footer
    >
  </el-container>
</template>

<script>
// import { ref } from "vue";
import { DataLine, Menu as Message, Setting } from "@element-plus/icons-vue";
export default {
  name: "BaseLayout",
  data() {
    return {
      Message,
      Setting,
      DataLine,
    };
  },
};
</script>

<style>
.router-link {
  text-decoration: none; /* 移除連結的底線 */
  color: inherit; /* 繼承父元素的文字顏色 */
}
.router-link:hover {
  color: inherit; /* 滑鼠移至時保持文字顏色不變 */
}
.layout-container-demo {
  padding-bottom: 30px;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: #0071af;
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .toolbar {
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.login-name {
  color: #ffffff;
}
.el-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  background-color: #f5f7fa;
  color: #a6a9ad;
  text-align: center;
  line-height: 30px;
}
</style>
