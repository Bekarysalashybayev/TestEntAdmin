<template>
<div class="multi-select">
  <dropdown ref="drop">
    <template #header>
      <div class="multi-select-header">
        <div class="header-name">
          <img :src="`${imgUrl(title.icon)}`" alt="MDN">
          <span class="title">{{title.name}}</span>
        </div>
        <div class="arrow">
          <img src="../../assets/img/filter-arrow.svg" alt="">
        </div>
      </div>
    </template>
    <template #body>
      <div class="multi-select-body">
        <div class="body-inner scroll">
          <div class="item" v-for="item in data" :key="item.id">
            <input type="checkbox" :id="item.name + item.id">
            <label class="item-name" :for="item.name + item.id">{{item.name}}</label>
          </div>
        </div>
        <button @click="filter" class="filter">
          Выбрать
        </button>
      </div>
    </template>
  </dropdown>
</div>
</template>

<script>
import dropdown from "./dropdown";
export default {
  name: "MultiSelect1",
  props: ['title', 'data'],
  components: {dropdown},
  methods:{
    imgUrl(img){
      return `${require(`@/assets/img/${img}`)}`
    },
    filter(){
      this.$refs.drop.close()
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
