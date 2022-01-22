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
          <th v-if="file">Файл</th>
          <th v-if="edit"></th>
        </tr>
        <tr v-for="(user, i) in data" :key="user.id">
          <td v-if="edit" class="actions">
          </td>
          <td>{{i+1}}</td>
          <td>{{user.student.first_name}} {{user.student.last_name}}</td>
          <td>{{user.quantity}}</td>
          <td v-if="user.file"><a :href="user.file" target="_blank" class="download-link">скачать</a></td>
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
  props: ['edit', 'actions', 'data', 'file'],
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
          title: this.data[0].lesson_name,
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
      let currentType = null
      if (type == 'name'){
        currentType = 'user'
      }else{
        currentType = 'lesson'
      }
      let index = null
      for (let i=0; i<this.rows.length; i++){
        if (this.rows[i].sort == 'asc'){
          index = i
          break
        }
      }
      if (index != null){
        this.$emit('sort', currentType, this.rows[index].sort )
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
      let currentType = null
      if (type == 'name'){
        currentType = 'user'
      }else{
        currentType = 'lesson'
      }
      let index = null
      for (let i=0; i<this.rows.length; i++){
        if (this.rows[i].sort == 'desc'){
          index = i
          break
        }
      }
      if (index != null){
        this.$emit('sort', currentType, this.rows[index].sort )
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
.download-link{
  text-decoration: underline!important;
  color: #029AAD;
  font-weight: bold;
}
</style>
