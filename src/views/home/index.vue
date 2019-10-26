<template>
  <el-container class="container">
    <el-aside width="200px">
      <img src="../../assets/logo_admin.png" alt="">
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.el-header {
  color: rgb(233, 74, 74);
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
}

.el-aside {
  background-color: #0c233d;
  color: rgb(133, 151, 185);
  text-align: center;
  img{
    margin-top: 10px;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
