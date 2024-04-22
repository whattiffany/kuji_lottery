<template>
  <PrizeForm></PrizeForm>
</template>

<script>
import { reactive } from "vue";
import PrizeForm from "../components/PrizeForm.vue";

export default {
  components: {
    PrizeForm,
  },
  setup() {
    const prizeGroup = reactive({
      prizeItems: [],
    });

    return {
      prizeGroup,
    };
  },
};
</script>

<style>
.el-form {
  width: 300px;
}
</style>
