import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    // 登陆规则
    {
      path: '/login',
      component: Login
    },
    // 首页规则
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎页面
        {
          path: '/',
          component: Welcome
        }
      ]
    }
  ]
})

export default router
