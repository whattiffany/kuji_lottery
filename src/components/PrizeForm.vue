<template>
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
      <el-button type="primary" @click="submitForm">送出</el-button>
      <el-button @click="resetForm">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive, ref } from "vue";
export default {
  name: "PrizeForm",
  setup() {
    const formRef = ref(null);
    const prizeItems = reactive({
      name: "",
      number: null,
    });

    const submitForm = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
        }
      });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };
    return {
      formRef,
      prizeItems,
      submitForm,
      resetForm,
    };
  },
};
</script>
