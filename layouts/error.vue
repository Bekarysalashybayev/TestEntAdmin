<template>
<div class="error-404">
  <h1>ERROR</h1>
  <nuxt-link :to="{name: 'index'}">HOME</nuxt-link>
</div>
</template>

<script>
export default {
  name: "error",
  layout: 'blank'
}
</script>

<style scoped>

</style>
