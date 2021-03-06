// 入口文件
// 1、创建根实例  #app  --->  pubulic下的index.html中的app部分
// 2、依赖项目需要的全局资源

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

// @是webpack指定的路径别名  @===“/src”
import router from '@/router'

import axios from '@/api'
// 全局挂载axios
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
