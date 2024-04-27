<template>
  <div
    v-if="stickerloading"
    v-loading="stickerloading"
    style="width: 100%; text-align: center; padding-top: 20%"
  >
    籤紙產生中...
  </div>
  <div v-else>
    <el-row :gutter="10">
      <el-col :span="6">
        <CountTable :tableData="prizeData" />
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-col
            :span="6"
            v-for="stickerIndex in turnPage.totalNum"
            :key="stickerIndex"
            @click="
              openModel(turnPage.data[stickerIndex - 1], stickerIndex - 1)
            "
          >
            <RaffleStickers
              :stickerIndex="stickerIndex"
              :data="turnPage.data[stickerIndex - 1]"
            ></RaffleStickers>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
  <transition name="fade" appear>
    <div v-if="modalVisible" class="model">
      <div class="close">
        <el-icon @click="closeModel">
          <Close />
        </el-icon>
      </div>
      <div class="model-text-bg" :class="{ 'model-gif': show_gif }">
        <div>
          <span>恭喜獲得</span>
          <br />
          <span class="model-text">{{ hightlight_title }}</span>
          <br />
          <span class="model-text-sub">{{ hightlight_content }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { reactive, ref } from "vue";
import RaffleStickers from "../components/RaffleStickers.vue";
import CountTable from "../components/PrizeCountTable";
import { Close } from "@element-plus/icons-vue";
export default {
  name: "RaffleStart",
  props: ["formData"],
  components: { RaffleStickers, CountTable },
  mounted() {
    setTimeout(() => {
      this.turnPage.data = this.shuffleArr(this.turnPage.data);
      this.stickerloading = false;
      this.prizeData = this.countPrize();
    }, 4000);
  },
  setup(props) {
    const stickerloading = ref(true);
    const show_gif = ref(false);
    const prizeData = ref(null);
    const data = reactive({
      formData: props.formData,
      turnPage: {
        width: 160,
        height: 120,
        imageList: ["sticker.png", "sticker-back.png"],
        totalNum: JSON.parse(props.formData).length,
        data: JSON.parse(props.formData),
        loading: false,
        show: true,
      },
      // prizeData: null,
    });

    const shuffleArr = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const modalVisible = ref(false);
    const hightlight_title = ref("");
    const hightlight_content = ref("");

    const countPrize = () => {
      let openedCounts = data.turnPage.data.reduce((acc, item) => {
        if (!acc[item.name]) acc[item.name] = { true: 0, false: 0 };
        acc[item.name][item.opened] += 1;
        return acc;
      }, {});

      return Object.keys(openedCounts)
        .map((name) => ({
          name: name,
          openedTrue: openedCounts[name].true,
          openedFalse: openedCounts[name].false,
          total: openedCounts[name].true + openedCounts[name].false,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    };

    const openModel = (val, index) => {
      data.turnPage.data[index].opened = true;
      show_gif.value = false;
      if (data.turnPage.data[index].note) {
        show_gif.value = true;
      }
      prizeData.value = countPrize();
      setTimeout(() => {
        modalVisible.value = true;
        hightlight_title.value = val.name;
        hightlight_content.value = val.sub_name;
        // 自動消失
        // setTimeout(() => {
        //   modalVisible.value = false;
        // }, "4000");
      }, "500");
    };

    const closeModel = () => {
      modalVisible.value = false;
    };

    return {
      ...data,
      countPrize,
      shuffleArr,
      stickerloading,
      openModel,
      closeModel,
      Close,
      modalVisible,
      hightlight_title,
      hightlight_content,
      show_gif,
      prizeData,
    };
  },
};
</script>
<style>
.el-col {
  margin-bottom: 20px;
}
.model {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  font-family: "luoyan";
  font-weight: 500;
  width: 400px;
  height: 350px;
  text-align: center;
  background: #fff;
  border-radius: 3%;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.3);
}
.model-gif {
  background-image: url("~@/assets/gif/spotlight.gif");
  background-size: cover;
}
.model-text-bg {
  font-size: 30px;
  height: 100%;
}
.model-text {
  font-size: 120px;
  line-height: 100px;
}
.model-text-sub {
  font-size: 40px;
  line-height: 70px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 0.6;
}
.close {
  text-align: right;
  font-size: 25px;
  padding: 10px;
}
.total-count {
}
</style>
