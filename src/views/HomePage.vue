<template>
  <p>抽籤設定＆開籤</p>
</template>
<script>
export default {
  name: "HomePage",
  props: ["formData"],

  mounted() {
    console.log("here" + this.formData);
  },
};
</script>
