<template>
  <div class="shop-page shop-page-manager">
    <el-container>
      <div class="shop-page-header-box">
        <div class="shop-page-header">页面管理</div>
        <el-row class="shop-page-op-box">
          <el-button class="add-btn" icon="el-icon-plus" type="primary" @click="toAddPage"
            >新建页面</el-button
          >
          <!-- <el-input class="search-box" placeholder="请输入内容" clearable>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input> -->
          <el-input
            class="search-box"
            placeholder="请输入内容"
            v-model="searchCondition.name"
            @keyup.enter.native="getPageManageList"
            prefix-icon="el-icon-search"
            clearable
          >
          </el-input>
        </el-row>
      </div>
      <el-main>
        <el-table class="shop-page-table" :data="pageList" style="width: 100%">
          <el-table-column label="页面名称" width="337">
            <template slot-scope="item">
              <span style="margin-left: 10px">{{ item.row.name }}</span>
              <i class="shop-icon-home" v-if="item.row.pageType == 'home'">首页</i>
            </template>
          </el-table-column>
          <el-table-column label="最后修改时间">
            <template slot-scope="item">
              {{ formart(item.row.updatedTime) }}
            </template>
          </el-table-column>
          <el-table-column label="当前状态" width="180">
            <template slot-scope="item">
              <span v-text="showStatus(item.row)"></span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="item">
              <el-button type="text" size="small" @click="toEditPage(item.row)"
                >编辑</el-button
              >
              <el-popover
                width="142"
                trigger="hover"
                popper-class="shop-page-popover"
                placement="bottom"
              >
                <ul class="operate-list">
                  <!-- 0:未发布,1:已发布,2:取消发布 -->
                  <li @click="spreadPage(item.row)" v-if="item.row.status == 1">推广</li>
                  <li
                    @click="previewPage(item.row)"
                    v-if="item.row.status == 0 || item.row.status == 2"
                  >
                    预览
                  </li>
                  <li
                    @click="openCancelPublishPage(item.row)"
                    v-if="item.row.status == 1 && item.row.pageType != 'home'"
                  >
                    取消发布
                  </li>
                  <li @click="copyPage(item.row)">复制</li>
                  <li
                    @click="setHomePage(item.row)"
                    v-if="item.row.status == 1 && item.row.pageType != 'home'"
                  >
                    设为首页
                  </li>
                  <li
                    @click="openDeletePage(item.row)"
                    v-if="item.row.status == 0 || item.row.status == 2"
                  >
                    删除
                  </li>
                  <li
                    @click="openPublishPage(item.row)"
                    v-if="item.row.status == 0 || item.row.status == 2"
                  >
                    发布
                  </li>
                </ul>
                <el-button type="text" class="more-btn" slot="reference"
                  >更多<i class="el-icon-arrow-down el-icon--right"></i
                ></el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager-box">
          <el-pagination
            v-if="totalRecord > searchCondition.pageSize"
            class="left-pager"
            @size-change="handleSizeChange"
            :current-page.sync="searchCondition.pageNo"
            :page-sizes="[10, 20, 50]"
            layout="sizes"
            :total="totalRecord"
          >
          </el-pagination>
          <el-pagination
            v-if="totalRecord <= searchCondition.pageSize"
            class="right-pager"
            :current-page.sync="searchCondition.pageNo"
            layout="total"
            :total="totalRecord"
          >
          </el-pagination>
          <div class="right-pager" v-if="totalRecord > searchCondition.pageSize">
            <el-pagination
              class="total-pager"
              :current-page.sync="searchCondition.pageNo"
              layout="total"
              :total="totalRecord"
            >
            </el-pagination>

            <div class="jump-pager">
              到<el-input
                v-model="jumpPage"
                @keyup.native="jumpPagerAction"
                size="small"
                placeholder=""
                class="count-input"
              ></el-input>
            </div>
            <el-pagination
              class="count-pager"
              @current-change="handleCurrentChange"
              :current-page.sync="searchCondition.pageNo"
              :page-size="searchCondition.pageSize"
              prev-text="<"
              next-text=">"
              layout="prev, pager, next"
              :total="totalRecord"
            >
            </el-pagination>
          </div>
        </div>
      </el-main>
      <el-footer> </el-footer>
    </el-container>
    <el-dialog
      :title="spreadPageItem.title"
      :visible.sync="spreadPageItem.show"
      width="320px"
      center
    >
      <div class="image-box">
        <img :src="spreadPageItem.imageUrl" v-if="spreadPageItem.imageUrl" />
      </div>
      <el-button type="text" class="download-btn">下载小程序码</el-button>
      <el-input placeholder="请输入内容" v-model="spreadPageItem.url" readonly>
        <el-button slot="append" type="primary" @click="copyText(spreadPageItem.url)"
          >复制</el-button
        >
      </el-input>
    </el-dialog>

    <!-- <el-dialog
            :title="previewPageItem.title"
            :visible.sync="previewPageItem.show"
            width="320px"
            center>
            <div class="image-box">
                <img :src="qrcodeImage">
            </div>
            <el-button type="text" class="download-btn">下载小程序码</el-button>
            <el-input placeholder="请输入内容" v-model="previewPageItem.url" readonly>
                <el-button slot="append" type="primary" @click="copyText(previewPageItem.url)">复制</el-button></el-input>
        </el-dialog> -->
  </div>
</template>
<script>
// import { mapMutations, mapState, mapGetters } from 'vuex'
import tmCommon from '@/common/common'
const qrcodeImage = '/static/img/demo/qrcode.jpg'
// import domtoimage from 'dom-to-image'
// import html2canvas from 'html2canvas'

export default {
  components: {},

  data () {
    return {
      qrcodeImage: qrcodeImage,
      spreadPageItem: {
        show: false,
        imageUrl: '',
        title: ''
      },
      jumpPage: 1,
      // previewPageItem:{
      //     show:false,
      //     imageUrl:'',
      //     title:"",
      // },
      totalPages: 0, // 总页数
      totalRecord: 0, // 总记录数
      searchCondition: {
        tenantCode: localStorage.getItem('tenantCode'),
        // tenantCode: '880001',
        // tenantCode: '20180707',
        name: '',
        pageNo: 1,
        pageSize: 10
        // status://非必须-当前状态--0:未发布,1:已发布,2:取消发布 选中商品链接中必须是发布状态
      },
      pageList: []
    }
  },

  computed: {},
  mounted () {
    this.getPageManageList()
  },
  methods: {
    jumpPagerAction ($event) {
      const that = this
      let page = $event.target.value
      if (isNaN(page)) {
        this.jumpPage = ''
        return
      }
      if (!page) {
        this.jumpPage = ''
        return
      }
      let totalPage = parseInt(that.totalRecord / that.searchCondition.pageSize, 10)
      const mod = parseFloat(that.totalRecord) % that.searchCondition.pageSize
      if (mod > 0) {
        totalPage++
      }
      if (page > totalPage) {
        this.jumpPage = totalPage
        // this.$set(this.searchCondition.page,"page",totalPage)
        // $event.target.value=totalPage
      } else {
        if (page === 0) {
          page = 1
        }
        this.jumpPage = parseInt(page)
        // this.$set(this.searchCondition.page,"page",page)
        // $event.target.value=page
      }
      this.searchCondition.pageNo = this.jumpPage
      this.getPageManageList()
    },
    formart (str) {
      if (!str) {
        return ''
      }
      return tmCommon.formatDate(str)
    },
    getPageManageList () {
      const that = this
      const condition = {}
      for (const i in that.searchCondition) {
        condition[i] = that.searchCondition[i]
      }
      if (!condition.name) {
        delete condition.name
      }
      // condition.pageNo=0;
      that.$store.dispatch('pageManageList', condition).then((res) => {
        tmCommon.log(res)
        const { status, msg, data } = res
        if (status === '200') {
          const { totalPages, total, list } = data
          that.pageList = list
          that.totalPages = totalPages
          that.totalRecord = total
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 页数改变
    handleSizeChange (val) {
      tmCommon.log(`每页 ${val} 条`)
      this.searchCondition.pageSize = val
      this.searchCondition.pageNo = 1
      this.jumpPage = 1
      this.getPageManageList()
    },
    handleCurrentChange (val) {
      tmCommon.log(`当前页:  ${val} `)
      this.searchCondition.pageNo = val
      this.jumpPage = val
      this.getPageManageList()
    },
    // 显示状态
    showStatus (item) {
      const status = item.status
      let statusTxt = ''
      switch (status) {
        case '0':
          statusTxt = '未发布'
          break
        case '1':
          statusTxt = '已发布'
          break
        case '2':
          statusTxt = '已取消发布'
          break
        default:
          statusTxt = ''
          break
      }
      //    tmCommon.log(item,statusTxt);
      return statusTxt
    },
    // 转向添加页
    toAddPage () {
      this.$router.push({ path: '/shop/edit' })
    },
    // 转向编辑页
    toEditPage (item) {
      this.$router.push({ path: '/shop/edit', query: { id: item.id } })
    },
    // 设置首页
    setHomePage (item) {
      const that = this
      that.$store
        .dispatch('setShopPageHome', {
          id: item.id,
          tenantCode: that.searchCondition.tenantCode
        })
        .then((res) => {
          tmCommon.log(res)
          const { status, msg } = res
          if (status === '200') {
            that.getPageManageList()
            this.$message({
              type: 'success',
              message: '首页设置成功'
            })
          } else {
            this.$message.error(msg)
          }
        })
    },
    // 点击发布
    openPublishPage (item) {
      const that = this
      this.$confirm('确定发布页面吗？', '提示', {
        confirmButtonText: '确认发布',
        cancelButtonText: '取消',
        customClass: 'shop-page-dialog',
        cancelButtonClass: 'shop-page-dialog-cancel',
        confirmButtonClass: 'shop-page-dialog-confirm'
      })
        .then(() => {
          that.publishPage(item)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
    },
    // 发布页面
    publishPage (item) {
      const that = this
      that.$store.dispatch('publishShopPage', { id: item.id }).then((res) => {
        tmCommon.log(res)
        const { status, msg } = res
        if (status === '200') {
          item.status = '1'
          that.$message({
            type: 'success',
            message: '发布成功!'
          })
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 打开取消发布对话框
    openCancelPublishPage (item) {
      const that = this
      that
        .$confirm('确认取消发布页面吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          customClass: 'shop-page-dialog',
          cancelButtonClass: 'shop-page-dialog-cancel',
          confirmButtonClass: 'shop-page-dialog-confirm'
          //   type: 'warning'
        })
        .then(() => {
          that.cancelPublishPage(item)
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
    },
    // 取消发布
    cancelPublishPage (item) {
      const that = this
      that.$store.dispatch('unPublishShopPage', { id: item.id }).then((res) => {
        tmCommon.log(res)
        const { status, msg } = res
        if (status === '200') {
          item.status = '2'
          that.$message({
            type: 'success',
            message: '取消发布成功!'
          })
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 复制一个新的页面
    copyPage (item) {
      // const that = this
      this.$router.push({
        path: '/shop/edit',
        query: { id: item.id, type: 'copy' }
      })
      // // condition.pageNo=0;
      // that.$store.dispatch('pageManageList',{id:item.id}).then(res => {
      //     tmCommon.log(res);
      //     const { status, msg, data } = res;
      //     if (status === '200') {
      //         that.$message({
      //             type: 'success',
      //             message: '复制页面成功'
      //         });
      //     } else {
      //         that.$message.error(msg)
      //     }
      // })
    },
    // 推广页面
    spreadPage (item) {
      const that = this
      that.$store
        .dispatch('spreadShopPage', {
          id: item.id,
          tenantCode: that.searchCondition.tenantCode
        })
        .then((res) => {
          tmCommon.log(res)
          const { status, msg, data } = res
          if (status === '200') {
            that.spreadPageItem.show = true
            that.spreadPageItem.title = item.name
            that.spreadPageItem.url = item.url
            if (data) {
              that.spreadPageItem.imageUrl = data
            }
          } else {
            that.$message.error(msg)
          }
        })
    },
    // 预览页面
    previewPage (item) {
      const that = this
      that.spreadPage(item)
      //    that.previewPageItem.show=true;
      //    that.previewPageItem.title=item.name;
      //    that.previewPageItem.url=item.url;
    },
    // 复制到剪贴板
    copyText (text) {
      const that = this
      that.$copyText(text).then(
        function (e) {
          that.$message({
            type: 'success',
            message: '复制成功!'
          })
        },
        function (e) {
          that.$message({
            type: 'success',
            message: '复制失败!'
          })
        }
      )
    },
    // 打开删除
    openDeletePage (item) {
      const that = this
      that
        .$confirm('确认删除页面吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          customClass: 'shop-page-dialog',
          cancelButtonClass: 'shop-page-dialog-cancel',
          confirmButtonClass: 'shop-page-dialog-confirm'
        })
        .then(() => {
          that.deletePage(item)
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除页面
    deletePage (item) {
      const that = this
      that.$store.dispatch('deleteShopPage', { id: item.id }).then((res) => {
        tmCommon.log(res)
        const { status, msg } = res
        if (status === '200') {
          that.$message({
            type: 'success',
            message: '页面删除成功'
          })
          that.getPageManageList()
        } else {
          this.$message.error(msg)
        }
      })
    }
  },
  created () {}
  //  updated(){
  //    this.addOrChangeControl('PhoneInput')
  //  },
}
</script>
<style lang="less">
  @import "../../assets/less/pages/shop/manager.less";
</style>
