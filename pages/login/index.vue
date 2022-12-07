<template>
  <div class="auth">
    <div class="form-row">
      <div class="form">
        <div class="form-header">
          <div class="title active">
            <nuxt-link to="/login" class="nuxt-link">Логин</nuxt-link>
          </div>
        </div>
        <form @submit.prevent="checkForm" class="form-inner">
          <div class="row-group">
            <div class="row-group">
              <input type="number" class="row-input" placeholder="ИИН" v-model.trim="form.iin" :class="{error: error && !form.iin}">
            </div>
          </div>
          <div class="row-group">
            <img src="../../assets/img/l-pass.svg" alt="iin" class="form-row-icon">
            <input type="password" class="row-input password" placeholder="Пароль"
                   v-model.trim="form.password"
                   ref="password"
                   :class="{error: error && !form.password}"
            >
            <img src="../../assets/img/eyes.svg" alt="" class="eyes" @click="openPass()">
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
export default {
  name: "index",
  layout: 'blank',
  data(){
    return{
      form:{
        iin: null,
        password: null,
      },
      error: false,
    }
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
      this.error = true
      if (this.form.iin && this.form.password){
        this.error = false
        this.login()
      }else{
        this.$toast.error('Напишите данные!')
      }
    },
    async login() {
      try {
        let response = await this.$auth.loginWith('local', {
          data: {
            iin: this.form.iin,
            password: this.form.password,
          }
        }).then(()=>{
          this.$toast.success('Успешно аутентифицирован!')
        })
      } catch (er) {
        if (er.response && er.response.data && er.response.data.detail){
          this.$toast.error(er.response.data.detail)
        }else{
          this.$toast.error('Ошибка Сервера')
        }
      }
    },
  },
}
</script>

<style scoped>
@import url('assets/css/auth/auth.css');
.error{
  border: 1px solid red!important;
}
</style>
