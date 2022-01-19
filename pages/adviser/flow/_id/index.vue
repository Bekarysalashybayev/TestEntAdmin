<template>
  <div class="page">
    <div class="page-body">
      <div class="flow-list-page">
        <div class="header">
          <div class="header-name"
               v-for="header in headerNames"
              :key="header.code"
               :class="{active: header.code == currentHeader}"
               @click="changeHeader(header.code)"
          >
            {{header.name}}
          </div>
        </div>
        <div class="body" v-if="flow">
          <div v-if="currentHeader == 'band'">
            <div class="currentFlow">
              <div class="description">
                <div class="name">
                  {{flow.name}}
                </div>
              </div>
              <div class="img">
                <img src="../../../../assets/img/flow-img-desktop.svg" alt="">
              </div>
            </div>
            <div class="data">
              <div class="description">
                  <div class="started">
                    <div class="description-title">
                      Начало:
                    </div>
                    <div class="description-desc">
                      {{$moment(flow.start_time).format('DD.MM.YYYY')}}
                    </div>
                  </div>
                <div class="started">
                  <div class="description-title">
                    Предмет:
                  </div>
                  <div class="description-desc">
                    {{flow.lesson.name}}
                  </div>
                </div>
              </div>
              <div class="tasks">
                <div class="description-title">
                  Предстоящие задачи
                </div>
                <div class="tasks-body" v-if="flow.test_list.length==0">
                  Задач нет
                </div>
                <div class="flow-tests" v-else>
                  <div class="flow-single-test" v-for="test in flow.test_list" :key="test.id">
                    <div class="test-body">
                      <div class="body">
                        <div class="body-item">
                          <img src="@/assets/img/test-number.svg" alt="">
                          <span class="time test-name">{{test.name}}Name</span>
                        </div>
                        <div class="body-item">
                          <img src="@/assets/img/test-time.svg" alt="">
                          <span>{{test.duration}} мин.</span>
                        </div>
                        <div class="body-item">
                          <img src="@/assets/img/flow-test-type.svg" alt="">
                          <span>{{test.test_type.name}}</span>
                        </div>
                      </div>
                      <div class="body">
                        <div class="body-item">
                          <div>Начало:</div>
                          <span>{{$moment(test.start_time).format('DD.MM.YYYY')}}</span>
                        </div>
                        <div class="body-item">
                          <div>Окончание:</div>
                          <span>{{$moment(test.end_time).format('DD.MM.YYYY')}}</span>
                        </div>
                        <div class="body-item">
                          <div>Поток:</div>
                          <span v-if="test.flow">{{test.flow.name}}.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="currentHeader == 'users'">
            <div class="flow-user-header">
              <div class="user"
                   @click="changeCurrentFlowUser('users')"
                   :class="{active: currentFlowUser == 'users'}"
              >
                Пользователи
              </div>
              <div class="user"
                   @click="changeCurrentFlowUser('requests')"
                   :class="{active: currentFlowUser == 'requests'}"
              >
                Заявки
              </div>
            </div>
            <div v-if="currentFlowUser=='users'">
              <div class="flow-user-content">
                <div class="flow-user-title">
                  Преподаватели
                </div>
                <div class="flow-user-list">
                  <div class="single-user">
                    <div class="user-name"
                         v-for="teacher in teachers"
                         :key="teacher.id"
                    >
                      <div class="first-name">
                        {{teacher.first_name}} {{teacher.last_name}}
                      </div>
                      <div class="dots">
                        <img src="@/assets/img/dots.svg" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flow-user-content">
                <div class="flow-user-title">
                  Ученики
                </div>
                <div class="flow-user-list">
                  <div class="single-user">
                    <div class="user-name"
                         v-for="student in students"
                         :key="student.id"
                    >
                      <div class="first-name">
                        {{student.first_name}} {{student.last_name}}
                      </div>
                      <div class="dots">
                        <img src="@/assets/img/dots.svg" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="currentFlowUser=='requests'">
              <div class="flow-user-content">
                <div class="flow-user-title">
                  Список заявок
                </div>
                <div class="flow-user-list">
                  <div class="single-user">
                    <div class="table-outer-scroll">
                      <table>
                        <tbody>
                        <tr>
                          <th>№</th>
                          <th >
                            <div class="th">
                              <span>Ученик</span>
                            </div>
                          </th>
                          <th >
                            <div class="th">
                              <span>Поток</span>
                            </div>
                          </th>
                          <th >
                            <div class="th">
                              <span>Дата заявки</span>
                            </div>
                          </th>
                          <th >
                            <div class="th">
                              <span>Операций</span>
                            </div>
                          </th>
                        </tr>
                        <tr v-for="(request, i) in requests" :key="request.id">
                          <td>{{i+1}}</td>
                          <td>
                            {{request.user.first_name}} {{request.user.last_name}}
                          </td>
                          <td>
                            {{request.name}}
                          </td>
                          <td>
                            {{request.created}}
                          </td>
                          <td class="flow-request-operations">
                            <button @click="acceptRequestUser(request.id)">
                              <img src="../../../../assets/img/flow-followed.svg" alt="">
                            </button>
                            <button @click="deleteRequestUser(request.id)">
                              <img src="../../../../assets/img/flow-cancel.svg" alt="">
                            </button>
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
          </div>
        </div>
      </div>
    <modal-window v-if="deleteModal">
      <template #content>
        <div class="modal-delete-text">
          <div class="modal-text">
            Вы точно хотите <br>отклонить этот запрос?
          </div>
          <div class="common-buttons">
            <button @click="deleteUserFlow">Отклонить</button>
            <button @click="cancelUserFlow">Отмена</button>
          </div>
        </div>
      </template>
    </modal-window>
    <modal-window v-if="acceptModal">
      <template #content>
        <div class="modal-delete-text">
          <div class="modal-text">
            Вы точно хотите <br>принять этот запрос?
          </div>
          <div class="common-buttons">
            <button @click="acceptUserFlow">Принять</button>
            <button @click="cancelUserFlow">Отмена</button>
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
  data(){
    return{
      id: this.$route.params.id,
      currentHeader: 'band',
      currentFlowUser: 'users',
      teachers: [],
      students: [],
      requests: [],
      requestUser: null,
      acceptModal: false,
      deleteModal: false,
      flow: null,
      headerNames: [
        {
          name: 'Лента',
          code: 'band'
        },
        {
          name: 'Пользователи',
          code: 'users'
        }
      ],
    }
  },
  mounted() {
    this.getFlow()
    this.getTeachers()
    this.getStudents()
    this.getRequests()
  },
  methods:{
    async deleteUserFlow() {
      try {
        const data = (await this.$axios.put('super-admin/access-flow-request/' + this.requestUser + '/', {
          status: 'REJECT',
        })).data
        this.$toast.success('Успешно')
      } catch (er) {
        this.$toast.error('Ошибка')
        console.log(er.response)
      }
      this.requestUser = null
      this.deleteModal = false
      await this.getRequests()
    },
    cancelUserFlow(){
      this.requestUser = null
      this.deleteModal = false
      this.acceptModal = false
    },
    deleteRequestUser(user){
      this.requestUser = user
      this.deleteModal = true
    },
    async acceptUserFlow() {
      try {
        const data = (await this.$axios.put('super-admin/access-flow-request/' + this.requestUser + '/', {
          status: 'ACCESS',
        })).data
        this.$toast.success('Успешно')
      } catch (er) {
        this.$toast.error('Ошибка')
        console.log(er.response)
      }
      this.requestUser = null
      this.acceptModal = false
      await this.getRequests()
    },
    acceptRequestUser(user){
      this.requestUser = user
      this.acceptModal = true
    },
    changeHeader(code){
      if (this.currentHeader != code){
        this.currentHeader = code
      }
    },
    changeCurrentFlowUser(type){
      this.currentFlowUser = type
    },
    async getFlow() {
      try {
        const data = (await this.$axios.get('super-admin/flow/' + this.id + '/')).data
        this.flow = data
      } catch (er) {
        console.log(er.response)
      }
    },
    async getTeachers() {
      try {
        const data = (await this.$axios.get('super-admin/teacher-list-by-flow/' + this.id + '/')).data
        this.teachers = data.data
      } catch (er) {
        console.log(er.response)
      }
    },
    async getStudents() {
      try {
        const data = (await this.$axios.get('super-admin/student-list-by-flow/' + this.id + '/')).data
        this.students = data.data
      } catch (er) {
        console.log(er.response)
      }
    },
    async getRequests() {
      try {
        const data = (await this.$axios.get('super-admin/flow-requests/' + this.id + '/')).data
        this.requests = data.data
      } catch (er) {
        console.log(er.response)
      }
    },
  },
}
</script>

<style scoped>
@import "../../../../assets/css/flow.css";
@import "assets/css/components/table.css";
td{
  text-align: left!important;
}
.common-buttons{
  margin-top: 25px;
}
.common-buttons button{
  margin-right: 20px;
  border: 1px solid #029AAD;
  box-sizing: border-box;
  border-radius: 50px;
  color: #029AAD;
  padding: 5px 15px;
}
.common-buttons button:first-child{
  background-color: #029AAD;
  color: #FFFFFF;
  font-weight: bold;
}
.question-item-actions button{
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
}
.modal-delete-text{
  width: 100%;
  display: flex;
  min-height: 150px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal-text{
  text-align: center;
}

</style>
