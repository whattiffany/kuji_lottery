<template>
  <el-row>
    <!-- 生成五个与 id 为 "book" 的元素 -->
    <el-col :span="4" v-for="replicate in turnPage.totalNum" :key="replicate">
      <div
        :id="'book_' + replicate"
        class="book grid-content"
        v-if="turnPage.show"
      >
        <div
          class="sticker"
          v-for="(item, index) in turnPage.imageList"
          :key="index"
          :style="{
            // width: '280px',
            // height: '210px',
            backgroundImage: `url( ${require('@/assets/images/' + item)} )`,
            backgroundSize: 'contain,cover',
          }"
        >
          <div class="result" v-if="index != 0">A</div>
        </div>
      </div>
    </el-col>
  </el-row>
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
        width: 160,
        height: 120,
        imageList: ["sticker.png", "sticker-back.png"],
        totalNum: 12,
        loading: false,
        show: true,
      },
    };
  },
  methods: {
    // 套用onTurn方法
    onTurn(id) {
      // let that = this;
      this.$nextTick(() => {
        $("#" + id).turn({
          acceleration: true,
          display: "single",
          duration: 1500,
          page: 1,
          gradients: true,
          autoCenter: true,
          turnCorners: "tl,tr",
          height: this.turnPage.height,
          width: this.turnPage.width,
          // when: {
          //   turning: function (e, page, view) {
          //     console.log("翻页前触发");
          //     console.log(e, page, view);
          //     console.log(page);
          //   },
          //   turned: function (e, page) {
          //     console.log("翻页后触发");
          //     console.log(e, page);
          //     console.log(page);
          //   },
          // },
        });
      });
    },
  },
  created() {},
  mounted() {
    // 对每个生成的元素应用onTurn方法
    for (let i = 1; i <= this.turnPage.totalNum; i++) {
      this.onTurn("book_" + i);
    }
  },
};
</script>

<style scoped>
/* .book {
  width: 280px;
  height: 210px;
}
.sticker {
  vertical-align: middle;
  line-height: 200px;
  text-align: center;
} */
.el-col {
  margin-bottom: 20px;
}
.result {
  font-size: 55px;
  text-align: center;
}
</style>
