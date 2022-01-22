<template>
  <div class="page">
    <div class="page-body">
<!--      <path-main />-->
      <div class="add-form" @submit.prevent="checkForm">
        <div class="form-header">
          Создание профиля преподавателя
        </div>
        <form>
          <div class="row-group-multi">
            <div class="form-group">
              <label for="">Фамилия <span>*</span></label>
              <input type="text" class="row-group-control"
                     v-model="form.first_name"
                     :class="{error: this.$v.form.first_name.$dirty && !this.$v.form.first_name.required}"
              >
            </div>
            <div class="form-group">
              <label for="">Имя <span>*</span></label>
              <input type="text" class="row-group-control"
                     v-model="form.last_name"
                     :class="{error: this.$v.form.last_name.$dirty && !this.$v.form.last_name.required}"
              >
            </div>
          </div>
          <div class="row-group-multi">
            <div class="form-group">
              <label for="">Почта <span>*</span></label>
              <input type="text"
                     class="row-group-control"
                     v-model="form.email"
                     :class="{error: (this.$v.form.email.$dirty && !this.$v.form.email.required) || (this.$v.form.email.$dirty && !this.$v.form.email.email)}"
              >
            </div>
            <div class="form-group">
              <label for="">Номер телефона <span>*</span></label>
              <input type="text" class="row-group-control"
                     v-model="form.phone"
                     :class="
                     {
                       error: (this.$v.form.phone.$dirty && !this.$v.form.phone.required) ||
                       (this.$v.form.phone.$dirty && !this.$v.form.phone.minLength) ||
                       (this.$v.form.phone.$dirty && !this.$v.form.phone.maxLength)
                     }"
              >
              <span class="error-label" v-if="(this.$v.form.phone.$dirty && !this.$v.form.phone.minLength) ||
                       (this.$v.form.phone.$dirty && !this.$v.form.phone.maxLength)">
                Должен быть 11 цифр
              </span>
            </div>
          </div>
          <MultiSelect :data="flows" :selected="adviserFlows" :flow="true" @deleteItem="deleteItem"  @addItem="addItem"></MultiSelect>

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
import { required, email, minLength, maxLength} from 'vuelidate/lib/validators'
import MultiSelect from "../../../../components/core/MultiSelect";

export default {
  name: "index",
  components: {MultiSelect},
  middleware: ['admin'],
  mixins: [validationMixin],
  data(){
    return{
      lessons: [],
      adviserFlows: [],
      flows: [],
      form: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        lesson: ''
      },
      errorForm: false,
    }
  },
  validations: {
    form: {
      email: { required, email },
      first_name: {required},
      last_name: {required},
      phone: {required, minLength: minLength(11), maxLength: maxLength(11)},
    },
  },
  created() {
    this.getFlows()
  },
  methods:{
    addItem(id){
      this.adviserFlows.push(id)
    },
    deleteItem(index){
      this.adviserFlows.splice(index, 1);
    },
    checkForm(){
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.add()
      }else {
        this.errorForm = true
      }
    },
    async add(){
      try{
        await this.$axios.post('/super-admin/add-teacher/', {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          email: this.form.email,
          phone: this.form.phone,
          flows: this.adviserFlows
        })
        await this.$toast.success('Успешно!')
        this.$v.form.$reset();
        this.form = {
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
        }
        await this.$router.push({name: 'admin-teacher'})
      }catch (error){
        if (error.response && error.response.data && error.response.data.detail){
          this.$toast.error(error.response.data.detail)
        }
      }
    },
    // check(){
    //   for (let prop in this.form) {
    //     console.log(prop + " = " + this.form[prop]);
    //   }
    //   this.errorForm = false
    // },
    async getLessons() {
      try {
        const data =  (await this.$axios.get('/quizzes/lesson-list/')).data
        this.lessons = data
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
@import "assets/css/form.css";
</style>
