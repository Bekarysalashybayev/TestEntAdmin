<template>
  <div class="page">
    <div class="page-body">
      <!--    <path-main />-->
      <button class="add-button" @click="addTest">
        Добавить тест
      </button>
      <div class="test-list" v-if="testList.length>0">
        <div class="test" v-for="(test, i) in testList" :key="i">
          <div class="d-test">
            <div class="d-title">
              Нұсқа №{{ test.variant }}
            </div>
            <div class="d-body">
              <div class="d-body-item">
                <div class="d-label">
                  Опубликовано:
                </div>
                <div class="d-text">
                  {{ test.duration }}
                </div>
              </div>
              <div class="d-body-item">
                <div class="d-label">
                  Язык:
                </div>
                <div class="d-text">
                  Казахский
                </div>
              </div>

              <div class="d-body-item">
                <button class="d-btn" @click="deleteTest(test)" v-if="!test.is_active">
                  <img src="../../../assets/img/d-delete.svg" alt="">
                  Удалить
                </button>
              </div>
            </div>
            <div class="d-footer">
              <label class="switch">
                <input type="checkbox" v-model="test.is_active" @change="publishTest(test)" :disabled="test.is_active">
                <span class="slider round"></span>
              </label>
              {{ test.is_active ? "Активировано" : "Активировать" }}
            </div>
          </div>
          <div class="test-variant" :class="{active: variantBody == i}">
            <div class="test-variant-title">
              <span>Предметы</span>
              <button @click="variantBodyOpen(i, test.id)">
                <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.89259 5.84073L10.8376 0.940257C11.0541 0.725227 11.0541 0.376844 10.8376 0.161272C10.6211 -0.0537577 10.2694 -0.0537577 10.0529 0.161272L5.50027 4.67305L0.947613 0.161816C0.731104 -0.0532141 0.379438 -0.0532141 0.162381 0.161816C-0.0541271 0.376845 -0.0541271 0.72577 0.162381 0.9408L5.10736 5.84127C5.32163 6.053 5.67882 6.053 5.89259 5.84073Z"
                    fill="#029AAD"/>
                </svg>
              </button>
            </div>
            <div class="test-variant-body">
              <div class="variantLessons">
                <div class="lesson" v-for="lesson in variantLessons" :id="lesson.id">
                  <div class="lesson-name">{{ lesson.lesson.name }}</div>
                  <div class="lesson-points">
                    <div class="all">{{ lesson.sum_of_question }}</div>
                    <div class="have"> / {{ lesson.number_of_questions }}</div>
                  </div>
                  <div class="lesson-add-question" v-if="lesson.sum_of_question != lesson.number_of_questions"
                       @click="addQuestion(lesson.id)">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.27461 0.043067C6.21367 0.065918 6.11465 0.131934 6.05625 0.190332C5.85313 0.390919 5.86582 0.210645 5.86582 3.2042V5.86514H3.20488C0.211328 5.86514 0.391602 5.85498 0.191016 6.05557C-0.0578125 6.30439 -0.0578125 6.69541 0.191016 6.94424C0.391602 7.14482 0.211328 7.13467 3.20488 7.13467H5.86582V9.79561C5.86582 12.7892 5.85566 12.6089 6.05625 12.8095C6.30508 13.0583 6.69609 13.0583 6.94492 12.8095C7.14551 12.6089 7.13535 12.7892 7.13535 9.79561V7.13467H9.79629C12.7898 7.13467 12.6096 7.14482 12.8102 6.94424C13.059 6.69541 13.059 6.30439 12.8102 6.05557C12.6096 5.85498 12.7898 5.86514 9.79629 5.86514H7.13535V3.2042C7.13535 0.210645 7.14551 0.390919 6.94492 0.190332C6.76973 0.012598 6.51582 -0.0407219 6.27461 0.043067Z"
                        fill="#029AAD"/>
                    </svg>
                    <span>Добавить вопросы</span>
                  </div>
                  <div class="lesson-add-question" v-else @click="addQuestion(lesson.id)">
                    <span>Посмотреть вопросы</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-window v-if="isPublish">
      <template #content>
        <div class="modal-delete-text">
          <div class="modal-text">
            Вы точно хотите <br>опубликовать этот тест?
          </div>
          <div class="common-buttons">
            <button @click="publishCurrentTest">Опубликовать</button>
            <button @click="cancelPublishCurrentTestAfter">Отмена</button>
          </div>
        </div>
      </template>
    </modal-window>
    <modal-window v-if="isDelete">
      <template #content>
        <div class="modal-delete-text">
          <div class="modal-text">
            Вы точно хотите <br>удалить этот тест?
          </div>
          <div class="common-buttons">
            <button @click="deleteCurrentTest">Удалить</button>
            <button @click="cancelDeleteCurrentTest">Отмена</button>
          </div>
        </div>
      </template>
    </modal-window>
    <modal-window v-if="isPublishError">
      <template #content>
        <div class="modal-delete-text">
          <div class="modal-text">
            {{ isPublishErrorText }}
          </div>
          <div class="common-buttons">
            <button @click="isPublishError=false">Закрыть</button>
          </div>
        </div>
      </template>
    </modal-window>
  </div>
</template>

<script>
import MultiSelect from "../../../components/core/MultiSelect";
import ModalWindow from "~/components/core/ModalWindow";
import {mapMutations} from 'vuex'

export default {
  name: "index",
  components: {MultiSelect, ModalWindow},
  middleware: ['admin'],
  data() {
    return {
      codeList: [],
      isPublishModalCode: false,
      isPublish: false,
      isDelete: false,
      isPublishError: false,
      isPublishErrorText: false,
      currentPublishTest: null,
      currentDeleteTest: null,
      statusFilter: [
        {
          status: false,
          name: 'Не опубликован'
        },
        {
          status: true,
          name: 'Опубликован'
        },
      ],
      flows: [],
      flowCodes: [],
      activeFlowCodes: [],
      testList: [],
      variantBody: null,
      variantSingle: null,
      variantLessons: [],
      loading: false,
      filter: {
        is_active: '',
      },
      publishError: false,
    }
  },
  created() {
    this.getTestList('')
  },
  methods: {
    ...mapMutations({
      setLoader: 'test/SET_LOADER'
    }),
    publishTest(test) {
      this.currentPublishTest = test
      this.isPublish = true
    },
    publishTestsByCode() {
      if (this.checkTestTimes()) {
        this.publishError = false
        this.isPublishModalCode = false
        this.isPublish = true
      } else {
        this.publishError = true
      }
    },
    checkTestTimes() {
      let ans = true
      let checkedCount = 0
      for (let i = 0; i < this.codeList.length; i++) {
        if (this.codeList[i].checked) {
          checkedCount++
          if (!this.codeList[i].start_time || !this.codeList[i].end_time) {
            ans = false
            this.$toast.error("Выберите все поля!")
            break
          }
        }
      }
      if (checkedCount == 0) {
        this.$toast.error("Выберите хотя бы один код!")
        ans = false
      }
      return ans
    },
    deleteTest(test) {
      this.currentDeleteTest = test
      this.isDelete = true
    },
    cancelDeleteCurrentTest() {
      this.currentDeleteTest = null
      this.isDelete = false
    },
    cancelPublishCurrentTestAfter() {
      this.currentPublishTest.is_active = false
      this.currentPublishTest = null
      this.isPublish = false
    },
    cancelPublishCurrentTest() {
      this.currentPublishTest = null
      this.isPublishModalCode = false
    },
    async deleteCurrentTest() {
      this.isDelete = false
      try {
        await this.$axios.delete(`/super-admin/destroy-variant/${this.currentDeleteTest.id}/`)
        this.$toast.success('Тест удален успешно!')
        this.currentDeleteTest = null
        await this.getTestList()
      } catch (er) {
        this.$toast.error('Ошибка!')
        console.log(er)
      }
    },
    async publishCurrentTest() {
      await this.setLoader(true)
      this.isPublish = false
      try {
        await this.$axios.patch(`/super-admin/variant-publish/${this.currentPublishTest.id}/`, {
          is_active: true
        })
        this.$toast.success('Тест опубликован успешно!')
        this.currentPublishTest = null
        await this.getTestList()
      } catch (er) {
        this.currentPublishTest.is_active = false
        await this.setLoader(false)
        this.isPublishError = true
        if (er.response) {
          this.isPublishErrorText = er.response.data.detail
        } else {
          this.isPublishErrorText = 'Ошибка сервера'
        }
      }
      await this.setLoader(false)
    },
    resultTest(id) {
      this.$router.push({name: 'admin-ent-result-id', params: {id: id}})
    },
    addQuestion(variant) {
      this.$router.push({name: 'admin-ent-questions-variant', params: {variant: variant}})
    },
    addTest() {
      this.$router.push({name: 'admin-ent-add'})
    },
    async variantBodyOpen(id, variant) {
      if (this.variantBody != id) {
        this.variantBody = id
        this.variantSingle = variant
        await this.setLoader(true)
        await this.getVariantLessons()
        await this.setLoader(false)
      } else {
        this.variantBody = null
      }

    },
    filterTestList() {
      this.getTestList()
    },
    async getVariantLessons() {
      try {
        const data = (await this.$axios.get(`/super-admin/variant-lessons/${this.variantSingle}/`)).data
        this.variantLessons = data
      } catch (er) {
        console.log(er)
      }
    },
    async getTestList() {
      await this.setLoader(true)
      try {
        const res = (await this.$axios.get('/super-admin/variant-list/', {params: this.filter})).data
        this.testList = res.data
      } catch (er) {
        console.log(er)
      }
      await this.setLoader(false)
    },
  },
}
</script>

<style scoped>
@import "assets/css/testList.css";

.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.select {
  width: 48%;
  min-width: 250px;
}

select {
  appearance: auto;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 8px 15px;
  font-size: 16px;
}

.modal-text-publish select {
  width: 100px;
  padding: 7px;
}

.modal-text-publish {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.green {
  color: #099717;
  font-weight: bold;
}

.modal-text-publish .times {
  display: flex;
  align-items: center;
}

.modal-text-publish .times .start {
  margin-left: 15px;
  display: flex;
  align-items: center;
}

.ml-15 {
  margin-left: 15px;
  font-weight: bold;
}

.code-test-flow {
  width: 150px;
  display: flex;
  align-items: center;
}

.checked {
  margin-right: 10px;
}

.code-test-flow div:first-child {
  margin-right: 10px;
}

.code-test-flow div:last-child {
  font-weight: bold;
}

.add-code {
  margin: 25px 0;
  cursor: pointer;
}

.add-code:hover {
  color: #167DD6;
}

.del-code {
  margin-left: 15px;
  cursor: pointer;
}

.del-code:hover {
  color: #ee1a1a;
}

.bottom-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.btn {
  border: 1px solid #029AAD;
  box-sizing: border-box;
  border-radius: 50px;
  font-size: 15px;
  line-height: 18px;
  padding: 7px 15px;
  cursor: pointer;
}

.publish-save {
  background: #029AAD;
  font-weight: 600;
  color: #FFFFFF;
}

.cancel {
  margin-right: 30px;
  color: #029AAD;
  background-color: #FFFFFF;
}
</style>
