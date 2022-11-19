<template>
<div class="HeaderBlock">
  <div class="header">
    <div class="burger" @click="toggleSideBar">
      <button><img src="../../assets/img/Burger.svg" alt=""></button>
    </div>
    <div class="logo">
      <img src="../../assets/img/Logo.png" alt="">
    </div>
    <div class="whatsapp">
      <img src="../../assets/img/Whatsapp.svg" alt="">
      <a href="">+7(777) 021 28 08</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "HeaderBlock",
  methods:{
    toggleSideBar(){
      this.$emit('toggleSideBar')
    },
  },
}
</script>

<style scoped>
@import "assets/css/header/headerblock.css";
</style>
