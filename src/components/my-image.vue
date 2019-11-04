<template>
  <div class="my-image">
    <!-- 按钮 -->
    <div class="btn_box" @click="open">
      <img src="../assets/default.png" alt="">
    </div>
    <!-- 对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px">
      <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="素材库" name="image">
        <!-- 按钮 -->
        <el-radio-group @change='toggleList' v-model='reqParams.collect' size='medium'>
          <el-radio-button :label='false'>全部</el-radio-button>
          <el-radio-button :label='true'>收藏</el-radio-button>
        </el-radio-group>
        <!-- 列表 -->
        <div class='img_list'>
          <div class='img_itme' v-for='item in images' :key='item.id'>
            <img :src='item.url' />
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          background
          layout='prev, pager, next'
          :total='total'
          :page-size='reqParams.per_page'
          :current-page='reqParams.page'
          @current-change='pager'
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>
    </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 对话框的显示，隐藏
      dialogVisible: false,
      // 当前激活的选项卡的name的值
      activeName: 'image',
      // 请求素材参数
      reqParams: {
        // false 全部  true 收藏
        collect: false,
        page: 1,
        per_page: 8
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0
    }
  },
  methods: {
    // 打开对话框
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    // 获取素材列表数据
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 赋值图片总数
      this.total = data.total_count
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换列表方法
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    }
  }
}
</script>

<style scoped lang='less'>
.my-image{
  display: inline-block;
  margin-right: 20px;
}
.btn_box{
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer{
  display: inline-block;
  text-align: center;
  width: 100%;
}
.img_list {
  margin-bottom: 20px;
  .img_itme {
    display: inline-block;
    margin-right: 38px;
    margin-top: 20px;
    width: 150px;
    height: 120px;
    position: relative;
    border: 1px #ccc dashed;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
