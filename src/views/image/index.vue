<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn_box">
        <!-- 左边单选框 label是值 -->
        <el-radio-group v-model="reqParams.collect" size="medium">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 右边按钮 -->
        <el-button style="float:right" type="success" size="medium">添加素材</el-button>
        <!-- 素材列表 -->
        <div class="img_list">
          <div class="img_itme" v-for="item in images" :key="item.id">
            <img :src="item.url"/>
            <div class="img_footer">
              <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
              <span class="el-icon-delete"></span>
            </div>
          </div>
        </div>
        <!-- 底部分页 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="pager"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
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
      total: 0
    }
  },
  created () {
    // 获取图片方法
    this.getImages()
  },
  methods: {
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
