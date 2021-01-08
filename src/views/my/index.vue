<template>
  <div>
    <my-title title="我的"></my-title>
    <van-button @click="logout">退出</van-button>
  </div>
</template>

<script>
import { custApi } from '@/api'
import { Dialog } from 'vant'
export default {
  name: 'My',
  methods: {
    logout() {
      let vm = this
      Dialog.confirm({
        title: '提示',
        message: '是否退出当前账号',
      })
        .then(async() => {
          await vm.$store.dispatch('app/logout')
          this.$router.push(`/login`)
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>

<style></style>
