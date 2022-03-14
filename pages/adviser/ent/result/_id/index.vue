<template>
  <div class="page">
    <div class="page-body" v-if="results && results.data && results.data.length>0">
      <!--      <path-main />-->
      <div class="list">
        <ListTable :edit="true" @open="open" @searchStudent="searchStudent" :actions="actions" :data="results.data" @sort="sortResults" :pageSize="pageSize" :currentPage="currentPage"/>
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
    <div class="page-body" v-else>
      Пока что никто не сдавал
    </div>
    <modal-window v-if="openModal">
      <template #content>
        <div class="content">
          <div class="bottom">
            <v-btn @click="save">Save</v-btn>
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
      testId: this.$route.params.id,
      results: {},
      currentPage: 1,
      q: '',
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
    }
  },
  created() {
    this.getResultList()
  },
  methods:{
    ...mapMutations({
      setLoader: 'test/SET_LOADER'
    }),
    changePage(page){
      this.currentPage = page
      this.getResultList()
    },
    changePageSize(){
      this.getResultList()
    },
    searchStudent(q){
      this.q = q
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
@media (max-width: 500px) {
  .all-items-count{
    margin-top: 30px;
  }
}
</style>
