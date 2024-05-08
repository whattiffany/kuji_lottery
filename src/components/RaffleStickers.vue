<template>
  <div :id="'sticker_' + stickerIndex" class="sticker grid-content">
    <div
      v-for="(item, index) in imageList"
      :key="index"
      :style="{
        backgroundImage: `url( ${require('@/assets/images/' + item)} )`,
        backgroundSize: 'contain,cover',
      }"
    >
      <span style="padding-left: 5px">{{ stickerIndex }}</span>
      <div class="result" v-if="index != 0">
        <div class="alignment-container">
          <el-space>
            <span
              ><span class="big-res">{{ turnPage.data.name }}</span
              >賞</span
            >
            <span class="small-res">{{ turnPage.data.sub_name }}</span>
          </el-space>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "turn.js";
import { reactive, nextTick } from "vue";

export default {
  name: "RafflePage",
  components: {},
  props: ["stickerIndex", "data"],
  mounted() {
    this.onTurn("sticker_" + this.stickerIndex);
  },
  setup(props, ctx) {
    // const click = ref(true);
    const data = reactive({
      stickerIndex: props.stickerIndex,
      imageList: ["sticker.png", "sticker-back.png"],
      turnPage: {
        width: 160,
        height: 120,
        data: props.data,
      },
    });
    const onTurn = (id) => {
      nextTick(() => {
        $("#" + id).turn({
          acceleration: true,
          display: "single",
          duration: 500,
          page: 1,
          gradients: true,
          autoCenter: true,
          turnCorners: "br,tr",
          direction: "rtl",
          height: data.turnPage.height,
          width: data.turnPage.width,
          when: {
            turned: function (event, page) {
              if (page == 2) ctx.emit("turnedIndex", data.stickerIndex);
            },
            last: function () {
              $("#" + id).turn("disable", true);
            },
          },
        });
      });
    };

    return {
      ...data,
      onTurn,
    };
  },
};
</script>

<style scoped>
.sticker {
  border: 3px solid #000;
  border-radius: 5px;
}
.result {
  text-align: center;
  color: #6b6d71;
  font-family: "genYoGothic";
  height: 80%;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
}
.big-res {
  font-size: 50px;
  line-height: 20px;
}
.small-res {
  font-size: 20px;
  line-height: 20px;
}
</style>
