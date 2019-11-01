// 面包屑组件
import MyBread from '@/components/my-bread'
// 频道组件
import MyChannel from '@/components/my-channel'
export default {
  install (Vue) {
    // Vue 是一个构造函数
    Vue.component('my-bread', MyBread)
    Vue.component('my-channel', MyChannel)
  }
}
