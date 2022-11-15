<template>
<div class="list-table">
  <div class="table-name">
    Список учеников
  </div>
  <div class="search">
    <input type="text" placeholder="Введите ФИО ..." v-model="q">
    <button @click="searchStudent">Найти</button>
  </div>
  <div class="table-outer">
    <div class="table-outer-scroll">
      <table>
        <thead>
        <tr>
          <th v-if="edit"></th>
          <th>№</th>
          <th v-for="row in rows" :key="row.type" :class="{'td-name': row.type == 'name'}">
            <div class="th">
              <span>{{row.title}}</span>
              <div class="triangle">
                <div class="asc" @click.stop="descending(row.type)" :class="{active: row.sort=='desc'}"></div>
                <div class="desc" @click.stop="ascending(row.type)" :class="{active: row.sort=='asc'}"></div>
              </div>
            </div>
          </th>
          <th v-if="actions.length>0" class="th-action"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, i) in data" :key="user.id">
          <td v-if="edit" class="actions">
          </td>
          <td>{{ (currentPage-1)*pageSize + i+1}}</td>
          <td class="td-name">{{user.student.first_name}} {{user.student.last_name}}</td>
          <td>{{user.mat_quantity}}</td>
          <td>{{user.gramot_quantity}}</td>
          <td>{{user.history_quantity}}</td>
          <td>{{user.lesson_pair.lesson_1.name}}, {{user.prof_1_quantity}}</td>
          <td>{{user.lesson_pair.lesson_2.name}}, {{user.prof_2_quantity}}</td>
          <td>{{user.total}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ListTable",
  props: ['edit', 'actions', 'data', 'currentPage', 'pageSize'],
  data(){
    return{
      actionUser: null,
      actionTest: null,
      closeOnClick: true,
      offset: true,
      q: '',
      rows: [
        {
          type: 'name',
          title: 'ФИО ученика',
          sort: '',
        },
        {
          type: 'lesson1',
          title: 'Мат. грамотность',
          sort: '',
        },
        {
          type: 'lesson2',
          title: 'Грам-сть чтения',
          sort: '',
        },
        {
          type: 'lesson3',
          title: 'История К-на',
          sort: '',
        },
        {
          type: 'lesson4',
          title: 'Проф. предмет № 1',
          sort: '',
        },
        {
          type: 'lesson5',
          title: 'Проф. предмет № 2',
          sort: '',
        },
        {
          type: 'point',
          title: 'Общ. балл',
          sort: '',
        },
      ]
    }
  },
  methods:{
    setUser(user, test, id){
      this.actionUser = user
      this.actionTest = {
        name: test,
        id: id
      }
    },
    searchStudent(){
      this.$emit('searchStudent', this.q)
    },
    getActionsUser(user){
      if (user === this.actionUser){
        return true
      }
      return false
    },
    open(tableRow, actionsIndex){
      this.$emit("open", tableRow, actionsIndex)
    },
    editAccessUser(){
      this.$emit("editAccessUser", this.actionUser, this.actionTest)
    },
    cancelEditUser(){
      this.actionUser = {
        id: 0,
      }
    },
    ascending(type){
      for (let i=0; i<this.rows.length; i++){
        if (this.rows[i].type == type){
          if (this.rows[i].sort == '' || this.rows[i].sort == 'desc'){
            this.rows[i].sort = 'asc'
          }else{
            this.rows[i].sort = ''
          }
        }else{
          this.rows[i].sort = ''
        }
      }
      let index = null
      for (let i=0; i<this.rows.length; i++){
        if (this.rows[i].sort == 'asc'){
          index = i
          break
        }
      }
      if (index != null){
        this.$emit('sort', this.rows[index].type, this.rows[index].sort )
      }else{
        this.$emit('sort', null, null)
      }
    },
    descending(type){
      for (let i=0; i<this.rows.length; i++){
        if (this.rows[i].type == type){
          if (this.rows[i].sort == '' || this.rows[i].sort == 'asc'){
            this.rows[i].sort = 'desc'
          }else{
            this.rows[i].sort = ''
          }
        }else{
          this.rows[i].sort = ''
        }
      }
      let index = null
      for (let i=0; i<this.rows.length; i++){
        if (this.rows[i].sort == 'desc'){
          index = i
          break
        }
      }
      if (index != null){
        this.$emit('sort', this.rows[index].type, this.rows[index].sort )
      }else{
        this.$emit('sort', null, null)
      }
    },
  },
}
</script>

<style scoped>
@import "assets/css/components/table.css";
.button{
  border: 0!important;
  background-color: transparent!important;
  box-shadow: unset!important;
  min-width: 5px!important;
}
.v-list{
  background: #FFFFFF;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-right: 10px;
}
.v-list .item{
  min-height: auto;
}
.v-list-item__title{
  color: black;
}
.th-action{
  min-width: 10px;
  width: 10px;
}
.actions{
  min-width: 40px;
  width: 40px;
  position: relative;
  cursor: pointer;
}
.action-list{
  position: absolute;
  right: 100%;
  top: 50%;
  background: #FFFFFF;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 10px;
  transform: translate(0, -50%);
  min-width: 135px;
}
.action-list.active{
  display: block;
}
.button{
  margin-top: 8px;
  cursor: pointer;
}
.button:first-child{
  margin-top: 0;
}
.button:focus, .button:hover{
}
.search{
  display: flex;
  align-items: center;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #F8F8F8;
  margin-bottom: 20px;
  font-size: 14px;
}
.search button{
  background: #029aad;
  color: #FFFFFF;
  font-weight: bold;
  height: 35px;
  border-radius: 0 10px 10px 0;
  padding: 0 20px;
}
.search input{
  width: 100%;
  border-radius: 10px 0 0 10px;
  border: 1px solid #029AAD!important;
  padding: 0 8px;
  height: 35px;
}
.search input:focus{
  outline: none;
}
.td-name{
  position: sticky;
  left: 0;
  background-color: #FFFFFF!important;
  z-index: 10;
}
th.td-name{
  z-index: 15!important;
}
th{
  position: sticky;
  top: 0;
  background-color: #FFFFFF!important;
  z-index: 10;
}

</style>
