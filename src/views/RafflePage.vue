<template>
  <RaffleStickers></RaffleStickers>
</template>

<script>
import RaffleStickers from "../components/RaffleStickers.vue";
export default {
  components: {
    RaffleStickers,
  },
  data() {
    return {
      winner: false,
    };
  },
  methods: {
    participate() {
      this.winner = true;
    },
  },
};
</script>

<style>
/* 这里可以添加样式 */
</style>
