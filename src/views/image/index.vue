<template>
  <div class='container-image'>
    <el-card>
      <div slot='header'>
        <my-bread>素材管理</my-bread>
      </div>
      <div class='btn_box'>
        <!-- 左边单选框 label是值 -->
        <el-radio-group @change='toggleList' v-model='reqParams.collect' size='medium'>
          <el-radio-button :label='false'>全部</el-radio-button>
          <el-radio-button :label='true'>收藏</el-radio-button>
        </el-radio-group>
        <!-- 右边按钮 -->
        <el-button @click="open" style='float:right' type='success' size='medium'>添加素材</el-button>
        <!-- 素材列表 -->
        <div class='img_list'>
          <div class='img_itme' v-for='item in images' :key='item.id'>
            <img :src='item.url' />
            <div class='img_footer' v-if='!reqParams.collect'>
              <span
                @click='toggleStatus(item)'
                class='el-icon-star-off'
                :class='{red:item.is_collected}'
              ></span>
              <span @click='deleteImage(item.id)' class='el-icon-delete'></span>
            </div>
          </div>
        </div>
        <!-- 底部分页 -->
        <el-pagination
          background
          layout='prev, pager, next'
          :total='total'
          :page-size='reqParams.per_page'
          :current-page='reqParams.page'
          @current-change='pager'
        ></el-pagination>
      </div>
    </el-card>
    <!-- 图片上传的对话框 -->
    <el-dialog
      title="添加素材"
      :visible.sync="dialogVisible"
      width="400px">
      <!-- action 上传图片的接口地址 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        name="image"
        :show-file-list="false"
        :on-success="handleSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      reqParams: {
        // false 全部  true 收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 图片总数量
      total: 0,
      // 对话框显示隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null,
      // 上传的头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    // 获取图片方法
    this.getImages()
  },
  methods: {
    // 获取素材列表数据
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 赋值图片总数
      this.total = data.total_count
    },
    // 分页方法
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换列表方法
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 图片收藏方法
    async toggleStatus (item) {
      // 修改请求
      const {
        data: { data }
      } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected
      })
      // 成功后 修改样式
      item.is_collected = data.collect
      // 提示
      this.$message.success((data.collect ? '添加收藏' : '取消收藏') + '成功')
    },
    // 图片删除方法
    async deleteImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击删除
        await this.$http.delete(`user/images/${id}`)
        // 删除成功
        this.$message.success('删除成功')
        // 更新列表
        this.getImages()
      }).catch(() => {
        // 点击取消
      })
    },
    // 上传图片成功
    handleSuccess (res) {
      // res 就是响应主体    获取图片地址 res.data.url
      console.log(res)
      // 给 imageUrl 赋值 进行预览
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      // 两秒后关闭对话画框
      window.setTimeout(() => {
        //  关闭对话框  更新列表
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    },
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    }
  }
}
</script>

<style scoped lang='less'>
.img_list {
  margin-bottom: 20px;
  .img_itme {
    display: inline-block;
    margin-right: 30px;
    margin-top: 20px;
    width: 150px;
    height: 150px;
    position: relative;
    border: 1px #ccc dashed;
    img {
      width: 100%;
      height: 100%;
    }
    .img_footer {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      width: 100%;
      text-align: center;
      color: #fff;
      span {
        margin: 0 15px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
