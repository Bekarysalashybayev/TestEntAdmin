<template>
  <div class="page">
    <div class="page-body">
      <path-main />
      <button class="add-button" @click="addTeacher">
        Добавить преподавателя
      </button>
      <div class="teacher-list">
        <div class="list-table">
          <div class="table-name">
            Список преподавателей
          </div>
          <div class="table-outer" v-if="teachers.length>0">
            <div class="table-outer-scroll">
              <table>
                <tbody>
                <tr>
                  <th>№</th>
                  <th >
                    <div class="th">
                      <span>ФИО преподавателя</span>
                    </div>
                  </th>
                  <th >
                    <div class="th">
                      <span>Почта</span>
                    </div>
                  </th>
                  <th >
                    <div class="th">
                      <span>Предметы</span>
                    </div>
                  </th>
                </tr>
                <tr v-for="(teacher, i) in teachers" :key="teacher.id">
                  <td>{{i+1}}</td>
                  <td>{{teacher.first_name}} {{teacher.last_name}}</td>
                  <td>{{teacher.email}}</td>
                  <td>{{getLessons(teacher.lessons)}}</td>
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
import pathMain from "../../../components/pathMain";
export default {
  name: "index",
  components: {pathMain},
  middleware: ['admin'],
  data(){
    return{
      teachers: [],
    }
  },
  created() {
    this.getTeachers()
  },
  methods: {
    addTeacher(){
      this.$router.push({name: 'admin-teacher-add'})
    },
    async getTeachers() {
      try {
        const data = (await this.$axios.get('/super-admin/teacher-list/')).data
        this.teachers = data
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
