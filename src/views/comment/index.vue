<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column prop="title" label="标题" width="400"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.comment_status?'正常':'关闭'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="toggleStatus(scope.row.id,false)" v-if="scope.row.comment_status" type="danger" size="small">关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row.id,true)" v-else type="success" size="small">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout='prev, pager, next'
        :total='total'
        :page-size='reqParams.per_page'
        :current-page='reqParams.page'
        @current-change='pager'
        style="margin-top:20px"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      articles: [],
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  // 获取文章列表信息
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      // 获取文章列表但是要包含评论相关信息
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // 渲染
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 打开与关闭文章评论状态
    toggleStatus (id, status) {
      const text = status ? '是否打开评论' : '是否关闭评论'
      this.$confirm(text, '警告！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确认打开
        const { data: { data } } = await this.$http.put(`comments/status?article_id=${id}`, { allow_comment: status })
        // 打开评论提示
        this.$message.success(data.allow_comment ? '打开成功' : '关闭成功')
        // 更新当前列表
        this.getArticles()
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang='less'>

</style>
