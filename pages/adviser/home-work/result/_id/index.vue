<template>
  <div class="page">
    <div class="page-body">
      <path-main />
      <div class="list">
        <loading v-if="loading"/>
        <ListTable :edit="true" @open="open" :actions="actions"/>
        <div class="list-bottom">
          <pagination page-number="40" class="table-pagination"/>
          <div class="all-items-count">
            <span>
              Всего: 50
            </span>
            <div class="page-items-count">
              <select name="" id="">
                <option value="">5 студентов</option>
              </select>
            </div>
          </div>
        </div>
      </div>
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
import ListTable from "../../../../../components/core/ListTable";
import Pagination from "../../../../../components/core/Pagination";
import ModalWindow from "../../../../../components/core/ModalWindow";
import loading from "../../../../../components/core/loading";
export default {
  name: "index",
  components: {ListTable, pathMain, Pagination, ModalWindow, loading},
  data(){
    return{
      loading: false,
      openModal: false,
      actions: [
        { title: 'Открыть доступ  ' },
      ],
    }
  },
  methods:{
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
