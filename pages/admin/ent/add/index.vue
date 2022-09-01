<template>
  <div class="page">
    <div class="page-body">
      <div class="add-form" @submit.prevent="checkForm">
        <div class="form-header">
          Создание варианта
        </div>
        <form>
          <div class="row-group">
            <label for="name">Название <span>*</span></label>
            <input type="text" class="row-group-control" id="name"
                   v-model="form.name"
                   :class="{error: this.$v.form.name.$dirty && !this.$v.form.name.required}"
            >
          </div>
        </form>
      </div>
      <button class="add-form-button" @click="checkForm">
        Добавить тест
      </button>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: "index",
  middleware: ['admin'],
  mixins: [validationMixin],
  data(){
    return{
      form: {
        name: '',
      },
      errorForm: false,
    }
  },
  validations: {
    form: {
      name: { required },
    },
  },
  created() {
  },
  methods:{

    checkForm(){
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.add()
      }else {
        this.errorForm = true
      }
    },
    async add(){
      await this.$axios.post('/super-admin/create-variant/', this.form)
        .then(async (response) => {
          this.$v.form.$reset();
          this.form = {
            name: '',
          }
          this.variants = []
          this.$toast.success('Вариант успешно создан!!!')
          await this.$router.push({name: 'admin-ent'})
        })
        .catch( async (error) => {
          await this.$toast.error('Ошибка!')
        });
    },
  },
}
</script>

<style scoped>
@import "assets/css/form.css";
</style>
