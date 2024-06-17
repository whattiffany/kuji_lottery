<template>
  <el-table
    :data="prizeData"
    :header-cell-style="{ backgroundColor: '#abd1c6', color: '#4d4e52' }"
    style="width: 100%"
    show-summary
    border
  >
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
  <div style="margin-top: 20px">
    <el-button class="submit" @click="CreateList">送出</el-button>
  </div>
  <Dialog
    v-if="waringDialog"
    :dialogVisible="waringDialog"
    title="警告"
    :content="warningContent"
    @closeDialog="closeDialog"
  ></Dialog>
</template>
<script>
import { reactive, watch, ref } from "vue";
import { useRouter } from "vue-router";
import Dialog from "./dialog.vue";
export default {
  name: "PrizeTable",
  props: ["tableData"],
  components: { Dialog },
  setup(props) {
    const router = useRouter();
    const waringDialog = ref(false);
    const warningContent = ref(null);
    const data = reactive({
      prizeData: props.tableData,
    });
    const CreateList = () => {
      if (data.prizeData.length == 0 || data.prizeData == null) {
        waringDialog.value = true;
        warningContent.value = "資料不得為空";
      } else {
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
      }
    };

    const handleDelete = (index) => {
      data.prizeData.splice(index,1)
    };

    const removeDataList = () => {
      data.prizeData = [];
    };

    const closeDialog = (val) => {
      waringDialog.value = val;
    };

    watch(
      () => props.tableData,
      (newValue) => {
        data.prizeData = newValue;
      }
    );
    return {
      ...data,
      CreateList,
      handleDelete,
      removeDataList,
      Dialog,
      waringDialog,
      warningContent,
      closeDialog,
    };
  },
};
</script>
<style>
.submit {
  color: black;
  background-color: #f9bc60;
}
.submit:hover {
  color: black;
  background-color: #f99360;
}
</style>
