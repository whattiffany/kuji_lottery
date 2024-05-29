<template>
  <div class="random-number">
    <span class="random">最後賞：{{ currentNumber }}</span>
    <el-button type="primary" @click="startRandomFunc">開始電選</el-button>
  </div>
  <audio
    ref="sound"
    :src="`${require('@/assets/sound/random.mp3')}`"
    @ended="playSecondSound"
  ></audio>
  <audio
    ref="sound2"
    :src="`${require('@/assets/sound/congrate.mp3')}`"
  ></audio>
  <Dialog
    :dialogVisible="waringDialog"
    title="最後賞得主"
    :content="warningContent"
    @closeDialog="closeDialog"
  ></Dialog>
</template>

<script>
import { ref, onUnmounted, reactive, watch } from "vue";
import Dialog from "../components/dialog.vue";
export default {
  props: ["startRandom", "players"],
  components: { Dialog },
  setup(props) {
    const waringDialog = ref(false);
    const warningContent = ref("");
    const currentNumber = ref(1);
    const sound = ref(null);
    const sound2 = ref(null);
    const data = reactive({
      players: props.players,
    });
    let timer = null;

    const startRandomFunc = () => {
      sound.value.play();
      if (timer) return; // 避免重複啟動計時器
      timer = setInterval(() => {
        currentNumber.value =
          Math.floor(Math.random() * data.players.length) + 1; // 0 到 N 隨機數
      }, 100);
      setTimeout(() => {
        clearInterval(timer);
        timer = null;
        waringDialog.value = true;
        warningContent.value =
          "！恭喜第" +
          currentNumber.value +
          "號：" +
          data.players[currentNumber.value - 1] +
          "！";
      }, 3500); // 3秒後自動停止
    };

    const playSecondSound = () => {
      sound2.value.play();
    };

    const closeDialog = (val) => {
      waringDialog.value = val;
    };

    // 組件卸載時清理計時器
    onUnmounted(() => {
      if (timer) {
        clearInterval(timer);
      }
    });
    watch(
      () => props.players,
      (newVal) => {
        data.players = newVal;
      }
    );

    return {
      currentNumber,
      startRandomFunc,
      Dialog,
      waringDialog,
      warningContent,
      closeDialog,
      sound,
      sound2,
      playSecondSound,
    };
  },
};
</script>

<style scoped>
.random-number h1 {
  font-size: 48px;
  margin: 20px;
  text-align: center;
}
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.random {
  font-size: 18px;
  font-weight: 500;
  padding: 5px;
}
</style>
