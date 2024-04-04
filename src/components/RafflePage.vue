<template>
  <div class="container" ref="container">
    <div class="view" :style="{ height: '80px' }">
      <div id="book" class="book" v-if="turnPage.show">
        <div
          class="sticker"
          v-for="(item, index) in turnPage.imageList"
          :key="index"
          :style="{
            width: '280px',
            height: '210px',
            backgroundImage: `url( ${require('@/assets/images/' + item)} )`,
            backgroundSize: 'contain,cover',
          }"
        >
          <div class="result" v-if="index != 0">A</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "turn.js";
export default {
  name: "RafflePage",
  components: {},
  props: {},
  data() {
    return {
      turnPage: {
        width: 280,
        height: 210,
        imageList: ["sticker.png", "sticker-back.png"],
        currentPage: 1,
        totalPage: 1,
        loading: false,
        show: true,
      },
    };
  },
  methods: {
    getRandomColor() {
      // 生成隨機背景顏色函數
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },
    onTurn() {
      let that = this;
      this.$nextTick(() => {
        $("#book").turn({
          //启用硬件加速,移动端有效
          acceleration: false,
          //显示：single=单页，double=双页，默认双页
          display: "single",
          // 翻页撒开鼠标，页面的延迟
          duration: 1500,
          // 默认显示第几页
          page: 1,
          // 折叠处的光泽渐变，主要体现翻页的立体感、真实感
          gradients: true,
          // 中心翻取决于有多少页面可见 true or false
          autoCenter: false,
          // 设置可翻页的页角(都试过了，乱写 4个角都能出发卷起)， bl,br   tl,tr   bl,tr
          turnCorners: "bl,tr",
          //页面高度
          height: this.turnPage.height,
          //翻书范围宽度，总宽度
          width: this.turnPage.width,
          when: {
            //监听事件
            turning: function (e, page, view) {
              console.log("翻页前触发");
              console.log(e, page, view);
              // 翻页前触发
              console.log(page);
            },
            turned: function (e, page) {
              console.log("翻页后触发");
              console.log(e, page);
              // 翻页后触发
              console.log(page);
              let length = that.turnPage.imageList.length;
              that.turnPage.currentPage = page < length ? page : length;
            },
          },
        });
      });
    },
  },
  created() {},
  mounted() {
    this.turnPage.totalPage = this.turnPage.imageList.length;
    this.onTurn();
  },
};
</script>

<style scoped>
#book {
  width: 280px;
  height: 210px;
}
.sticker {
  vertical-align: middle;
  line-height: 200px;
  text-align: center;
}
.result {
  font-size: 55px;
  text-align: center;
}
</style>
