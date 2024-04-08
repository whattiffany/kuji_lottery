<template>
  <el-row>
    <el-col :span="12">
      <el-form
        ref="formRef"
        label-position="left"
        label-width="auto"
        :model="prizeItems"
        style="max-width: 600px"
      >
        <el-form-item
          label="獎項"
          prop="name"
          :rules="[{ required: true, message: '必填' }]"
        >
          <el-input v-model="prizeItems.name" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="數量"
          prop="number"
          :rules="[
            { required: true, message: '必填' },
            { type: 'number', message: '請輸入數字' },
          ]"
        >
          <el-input
            v-model.number="prizeItems.number"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="addGroup">增加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12">
      <PrizeTable :tableData="prizeGroup.prizeItems"></PrizeTable>
    </el-col>
  </el-row>
  <el-form-item> </el-form-item>
</template>
<script>
import { reactive, ref } from "vue";
import PrizeTable from "../components/PrizeTable.vue";

export default {
  name: "PrizeForm",
  components: {
    PrizeTable,
  },
  setup() {
    const formRef = ref(null);
    const prizeItems = reactive({
      name: "",
      number: null,
    });
    const prizeGroup = reactive({
      prizeItems: [],
    });

    const addGroup = () => {
      // emit("prizeGroup", [prizeItems]);
      const item = JSON.parse(JSON.stringify(prizeItems));
      prizeGroup.prizeItems.push(item);
      console.log(prizeGroup.prizeItems);
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      prizeItems,
      formRef,
      prizeGroup,
      resetForm,
      addGroup,
    };
  },
};
</script>
