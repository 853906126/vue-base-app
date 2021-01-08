/**
 * 公用组件出口
 */
import MyTitle from './my-title'

const install = function(Vue) {
  Vue.component(MyTitle.name, MyTitle)
}

export default { install }
