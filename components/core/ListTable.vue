<template>
<div class="list-table">
  <div class="table-name">
    Список учеников
  </div>
  <div class="table-outer">
    <div class="table-outer-scroll">
      <table>
        <tbody>
        <tr>
          <th v-if="edit"></th>
          <th>№</th>
          <th v-for="row in rows" :key="row.type">
            <div class="th">
              <span>{{row.title}}</span>
              <div class="triangle">
                <div class="asc" @click.stop="descending(row.type)" :class="{active: row.sort=='desc'}"></div>
                <div class="desc" @click.stop="ascending(row.type)" :class="{active: row.sort=='asc'}"></div>
              </div>
            </div>
          </th>
          <th v-if="edit"></th>
        </tr>
        <tr v-for="i in 10" :key="i">
          <td v-if="edit" class="actions">
          </td>
          <td>{{i}}</td>
          <td v-for="i in 7">Химия, 33</td>
          <td v-if="edit" class="actions">
          </td>
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
  props: ['edit', 'actions'],
  data(){
    return{
      closeOnClick: true,
      offset: true,
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
    open(tableRow, actionsIndex){
      this.$emit("open", tableRow, actionsIndex)
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
.actions{
  min-width: auto;
}
.button{
  width: 35px;
}
.button:focus, .button:hover{
  border-radius: 50%;
  background-color: #FFFFFF!important;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25) !important;
}
</style>
