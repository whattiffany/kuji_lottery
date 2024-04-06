<template>
  <PrizeForm></PrizeForm>
  <RaffleStickers></RaffleStickers>
</template>

<script>
import RaffleStickers from "../components/RaffleStickers.vue";
import PrizeForm from "../components/PrizeForm.vue";
export default {
  components: {
    RaffleStickers,
    PrizeForm,
  },
};
</script>

<style>
.el-form {
  width: 300px;
}
</style>
