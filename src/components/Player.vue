<template>
  <el-table
    :data="playerData"
    :header-cell-style="{ backgroundColor: '#abd1c6', color: '#4d4e52' }"
    style="width: 100%"
    :summary-method="getSummaries"
    show-summary
    sortable
    :default-sort="{ prop: 'index', order: 'descending' }"
    border
  >
    <el-table-column prop="index" label="#" width="70" />
    <el-table-column prop="name" label="姓名" />

    <el-table-column prop="prizes" label="獎項" />
  </el-table>
  <template v-if="lastLottery">
    <RandomSetup
      :players="lotteryPlayers"
      :startRandom="startRandom"
    ></RandomSetup>
  </template>
</template>
<script>
import { reactive, h, watch, ref } from "vue";

import RandomSetup from "../components/RandomSetup.vue";
export default {
  name: "PlayerTable",
  props: ["endPlayers", "totalCount"],
  components: { RandomSetup },
  mounted() {},
  setup(props) {
    const lastLottery = ref(false);
    const startRandom = ref(false);
    const lotteryPlayers = ref(null);
    const data = reactive({
      playerData: props.endPlayers,
      total: props.totalCount,
      lotteryPlayers: null,
    });

    const getSummaries = (param) => {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = h("div", { style: { textDecoration: "underline" } }, [
            "總數",
          ]);
          return;
        }
        if (index == 2) {
          const values = data.map((item) => item[column.property]);
          const totalLetters = values.reduce((prev, curr) => {
            const parts = curr.split(",");
            const letterCount = parts.reduce(
              (sum, part) => sum + part.trim().length,
              0
            );
            return prev + letterCount;
          }, 0);
          sums[index] = totalLetters;
          if (totalLetters == props.totalCount && totalLetters != 0) {
            lottery();
            lastLottery.value = true;
          }
        }
      });

      return sums;
    };

    const lottery = () => {
      let players = [];
      data.playerData.forEach((element) => {
        var i;
        for (i = 1; i <= element.number; i += 1) {
          players.push(element.name);
        }
      });
      lotteryPlayers.value = players;
      startRandom.value = true;
    };

    watch(
      () => props.endPlayers,
      (newVal) => {
        data.playerData = newVal;
      }
    );
    return {
      ...data,
      getSummaries,
      lastLottery,
      lottery,
      RandomSetup,
      startRandom,
      lotteryPlayers,
    };
  },
};
</script>
