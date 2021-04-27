<template>
    <!-- 系统页面窗口 -->
    <el-dialog @close="closeSystemPage" class="system-page-dialog" width="544px" title="系统页面" :visible="pageShow">
        <div class="system-page-content">
            <el-table class="system-page-table"
                :data="systemPageList"
                style="width: 100%">
                <el-table-column
                    label="页面名称">
                    <template slot-scope="item">
                        <el-radio v-model="activeSystemPage" :label="item.row">{{ item.row.name }}</el-radio>
                        <!-- <span style="margin-left: 10px">{{ item.row.name }}</span> -->
                    </template>
                </el-table-column>
                <!-- <el-table-column sortable
                    prop="updateTime"
                    label="更新时间">
                </el-table-column> -->
                </el-table>
                <div class="pager-box">
                    <el-pagination class="right-pager"
                        layout="total"
                        :total="systemPageList.length">
                    </el-pagination>
                </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" class="btn-cancel" @click="closeSystemPage">取 消</el-button>
            <el-button type="text" @click="confirmSystemPage">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"
// import tmCommon from '@/common/common'

export default {
  name: 'component-system-page',
  components: {

  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // // defaultImgSmall:defaultImgSmall,
      systemPageList: [],
      activeSystemPage: 0
    }
  },
  props: ['pageShow', 'selectItem'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // openDialog(){
    //     this.$nextTick(()=>{
    //         this.showSelectPage();
    //     })
    // },
    showSelectPage () {
      const that = this
      // console.log("打开页面",this.selectItem)
      const data = that.systemPageList
      that.activeSystemPage = ''
      if (that.selectItem) {
        for (const i in data) {
          if (data[i].name === that.selectItem) {
            that.activeSystemPage = data[i]
            break
          }
        }
      }
    },
    // //选择系统页
    // selectSystemPage(item){
    //     this.activeSystemPage=item;
    // },
    // 获取系统页面列表
    getSystemPageList () {
      const that = this
      // const condition = {}
      that.systemPageList = []
      that.showSelectPage()
      // that.$store.dispatch('getShopSystemPageList', condition).then(res => {
      //   // tmCommon.log(res)
      //   const { status, msg, data } = res
      //   if (status === '200') {
      //     that.systemPageList = data
      //     that.showSelectPage()
      //   } else {
      //     this.$message.error(msg)
      //   }
      // })
    },
    // 确认选择系统选择页
    confirmSystemPage () {
      this.$emit('confirmAction', this.activeSystemPage)
    },
    closeSystemPage () {
      this.$emit('closeAction', this.activeSystemPage)
    }
  },
  created () {
    this.getSystemPageList()
  },
  watch: {
    pageShow (val, oldVal) {
      // tmCommon.error("窗口有变化了")
      this.showSelectPage()
    }
  },
  updated () {

  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
.system-page-dialog{
    .el-dialog__body{
        padding: 0;
    }
    .el-dialog__header{
        height:51px;
        padding-top:18px;
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
}
.system-page-content{
    margin: 16px 32px;
    border: 1px solid #E8E8E8;
    .system-page-table{
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
        .right-pager{
            margin-top: 8px;
            margin-right: 15px;
            float: right;
        }
    }
}
</style>
