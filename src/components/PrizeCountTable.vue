<template>
  <div class="total-count">
    <el-table
      :data="prizeData"
      :header-cell-style="{ backgroundColor: '#abd1c6', color: '#4d4e52' }"
      style="width: 100%"
      border
    >
      <el-table-column prop="name" label="獎項" />
      <el-table-column prop="total" label="未開/總數">
        <template #default="scope">
          <span
            :class="{
              limit:
                scope.row.openedFalse <= scope.row.total / 2 ? true : false,
            }"
            >{{ scope.row.openedFalse }}/{{ scope.row.total }}</span
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { ref, watch } from "vue";
export default {
  name: "CountTable",
  props: ["tableData"],
  setup(props) {
    const prizeData = ref(props.tableData);

    watch(
      () => props.tableData,
      (newValue) => {
        prizeData.value = newValue;
      }
    );
    return { prizeData };
  },
};
</script>
<style>
.limit {
  color: red;
}
</style>
