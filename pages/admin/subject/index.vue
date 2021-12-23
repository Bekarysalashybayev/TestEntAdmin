<template>
<div class="page">
  <div class="page-body">
<!--    <path-main />-->
    <div class="lessons">
      <div class="lesson" v-for="lesson in lessons" :key="lesson.id">
        {{ lesson.name }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import PathMain from "../../../components/pathMain";
export default {
  name: "index",
  // components: {PathMain},
  middleware: ['admin'],
  data(){
    return{
      lessons: [],
    }
  },
  created() {
    this.getLessons()
  },
  methods:{
    async getLessons() {
      try {
        const data =  (await this.$axios.get('/quizzes/lesson-list/')).data
        this.lessons = data
      }catch (er) {
        console.log(er.response)
      }
    },
  },
}
</script>

<style scoped>
.lessons{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 -15px;
}
.lesson{
  flex: 0 0 30%;
  min-width: 250px;
  background: #FFFFFF;
  border: 1px solid #DEDEDE;
  border-radius: 5px;
  padding: 15px;
  font-size: 15px;
  line-height: 17px;
  margin: 0 15px 20px;
  box-sizing: border-box!important;
}
</style>
