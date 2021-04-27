<template>
    <!-- 微页面窗口 -->
    <el-dialog @close="closeMicroPage"  class="micro-page-dialog" width="544px" title="微页面" :visible="pageShow">
        <div class="micro-page-content">
            <div class="micro-page-header">
                <el-input class="search-box" v-model="searchCondition.name"
                    placeholder="请输入页面名称" @keyup.enter.native="getMicroPageList"
                    prefix-icon="el-icon-search" clearable>
                </el-input>
            </div>
            <el-table class="micro-page-table"
                :data="microPageList"
                style="width: 100%">
                <el-table-column
                    label="页面名称"
                    width="310">
                    <template slot-scope="item">
                        <el-radio v-model="activeMicroPage" :label="item.row">{{ item.row.name }}</el-radio>
                        <!-- <span style="margin-left: 10px">{{ item.row.name }}</span> -->
                    </template>
                </el-table-column>
                <el-table-column sortable
                    label="创建时间">
                    <template slot-scope="item">
                        {{formart(item.row.updatedTime)}}
                    </template>
                </el-table-column>
                </el-table>
                <div class="pager-box">
                    <div class="right-pager">
                        <el-pagination class="total-pager"
                                :current-page.sync="searchCondition.pageNo"
                                layout="total"
                                :total="totalRecord">
                                </el-pagination>

                            <div class="jump-pager" v-if="microPageList&&microPageList.length>0">到<el-input v-model="jumpPage" @keyup.native="jumpPagerAction" size="small" placeholder="" class="count-input"></el-input></div>
                            <el-pagination class="count-pager"
                                @current-change="handleCurrentChange"
                                :current-page.sync="searchCondition.pageNo"
                                :pager-count="5"
                                :page-size="searchCondition.pageSize"
                                prev-text="<"
                                next-text=">"
                                v-if="microPageList&&microPageList.length>0"
                                layout="prev, pager, next"
                                :total="totalRecord">
                                </el-pagination>
                    </div>
                </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" class="btn-cancel" @click="closeMicroPage">取 消</el-button>
            <el-button type="text" @click="confirmMicroPage">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import tmCommon from '@/common/common'
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'component-micro-page',
  components: {

  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      totalPages: 0, // 总页数
      totalRecord: 0, // 总记录数
      jumpPage: 1,
      searchCondition: {
        tenantCode: localStorage.getItem('tenantCode'),
        // tenantCode: '880001',
        // tenantCode: '20180707',
        name: '',
        pageNo: 1,
        pageSize: 10,
        status: 1 // 非必须-当前状态--0:未发布,1:已发布,2:取消发布 选中商品链接中必须是发布状态
      },
      microPageList: [],
      activeMicroPage: 0
    }
  },
  props: ['pageShow', 'selectItem'],
  computed: {

  },
  mounted () {

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
      this.getMicroPageList()
    },
    formart (str) {
      if (!str) {
        return ''
      }
      return tmCommon.formatDate(str)
    },
    showSelectPage () {
      const that = this
      // console.log("打开页面",this.selectItem)
      const data = that.microPageList
      that.activeMicroPage = ''
      if (that.selectItem) {
        for (const i in data) {
          if (data[i].url === that.selectItem) {
            that.activeMicroPage = data[i]
            break
          }
        }
      }
    },
    // 页数改变
    handleSizeChange (val) {
      tmCommon.log(`每页 ${val} 条`)
      this.searchCondition.pageSize = val
      this.searchCondition.pageNo = 1
      this.jumpPage = 1
      this.getMicroPageList()
    },
    handleCurrentChange (val) {
      tmCommon.log(`当前页:  ${val} `)
      this.searchCondition.pageNo = val
      this.jumpPage = val
      this.getMicroPageList()
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
    // 获取微页面列表
    getMicroPageList () {
      const that = this
      const condition = {}
      for (const i in that.searchCondition) {
        condition[i] = that.searchCondition[i]
      }
      if (!condition.name) {
        delete condition.name
      }
      // condition.pageNo=0;
      that.microPageList = []
      that.totalPages = 2
      that.totalRecord = 100
      that.showSelectPage()
      // that.$store.dispatch('pageManageList', condition).then(res => {
      //   tmCommon.log(res)
      //   const { status, message, data } = res
      //   if (status === '200') {
      //     const { totalPages, total, list } = data
      //     that.microPageList = list
      //     that.totalPages = totalPages
      //     that.totalRecord = total
      //     that.showSelectPage()
      //   } else {
      //     this.$message.error(message)
      //   }
      // })
    },
    // 确认选择微页面选择窗口
    confirmMicroPage () {
      this.$emit('confirmAction', this.activeMicroPage)
    },
    // //选择微页面
    // selectMicroPage(item){
    //     this.activeMicroPage=item;
    // },
    closeMicroPage () {
      this.$emit('closeAction', this.activeMicroPage)
    }
  },
  created () {
    this.getMicroPageList()
  },
  watch: {
    pageShow (val, oldVal) {
      // tmCommon.error("窗口有变化了")
      this.searchCondition.name = ''
      this.getMicroPageList()
    }
  },
  updated () {

  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
.micro-page-dialog{
    .el-dialog__body{
        padding: 0;
    }
    .el-dialog__header{
        height:48px;
        // line-height:8px;
        padding-top:16px;
        // border-bottom: 1px solid #E8E8E8;
        .el-dialog__title{
            margin-left: 12px;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333;
        }
    }
    .el-dialog__footer{
        // padding-top: 0;
        // padding-bottom: 0;
        padding: 0;
        height: 55px;
        line-height: 55px;
    }
    .dialog-footer{
        border-top: 1px solid #EBEBEB;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        padding: 0 20px;
        .btn-cancel{
            margin-right: 12px;
            color: #666;
        }
    }
    .micro-page-content{
        margin: 16px 32px;
        border: 1px solid #E8E8E8;
        .micro-page-header{
            border-bottom:  1px solid #E8E8E8;
            overflow: hidden;
            .el-input{
                &.search-box{
                    float: right;
                    margin: 0;
                    width: 160px;
                    height: 50px;
                    line-height: 50px;
                    .el-input__inner{
                        border:1px solid red;
                        border:none!important;
                        height: 32px;
                        line-height: 32px;
                        font-size: 14px;
                        color: #999;
                    }
                    .el-input__prefix{
                        top:0;
                        left:5px;
                        font-size: 18px;
                        font-weight: 900;
                    }
                }
            }
        }
        .micro-page-table{
            thead{
                th{
                    padding: 0;
                    height: 50px;
                    line-height: 50px;
                    background-color: #FAFAFA;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333;
                    &:first-child{
                        padding-left: 60px;
                    }
                    &:nth-child(2){
                        text-align: right;
                        padding-right: 15px
                    }
                }
            }
            tbody{
                td{
                    &:first-child{
                        padding-left: 30px;
                        .el-radio__label{
                            padding-left: 14px;
                        }
                    }
                    &:nth-child(2){
                        text-align: right;
                        padding-right: 20px
                    }
                }
            }
        }
        .pager-box{
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            .right-pager{
                float: right;
                margin-right: 10px;
                .total-pager{
                    float: left;
                }
                .el-pagination{
                    margin-top:9px;
                }
                .jump-pager{
                    float: left;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #333333;
                    letter-spacing: 0;
                    .count-input{
                        // background: #FFFFFF;
                        width: 60px;
                        .el-input__inner{
                            margin-left: 8px;
                            border: 1px solid #D9D9D9;
                            border-radius: 2px;
                            width: 48px;
                            text-align: center;
                            height: 32px;
                            line-height: 32px;
                        }
                    }
                }
                .count-pager{
                    float: left;
                }
                .el-pager{
                    li{
                        font-family: HelveticaNeue;
                        font-size: 14px;
                        color: #999999;
                        &.active{
                            font-family: HelveticaNeue-Bold;
                            color: #3366FF;
                        }
                    }
                }
            }
        }
    }
}
</style>
