<template>
  <div class="cantainer-article">
    <!-- 筛选添加布局 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <template>
            <el-select v-model="reqParams.channel_id" placeholder="请选择" clearable>
              <el-option
                v-for="item in channelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="日期">
          <!-- v-model 绑定的数组[起始时间,结束时间] -->
          <el-date-picker
            @change="changeDate"
            value-format="yyyy-MM-dd"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果布局 -->
    <!-- <page-one> -->
    <!-- scope 意思：作用域 ， 作用：搜集该插槽传入的所有数据-->
    <!-- <div slot="content" slot-scope="scope">内容{{scope.pn}}</div> -->
    <!-- v-slot:插槽名称="接收数据的变量名" -->
    <!-- <template v-slot:content="scope">{{scope.pn}}</template> -->
    <!-- <div slot="footer">底部</div> -->
    <!-- </page-one> -->
    <el-card style="margin-top:20px">
      <div slot="header">
        <strong>共筛选到 {{total}} 条结果</strong>
      </div>
      <el-table :data="articles">
        <el-table-column label="封面" width="180">
          <template slot-scope="scope">
            <!-- 第一张封面图 -->
            <!-- <img :src="scope.row.cover.images[0]" alt="" :fit="contain"> -->
            <el-image
              style="width: 120px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="contain">
              <div slot="error">
                <!-- 提醒加载失败的默认图片 -->
              <img src="../../assets/error.gif" width="120" height="100">
              </div>
              </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="800px"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope" >
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <el-row slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" icon="el-icon-delete" circle></el-button>
          </el-row>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- total 是总条数  每页默认显示20条 :page-size动态绑定每页显示的条数-->
      <!-- current-page动态激活当前页码对应的按钮 -->
      <!-- current-change 事件：当页码改变就执行 -->
      <el-pagination
        style="margin-top:10px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
// import PageOne from '@/test/page'
export default {
  // components: { PageOne },
  // 组件初始化
  created () {
    this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    // 获取频道选项数据
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      // 赋值频道下拉选项
      this.channelOptions = data.channels
    },
    // 获取文章列表
    async getArticles () {
      // axios.get(url?key=value&key1=value1&...)  get传参
      // axios.get(url,{params:参数对象})
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 赋值文章列表依赖数据
      this.articles = data.results
      // 赋值文章总条数依赖数据
      this.total = data.total_count
    },
    // 分页功能
    pager (newPage) {
      // 根据新的页码和当前的筛选条件 重新查询数据即可
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 选择日期触发事件的函数
    changeDate (dateArr) {
      // dateArr 的数据格式：[date，date]
      // 后端需要的格式是字符串格式
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选查询
    search () {
      // 准备日期数据
      // 进行数据获取
      // 如果频道的值 ''的时候 修改为null
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      // 回到第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    // 编辑
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    }
  },
  data () {
    return {
      // 请求参数提交给后端的筛选对象
      // 使用axios提交数据时 如果数据的值为null是不会提交该字段
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        // 当前页码  每一页显示条数
        page: 1,
        per_page: 20
      },
      // 频道选项数据
      channelOptions: [{ value: 1, label: '毛里求丝' }],
      // 日期数组
      dateArr: [],
      // 筛选结果数据  文章列表
      articles: [],
      // 文章总条数
      total: 0
    }
  }
}
</script>

<style scoped lang='less'>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
