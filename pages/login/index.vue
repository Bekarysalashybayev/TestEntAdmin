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
                 v-model.trim="form.username"
                 :class="{error: (this.$v.form.username.$dirty && !this.$v.form.username.required) || (this.$v.form.username.$dirty && !this.$v.form.username.email)}"
          >
        </div>
        <div class="row-group">
          <input type="password"
                 class="row-input password"
                 placeholder="Пароль"
                 v-model.trim="form.password"
                 :class="{error: this.$v.form.password.$dirty && !this.$v.form.password.required}"
                 ref="password"
          >
          <img src="@/assets/img/eyes.svg" alt="" class="eyes" @click="openPass()">
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
    openPass(){
      if (this.$refs.password.type == "text"){
        this.$refs.password.type = "password"
      }else{
        this.$refs.password.type = "text"
      }
    },
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
        data: {
          username: this.form.username.toLowerCase(),
          password: this.form.password,
        }
      }).then(()=>{
        this.$toast.success('Successfully authenticated')
      }).catch((er)=>{
        if (er.response && er.response.data && er.response.data.detail){
          this.$toast.error(er.response.data.detail)
        }
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
