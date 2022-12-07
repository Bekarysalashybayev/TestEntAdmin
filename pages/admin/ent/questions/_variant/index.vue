<template>
  <div class="page">
    <div class="page-body">
<!--      <path-main />-->
     <div style="display: flex; align-items: center;">
       <nuxt-link class="add-button question-add"  style="margin-right: 20px;" v-if="isCompleted" :to="{path: '/admin/ent/questions/'+variantID+'/import'}">
         Импорт
       </nuxt-link>
       <nuxt-link class="add-button question-add" v-if="isCompleted" :to="{path: '/admin/ent/questions/'+variantID+'/add'}">
         Добавить вопрос
       </nuxt-link>
     </div>
      <div class="questions" v-if="questions.length>0">
        <div class="question-item" v-for="(question, i) in questions" :key="question.id">
          <div class="question-item-text">
            <span class="question-item-number">{{i+1}}.</span>
            <div v-if="question.common_question">
              <div v-html="question.common_question.text"></div>
            </div>
            <br>
            <div v-html="question.question"></div>
          </div>
          <div class="question-item-answers">
            <div class="question-item-answer"
                 v-for="(answer, i) in question.answers"
                 :key="answer.id"
                 :class="{correct: answer.correct}"
            >
              <div class="question-item-answer-letter">{{letters[i]}})</div>
              <div class="question-item-answer-text">
                <div v-html="answer.answer"></div>
              </div>
            </div>
          </div>
          <div class="question-item-actions">
            <nuxt-link :to="{path: '/admin/ent/questions/'+variantID+'/edit/' + question.id}" class="edit">Изменить</nuxt-link>
            <button class="delete" @click="deleteQuestionModal(question.id)">Удалить</button>
          </div>
          <div class="order">
            <input type="number" v-model="question.number">
            <button @click="sendNumber(question.number, question.id)">OK</button>
          </div>
        </div>
      </div>
      <div class="questions" v-else>
        Вопросы еще не добавлены
      </div>
    </div>
    <modal-window v-if="questionDeleteModal">
      <template #content>
       <div class="modal-delete-text">
         <div class="modal-text">
           Вы точно хотите удалить вопрос?
         </div>
         <div class="common-buttons">
           <button @click="deleteQuestion">Удалить</button>
           <button @click="cancelDelete">Отмена</button>
         </div>
       </div>
      </template>
    </modal-window>
  </div>
</template>
<script>
import ModalWindow from "../../../../../components/core/ModalWindow";
export default {
  name: "index",
  components: {
    ModalWindow,
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
  middleware: ['admin'],
  data(){
    return{
      editorConfig: {
        removePlugins: ['Title'],
      },
      editorConfigText: {
        removePlugins: ['Title'],
      },
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
      answers: [],
      questions: {},
      commonQuestion: null,
      isCompleted: true,
      questionDeleteId: null,
      questionDeleteModal: false,
    }
  },
  head() {
    return {
      script: [
        {
          hid: 'stripe',
          src: 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML',
          defer: true,
          body: true
        }
      ]
    }
  },
  created() {
    this.getStatus()
  },

  computed:{
    variantID(){
      return this.$route.params.variant
    },
  },
  watch:{
    latex(){
      this.reRender()
    }
  },

  mounted() {
    this.reRender();
    this.getQuestions()
  },
  methods:{
    async deleteQuestion() {
      try {
        const data = (await this.$axios.delete(`/super-admin/question/${this.questionDeleteId}/`)).data
        this.$toast.success('Вопрос удален!')
      } catch (er) {
        this.$toast.error('Ошибка')
      }
      this.questionDeleteId = null
      this.questionDeleteModal = false
      await this.getQuestions()
    },
    async sendNumber(number, id) {
      try {
        await this.$axios.patch(`/super-admin/question/${id}/`, {
          "number": number
        })
        this.$toast.success('Обновление успешно завершено!')
      } catch (er) {
        this.$toast.error('Ошибка')
      }
    },
    cancelDelete(){
      this.questionDeleteId = null
      this.questionDeleteModal = false
    },
    deleteQuestionModal(id){
      this.questionDeleteId = id
      this.questionDeleteModal = true
    },
    getRecourses(){

    },
    async getQuestions() {
      try {
        const data =  (await this.$axios.get(`/super-admin/question-list/${this.variantID}/`)).data
        this.questions = data
        this.reRender();
      }catch (er) {
        console.log(er)
      }
    },
    async getStatus() {
      try {
        const data =  (await this.$axios.get(`/super-admin/check-variant/${this.variantID}/`)).data
        this.isCompleted = data.status
        if (this.isCompleted){
          this.getRecourses()
        }
      }catch (er) {
        console.log(er)
      }
    },
    reRender() {
      if(window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub], () => console.log('done'));
      }
    },

  },
}
</script>
<!--<script type="text/x-mathjax-config">-->
<!--  MathJax.Hub.Config({-->
<!--    tex2jax: {-->
<!--      inlineMath: [['$','$'],['\\(','\\)']],-->
<!--    }-->
<!--  });-->
<!--</script>-->
<style scoped>
@import "../../../../../assets/css/questions.css";
.order{
  margin-top: 20px;
  display: flex;
  align-items: center;
}
.order input{
  font-size: 16px;
  line-height: 1.2;
}
.order button{
  margin-left: 10px;
  background-color: #167DD6;
  color: #FFFFFF;
  font-size: 16px;
  line-height: 1.2;
  padding: 5px 15px;
}
</style>
