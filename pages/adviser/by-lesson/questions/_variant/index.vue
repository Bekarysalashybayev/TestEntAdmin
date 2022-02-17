<template>
  <div class="page">
    <div class="page-body">
<!--      <path-main />-->
      <div class="questions">
        <div class="question-item" v-for="(question, i) in questions" :key="question.id">
          <div class="question-item-text">
            <span class="question-item-number">{{i+1}}.</span>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
  middleware: ['adviser'],
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
    getRecourses(){

    },
    async getQuestions() {
      try {
        const data =  (await this.$axios.get(`/adviser/question-list/${this.variantID}/`)).data
        this.questions = data
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
        this.$router.push({name: 'adviser-by-lesson'})
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
</style>
