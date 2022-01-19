<template>
<div class="page-side-bar" :class="{close: !isOpen, open: isOpen}">
  <div class="SideBar">
    <div class="side-bar-inner scroll">
      <div class="links">
        <admin-side-bar v-if="role == 'super_admin'"/>
        <teacher-side-bar v-if="role=='teacher'"/>
        <adviser-side-bar v-if="role=='adviser'"/>
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
import AdviserSideBar from "./AdviserSideBar";
import DefaultSideBar from "./DefaultSideBar";

export default {
  name: "SideBar",
  props: ['isOpen'],
  components: {AdminSideBar, TeacherSideBar, AdviserSideBar, DefaultSideBar},
  data(){
    return{
      username: 'Бекарыс Алашыбаев',
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
      // if (this.username.length > 16){
      //   return this.username.substring(0,15)+"..."
      // }
      if (!this.currentUser.first_name){
        return "by-lesson by-lesson"
      }
      return this.currentUser.first_name + ' ' + this.currentUser.last_name
    },
    getFirstLetter(){
      // return this.currentUser.first_name.charAt(0).toUpperCase() + this.currentUser.last_name.charAt(0).toUpperCase()
      return "AA"
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
