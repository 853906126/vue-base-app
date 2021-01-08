import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant'
import filters from './filters'
import components from './components'
import vueUtils from './utils/vueUtils'
import './assets/styles/common.css'
import './assets/js/permission'
// import moment from './assets/js/moment.js'

Vue.config.productionTip = false

// 注册过滤器
Object.keys(filters).forEach((k) => {
  Vue.filter(k, filters[k])
})
// 注册全局控件
Vue.use(components)
// 注册全局工具类
Vue.use(vueUtils)

const EventBus = new Vue()
Vue.prototype.$bus = EventBus
// Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
