<template>
  <!-- 首页 -->
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside :width="isOpen?'200px':'64px'">
      <!-- logo -->
      <div class="logo" :class="{s_logo:!isOpen}"></div>
      <el-menu
        :default-active="$route.path"
        background-color="#0c233d"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!isOpen"
        style="border-right:none"
        :collapse-transition='false'
        router
      >
      <!-- 👆router = true的话会报错，但是并不影响网页运行， -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 头部 -->
    <el-container>
      <el-header>
        <!-- 图标 -->
        <!-- <span class="el-icon-s-unfold" @click="toggleMenu"></span> -->
        <!-- 侧边栏箭头方向随者状态变化 -->
        <span class="el-icon-s-unfold" :class="{'el-icon-s-fold':isOpen}" @click="toggleMenu"></span>
        <!-- 文字 -->
        <span>毛里求斯乔奶奶国际旅游有限公司</span>
        <!-- 用户下拉组件 -->
        <el-dropdown class="dropdown" @command="handelClick">
          <span class="el-dropdown-link">
            <img class="userIcon" :src="userInFo.photo" alt />
            <span class="userName">{{userInFo.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 内容 -->
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      isOpen: true,
      userInFo: {}
    }
  },
  created () {
    // 设置用户信息
    const user = local.getUser() || {}
    this.userInFo.name = user.name
    this.userInFo.photo = user.photo
  },
  methods: {
    toggleMenu () {
      // 切换左边栏的展开与收起
      this.isOpen = !this.isOpen
    },
    // 只绑定click事件，该事件不会触发
    // 给组件绑定事件，如果事件不支持，事件不会触发
    // 把事件绑定在组件解析后的原生dom上
    // 事件修饰符：prevent once stop     native意思是把事件绑定在原生dom上
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      this.$router.push('/login')
    },
    handelClick (command) {
      // command 值 setting|logout
      // this[setting]() === this.setting()
      // this[logout]() === this.logout()
      this[command]()
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
// 头部
.el-header {
  color: #000;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
  // 头部按钮图标
  .el-icon-s-unfold {
    font-size: 30px;
  }
  span {
    vertical-align: middle;
    margin-left: 10px;
  }
  // 用户下拉菜单
  .dropdown {
    float: right;
    // 用户头像
    .userIcon {
      width: 30px;
      vertical-align: middle;
    }
    // 用户名
    .userName {
      font-weight: 700;
      vertical-align: middle;
    }
  }
}
// 侧边栏
.el-aside {
  background-color: #0c233d;
  color: rgb(133, 151, 185);
  .logo {
    width: 100%;
    height: 60px;
    background: #0c233d url(../../assets/logo_admin.png) no-repeat center/140px
      auto;
  }
  .s_logo{
    background-image: url(../../assets/logo_admin_01.png);
    background-size: 35px auto;
  }
}
// 内容区域
.el-main {
  padding: 0;
}
</style>
