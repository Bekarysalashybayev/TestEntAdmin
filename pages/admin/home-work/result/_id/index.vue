<template>
  <div class="page">
    <div class="page-body" v-if="results && results.data && results.data.length>0">
<!--      <path-main />-->
      <div class="list">
        <ListTable :edit="true" @open="open" :actions="actions" :data="results.data" :file="true"/>
        <div class="list-bottom">
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
import pathMain from "../../../../../components/pathMain";
import ListTable from "../../../../../components/core/ListTableLesson";
import Pagination from "../../../../../components/core/Pagination";
import ModalWindow from "../../../../../components/core/ModalWindow";
export default {
  name: "index",
  components: {ListTable, pathMain, Pagination, ModalWindow},
  data(){
    return{
      testId: this.$route.params.id,
      results: {},
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20],
      loading: false,
      openModal: false,
      actions: [
        { title: 'Открыть доступ  ' },
      ],
    }
  },
  created() {
    this.getResultList()
  },
  methods:{
    changePage(page){
      this.currentPage = page
      this.getResultList()
    },
    changePageSize(){
      this.getResultList()
    },
    async getResultList() {
      try {
        const data = (await this.$axios.get(`/super-admin/results/${this.testId}/?page=${this.currentPage}&page_size=${this.pageSize}`)).data
        this.results = data
      } catch (er) {
        console.log(er.response)
      }
    },
    open(tableRow, actionsIndex){
      this.openModal = true
      console.log(tableRow)
      console.log(actionsIndex)
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
