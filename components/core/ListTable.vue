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
        </tr>
        <tr v-for="i in 10" :key="i">
          <td>{{i}}</td>
          <td v-for="i in 7">Химия, 33</td>
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
  data(){
    return{
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
</style>
