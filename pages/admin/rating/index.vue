<template>
  <div class="page">
    <div class="page-body">
      <div class="test-info">
        <div class="test" v-for="(test, i) in testList" :key="test.id">
          <span>№{{ i+1 }} Дата сдачи:</span>
          <span class="ans">{{ $moment(test["start_time"]).format('DD.MM.YYYY') }} - {{ $moment(test["end_time"]).format('DD.MM.YYYY') }}</span>
          <nuxt-link :to="`rating/${test.id}`" class="r-link">Результаты теста</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "index",
  data() {
    return {
      userInfo: {
        count: 0,
        total_sum: 0,
      },
      testList: []
    }
  },
  created() {
    this.getTestList()
  },
  methods: {
    ...mapMutations({
      setLoader: 'test/SET_LOADER'
    }),
    async getTestList() {
      this.setLoader(true)
      try {
        const response = await this.$axios.get(`quizzes/test-event/`)
        if (response){
          this.testList = response.data
        }
      } catch (er) {
        alert(er)
      }finally {
        this.setLoader(false)
      }
    },
  },
}
</script>

<style scoped>
.test-info{
  margin-top: 40px;
  padding: 20px;
  background: #FFFFFF;
  border: 1px solid #DEDEDE;
  border-radius: 10px;
}
.r-link{
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-decoration: underline!important;
  color: #029AAD;
}
.test{
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border-bottom: 1px solid rgba(143, 138, 138, 0.47);
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}
.test:first-child{
  margin-top: 0;
}
.test span{
  margin-right: 15px;
  margin-bottom: 15px;
}
.test span.ans{
  font-weight: bold;
}
.result-test{
  display: flex;
  align-items: center;
  margin-top: 26px;
}
.result{
  margin-right: 30px;
}
.r-top{
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 30px;
  line-height: 37px;
  color: #029AAD;
}
.r-top img{
  margin-right: 10px;
}
.result span{
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  margin-top: 10px;
  color: #808080;
}
.user-info{
  background: #FFFFFF;
  border: 1px solid #DEDEDE;
  border-radius: 10px;
  padding: 20px;
}
.rate{
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
}
.fio{
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  margin-top: 16px;
}
</style>
