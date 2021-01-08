<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="keepAlive">
        <router-view :key="key" />
      </keep-alive>
    </transition>

    <van-overlay :show="$store.getters.isLoading">
      <div class="wrapper">
        <van-loading type="spinner" color="#FF9C00" />
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  name: 'app',
  computed: {
    key() {
      return this.$route.fullPath
    },
    keepAlive() {
      return this.$store.getters.keepAlive
    },
  },
  data() {
    return {
      transitionName: 'slide-left',
    }
  },
  watch: {
    $route(to) {
      if (to.path == '/') {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    },
  },
}
</script>
<style scoped>
#app {
}

.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.6s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
