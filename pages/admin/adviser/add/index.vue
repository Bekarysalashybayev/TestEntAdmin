<template>
  <div class="page">
    <div class="page-body">
<!--      <path-main />-->
      <div class="add-form" @submit.prevent="checkForm">
        <div class="form-header">
          Добавить куратора
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
          <div class="row-group">
            <label for="">Учителей <span>*</span></label>
            <v-autocomplete
              v-model="adviserTeachers"
              :items="teachers"
              :item-text="getName"
              item-value="id"
              clearable
              deletable-chips
              multiple
              small-chips
              solo
              placeholder="Учителей"
            >
            </v-autocomplete>
          </div>
        </form>
      </div>
      <button class="add-form-button" @click="checkForm">
        Добавить куратор
      </button>
    </div>
  </div>
</template>

<script>
// import pathMain from "../../../../components/pathMain";
import { validationMixin } from 'vuelidate'
import { required, email, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: "index",
  // components: {pathMain},
  middleware: ['admin'],
  mixins: [validationMixin],
  data(){
    return{
      teachers: [],
      adviserTeachers: [],
      form: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
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
    this.getTeachers()
  },
  methods:{
    getName(item){
      return item.first_name + ' ' + item.last_name
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
      await this.$axios.post('/super-admin/add-adviser/', {
        teachers: this.adviserTeachers,
        adviser: this.form
      })
        .then(async (response) => {
          console.log(response);
          await this.$toast.success('Успешно!')
          this.$v.form.$reset();
          this.form = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            lesson: ''
          }
        })
        .catch( async (error) => {
          await this.$toast.success('Ошибка!')
        });
      this.$router.push({name: 'admin-adviser'})
    },
    // check(){
    //   for (let prop in this.form) {
    //     console.log(prop + " = " + this.form[prop]);
    //   }
    //   this.errorForm = false
    // },
    async getTeachers() {
      try {
        const data =  (await this.$axios.get('/super-admin/teacher-list/')).data
        this.teachers = data
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
