<template>
  <div>
    <app-main />
    <van-tabbar v-model="active" active-color="#FF7E46">
      <van-tabbar-item icon="wap-home-o" name="home" replace to="/home">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="underway-o" name="todo" replace to="/todo">
        待办
      </van-tabbar-item>
      <van-tabbar-item icon="contact" name="my" replace to="/my">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import appMain from './components/app-main'
export default {
  components: { appMain },
  mounted() {
    this.active = this.$route.name
  },
  activated() {
    this.active = this.$route.name
  },
  data() {
    return {
      active: 'home',
    }
  },
  methods: {},
}
</script>

<style scoped></style>
