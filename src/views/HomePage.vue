<template>
  <p>Home</p>
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
