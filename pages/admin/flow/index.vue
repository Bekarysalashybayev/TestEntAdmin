<template>
  <div class="page">
    <div class="page-body">
      <button class="add-button" @click="addTeacher">
        Добавить поток
      </button>
      <div class="filter">
        <div class="select">
          <select name="" id="1" v-model="filter.lesson" @change="filterFlows">
            <option value="">Статаус (все)</option>
            <option :value="lesson.id" v-for="lesson in lessons" :key="lesson.id">{{lesson.name}}</option>
          </select>
        </div>
      </div>
      <div class="flow-list">
        <div class="flow-outer" v-if="flows.length>0 && lessonIds.length>0">
          <div v-for="flow in flows" :key="flow.id" class="flow-single"
               @click="openFlow(flow.id)">
            <div class="img">
              <img :src="`${imgUrl(getIndexID(flow.lesson.id))}`"  alt="">
            </div>
            <div class="description">
              <div class="name">
                {{flow.name}}
              </div>
<!--              <div class="followed">-->
<!--                <img src="../../../assets/img/flow-followed.svg" alt="">-->
<!--              </div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/ru'  // without this line it didn't work
moment.locale('ru')

export default {
  name: "index",
  components: {},
  middleware: ['admin'],
  data(){
    return{
      flows: [],
      lessonIds: [],
      filter: {
        lesson: ''
      },
      lessons: [],
    }
  },
  created() {
    this.getFlowList()
    this.getLessons()
  },
  methods: {
    imgUrl(img){
      return `${require(`@/assets/img/flow-img-${img}.svg`)}`
    },
    addTeacher(){
      this.$router.push({name: 'admin-flow-add'})
    },
    openFlow(id){
      this.$router.push({name: 'admin-flow-id', params: {id: id}})
    },
    filterFlows(){
      this.getFlowList()
    },
    async getLessons() {
      try {
        const data =  (await this.$axios.get('/quizzes/lesson-list/')).data
        this.lessons = data
      }catch (er) {
        console.log(er.response)
      }
    },
    async getFlowList() {
      try {
        const data = (await this.$axios.get('super-admin/flow-list/', {params: this.filter})).data
        this.flows = data.data
        this.pushLessonIds()
      } catch (er) {
        console.log(er.response)
      }
    },
    getIndexID(id){
      for(let i=0; i<this.lessonIds.length; i++){
        if (this.lessonIds[i] === id) {
          return i
        }
      }
    },
    pushLessonIds(){
      for(let i=0; i<this.flows.length; i++){
        if (this.lessonIds.indexOf(this.flows[i].lesson.id) === -1) {
          this.lessonIds.push(this.flows[i].lesson.id);
        }
      }
    },
    // getLessons(lessons){
    //   return lessons.map(function(elem){
    //     return elem.name;
    //   }).join(", ")
    // },
  }
}
</script>

<style scoped>
@import "../../../assets/css/flow.css";
</style>
