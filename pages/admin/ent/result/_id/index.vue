<template>
  <div class="page">
    <div class="page-body">
      <!--      <path-main />-->
      <div class="list">
        <ListTable :edit="true" @open="open"
                   :actions="actions"
                   :data="results.data"
                   @sort="sortResults"
                   :pageSize="pageSize"
                   :currentPage="currentPage"
                   @editAccessUser="editAccessUser"
                   @searchStudent="searchStudent"
        />
        <div class="list-bottom">
          <div></div>
          <pagination :page-number="results.total_pages" class="table-pagination" @changePage="changePage"/>
          <div class="all-items-count">
            <span>
              Всего: {{ results.count }}
            </span>
            <div class="page-items-count">
              <select name="" id="" @change="changePageSize()" v-model="pageSize">
                <option :value="size" v-for="size in pageSizes">{{ size }} студентов</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-window v-if="openModal">
      <template #content>
        <div class="modal-content">
          <div class="title">
            Пользователь:
          </div>
          <div class="description">
            <div class="name">
              ФИО:
            </div>
            <div class="name-desc">
              {{currentEditUser.first_name}} {{currentEditUser.last_name}}
            </div>
          </div>
          <div class="description">
            <div class="name">
              Название теста:
            </div>
            <div class="name-desc">
              {{ currentEditTestName.name }}
            </div>
          </div>
          <div class="times">
            <div class="start">
              <label for="">Время начало</label>
              <input type="datetime-local" v-model="singleTestTime.start_time" :class="{error: !singleTestTime.start_time && singleTestTimeError}">
            </div>
            <div class="start">
              <label for="">Время окончание</label>
              <input type="datetime-local" v-model="singleTestTime.end_time" :class="{error: !singleTestTime.end_time && singleTestTimeError}">
            </div>
          </div>
         <div class="bottom-actions">
           <div class="btn cancel" @click="cancelEdit">
             Отмена
           </div>
           <div class="btn publish-save" @click="publishTestSingle()">
             Опубликовать
           </div>
         </div>
        </div>
      </template>
    </modal-window>
</div>
</template>

<script>
import ListTable from "../../../../../components/core/ListTable";
import Pagination from "../../../../../components/core/Pagination";
import ModalWindow from "../../../../../components/core/ModalWindow";
import {mapMutations} from "vuex";
export default {
  name: "index",
  components: {ListTable, Pagination, ModalWindow},
  data(){
    return{
      currentEditUser: null,
      currentEditTestName: null,
      testId: this.$route.params.id,
      results: {},
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 25, 100],
      loading: false,
      openModal: false,
      actions: [
        { title: 'Открыть доступ  ' },
      ],
      currentOrder: {
        orderName: null,
        orderType: null,
      },
      singleTestTime: {
        start_time: null,
        end_time: null,
      },
      singleTestTimeError: false,
      q: '',
    }
  },
  created() {
    this.getResultList()
  },
  methods:{
    ...mapMutations({
      setLoader: 'test/SET_LOADER'
    }),
    async publishTestSingle() {
      if (this.currentEditUser) {
        if (this.singleTestTime.start_time != null && this.singleTestTime.end_time != null) {
          try {
            await this.$axios.put(`/super-admin/student-test-time/${this.currentEditTestName.id}/`, this.singleTestTime)
            this.$toast.success('Тест опубликован успешно для этого пользователя!', {duration: 2000})
            this.cancelEdit()
          } catch (er) {
            console.log(er.response)
            this.$toast.error('Ошибка сервера!')
          }
        } else {
          this.singleTestTimeError = true
        }
      }
    },
    editAccessUser(user, test){
      this.currentEditUser = user
      this.currentEditTestName = test
      this.openModal = true
    },
    cancelEdit(){
      this.currentEditUser = null
      this.currentEditTestName = null
      this.openModal = false
    },
    changePage(page){
      this.currentPage = page
      this.getResultList()
    },
    changePageSize(){
      this.getResultList()
    },
    searchStudent(q){
      this.q = q
      this.currentPage = 1
      this.getResultList()
    },
    async getResultList() {
      await this.setLoader(true)
      try {
        const data = (await this.$axios.get(`/super-admin/ent-result/${this.testId}/?q=${this.q}&page=${this.currentPage}&page_size=${this.pageSize}
        &order_name=${this.currentOrder.orderName}&order_type=${this.currentOrder.orderType}`)).data
        this.results = data
      } catch (er) {
        console.log(er.response)
      }
      await this.setLoader(false)
    },
    sortResults(name, type){
      this.currentOrder.orderName = name
      this.currentOrder.orderType = type
      this.getResultList()
    },
    open(tableRow, actionsIndex){
      this.openModal = true
    },
    save(){
      this.openModal = false
    },
  },
}
</script>

<style scoped>
.error{
  border: 1px solid #ee1a1a!important;
}
.table-pagination{
  min-width: 500px;
}
.list-bottom{
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.all-items-count{
  display: flex;
  align-items: center;
  font-size: 15px;
  line-height: 15px;
}
.all-items-count span{
  margin-right: 2rem;
}
.page-items-count select{
  background: #FFFFFF;
  border: 1px solid #DEDEDE;
  border-radius: 5px;
  padding: 5px;
  -webkit-appearance: auto;
}
select:focus{
  outline: none;
}
.v-progress-circular {
  margin: 1rem;
}
.list{
  position: relative;
}
.modal-content .title{
  font-weight: bold;
  margin-bottom: 15px;
}
.modal-content .description{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.modal-content .description .name{
  margin-right: 20px;
  width: 150px;
}
.modal-content .times{

}
.modal-content .times .start{
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.modal-content .times .start label{
  margin-right: 10px;
  width: 150px;
}
.bottom-actions{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}
.btn{
  border: 1px solid #029AAD;
  box-sizing: border-box;
  border-radius: 50px;
  font-size: 15px;
  line-height: 18px;
  padding: 7px 15px;
  cursor: pointer;
}
.publish-save{
  background: #029AAD;
  font-weight: 600;
  color: #FFFFFF;
}
.cancel{
  margin-right: 30px;
  color: #029AAD;
  background-color: #FFFFFF;
}
@media (max-width: 500px) {
  .all-items-count{
    margin-top: 30px;
  }
}
</style>
