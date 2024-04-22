<template>
  <div
    v-if="stickerloading"
    v-loading="stickerloading"
    style="width: 100%; text-align: center; padding-top: 20%"
  >
    籤紙產生中...
  </div>
  <div v-else>
    <RaffleStickers :data="shuffleArr(JSON.parse(formData))"></RaffleStickers>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import RaffleStickers from "../components/RaffleStickers.vue";
export default {
  name: "RaffleStart",
  props: ["formData"],
  components: { RaffleStickers },
  mounted() {
    setTimeout(() => {
      this.stickerloading = false;
    }, 4000);
  },
  setup(props) {
    const stickerloading = ref(true);
    const data = reactive({
      formData: props.formData,
    });

    const shuffleArr = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    return {
      ...data,
      shuffleArr,
      stickerloading,
    };
  },
};
</script>
