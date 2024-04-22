<template>
  <el-table :data="prizeData" style="width: 100%" show-summary border>
    <el-table-column prop="name" label="獎項" />
    <el-table-column prop="sub_name" label="說明" />
    <el-table-column prop="number" label="數量" />
    <el-table-column prop="note" label="大獎" />
    <el-table-column label="刪除">
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index)"
          >刪除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" @click="CreateList">送出</el-button>
  <el-button>取消</el-button>
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
      return data.prizeData.reduce((acc, cur) => {
        for (let i = 0; i < cur.number; i++) {
          let obj = {
            name: cur.name,
            sub_name: cur.sub_name,
            note: cur.note,
            opened: false,
          };
          acc.push(obj);
        }
        router.push({
          name: "RaffleStart", // 目标路由的名称
          params: {
            formData: JSON.stringify(acc), // 要传递的数据
          },
        });
        return acc;
      }, []);
    };

    const handleDelete = (index) => {
      data.prizeData.pop(index);
    };

    watch(props.tableData, (newValue) => {
      data.prizeData = newValue;
    });
    return { ...data, CreateList, handleDelete };
  },
};
</script>
