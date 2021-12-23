<template>
  <div class="loading">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "loading"
}
</script>

<style scoped>
.loading{
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
