<template>
  <div class="container-page">
    <!-- 头 -->
    <p>毛里求丝</p>
    <!-- 内容 -->
    <div>
      <!-- 留个坑 -->
      <slot name="content" :pn="pageName" test="测试">备用的汪千照</slot>
    </div>
    <!-- 底 -->
    <p>
      <slot name="footer">屁</slot>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: '组件内部数据'
    }
  }
}
</script>

<style scoped lang='less'>

</style>
