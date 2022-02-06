<template>
  <div class="default" data-app>
    <header-block @toggleSideBar="toggleSideBar"/>
    <side-bar :isOpen="isOpen"/>
    <Nuxt class="content" :class="{close: !isOpen}"/>
    <loader :start="getGlobalLoader"/>
  </div>
</template>
<script>
import SideBar from "../components/header/SideBar";
import HeaderBlock from "../components/header/HeaderBlock";
import Loader from "../components/core/Loader";
export default {
  name: 'Default',
  components: {SideBar, HeaderBlock, Loader},
  data(){
    return{
      isOpen: true
    }
  },
  created() {
    // console.log(this.$auth.user)
  },
  computed:{
    getGlobalLoader(){
      return this.$store.state.test.loader
    },
  },
  methods:{
    toggleSideBar(){
      this.isOpen = !this.isOpen
    }
  }
}
</script>
<style>
.default{
  position: relative;
}
.content{
  padding: 66px 0 0 300px;
  box-sizing: content-box;
}
.content.close{
  padding: 66px 0 0 100px;
}
@media (max-width: 1024px) {
  .content{
    padding: 66px 0 0!important;
  }
}
</style>
