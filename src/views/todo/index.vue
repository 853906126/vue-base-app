<template>
  <div>
    <my-title title="待办"></my-title>
    <van-cell title="显示控制台" is-link @click="showConsole" />
    <van-cell title="隐藏控制台" is-link @click="hideConsole" />
  </div>
</template>

<script>
const VConsole = require('@/assets/js/vconsole.min.js')
const vConsole = new VConsole()

export default {
  name: 'Todo',
  data() {
    return {}
  },

  methods: {
    showConsole() {
      vConsole.showSwitch()
    },
    hideConsole() {
      vConsole.hide()
      vConsole.hideSwitch()
    },
  },
}
</script>

<style></style>
