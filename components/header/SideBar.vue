<template>
<div class="page-side-bar" :class="{close: !isOpen, open: isOpen}">
  <div class="SideBar">
    <div class="side-bar-inner scroll">
      <div class="links">
        <admin-side-bar v-if="role == 'super_admin'"/>
        <default-side-bar />
      </div>
    </div>
    <div class="log-out">
      <div class="log-out-inner">
        <div class="ava" v-if="currentUser.avatar">
          <img :src="currentUser.avatar" alt="">
        </div>
        <div class="ava" v-else>
          {{getFirstLetter()}}
        </div>
        <div class="name">
          <span>{{ getSubstringUsername() }}</span>
          <span>{{role}}</span>
        </div>
        <button @click="logOut">
          <img src="../../assets/img/loqout.svg" alt="">
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import AdminSideBar from "./AdminSideBar";
import TeacherSideBar from "./TeacherSideBar";
import DefaultSideBar from "./DefaultSideBar";

export default {
  name: "SideBar",
  props: ['isOpen'],
  components: {AdminSideBar, TeacherSideBar , DefaultSideBar},
  data(){
    return{
      username: 'Default user',
    }
  },
  created() {
  },
  computed:{
    role(){
      return this.$auth.user.role
    },
    currentUser(){
      return this.$auth.user
    },
  },
  methods:{
    getSubstringUsername(){
      return this.currentUser.first_name + ' ' + this.currentUser.last_name
    },
    getFirstLetter(){
      return this.currentUser?.first_name.charAt(0).toUpperCase() + this.currentUser?.last_name.charAt(0).toUpperCase()
    },
    async logOut() {
      await this.$auth.logout()
    },

  }
}
</script>

<style scoped>
@import "assets/css/header/sidebar.css";
</style>
