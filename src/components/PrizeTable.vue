<template>
  <el-table :data="prizeData" style="width: 100%" show-summary border>
    <el-table-column prop="name" label="獎項" />
    <el-table-column prop="number" label="數量" />
  </el-table>
  <el-button type="primary" @click="CreateList">送出</el-button>
  <el-button @click="resetForm">取消</el-button>
</template>
<script>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "PrizeTable",
  props: ["tableData"],
  setup(props) {
    const router = useRouter();
    const data = reactive({
      prizeData: props.tableData,
    });
    const CreateList = () => {
      // 将原始数据转换为带有重复名称的对象数组
      return data.prizeData.reduce((acc, cur) => {
        for (let i = 0; i < cur.number; i++) {
          acc.push(cur.name);
        }
        console.log(acc);
        router.push({
          name: "RaffleStart", // 目标路由的名称
          params: {
            formData: acc, // 要传递的数据
          },
        });
        return acc;
      }, []);
    };
    watch(props.tableData, (newValue) => {
      console.log(newValue);
      data.prizeData = newValue;
    });
    return { ...data, CreateList };
  },
};
</script>
