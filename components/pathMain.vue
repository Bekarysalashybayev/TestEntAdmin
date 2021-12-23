<template>
  <div class="path">
    <div v-for="(path, i)  in allPath" :key="path" class="path-name">
      <div v-if="getPath">
        <nuxt-link :to="{name: getPath(path)}" class="link" :class="{hover: i != allPath.length-1}" >{{getPathName(path)}}</nuxt-link><span v-if="i != allPath.length-1">/</span>
      </div>
      <div v-else>
        <div class="link">
          {{getPathName(path)}}<span v-if="i != allPath.length-1">/</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pathMain",
  data(){
    return{
      allPath: []
    }
  },
  computed:{
    fullPath(){
      return this.$route.fullPath
    },
    role(){
      return this.$auth.user.role
    },
  },
  created() {
    this.splitPath()
  },
  methods:{
    getPathName(path){
      switch (path) {
        case "":
          return 'Главная'
          break;
        case "rating":
          return "Рейтинг"
          break;
        case "detail-aaa":
          return "Рейтинг"
          break;
        case "test":
          return "Тесты"
          break;
        case "home-work":
          return "Домашнее задание"
          break;
        case "ent":
          return "ЕНТ"
          break;
        case "contact":
          return "Контакты"
          break;
        case "subject":
          return "предметы"
          break;
        case "teacher":
          return "Преподаватели"
          break;
        case "add":
          return "Добавить"
          break;
        default:
          return path;
          break
      }
    },
    getPath(path){
      if (path == ""){
        return "index"
      }
      if (path == "2"){
        return null
      }
      return path
    },
    splitPath(){
      this.allPath = this.fullPath.split("/");
      if (this.allPath[this.allPath.length-1] == ''){
        this.allPath.splice(-1)
      }
    }
  },
  watch:{
    fullPath(){
      this.splitPath()
    }
  },
}
</script>

<style scoped>
.path{
  font-size: 17px;
  line-height: 20px;
  color: #000000;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.path .path-name{
  font-weight: 600;
}
.path .path-name:last-child{
  font-weight: normal;
}
.path-name span:first-child{
  cursor: pointer;
}
.link{
  text-decoration: none;
}
.path-name .hover:hover{
  text-decoration: underline;
}
.path-name *{
  margin-right: 12px;
}
</style>
