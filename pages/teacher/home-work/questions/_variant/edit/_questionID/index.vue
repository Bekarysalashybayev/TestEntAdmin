<template>
  <div class="page">
    <div class="page-body">
<!--      <path-main />-->
      <div class="questions">
        <div class="add-form">
          <div class="text">
            <div class="form-title-common">Текст <span>*</span></div>
            <div class="common">
              <select name="" id="" v-model="commonQuestion">
                <option :value="common.id" v-for="common in commonQuestions">{{ common.name }}</option>
              </select>
              <div class="common-actions">
                <button><img src="@/assets/img/edit.svg" alt="" @click="editCommon"></button>
                <button><img src="@/assets/img/add.svg" alt="" @click="addCommon"></button>
                <button><img src="@/assets/img/delete.svg" alt="" @click="deleteSelectCommon"></button>
              </div>
            </div>
            <div class="question-text">
              <div class="form-title-common">Вопрос <span>*</span></div>
              <client-only placeholder="loading...">
                <ckeditor-nuxt v-model="question.text" :config="editorConfig"  class="answer-input"/>
              </client-only>
            </div>
          </div>
          <div class="answers">
            <div class="form-title">Ответы <span>*</span></div>
            <div class="answer-items">
              <div class="item" v-for="(answer, i) in answers">
                <div class="letter">{{letters[i]}})</div>
                <input type="checkbox" class="check" v-model="answer.correct">
                <div class="answer-text">
                  <client-only placeholder="loading...">
                    <ckeditor-nuxt v-model="answer.answer" :config="editorConfig"  class="answer-input"/>
                  </client-only>
                </div>
                <button class="answer-delete" @click="delAnswer(i)">
                  Удалить
                </button>
              </div>
            </div>
            <div class="add-answer" @click="addAnswer" v-if="answers.length<10">
              Добавить ответ
            </div>
          </div>
        </div>
      </div>
      <div class="common-buttons">
        <button @click="saveQuestion">Сохранить</button>
      </div>
    </div>
    <modal-window v-if="commonModal">
      <template #content>
        <div class="add-common-question">
          <div class="add-common-text">
            <div class="form-title-common">Название <span>*</span></div>
            <input type="text" v-model="newCommonQuestion.name">
          </div>
          <div class="add-common-text">
            <div class="form-title-common">Текст <span>*</span></div>
            <client-only placeholder="loading...">
              <ckeditor-nuxt v-model="newCommonQuestion.text" :config="editorConfig"  class="answer-input"/>
            </client-only>
          </div>
          <div class="common-buttons">
            <button @click="commonSave">Сохранить</button>
            <button @click="commonModal=false">Отмена</button>
          </div>
        </div>
      </template>
    </modal-window>
    <modal-window v-if="commonModalAdd">
      <template #content>
        <div class="add-common-question">
          <div class="add-common-text">
            <div class="form-title-common">Название <span>*</span></div>
            <input type="text" v-model="newCommonQuestion.name">
          </div>
          <div class="add-common-text">
            <div class="form-title-common">Текст <span>*</span></div>
            <client-only placeholder="loading...">
              <ckeditor-nuxt v-model="newCommonQuestion.text" :config="editorConfig"  class="answer-input"/>
            </client-only>
          </div>
          <div class="common-buttons">
            <button @click="commonSavePost">Сохранить</button>
            <button @click="commonModalAdd=false">Отмена</button>
          </div>
        </div>
      </template>
    </modal-window>
  </div>
</template>
<!--<script type="text/x-mathjax-config">-->
<!--  MathJax.Hub.Config({-->
<!--    tex2jax: {-->
<!--      inlineMath: [['$','$'],['\\(','\\)']],-->
<!--    }-->
<!--  });-->
<!--</script>-->
<script>
import ModalWindow from "~/components/core/ModalWindow";
export default {
  name: "index",
  components: {
    ModalWindow,
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
  middleware: ['teacher'],
  data(){
    return{
      editorConfig: {
        simpleUpload: {
          uploadUrl: process.env.BASE_URL + '/quizzes/question-image/',
        },
        removePlugins: ['Title'],
      },
      editorConfigText: {
        simpleUpload: {
          uploadUrl: process.env.BASE_URL + '/quizzes/question-image/',
        },
        removePlugins: ['Title'],
      },
      commonQuestions: [],
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
      answers: [
        {
          correct: false,
          answer: '',
        },
        {
          correct: false,
          answer: '',
        },
        {
          correct: false,
          answer: '',
        },
        {
          correct: false,
          answer: '',
        },
        {
          correct: false,
          answer: '',
        },
      ],
      question: {
        text: '',
      },
      commonQuestion: null,
      newCommonQuestion: {
        id: '',
        name: '',
        text: ''
      },
      commonModal: false,
      commonModalAdd: false,
      isCompleted: true
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
    questionID(){
      return this.$route.params.questionID
    },
  },
  watch:{
    latex(){
      this.reRender()
    }
  },

  mounted() {
    this.getCommonQuestions()
    this.getQuestion()
  },
  methods:{
    checkAnswer(){
      let hasCorrect = false
      let hasCorrectAnswer = false
      if(this.answers>0){
        this.$toast.error('Напишите ответ')
        return false
      }else{
        for (let i=0; i<this.answers.length; i++){
          if(this.answers[i].correct == true){
            hasCorrect = true
            if (this.answers[i].answer != ''){
              hasCorrectAnswer = true
            }
            break
          }
        }
      }
     if (!hasCorrect){
       this.$toast.error('Выберите правильный ответ')
       return false
     }
     if(!hasCorrectAnswer){
       this.$toast.error('Правильный ответ не могут быть пустым')
       return false
     }
     return true
    },
    async saveQuestion(){
      if (this.question.text == ''){
        this.$toast.error('Напишите вопрос')
      }else if(this.checkAnswer()){
        try {
          const data = (await this.$axios.put(`/teacher/question/${this.questionID}/`,
            {
              variant_lesson: this.variantID,
              common_question: this.commonQuestion,
              question: this.question.text,
              answers: this.answers
            }
          )).data
          this.$toast.success('Вопрос изменен успешно')
          this.commonQuestion = null
          this.question.text = ''
          this.answers = [
            {
              correct: false,
              answer: '',
            },
            {
              correct: false,
              answer: '',
            },
            {
              correct: false,
              answer: '',
            },
            {
              correct: false,
              answer: '',
            },
            {
              correct: false,
              answer: '',
            },
          ]
          await this.$router.push({name: 'teacher-home-work-questions-variant', params: {variant: this.variantID}})
        } catch (er) {
          console.log(er.response)
        }
      }
    },
    async editCommon() {
      if (this.commonQuestion == null) {
        this.$toast.error('Текст не выбран')
      } else {
        try {
          const data = (await this.$axios.get(`/super-admin/common-question/${this.commonQuestion}/`)).data
          this.newCommonQuestion = data
          this.commonModal = true
        } catch (er) {
          console.log(er.response)
        }
      }
    },
    addCommon(){
      this.newCommonQuestion = {
        name: '',
        text: ''
      }
      this.commonModalAdd = true
    },
    async commonSavePost() {
      if (this.newCommonQuestion.name == '') {
        this.$toast.error('Напишите название')
      } else if (this.newCommonQuestion.text == '') {
        this.$toast.error('Напишите текст')
      } else {
        this.newCommonQuestion.variant_lesson = this.variantID
        try {
          const data = (await this.$axios.post(`/super-admin/add-common-question/`,
            this.newCommonQuestion
          )).data
          this.$toast.success('Текст добавлен успешно')
          await this.getCommonQuestions()
          this.commonQuestion = data.id
          this.commonModalAdd = false
          this.newCommonQuestion = {
            name: '',
            text: ''
          }
        } catch (er) {
          console.log(er.response)
        }
      }
    },
    async commonSave() {
      if (this.newCommonQuestion.name == '') {
        this.$toast.error('Напишите название')
      } else if (this.newCommonQuestion.text == '') {
        this.$toast.error('Напишите текст')
      } else {
        try {
          const data = (await this.$axios.put(`/super-admin/common-question/${this.commonQuestion}/`, this.newCommonQuestion)).data
          this.$toast.success('Текст изменен успешно!')
          await this.getCommonQuestions()
          this.commonQuestion = data.id
          this.commonModal = false
        } catch (er) {
          console.log(er.response)
        }
      }
    },
    deleteSelectCommon(){
      this.commonQuestion = null
      this.$toast.success('Текст отменен')
    },
    reRender() {
      if(window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub], () => console.log('done'));
      }
    },
    addAnswer(){
      this.$nextTick().then(()=>{
        this.reRender();
      });
      if (this.answers.length<10){
        this.answers.push(
          {
            correct: false,
            answer: '',
          })
      }
    },
    delAnswer(index){
      if (index > -1) {
        this.answers.splice(index, 1);
        this.$toast.success('Ответ удален')
      }
    },
    removeAnswer(){

    },
    async getQuestion() {
      try {
        const data =  (await this.$axios.get(`/teacher/question/${this.questionID}/`)).data
        this.question.text = data.question
        this.commonQuestion = data.common_question
        this.answers = data.answers
      }catch (er) {
        console.log(er.response)
      }
    },
    async getCommonQuestions() {
      try {
        const data =  (await this.$axios.get(`/super-admin/common-question-list/${this.variantID}/`)).data
        this.commonQuestions = data
        this.reRender();
      }catch (er) {
        console.log(er.response)
      }
    },
    async getStatus() {
      try {
        const data =  (await this.$axios.get(`/super-admin/check-variant/${this.variantID}/`)).data
        this.isCompleted = data.status

      }catch (er) {
        this.$router.push({name: 'teacher-ent'})
      }
    },
  },
}
</script>
<style scoped>
@import "../../../../../../../assets/css/questions.css";
</style>
