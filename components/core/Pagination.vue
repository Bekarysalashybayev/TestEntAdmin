<template>
  <div class="pagination-container" v-if="pageNumber>1">
    <div class="prev"
         v-if="page!=1"
         @click="prev"
    >
      <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.15927 5.85739L5.05974 10.3529C5.27477 10.5497 5.62316 10.5497 5.83873 10.3529C6.05376 10.156 6.05376 9.83635 5.83873 9.63952L1.32695 5.50074L5.83818 1.36195C6.05321 1.16513 6.05321 0.845432 5.83818 0.648108C5.62315 0.451282 5.27423 0.451282 5.0592 0.648108L0.158727 5.14354C-0.0529994 5.33834 -0.0529993 5.66306 0.15927 5.85739Z" fill="black"/>
      </svg>
    </div>
    <div class="pages clicked"
         :class="{'active': page == 1}"
         @click="changePage(1)"
    >1</div>
    <div class="pages"
         v-if="activePages[0] != 1 && activePages[0] != 2 && pageNumber>4"
    >...</div>
    <div v-for="(pn, index) in activePages" :key="index" class="pages clicked" :class="{'active': page == pn}" @click="changePage(pn)">
      {{ pn }}
    </div>
    <div class="pages"
         v-if="activePages[2]+1 != pageNumber && pageNumber>4"
    >...</div>
    <div class="pages clicked"
         :class="{'active': page == pageNumber}"
         @click="changePage(pageNumber)"
         v-if="pageNumber>4"
    >{{pageNumber}}</div>
    <div class="next"
         v-if="page!=pageNumber"
         @click="next"
    >
      <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.84073 5.85739L0.940257 10.3529C0.725227 10.5497 0.376844 10.5497 0.161272 10.3529C-0.0537577 10.156 -0.0537577 9.83635 0.161272 9.63952L4.67305 5.50074L0.161816 1.36195C-0.0532141 1.16513 -0.0532141 0.845432 0.161816 0.648108C0.376845 0.451282 0.72577 0.451282 0.9408 0.648108L5.84127 5.14354C6.053 5.33834 6.053 5.66306 5.84073 5.85739Z" fill="black"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNumber'],
  data(){
    return{
      page: 1,
      pages: []
    }
  },

  computed:{
    activePages(){
      if (this.pageNumber == 2){
        return [2]
      }
      else if (this.pageNumber == 3){
        return [2,3]
      }
      else if (this.pageNumber == 4){
        return [2,3,4]
      }
      else if (this.pageNumber >= this.page+3){
        if (this.page == 1 ){
          this.pages = [this.page+1, this.page+2, this.page+3]
          return [this.page+1, this.page+2, this.page+3]
        }
        if (this.page == 2){
          this.pages = [this.page, this.page+1, this.page+2]
          return [this.page, this.page+1, this.page+2]
        }
        this.pages = [this.page-1, this.page, this.page+1]
        return [this.page-1, this.page, this.page+1]
      }
      else if(this.pageNumber < this.page+3){
        this.pages = [this.pageNumber-3, this.pageNumber-2, this.pageNumber-1]
        return [this.pageNumber-3, this.pageNumber-2, this.pageNumber-1]
      }
      return this.pages
    },

  },

  methods:{
    changePage(pn){
      this.page = pn
      this.$emit('changePage', this.page)
    },
    prev(){
      if (this.page>=2){
        this.page = this.page - 1
      }
      this.$emit('changePage', this.page)
    },
    next(){
      this.page = this.page + 1
      this.$emit('changePage', this.page)
    }
  }

}
</script>

<style scoped>
.pagination-container{
  font-family: Comfortaa;
  font-size: 2rem;
  font-style: normal;
  font-weight: normal;
  display: flex;
  align-items: center;
}
.prev{
  margin-right: 10px;
  display: flex;
  align-items: center;
  margin-top: -2px;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}
.next{
  margin-left: 10px;
  display: flex;
  align-items: center;
  margin-top: -2px;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}
.next:hover, .prev:hover{
  background: #DFECE9;
}

.pages{
  width: 40px;
  height: 40px;
  border: 1.5px solid #DEDEDE;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 5px;
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;
  user-select: none;
}
.pages.clicked:hover{
  background: #DFECE9;
}
.pages.clicked.active{
  color: #FFFFFF;
  background: #029AAD;
  cursor: pointer;
  font-weight: bold;
}
@media (max-width: 500px) {
  .pages{
    width: 30px;
    height: 30px;
    border: 1px solid #DEDEDE;
    margin-right: 5px;
    line-height: 14px;
  }
}
</style>
