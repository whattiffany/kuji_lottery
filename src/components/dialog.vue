<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="dialogTitle"
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
  props: ["dialogVisible", "content", "title"],
  emit: ["dialogVisible"],
  setup(props, ctx) {
    const centerDialogVisible = ref(props.dialogVisible);
    const dialogTitle = ref(props.title);
    const dialogContent = ref(props.content);

    const closeDialog = () => {
      centerDialogVisible.value = false;
      ctx.emit("closeDialog", centerDialogVisible.value);
    };

    watch(
      () => props.dialogVisible,
      (newValue) => {
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
      dialogTitle,
      dialogContent,
      closeDialog,
    };
  },
};
</script>
