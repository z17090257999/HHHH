import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'

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
      component: Home
    }
  ]
})

export default router
