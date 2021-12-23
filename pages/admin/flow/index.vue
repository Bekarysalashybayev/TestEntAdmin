<template>
  <div class="page">
    <div class="page-body">
      <button class="add-button" @click="addTeacher">
        Добавить поток
      </button>
      <div class="teacher-list">
        <div class="list-table">
          <div class="table-name">
            Список потоков
          </div>
          <div class="table-outer" v-if="flows.length>0">
            <div class="table-outer-scroll">
              <table>
                <tbody>
                <tr>
                  <th>№</th>
                  <th >
                    <div class="th">
                      <span>Дата старта</span>
                    </div>
                  </th>
                  <th >
                    <div class="th">
                      <span>Месяц</span>
                    </div>
                  </th>
                  <th >
                    <div class="th">
                      <span>Название</span>
                    </div>
                  </th>
                  <th >
                    <div class="th">
                      <span>Количество студентов</span>
                    </div>
                  </th>
                </tr>
                <tr v-for="(flow, i) in flows" :key="flow.id">
                  <td>{{i+1}}</td>
                  <td>{{$moment(flow.start_time).format('DD.MM.YYYY')}}</td>
                  <td style="text-transform: capitalize;">{{$moment(flow.start_time).format('MMMM')}}</td>
                  <td>{{flow.name}}</td>
                  <td>{{flow.quantity_of_students}}</td>
                </tr>
                </tbody>
              </table>
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
    }
  },
  created() {
    this.getTeachers()
  },
  methods: {
    addTeacher(){
      this.$router.push({name: 'admin-flow-add'})
    },
    async getTeachers() {
      try {
        const data = (await this.$axios.get('/quizzes/flow-list/')).data
        this.flows = data
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
@import "assets/css/components/table.css";
td{
  text-align: left!important;
}
</style>
