<template>
  <div class="total-count">
    <el-table :data="prizeData" style="width: 100%">
      <el-table-column prop="name" label="獎項" />
      <!-- <el-table-column prop="openedFalse" label="未開" />
      <el-table-column prop="openedTrue" label="已開" /> -->
      <el-table-column prop="total" label="已開/總數">
        <template #default="scope">
          <span>{{ scope.row.openedTrue }}/{{ scope.row.total }}</span>
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
