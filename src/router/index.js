import VueRouter from 'vue-router'
import Vue from 'vue'
import local from '@/utils/local'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
// 4导入404
import NotFound from '@/views/404'
// 组件与路由
import Article from '@/views/article/article'
// image组件
import Image from '@/views/image'
// 发布文章本组件
import Publish from '@/views/publish'
// 评论管理组件
import Comment from '@/views/comment'

Vue.use(VueRouter)

const router = new VueRouter({
  // 去地址栏“#”
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
        },
        // 内容管理
        {
          path: '/article',
          component: Article
        },
        // 素材管理
        {
          path: '/image',
          component: Image
        },
        // 发布文章
        {
          path: '/publish',
          component: Publish
        },
        // 评论管理
        {
          path: '/comment',
          component: Comment
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
// 添加路由导航守卫（前置导航守卫）
router.beforeEach((to, from, next) => {
  // 每次跳转路由前触发
  // to 跳转到目标路由
  // from 从哪跳转过来的路由
  // next 下一步方法    next()放行   next('/login')跳转到登陆页面
  const user = local.getUser()
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
