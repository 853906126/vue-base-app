<template>
  <div class="app-main">
    <keep-alive :include="keepAlive">
      <router-view :key="key" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath
    },
    keepAlive() {
      return this.$store.getters.keepAlive
    },
  },
}
</script>

<style scoped>
.app-main {
  height: calc(100vh - 50px);
  width: 100vw;
  overflow: scroll;
  position: relative;
}
</style>
