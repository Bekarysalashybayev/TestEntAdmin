<template>
  <div class="page">
    <div class="page-body">
      <!--      <path-main />-->
      <div class="add-form" @submit.prevent="checkForm">
        <div class="form-header">
          Изменение профиля пользователя
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
                     disabled
                     v-model="form.email"
                     :class="{error: (this.$v.form.email.$dirty && !this.$v.form.email.required) || (this.$v.form.email.$dirty && !this.$v.form.email.email)}"
              >
            </div>
          </div>
        </form>
      </div>
      <button class="add-form-button" @click="checkForm">
        Изменить преподавателя
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
      },
      errorForm: false,
    }
  },
  validations: {
    form: {
      email: { required, email },
      first_name: {required},
      last_name: {required},
    },
  },
  created() {
    this.getTeacher()
  },
  computed:{
    id(){
      return this.$route.params.id
    },
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
      await this.$axios.put(`/super-admin/student-get-update-destroy/${this.id}/`, this.form)
        .then(async (response) => {
          await this.$toast.success('Успешно!')
          this.$v.form.$reset();
          this.form = {
            first_name: '',
            last_name: '',
            email: '',
          }
          await this.$router.push({name: 'admin-student'})
        })
        .catch( async (error) => {
          await this.$toast.success('Ошибка!')
        });
    },
    async getTeacher() {
      try {
        const data =  (await this.$axios.get(`/super-admin/student-get-update-destroy/${this.id}/`)).data
        this.form = data
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
