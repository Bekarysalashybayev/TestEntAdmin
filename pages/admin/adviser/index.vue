<template>
  <div class="page">
    <div class="page-body">
<!--      <path-main />-->
      <button class="add-button" @click="addAdviser">
        Добавить куратора
      </button>
      <div class="teacher-list">
        <div class="list-table">
          <div class="table-name">
            Список кураторов
          </div>
          <div class="table-outer" v-if="advisers.length>0">
            <div class="table-outer-scroll">
              <table>
                <tbody>
                <tr>
                  <th>№</th>
                  <th >
                    <div class="th">
                      <span>ФИО куратора</span>
                    </div>
                  </th>
                  <th >
                    <div class="th">
                      <span>Почта</span>
                    </div>
                  </th>
                  <th >
                    <div class="th">
                      <span>Номер телефона</span>
                    </div>
                  </th>
                  <th >
                    <div class="th">
                      <span>#</span>
                    </div>
                  </th>
                </tr>
                <tr v-for="(adviser, i) in advisers" :key="adviser.id">
                  <td>{{i+1}}</td>
                  <td>{{adviser.first_name}} {{adviser.last_name}}</td>
                  <td>{{adviser.email}}</td>
                  <td>{{adviser.phone}}</td>
                  <td>
                    <button @click="edit(adviser.id)" class="edit">Изменить</button>
                  </td>
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
      advisers: [],
    }
  },
  created() {
    this.getAdvisers()
  },
  methods: {
    addAdviser(){
      this.$router.push({name: 'admin-adviser-add'})
    },
    edit(id){
      this.$router.push({name: 'admin-adviser-id', params:{id: id}})
    },
    async getAdvisers() {
      try {
        const data = (await this.$axios.get('/super-admin/adviser-list/')).data
        this.advisers = data
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
button.edit{
  color: darkgreen;
  font-size: 15px;
}
button.edit:hover{
  text-decoration: underline;
}
</style>
