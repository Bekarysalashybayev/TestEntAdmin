<template>
  <div class="page">
    <div class="page-body">
<!--      <path-main />-->
      <div class="add-form" @submit.prevent="checkForm">
        <div class="form-header">
          Создание теста на 120 вопросов
        </div>
        <form>
          <div class="row-group-multi">
            <div class="form-group">
              <label for="">Начало <span>*</span></label>
              <input type="datetime-local" class="row-group-control"
                     v-model="form.start_date"
                     :class="{error: this.$v.form.start_date.$dirty && !this.$v.form.start_date.required}"
              >
            </div>
            <div class="form-group">
              <label for="">Окончание <span>*</span></label>
              <input type="datetime-local" class="row-group-control"
                     v-model="form.end_date"
                     :class="{error: this.$v.form.end_date.$dirty && !this.$v.form.end_date.required}"
              >
            </div>
          </div>
          <div class="row-group-multi">
            <div class="form-group">
              <label for="">Длительность <span>*</span></label>
              <input type="number"
                     class="row-group-control"
                     v-model="form.duration"
                     :class="{error: this.$v.form.duration.$dirty && !this.$v.form.duration.required}"
              >
            </div>
          </div>
          <div class="row-group">
            <label for="">Поток <span>*</span></label>
            <select name="" id="" class="row-group-control"
                    v-model="form.flow"
                    :class="{error: this.$v.form.flow.$dirty && !this.$v.form.flow.required}"
            >
              <option :value="flow.id"
                      v-for="flow in flows"
                      :key="flow.id">
                {{flow.name}}
              </option>
            </select>
          </div>
          <div class="row-group">
            <div class="variant-list">
              <div class="variant-input">
                <label for="">Вариант <span>*</span></label>
                <input type="number"
                       v-model="variantName"
                       :class="{error: errorForm && variants.length == 0}"
                >
                <button class="add-variant" type="button" @click="addVariant">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.27461 0.043067C6.21367 0.065918 6.11465 0.131934 6.05625 0.190332C5.85313 0.390919 5.86582 0.210645 5.86582 3.2042V5.86514H3.20488C0.211328 5.86514 0.391602 5.85498 0.191016 6.05557C-0.0578125 6.30439 -0.0578125 6.69541 0.191016 6.94424C0.391602 7.14482 0.211328 7.13467 3.20488 7.13467H5.86582V9.79561C5.86582 12.7892 5.85566 12.6089 6.05625 12.8095C6.30508 13.0583 6.69609 13.0583 6.94492 12.8095C7.14551 12.6089 7.13535 12.7892 7.13535 9.79561V7.13467H9.79629C12.7898 7.13467 12.6096 7.14482 12.8102 6.94424C13.059 6.69541 13.059 6.30439 12.8102 6.05557C12.6096 5.85498 12.7898 5.86514 9.79629 5.86514H7.13535V3.2042C7.13535 0.210645 7.14551 0.390919 6.94492 0.190332C6.76973 0.012598 6.51582 -0.0407219 6.27461 0.043067Z" fill="#029AAD"/>
                  </svg>
                </button>
              </div>
              <div class="variants">
                <div class="variant-name" v-for="(variant, i) in variants" :key="i">
                  <span>№{{variant.variant}}</span>
                  <button type="button" @click="delVariant(i)"><img src="../../../../assets/img/variant-del.svg" alt=""></button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <button class="add-form-button" @click="checkForm">
        Добавить преподавателя
      </button>
    </div>
  </div>
</template>

<script>
// import pathMain from "../../../../components/pathMain";
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: "index",
  // components: {pathMain},
  middleware: ['admin'],
  mixins: [validationMixin],
  data(){
    return{
      flows: [],
      variants: [],
      variantName: "",
      form: {
        start_date: '',
        end_date: '',
        duration: '',
        flow: ''
      },
      errorForm: false,
    }
  },
  validations: {
    form: {
      start_date: { required },
      end_date: {required},
      duration: {required},
      flow: {required}
    },
  },
  created() {
    this.getFlowList()
  },
  methods:{
    addVariant(){
      if (this.variantName!= ""){
        this.variants.push({variant: this.variantName})
        this.variantName = ""
      }
    },
    delVariant(index){
      this.variants.splice(index, 1);
    },
    checkForm(){
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        if (!this.checkVariant){
          this.errorForm = true
        }else{
          this.errorForm = false
          this.add()
        }
      }else {
        this.errorForm = true
      }
    },
    checkVariant(){
      if (this.variants.length==0){
        return false
      }
      return true
    },
    async add(){
      await this.$axios.post('/super-admin/create-test/', {
        flow: this.form.flow,
        test_type: 'ent',
        start_time: this.form.start_date,
        end_time: this.form.end_date,
        duration: this.form.duration,
        variants: this.variants,
        number_of_questions: null,
        lesson: null
      })
        .then(async (response) => {
          console.log(response);
          this.$v.form.$reset();
          this.form = {
            start_date: '',
            end_date: '',
            duration: '',
            flow: '',
          }
          this.variants = []
          this.$toast.success('Тест успешно создано!!!')
          this.$router.push({name: 'admin-ent'})
        })
        .catch( async (error) => {
          await this.$toast.success('Ошибка!')
        });
    },
    // check(){
    //   for (let prop in this.form) {
    //     console.log(prop + " = " + this.form[prop]);
    //   }
    //   this.errorForm = false
    // },
    async getFlowList() {
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
@import "assets/css/form.css";
</style>
