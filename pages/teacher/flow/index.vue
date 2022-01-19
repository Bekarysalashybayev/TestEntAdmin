<template>
  <div class="page">
    <div class="page-body">
      <div class="flow-list">
        <div class="flow-outer" v-if="flows.length>0">
          <div v-for="flow in flows" :key="flow.id" class="flow-single"
               @click="openFlow(flow.id)">
            <div class="img">
              <img src="../../../assets/img/flow-img.svg" alt="">
            </div>
            <div class="description">
              <div class="name">
                {{flow.name}}
              </div>
              <div class="followed" v-if="flow.follow">
                <img src="../../../assets/img/flow-followed.svg" alt="">
              </div>
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
  middleware: ['teacher'],
  data(){
    return{
      flows: [],
    }
  },
  created() {
    this.getFlowList()
  },
  methods: {
    openFlow(id){
      this.$router.push({name: 'teacher-flow-id', params: {id: id}})
    },
    async getFlowList() {
      try {
        const data = (await this.$axios.get('teacher/flow-list/')).data
        this.flows = data.data
      } catch (er) {
        console.log(er.response)
      }
    },
    getLessons(lessons){
      return lessons.map(function(elem){
        return elem.name;
      }).join(", ")
    },
  }
}
</script>

<style scoped>
@import "../../../assets/css/flow.css";
.description .name{
  width: 140px;
  padding-right: 15px;
}
</style>
