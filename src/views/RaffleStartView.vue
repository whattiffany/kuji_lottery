<template>
  <RaffleStickers :data="shuffleArr(JSON.parse(formData))"></RaffleStickers>
</template>
<script>
import { reactive } from "vue";
import RaffleStickers from "../components/RaffleStickers.vue";
export default {
  name: "RaffleStart",
  props: ["formData"],
  components: { RaffleStickers },
  setup(props) {
    const data = reactive({
      formData: props.formData,
    });

    const shuffleArr = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      console.log(array);
      return array;
    };

    return {
      ...data,
      shuffleArr,
    };
  },
};
</script>
