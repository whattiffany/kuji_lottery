<template>
  <el-row v-loading="stickerloading" element-loading-text="製作中...">
    <el-col
      :span="4"
      v-for="stickerIndex in turnPage.totalNum"
      :key="stickerIndex"
    >
      <div
        :id="'sticker_' + stickerIndex"
        class="sticker grid-content"
        v-if="turnPage.show"
      >
        <div
          class="sticker"
          v-for="(item, index) in turnPage.imageList"
          :key="index"
          :style="{
            backgroundImage: `url( ${require('@/assets/images/' + item)} )`,
            backgroundSize: 'contain,cover',
          }"
        >
          <span style="padding-left: 5px">{{ stickerIndex }}</span>
          <div class="result" v-if="index != 0">
            <span class="big-res">{{
              turnPage.data[stickerIndex - 1].name
            }}</span>
            <br />
            <span class="small-res">{{
              turnPage.data[stickerIndex - 1].sub_name
            }}</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import $ from "jquery";
import "turn.js";
import { reactive, nextTick, ref } from "vue";
export default {
  name: "RafflePage",
  components: {},
  props: ["data"],
  mounted() {
    // 对每个生成的元素应用onTurn方法
    for (let i = 1; i <= this.turnPage.totalNum; i++) {
      this.onTurn("sticker_" + i);
    }
    this.shuffleArr(this.turnPage.data);
  },
  setup(props) {
    const stickerloading = ref(false);
    const data = reactive({
      turnPage: {
        width: 160,
        height: 120,
        imageList: ["sticker.png", "sticker-back.png"],
        totalNum: props.data.length,
        data: props.data,
        loading: false,
        show: true,
      },
    });
    const onTurn = (id) => {
      nextTick(() => {
        $("#" + id).turn({
          acceleration: true,
          display: "single",
          duration: 1500,
          page: 1,
          gradients: true,
          autoCenter: true,
          turnCorners: "tl,tr",
          height: data.turnPage.height,
          width: data.turnPage.width,
          when: {
            turning: function (event) {
              console.log(event);
            },
          },
        });
      });
    };

    const shuffleArr = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const loadingInit = () => {
      setTimeout(() => {
        console.log("五秒已过，执行下一步操作");
        stickerloading.value = false;
      }, 5000);
    };

    return {
      ...data,
      onTurn,
      loadingInit,
      shuffleArr,
      stickerloading,
    };
  },
};
</script>

<style scoped>
.el-col {
  margin-bottom: 20px;
}
.result {
  text-align: center;
  color: #6b6d71;
  font-family: "luoyan";
  height: 80%;
}
.big-res {
  font-size: 85px;
  line-height: 60px;
}
.small-res {
  font-size: 25px;
  line-height: 15px;
}
</style>
