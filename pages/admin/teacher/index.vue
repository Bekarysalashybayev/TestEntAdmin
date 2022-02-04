<template>
  <div class="page">
    <div class="page-body">
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
                      <span>actions</span>
                    </div>
                  </th>
                  <th>
                    <div class="th">
                      <span>#</span>
                    </div>
                  </th>
                </tr>
                <tr v-for="(teacher, i) in teachers" :key="teacher.id">
                  <td>{{i+1}}</td>
                  <td>{{teacher.first_name}} {{teacher.last_name}}</td>
                  <td>{{teacher.email}}</td>
                  <td>
                    <button @click="edit(teacher.id)" class="edit">Изменить</button>
                    <button @click="deleteUser(teacher)" class="delete">Удалить</button>
                  </td>
                  <td>
                    <button @click="changePassword(teacher, i)" class="edit">Изменить пароль</button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-window v-if="isChangePassword">
      <template #content>
        <div class="modal-delete-text">
          <div class="modal-text">
            <span v-if="currentChangeUserPassword">
              Ваш пароль: <b>{{currentChangeUserPassword}}</b>
            </span>
            <span v-else>
              Вы точно хотите <br>обновить пароль этого пользователя?
            </span>

          </div>
          <div class="common-buttons" v-if="!currentChangeUserPassword">
            <button @click="changeCurrentUser">Обновить</button>
            <button @click="cancelChangeCurrentUser">Отмена</button>
          </div>
          <div class="common-buttons" v-else>
            <button  @click="cancelChangeCurrentUser">Закрыть</button>
          </div>
        </div>
      </template>
    </modal-window>
    <modal-window v-if="isDelete">
      <template #content>
        <div class="modal-delete-text">
          <div class="modal-text">
            Вы точно хотите <br>удалить этот пользователь?
          </div>
          <div class="common-buttons">
            <button @click="deleteCurrentUser">Удалить</button>
            <button @click="cancelDeleteCurrentUser">Отмена</button>
          </div>
        </div>
      </template>
    </modal-window>
  </div>
</template>

<script>
import ModalWindow from "~/components/core/ModalWindow";

export default {
  name: "index",
  components: {ModalWindow},
  middleware: ['admin'],
  data(){
    return{
      isDelete: false,
      currentDeleteUser: null,
      teachers: [],
      currentChangeUser: null,
      currentChangeUserIndex: null,
      isChangePassword: false,
      currentChangeUserPassword: null,
    }
  },
  created() {
    this.getTeachers()
  },
  methods: {
    changePassword(user, index){
      this.currentChangeUser = user
      this.currentChangeUserIndex = index
      this.isChangePassword = true
    },
    cancelChangeCurrentUser(){
      this.currentChangeUserPassword = null
      this.currentChangeUser = null
      this.currentChangeUserIndex = null
      this.isChangePassword = false
    },
    async changeCurrentUser() {
      await this.$axios.post('/user/generate-password/', {email: this.currentChangeUser.email})
        .then(async (response) => {
          console.log(response.data['пароль: ']);
          this.$toast.success('Пользователь удален успешно!')
          this.currentChangeUserPassword = response.data['пароль: ']
          this.currentChangeUser = null
          this.currentChangeUserIndex = null
        })
        .catch(  (error) => {
          this.$toast.error('Ошибка!')
        });
    },
    deleteUser(user){
      this.currentDeleteUser = user
      this.isDelete = true
    },
    cancelDeleteCurrentUser(){
      this.currentDeleteUser = null
      this.isDelete = false
    },
    async deleteCurrentUser() {
      this.isDelete = false
      try {
        await this.$axios.delete(`/super-admin/teacher-update-delete/${this.currentDeleteUser.id}/`)
        this.$toast.success('Тест удален успешно!')
        this.currentDeleteUser = null
        await this.getTeachers()
      } catch (er) {
        this.$toast.error('Ошибка!')
        console.log(er.response)
      }
    },
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
    edit(id){
      this.$router.push({name: 'admin-teacher-id', params:{id: id}})
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
button.delete{
  color: red;
  font-size: 15px;
}
button.edit:hover, button.delete:hover{
  text-decoration: underline;
}
</style>
