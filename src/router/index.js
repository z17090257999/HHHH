import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
// 4导入404
import NotFound from '@/views/404'

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
    },
    // 匹配不符合路由规则的路径
    {
      path: '*',
      component: NotFound
    }
  ]
})

export default router
