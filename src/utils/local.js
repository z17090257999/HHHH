// 提供 存储用户相关信息的api
// 约定 ：key=toutiao-pc
const KEY = 'toutiao-pc'
const local = {
  // 储存
  setUser (user) {
    // user对象转成json字符串
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  // 清除
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default local
