<template>
<div class="page">
  <div class="page-body">
    <path-main />
    <div class="filter">
      <div class="select">
        <select name="" id="1" v-model="filter.is_active" @change="filterTestList">
          <option value="">Статаус (все)</option>
          <option :value="status.status" v-for="status in statusFilter" :key="status.id">{{status.name}}</option>
        </select>
      </div>
      <div class="select" v-if="flows.length>0" @change="filterTestList">
        <select name="" id="2" v-model="filter.flow">
          <option value="">Поток (все)</option>
          <option :value="flow.id" v-for="flow in flows" :key="flow.id">
            {{flow.name}}
          </option>
        </select>
      </div>
    </div>
    <div class="test-list" v-if="testList.length>0">
      <div class="test" v-for="(test, i) in testList" :key="i">
        <div class="test-header">
          <div class="title">
            {{$moment(test.end_time).format('DD.MM.YYYY')}}
          </div>
        </div>
        <div class="test-body">
          <div class="body">
            <div class="body-item">
              <img src="../../../assets/img/test-number.svg" alt="">
              <span class="time">{{test.name}}</span>
            </div>
            <div class="body-item">
              <img src="../../../assets/img/test-time.svg" alt="">
              <span>{{test.duration}}</span>
            </div>
          </div>
          <div class="body">
            <div class="body-item">
              <div>Статус:</div>
              <span v-if="test.is_active">Опубликован</span>
              <span v-else>Не опубликован</span>
            </div>
            <div class="body-item">
              <div>Начало:</div>
              <span>{{$moment(test.start_time).format('DD.MM.YYYY, HH-MM-SS')}}</span>
            </div>
            <div class="body-item">
              <div>Окончание:</div>
              <span>{{$moment(test.end_time).format('DD.MM.YYYY, HH-MM-SS')}}</span>
            </div>
          </div>
          <div class="body">
            <div class="body-item">
              <div>Поток:</div>
              <span v-if="test.flow">{{test.flow.name}}.</span>
            </div>
            <div class="body-item" v-if="test.is_active">
              <div>Прошли::</div>
              <span>0</span>
            </div>
          </div>
        </div>
        <div class="test-variant" :class="{active: variantBody == i}" v-if="!test.is_active">
          <div class="test-variant-title">
            <span>Варианты</span>
            <button @click="variantBodyOpen(i)">
              <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.89259 5.84073L10.8376 0.940257C11.0541 0.725227 11.0541 0.376844 10.8376 0.161272C10.6211 -0.0537577 10.2694 -0.0537577 10.0529 0.161272L5.50027 4.67305L0.947613 0.161816C0.731104 -0.0532141 0.379438 -0.0532141 0.162381 0.161816C-0.0541271 0.376845 -0.0541271 0.72577 0.162381 0.9408L5.10736 5.84127C5.32163 6.053 5.67882 6.053 5.89259 5.84073Z" fill="#029AAD"/>
              </svg>
            </button>
          </div>
          <div class="test-variant-body">
            <div class="test-variant-single"
                 :class="{active: variantSingle == variant.id}" v-for="variant in test.variants" :key="variant.id">
              <div class="test-variant-single-title" @click="variantSingleBodyOpen(variant.id)">
                <span>Вариант №{{variant.variant}}</span>
                <button>
                  <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.89259 5.84073L10.8376 0.940257C11.0541 0.725227 11.0541 0.376844 10.8376 0.161272C10.6211 -0.0537577 10.2694 -0.0537577 10.0529 0.161272L5.50027 4.67305L0.947613 0.161816C0.731104 -0.0532141 0.379438 -0.0532141 0.162381 0.161816C-0.0541271 0.376845 -0.0541271 0.72577 0.162381 0.9408L5.10736 5.84127C5.32163 6.053 5.67882 6.053 5.89259 5.84073Z" fill="#029AAD"/>
                  </svg>
                </button>
              </div>
              <div class="test-variant-single-body">
                <div class="variantLessons">
                  <div class="lesson" v-for="lesson in variantLessons" :id="lesson.id">
                    <div class="lesson-name">{{lesson.lesson.name}} </div>
                    <div class="lesson-points">
                      <div class="all">{{lesson.sum_of_question}}</div>
                      <div class="have"> / {{lesson.number_of_questions}}</div>
                    </div>
                    <div class="lesson-add-question" v-if="!test.is_active" @click="addQuestion(lesson.id)">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.27461 0.043067C6.21367 0.065918 6.11465 0.131934 6.05625 0.190332C5.85313 0.390919 5.86582 0.210645 5.86582 3.2042V5.86514H3.20488C0.211328 5.86514 0.391602 5.85498 0.191016 6.05557C-0.0578125 6.30439 -0.0578125 6.69541 0.191016 6.94424C0.391602 7.14482 0.211328 7.13467 3.20488 7.13467H5.86582V9.79561C5.86582 12.7892 5.85566 12.6089 6.05625 12.8095C6.30508 13.0583 6.69609 13.0583 6.94492 12.8095C7.14551 12.6089 7.13535 12.7892 7.13535 9.79561V7.13467H9.79629C12.7898 7.13467 12.6096 7.14482 12.8102 6.94424C13.059 6.69541 13.059 6.30439 12.8102 6.05557C12.6096 5.85498 12.7898 5.86514 9.79629 5.86514H7.13535V3.2042C7.13535 0.210645 7.14551 0.390919 6.94492 0.190332C6.76973 0.012598 6.51582 -0.0407219 6.27461 0.043067Z" fill="#029AAD"/>
                      </svg>
                      <span>Посмотреть вопросы</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="result-test" v-if="test.is_active">
          <span @click="resultTest(test.id)">Результаты теста</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import PathMain from "../../../components/pathMain";
import MultiSelect from "../../../components/core/MultiSelect";
export default {
  name: "index",
  components: {PathMain, MultiSelect},
  middleware: ['adviser'],
  data(){
    return{
      lessons:[
        {
          id: 41,
          name: 'Английский язык'
        },
        {
          id: 24,
          name: 'Биология'
        },
        {
          id: 324,
          name: 'Всемирная история'
        },
        {
          id: 112,
          name: 'Англgийский язык'
        },
        {
          id: 31,
          name: 'Всемирная иgстория'
        },
      ],
      statusFilter: [
        {
          status: false,
          name: 'Не опубликован'
        },
        {
          status: true,
          name: 'Опубликован'
        },
      ],
      flows: [],
      testList: [],
      variantBody: null,
      variantSingle: null,
      variantLessons: [],
      loading: false,
      filter: {
        is_active: '',
        flow: ''
      },
    }
  },
  created() {
    this.getFlows()
    this.getTestList('')
  },
  methods:{
    resultTest(id){
      this.$router.push({name: 'adviser-home-work-result-id', params:{id: id}})
    },
    addQuestion(variant){
      this.$router.push({name: 'adviser-home-work-questions-variant', params:{variant: variant}})
    },
    variantSingleBodyOpen(id){
      if (this.variantSingle!=id){
        this.variantSingle = id
        this.getVariantLessons()
      }else{
        this.variantSingle = null
      }
    },
    variantBodyOpen(id){
      if (this.variantBody!=id){
        this.variantBody = id
      }else{
        this.variantBody = null
      }

    },
    filterTestList(){
      this.getTestList()
    },
    async getVariantLessons() {
      try {
        const data =  (await this.$axios.get(`/adviser/variant-lessons/${this.variantSingle}/`)).data
        this.variantLessons = data
      }catch (er) {
        console.log(er.response)
      }
    },
    async getTestList() {
      try {
        const data =  (await this.$axios.get('/adviser/test-list/home_work/', {params: this.filter})).data
        this.testList = data
      }catch (er) {
        console.log(er.response)
      }
    },
    async getFlows() {
      try {
        const data =  (await this.$axios.get('/quizzes/flow-list/')).data
        this.flows = data
      }catch (er) {
        console.log(er.response)
      }
    },
  },
}
</script>

<style scoped>
@import "assets/css/testList.css";
.filter{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.select{
  width: 48%;
  min-width: 250px;
}
select{
  appearance: auto;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 16px;
}
</style>
