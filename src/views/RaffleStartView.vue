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
        <p>新增玩家：</p>
        <el-form
          ref="formRef"
          :inline="true"
          label-position="left"
          label-width="auto"
          :model="player"
          style="max-width: 600px"
        >
          <el-form-item
            label="名稱"
            prop="name"
            :rules="[{ required: true, message: '必填' }]"
          >
            <el-input
              v-model="player.name"
              placeholder="群組暱稱"
              type="text"
              autocomplete="off"
              :disabled="!playerloading"
            />
          </el-form-item>
          <el-form-item
            label="抽數"
            prop="number"
            placeholder="數字"
            width="50"
            :rules="[
              { required: true, message: '必填' },
              { type: 'number', message: '請輸入數字' },
            ]"
          >
            <el-input
              v-model.number="player.number"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="addPlayer">增加</el-button>
          </el-form-item>
        </el-form>
        <br />
        <p>即時開獎情況：</p>
        <CountTable :tableData="prizeData" />
        <br />
        <p>已結束的玩家：</p>
        <PlayerTable :endPlayers="playerlist"></PlayerTable>
      </el-col>
      <el-col :span="18" class="black">
        <el-row>
          <el-col :span="12">
            <p>目前參加人：</p>
            <el-alert
              v-if="playerTitle"
              :title="playerTitle"
              type="success"
              :description="playerContent"
              show-icon
              :closable="false"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            v-for="stickerIndex in turnPage.totalNum"
            :key="stickerIndex"
          >
            <RaffleStickers
              :stickerIndex="stickerIndex"
              :data="turnPage.data[stickerIndex - 1]"
              @turnedIndex="
                openModel(turnPage.data[stickerIndex - 1], stickerIndex - 1)
              "
            ></RaffleStickers>
          </el-col>
          <div v-if="playerloading" class="standby-mask">
            <el-alert
              :title="playerloadingText"
              type="info"
              center
              :closable="false"
            />
          </div>
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
  <Dialog
    :dialogVisible="waringDialog"
    :content="warningContent"
    @closeDialog="closeDialog"
  ></Dialog>
</template>
<script>
import $ from "jquery";
import "turn.js";
import { reactive, ref } from "vue";
import RaffleStickers from "../components/RaffleStickers.vue";
import CountTable from "../components/PrizeCountTable";
import PlayerTable from "../components/Player";
import Dialog from "../components/dialog.vue";
import { Close } from "@element-plus/icons-vue";
export default {
  name: "RaffleStart",
  props: ["formData"],
  components: { RaffleStickers, CountTable, PlayerTable, Dialog },
  mounted() {
    setTimeout(() => {
      this.turnPage.data = this.shuffleArr(this.turnPage.data);
      this.stickerloading = false;
      this.prizeData = this.countPrize();
    }, 4000);
  },
  setup(props) {
    const stickerloading = ref(true);
    const playerloading = ref(true);
    const waringDialog = ref(false);
    const warningContent = ref("");
    const playerloadingText = ref("請新增目前玩家後開始遊戲");
    const show_gif = ref(false);
    const prizeData = ref(null);
    const formRef = ref(null);
    const playerTitle = ref(null);
    const playerContent = ref(null);
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
      player: {
        name: "",
        number: 1,
        prizes: [],
      },
      playerlist: [],
      openedIndex: [],
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
      if (data.openedIndex.includes(index + 1)) {
        // console.log("has opened:", data.openedIndex);
        $("#sticker_" + (index + 1)).turn("stop");
        // $("#sticker_" + (index + 1)).bind("end", function (event) {
        //   alert("turn.end:" + event);
        // });
        return;
      } else {
        data.openedIndex.push(index + 1);
      }

      data.turnPage.data[index].opened = true;
      show_gif.value = false;
      if (data.turnPage.data[index].note) {
        show_gif.value = true;
      }
      data.player.prizes.push(val.name);
      let now_prize = data.player.prizes.join(",");
      playerContent.value =
        "目前戰況：" +
        now_prize +
        " (" +
        (data.player.number - data.player.prizes.length) +
        "/" +
        data.player.number +
        ")";
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
      if (data.player.number - data.player.prizes.length == 0) {
        playerloading.value = false;
      }
    };

    const closeModel = () => {
      modalVisible.value = false;
      if (data.player.number - data.player.prizes.length == 0) {
        playerloading.value = true;
        playerloadingText.value = "本次結束，請新增下一位玩家";
        playerCompleted();
      }
    };

    const addPlayer = () => {
      if (data.player.number < 1) {
        waringDialog.value = true;
        warningContent.value = "請輸入1以上(含)的數量";
        return;
      }
      const item = JSON.parse(JSON.stringify(data.player));
      let count = 0;
      playerTitle.value = "**" + item.name + "** 正在抽!";
      playerContent.value =
        "目前戰況：(" + (item.number - count) + "/" + item.number + ")";
      data.player.index = data.playerlist.length + 1;
      playerloading.value = false;
    };

    const playerCompleted = () => {
      const item = JSON.parse(JSON.stringify(data.player));
      playerTitle.value = null;
      playerContent.value = null;
      item.prizes = item.prizes.join(",");
      data.playerlist.push(item);
      data.player.name = "";
      data.player.number = 0;
      data.player.prizes = [];
      playerloading.value = true;
      playerloadingText.value = "請新增目前玩家後開始遊戲";
    };

    const closeDialog = (val) => {
      waringDialog.value = val;
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
      formRef,
      addPlayer,
      playerTitle,
      playerContent,
      playerCompleted,
      playerloading,
      playerloadingText,
      waringDialog,
      warningContent,
      closeDialog,
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
  font-family: "genYoGothic";
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
  font-family: "genYoGothic";
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
.standby-mask {
  background-color: var(--el-mask-color);
  bottom: 0;
  left: 0;
  margin: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity var(--el-transition-duration);
  z-index: 2000;
  text-align: center;
}
</style>
