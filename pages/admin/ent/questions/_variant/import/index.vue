<template>
  <div class="page">
    <div class="page-body">
      <input type="file" accept=".txt" id="file" ref="file" v-on:change="handleFileUpload()">
      <div class="common-buttons">
        <button @click="importQuestion">Импорт</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
      variant: this.$route.params.variant,
      file: null,
    }
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async importQuestion() {
      if (!this.file) {
        this.$toast.error("Выберите файл")
        return;
      }
      let formData = new FormData();
      formData.append('file', this.file);
      try {
        await this.$axios.post(`super-admin/add-question/${this.variant}/`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        this.$toast.success("Success")
        await this.$router.push({path: '/admin/ent/questions/' + this.variant})
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>

<style scoped>
input {
  width: 500px;
  font-size: 18px;
  line-height: 1.2;
}

.common-buttons button {
  font-size: 18px;
  line-height: 1.2;
}
</style>
