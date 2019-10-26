<template>
  <div class="container">
    <!-- 登陆卡片 -->
    <el-card>
      <!-- logo -->
      <img src="../../assets/logo_index.png" style="width:200px" alt="">
      <!-- 登陆模块 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>

        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            style="width:310px;margin-right:10px"
            placeholder="请输入验证码"
          ></el-input>

          <!-- 验证码按钮 -->
          <el-button>发送验证码</el-button>
        </el-form-item>

        <!-- 勾选框 -->
        <el-form-item>
          <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <!-- 登陆按钮 -->
        <el-form-item>
          <el-button @click="login" :disabled="!checked" type="primary" style="width:100%">立即登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 校验手机号函数
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑判断是否成功
      // 手机号格式：1开头 3-9 9个数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对，请重新输入'))
      }
    }
    return {
      checked: true,
      loginForm: {
        mobile: '',
        code: ''
      },
      // 登陆模块校验规则
      loginRules: {
        // 手机号校验规则
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // 自定义校验函数
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入六位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 获取表单组件实例   ==调用校验函数
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          // 发送请求  后台验证手机号和验证码
          console.log('ok')
        }
      })
    }
  }
}
</script>
<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  background: url(../../assets/login_bg.jpg) no-repeat center / cover;
  position: absolute;
  left: 0;
  top: 0;
}

.el-card {
  width: 480px;
  height: 340px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    display: block;
    margin: 0 auto 30px;
  }
}
</style>
