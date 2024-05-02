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
    <!-- <el-table-column label="＃" width="70">
      <template #default="scope"> {{ scope.$index + 1 }} </template>
    </el-table-column> -->
    <el-table-column prop="index" label="#" width="70" />
    <el-table-column prop="name" label="姓名" />

    <el-table-column prop="prizes" label="獎項" />
  </el-table>
</template>
<script>
import { reactive, h, watch } from "vue";
export default {
  name: "PlayerTable",
  props: ["endPlayers"],
  mounted() {},
  setup(props) {
    const data = reactive({
      playerData: props.endPlayers,
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
        }
      });

      return sums;
    };
    watch(
      () => props.endPlayers,
      (newVal) => {
        console.log(newVal);
        // let newlist = newVal.forEach((item) => {
        //   if (item.name != "") {
        //     item.prizes = item.prizes.join(",");
        //   }
        // });
        data.playerData = newVal;
      }
    );
    return { ...data, getSummaries };
  },
};
</script>
