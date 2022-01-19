<template>
<div class="multi-select">
  <dropdown ref="drop">
    <template #header>
      <div class="multi-select-header">
        <div class="header-name">
          <div class="selected" v-for="id in selected" v-if="flow">
            {{getName(id)}} <span>,</span>
          </div>
          <div class="selected" v-for="id in selected" v-if="!flow">
            {{getFullName(id)}} <span>,</span>
          </div>
        </div>
        <div class="arrow">
          <img src="../../assets/img/filter-arrow.svg" alt="">
        </div>
      </div>
    </template>
    <template #body>
      <div class="multi-select-body">
        <div class="body-inner scroll">
          <div class="item" v-for="item in data" :key="item.id" v-if="flow">
            <input type="checkbox" :id="item.name + item.id" @change="select(item.id)" :checked="idExist(item.id)">
            <label class="item-name" :for="item.name + item.id">{{item.name}}</label>
          </div>
          <div class="item" v-for="item in data" :key="item.id" v-if="!flow">
            <input type="checkbox" :id="item.first_name + item.id" @change="select(item.id)" :checked="idExist(item.id)">
            <label class="item-name" :for="item.first_name + item.id">{{item.first_name}}, {{item.last_name}}</label>
          </div>
        </div>
      </div>
    </template>
  </dropdown>
</div>
</template>

<script>
import dropdown from "./dropdown";
export default {
  name: "MultiSelect1",
  props: ['data', 'selected', 'flow'],
  components: {dropdown},
  data(){
    return{
    }
  },
  methods:{
    imgUrl(img){
      return `${require(`@/assets/img/${img}`)}`
    },
    getFullName(id){
      for (let i=0; i< this.data.length; i++){
        if (this.data[i].id == id){
          return this.data[i].first_name + ' ' + this.data[i].last_name
        }
      }
    },
    getName(id){
      for (let i=0; i< this.data.length; i++){
        if (this.data[i].id == id){
          return this.data[i].name
        }
      }
    },
    filter(){
      this.$refs.drop.close()
    },
    deleteItem(id){
      let index = this.selected.indexOf(id);
      if (index !== -1) {
        this.$emit('deleteItem', index)
      }
    },
    idExist(id){
      return this.selected.includes(id)
    },
    select(id){
      if (!this.selected.includes(id)) {
        this.$emit('addItem', id)
      }else{
        let index = this.selected.indexOf(id);
        if (index !== -1) {
          this.$emit('deleteItem', index)
        }
      }
    },
  },
}
</script>

<style scoped>
.multi-select{
  width: 100%;
  color: rgba(0, 0, 0, 0.5);
  font-size: 15px;
  line-height: 17px;
}
.multi-select-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 15px;
}
.header-name{
  display: flex;
  align-items: center;
}
.selected{
  margin-right: 10px;
}
.multi-select-header .title{
  margin-left: 10px;
}
.arrow{
  flex: 0 0 15px;
  display: flex;
  align-items: flex-end;
}
.multi-select-body{
  background: #FFFFFF;
  border-radius: 0px 0px 5px 5px;
  padding: 10px;
  width: 100%;
  border-top: 1px solid #DEDEDE;
}
.body-inner{
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 250px;
}
.item{
  display: flex;
  align-items: center;
  border-bottom: 1px solid #DEDEDE;
  padding: 8px 0;
  user-select: none;
}
.item:last-child{
  border-bottom: 0;
}
.item-name{
  margin-left: 8px;
  color: #000000;
  cursor: pointer;
  width: max-content;
}
.multi-select-body button{
  margin: 20px auto 10px;
  display: block;
  color: #029AAD;
  border: 1px solid #029AAD;
  border-radius: 5px;
  background-color: transparent;
  padding: 5px 12px;
}
.multi-select-body button:hover{
  color: #FFFFFF;
  background-color: #029AAD;
}
</style>
