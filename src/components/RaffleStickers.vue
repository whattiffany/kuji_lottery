<template>
  <el-row>
    <el-col
      :span="4"
      v-for="stickerIndex in turnPage.totalNum"
      :key="stickerIndex"
      @click="openModel(turnPage.data[stickerIndex - 1], stickerIndex - 1)"
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
  <transition name="fade" appear>
    <div v-if="modalVisible" class="model">
      <div class="model-text-bg">
        <span class="model-text">{{ hightlight_title }}</span>
        <br />
        <span class="model-text-sub">{{ hightlight_content }}</span>
      </div>
    </div>
  </transition>
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
    for (let i = 1; i <= this.turnPage.totalNum; i++) {
      this.onTurn("sticker_" + i);
    }
    this.shuffleArr(this.turnPage.data);
  },
  setup(props) {
    const modalVisible = ref(false);
    const hightlight_title = ref("");
    const hightlight_content = ref("");
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
          // when: {
          //   turning: function (event) {
          //     console.log(event);
          //     // openModel(data.turnPage.data[id - 1]);
          //   },
          // },
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

    const openModel = (val, index) => {
      data.turnPage.data[index].opened = true;
      console.log(data.turnPage.data);
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

    return {
      ...data,
      onTurn,
      shuffleArr,
      openModel,
      modalVisible,
      hightlight_title,
      hightlight_content,
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
.model {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  font-family: "luoyan";
  font-weight: 500;
  width: 500px;
  height: 500px;
  text-align: center;
  background-image: url("~@/assets/gif/spotlight.gif");
  background-size: cover;
}
.model-text-bg {
  border-radius: 3%;
  background: rgba(255, 255, 255, 0.5);
  margin-top: 20%;
}
.model-text {
  font-size: 120px;
  line-height: 100px;
}
.model-text-sub {
  font-size: 70px;
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
</style>
