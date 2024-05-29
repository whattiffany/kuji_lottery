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
          label="獎項編號"
          prop="name"
          :rules="[{ required: true, message: '必填' }]"
        >
          <el-input
            v-model="prizeItems.name"
            placeholder="A,B,C/1,2,3/..."
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="獎項數量"
          prop="number"
          placeholder="數字"
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
        <el-form-item label="獎項分類" prop="sub_name">
          <el-input
            v-model="prizeItems.sub_name"
            type="text"
            placeholder="名字/說明(非必填) ex:悟空"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox
            v-model="prizeItems.note"
            label="是前面大獎(特效備註使用)"
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
  <Dialog
    v-if="waringDialog"
    :dialogVisible="waringDialog"
    title="警告"
    :content="warningContent"
    @closeDialog="closeDialog"
  ></Dialog>
</template>
<script>
import { reactive, ref } from "vue";
import PrizeTable from "../components/PrizeTable.vue";
import Dialog from "./dialog.vue";
export default {
  name: "PrizeForm",
  components: {
    PrizeTable,
    Dialog,
  },
  setup() {
    const formRef = ref(null);
    const waringDialog = ref(false);
    const warningContent = ref(null);
    const prizeItems = reactive({
      name: "",
      number: null,
      note: false,
    });
    const prizeGroup = reactive({
      prizeItems: [],
    });

    const addGroup = () => {
      const item = JSON.parse(JSON.stringify(prizeItems));
      if (item.name == null || item.number == 0 || item.number == null) {
        waringDialog.value = true;
        warningContent.value = "資料不得為空/數量需>0";
        return;
      }
      prizeGroup.prizeItems.push(item);
    };

    const closeDialog = (val) => {
      waringDialog.value = val;
    };

    return {
      prizeItems,
      formRef,
      prizeGroup,
      addGroup,
      waringDialog,
      warningContent,
      closeDialog,
    };
  },
};
</script>
