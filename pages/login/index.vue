<template>
<div class="auth">
  <div class="img">
    <img src="../../assets/img/login-bg.svg" alt="">
  </div>
  <div class="img-mobile">
    <img src="../../assets/img/Picture.svg" alt="">
  </div>
  <div class="form-row">
    <div class="form">
      <div class="form-header">
        <div class="title active">
          <div class="nuxt-link">Логин</div>
        </div>
      </div>
      <form @submit.prevent="checkForm" class="form-inner">
        <div class="row-group">
          <input type="text"
                 class="row-input"
                 placeholder="Почта"
                 v-model="form.username"
                 :class="{error: (this.$v.form.username.$dirty && !this.$v.form.username.required) || (this.$v.form.username.$dirty && !this.$v.form.username.email)}"
          >
        </div>
        <div class="row-group">
          <input type="text"
                 class="row-input"
                 placeholder="Пароль"
                 v-model="form.password"
                 :class="{error: this.$v.form.password.$dirty && !this.$v.form.password.required}"
          >
        </div>
        <div class="row-group-bottom">
          <div class="remember">
            <input type="checkbox" id="remember" checked>
            <label for="remember">Запомнить меня</label>
          </div>
          <div class="remember">
            <img src="../../assets/img/forgot-psw.svg" alt="">
            Забыли пароль?
          </div>
        </div>
        <button type="submit">
          Вход
        </button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {required, email} from 'vuelidate/lib/validators'

export default {
  name: "index",
  mixins: [validationMixin],
  layout: 'blank',
  data(){
    return{
      form:{
        username: '',
        password: '',
      },
      errorForm: false,
    }
  },
  validations: {
    form: {
      username: { required, email },
      password: { required},
    },
  },
  methods:{
    checkForm(){
      this.$v.form.$touch()
      if (!this.$v.form.$error) {
        this.errorForm = false
        this.login()
      }
      else {
        this.errorForm = true
      }
    },
    async login() {
      let response = await this.$auth.loginWith('local', {
        data: this.form
      }).then(()=>{
        this.$toast.success('Successfully authenticated')
      }).catch((er)=>{
        this.$toast.error("Ошибка!!!")
      })
    },
  },
}
</script>

<style scoped>
@import url('assets/css/auth/auth.css');
.error{
  border: 1.5px solid #ee1a1a!important
}
input:focus{
  outline: none!important;
}
</style>
