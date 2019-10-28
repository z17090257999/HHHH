// 导出一个配置好的axios对象
import axios from 'axios'
import local from '@/utils/local'
// import router from '@/router'

// 对axios进行配置
// 基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 设置默认的请求头
if (local.getUser()) {
  axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
}

// 请求拦截器
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${local.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})
export default axios
