<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-header>
      <router-link class="router-link" to="/home" index="1-1">
        <el-icon><Goods /></el-icon>
        <span class="toolbar"> Alex Japan Store (測試版v1.0)</span>
      </router-link>
      <!-- <div class="toolbar">
        <el-dropdown>
          <el-icon
            :size="20"
            color="#FFFFFF"
            style="margin-right: 8px; margin-top: 1px"
            ><Setting
          /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span class="login-name">Alex</span>
      </div> -->
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-scrollbar>
          <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-menu-item index="1">
              <router-link class="router-link" to="/raffleSetting" index="1-1">
                <el-icon><SetUp /></el-icon
                ><template #title>集單</template></router-link
              >
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <div class="collapse">
        <el-icon v-if="isCollapse" @click="handleOpen"><DArrowRight /></el-icon>
        <el-icon v-else @click="handleOpen"><DArrowLeft /></el-icon>
        <!-- <el-icon><DArrowRight /></el-icon> -->
      </div>
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
import { ref } from "vue";
import {
  Expand,
  Menu as Message,
  Setting,
  Goods,
  SetUp,
} from "@element-plus/icons-vue";
export default {
  name: "BaseLayout",
  setup() {
    const isCollapse = ref(true);
    const handleOpen = () => {
      isCollapse.value = !isCollapse.value;
    };
    return {
      isCollapse,
      handleOpen,
      Message,
      Setting,
      Expand,
      Goods,
      SetUp,
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

.layout-container-demo .el-header {
  position: relative;
  color: #fffffe;
  background-color: #004643;
  border-bottom: 3px solid #000;
  font-weight: 500;
}

.layout-container-demo .el-menu {
  /* border-bottom: 3px solid #000; */
  font-weight: 500;
  background-color: #e8e4e6;
}
.layout-container-demo .el-menu .el-sub-menu__title:hover {
  background-color: #abd1c6;
}
.el-menu-item:hover {
  background-color: #abd1c6;
}
.layout-container-demo .toolbar {
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
  padding-left: 10px;
}
.login-name {
  color: #ffffff;
}
.el-aside {
  border-right: 3px solid #000;
  /* border-radius: 5px; */
  background-color: #e8e4e6;
}
.el-container {
  min-height: 100vh;
}
.el-footer {
  width: 100%;
  height: 30px;
  background-color: #abd1c6;
  /* color: #a6a9ad; */
  text-align: center;
  line-height: 30px;
  border-top: 3px solid #000;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.collapse {
  font-size: 30px;
  padding: 10px;
}
</style>
