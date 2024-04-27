<template>
  <el-dialog
    v-model="centerDialogVisible"
    title="警告"
    width="500"
    align-center
  >
    <span>{{ content }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="closeDialog"> 確認 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { ref, watch } from "vue";
export default {
  name: "newDialog",
  props: ["dialogVisible", "content"],
  emit: ["dialogVisible"],
  setup(props, ctx) {
    const centerDialogVisible = ref(props.dialogVisible);
    const dialogContent = ref(props.content);
    console.log(props.dialogVisible);

    const closeDialog = () => {
      centerDialogVisible.value = false;
      ctx.emit("closeDialog", centerDialogVisible.value);
    };

    watch(
      () => props.dialogVisible,
      (newValue) => {
        console.log(newValue);
        centerDialogVisible.value = newValue;
      }
    );
    watch(
      () => props.content,
      (newValue) => {
        dialogContent.value = newValue;
      }
    );

    return {
      centerDialogVisible,
      dialogContent,
      closeDialog,
    };
  },
};
</script>
