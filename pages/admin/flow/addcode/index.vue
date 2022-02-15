<template>
  <div class="page">

    <div class="page-body">
      Еще не готово!
<!--&lt;!&ndash;      <path-main />&ndash;&gt;-->
<!--      <div class="add-form" @submit.prevent="checkForm">-->
<!--        <div class="form-header">-->
<!--          Создание потока-->
<!--        </div>-->
<!--        <form>-->
<!--          <div class="row-group-multi">-->
<!--            <div class="form-group">-->
<!--              <label for="">Дата старта <span>*</span></label>-->
<!--              <input type="date" class="row-group-control"-->
<!--                     v-model="form.start_time"-->
<!--                     :class="{error: this.$v.form.start_time.$dirty && !this.$v.form.start_time.required}"-->
<!--              >-->
<!--            </div>-->
<!--            <div class="form-group">-->
<!--              <label for="">Дата окончание <span>*</span></label>-->
<!--              <input type="date" class="row-group-control"-->
<!--                     v-model="form.end_time"-->
<!--                     :class="{error: this.$v.form.end_time.$dirty && !this.$v.form.end_time.required}"-->
<!--              >-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="row-group-multi">-->
<!--            <div class="form-group">-->
<!--              <label for="">Название <span>*</span></label>-->
<!--              <input type="text" class="row-group-control"-->
<!--                     v-model="form.name"-->
<!--                     :class="{error: this.$v.form.name.$dirty && !this.$v.form.name.required}"-->
<!--              >-->
<!--            </div>-->
<!--            <div class="row-group-multi">-->
<!--              <div class="form-group">-->
<!--                <label for="">Предметы <span>*</span></label>-->
<!--                <select name="" id="" class="row-group-control"-->
<!--                        v-model="form.lesson"-->
<!--                        :class="{error: this.$v.form.lesson.$dirty && !this.$v.form.lesson.required}"-->
<!--                >-->
<!--                  <option :value="lesson.id"-->
<!--                          v-for="lesson in lessons"-->
<!--                          :key="lesson.id">-->
<!--                    {{lesson.name}}-->
<!--                  </option>-->
<!--                </select>-->
<!--              </div>-->
<!--              <div class="form-group">-->
<!--                <label for="">Код <span>*</span></label>-->
<!--                <select name="" id="5" class="row-group-control"-->
<!--                        v-model="form.code"-->
<!--                        :class="{error: this.$v.form.code.$dirty && !this.$v.form.code.required}"-->
<!--                >-->
<!--                  <option :value="code.id"-->
<!--                          v-for="code in flowCodes"-->
<!--                          :key="code.id">-->
<!--                    {{code.code}}-->
<!--                  </option>-->
<!--                </select>-->
<!--              </div>-->
<!--            </div>-->

<!--          </div>-->
<!--        </form>-->
<!--      </div>-->
<!--      <button class="add-form-button" @click="checkForm">-->
<!--        Добавить поток-->
<!--      </button>-->
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
      lessons: [],
      form: {
        start_time: '',
        end_time: '',
        name: '',
        lesson: '',
        code: ''
      },
      flowCodes: [],
      errorForm: false,
    }
  },
  validations: {
    form: {
      start_time: {required},
      end_time: {required},
      name: {required},
      lesson: {required},
      code: {required},
    },
  },
  created() {
    this.getLessons()
    this.getFlowCodes()
  },
  methods:{
    async getFlowCodes() {
      try {
        const data =  (await this.$axios.get(`/quizzes/flow-code/`)).data
        this.flowCodes = data
      }catch (er) {
        console.log(er.response)
      }
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
      await this.$axios.post('/super-admin/add-flow/', {
        start_time: this.$moment(this.form.start_time).format('YYYY-MM-DD hh:mm:ss'),
        end_time: this.$moment(this.form.end_time).format('YYYY-MM-DD hh:mm:ss'),
        name: this.form.name,
        lesson: this.form.lesson
      })
        .then(async (response) => {
          await this.$toast.success('Успешно!')
          this.$v.form.$reset();
          this.form = {
            start_time: '',
            end_time: '',
            name: '',
            quantity_of_students: '',
          }
          this.$router.push({name: 'admin-flow'})
        })
        .catch( async (error) => {
          await this.$toast.success('Ошибка!')
        });
    },
    async getLessons() {
      try {
        const data =  (await this.$axios.get('/quizzes/lesson-list/')).data
        this.lessons = data
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
