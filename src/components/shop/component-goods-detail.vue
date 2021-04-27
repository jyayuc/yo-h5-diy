<template>
    <!-- 商品详情窗口 -->
    <el-dialog @close="closeGoodsPage" class="goods-page-dialog" width="944px" title="商品清单" :visible="goodsShow">
        <div class="goods-page-content">
            <div class="goods-page-header">
                <el-input class="search-box"
                    placeholder="请输入商品名称" v-model="searchCondition.keyword" @keyup.enter.native="getGoodsPageList"
                    prefix-icon="el-icon-search" clearable>
                </el-input>
            </div>
            <el-table
                ref="goodsListTable"
                class="goods-page-table"
                @select-all="selectAllFunction"
                @select="selectFunction"
                :data="goodsDetailList"
                height="360"
                style="width: 100%">
                <el-table-column
                    v-if="isMulti"
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="商品信息"
                    width="330">
                    <template slot-scope="item">
                        <el-radio v-if="!isMulti" v-model="activeGoodsPage" :label="item.row">
                            <div class="img"
                                :style="'background-image:url('+(item.row.picUrl?item.row.picUrl:defaultImgSmall)+');'+(item.row.picUrl?'':'background-size:30px 25px;')">

                            </div>
                            <!-- <img :src="defaultImgSmall" class="image"> -->
                            <p class="title">{{ item.row.title }}</p>
                        </el-radio>
                        <div class="img-box" v-else>
                            <div class="img"
                                :style="'background-image:url('+(item.row.picUrl?item.row.picUrl:defaultImgSmall)+');'+(item.row.picUrl?'':'background-size:30px 25px;')">

                            </div>
                            <p class="title">{{ item.row.title }}</p>
                        </div>
                    </template>
                </el-table-column>
                    <!-- :filters="[]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end" -->
                <el-table-column
                    label="分类"
                    prop="category"
                    width="180">
                    <!-- <template slot-scope="item">
                        {{ item.row.category}}
                    </template> -->
                </el-table-column>
                <!-- <el-table-column
                    prop="code"
                    width="120"
                    label="SKU">
                </el-table-column> -->
                <el-table-column sortable
                    prop="listPrice"
                    label="价格（￥）">
                </el-table-column>
                <el-table-column sortable
                    prop="listTime"
                    label="上架时间">
                </el-table-column>
                </el-table>
                <div class="pager-box">
                    <div class="left-pager" v-if="!!isMulti">
                        已选中<span class="count">{{getAllGoodsLength()}}</span>个商品，
                        最多可选10个商品
                    </div>
                    <div class="right-pager">
                                <!-- :current-page.sync="searchCondition.page.page" -->
                        <el-pagination class="total-pager"
                                layout="total"
                                :total="totalRecord">
                                </el-pagination>

                            <div class="jump-pager" v-if="goodsDetailList&&goodsDetailList.length>0">到<el-input v-model="jumpPage" @keyup.native="jumpPagerAction" size="small" placeholder="" class="count-input"></el-input></div>
                            <el-pagination class="count-pager"
                                @current-change="handleCurrentChange"
                                :current-page.sync="searchCondition.page.page"
                                :page-size="searchCondition.page.size"
                                prev-text="<"
                                next-text=">"
                                v-if="goodsDetailList&&goodsDetailList.length>0"
                                layout="prev, pager, next"
                                :total="totalRecord">
                                </el-pagination>
                    </div>
                </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" class="btn-cancel" @click="closeGoodsPage">取 消</el-button>
            <el-button type="text" @click="confirmGoodsPage">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
import tmCommon from '@/common/common'
const defaultImgSmall = '/static/img/default-img-small.png'
// let variablePool={
//     selectPageNoGoodsMap:{},
// };
export default {
  name: 'component-goods-detail',
  components: {

  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      selectPageNoGoodsMap: {},
      jumpPage: 1,
      searchCondition: {
        tenantCode: localStorage.getItem('tenantCode'),
        // "tenantCode": '88000035',
        keyword: '',
        page: {
          page: 1,
          size: 20
        },
        conditionList: [{
          saleStatus: 1
        }]
      },
      // oldSelection:[],
      // currentSelection:[],
      totalRecord: 0, // 总记录数
      goodsDetailList: [],
      goodsDetailSelectList: [], // 选择的商品数
      activeGoodsPage: 0
    }
  },
  props: ['selectGoodsList', 'isMulti', 'goodsShow', 'selectItem'],
  computed: {

  },
  mounted () {
    this.getGoodsPageList()
    // tmCommon.log("mounted-------------",this.goodsDetailList);
  },
  watch: {
    goodsShow (val, oldVal) {
      // tmCommon.error("窗口有变化了")
      this.searchCondition.keyword = ''
      this.getGoodsPageList()
    }
  },
  methods: {
    keyupAction ($event) {
      // const that = this
      const page = $event.target.value
      if (isNaN(page)) {
        this.jumpPage = ''
      }
    },
    jumpPagerAction ($event) {
      const that = this
      let page = tmCommon.trim($event.target.value)
      if (isNaN(page)) {
        this.jumpPage = ''
        return
      }
      if (!page) {
        this.jumpPage = ''
        return
      }
      let totalPage = parseInt(that.totalRecord / that.searchCondition.page.size, 10)
      const mod = parseFloat(that.totalRecord) % that.searchCondition.page.size
      if (mod > 0) {
        totalPage++
      }
      if (page > totalPage) {
        this.jumpPage = totalPage
        // $event.target.value=totalPage
      } else {
        if (page === 0) {
          page = 1
        }
        this.jumpPage = parseInt(page)
        // this.$set(this.searchCondition.page,"page",page)
        // $event.target.value=page
      }
      tmCommon.error('this.jumpPage', this.jumpPage, this.searchCondition.page)
      // let pageObj=this.searchCondition.page;
      // pageObj.page=this.jumpPage;
      // this.$set(this.searchCondition,"page",pageObj)
      this.searchCondition.page.page = this.jumpPage
      this.getGoodsPageList()
    },
    showSelect () {
      if (this.isMulti) {
        this.showSelectGoodsPage()
      } else {
        this.showSelectPage()
      }
    },
    showSelectPage () {
      const that = this
      // console.log("打开页面",this.selectItem)
      const data = that.goodsDetailList
      that.activeGoodsPage = null
      if (that.selectItem) {
        for (const i in data) {
          if (data[i].code === that.selectItem.code) {
            that.activeGoodsPage = data[i]
            break
          }
        }
      }
    },
    showSelectGoodsPage () {
      tmCommon.log('showSelectGoodsPage', this.selectGoodsList.length)
      if (this.selectGoodsList && this.selectGoodsList.length > 0) {
        if (!this.$refs.goodsListTable) {
          // tmCommon.log("不存在");
          return
        }
        // tmCommon.log("存在");
        this.$refs.goodsListTable.clearSelection()
        const selection = []
        this.selectGoodsList.forEach(row => {
          this.goodsDetailSelectList.push(row)
          this.goodsDetailList.forEach(item => {
            // tmCommon.log("--------",row.goodsInfo.code==item.code,row.goodsInfo.code,item.code);
            if (item.code === row.goodsInfo.code) {
              selection.push(item)
              //    tmCommon.log("找到相同记录");
              this.$refs.goodsListTable.toggleRowSelection(item, true)
              return false
            }
          })
          // tmCommon.log(row);
        })
        this.$set(this.selectPageNoGoodsMap, this.searchCondition.page.page, selection)
      }
    },
    selectAllFunction (selection) {
      // tmCommon.log(selection,selection.length,this.goodsDetailSelectList);
      // this.selectPageNoGoodsMap[this.searchCondition.pageNo]=selection;
      // this.goodsDetailSelectList=selection;
      this.$set(this.selectPageNoGoodsMap, this.searchCondition.page.page, selection)
      // if(selection.length<1){
      //     //取消当前的 goodsDetailList
      //     // tmCommon.log("取消之前",this.goodsDetailSelectList,this.goodsDetailSelectList.length)
      //     let goodsDetailList=this.goodsDetailList;
      //     for(let i in goodsDetailList){
      //        this.goodsDetailSelectList.splice(this.goodsDetailSelectList.findIndex(()=>{
      //            return item=>item.code==goodsDetailList[i].code
      //        }),1);
      //     }
      //     //  tmCommon.log("取消之后",this.goodsDetailSelectList,this.goodsDetailSelectList.length)
      // }else{
      //     let goodsDetailList=this.goodsDetailList;
      //     for(let i in goodsDetailList){
      //        this.goodsDetailSelectList.push(goodsDetailList[i]);
      //     }
      // }
    },
    selectFunction (selection, row) {
      // tmCommon.log(selection,row,this.goodsDetailSelectList);
      // this.goodsDetailSelectList=selection;
      // this.selectPageNoGoodsMap[this.searchCondition.pageNo]=selection;
      // if(selection.length<1){//取消
      this.$set(this.selectPageNoGoodsMap, this.searchCondition.page.page, selection)
      //     this.goodsDetailSelectList.splice(this.goodsDetailSelectList.findIndex(()=>{
      //            return item=>item.code==row.code
      //        }),1);
      // }else{
      //     let index=selection.findIndex(()=>{
      //            return item=>item&&item.code==row.code
      //        });
      //     if(index<0){//未找到  则是取消操作
      //         this.goodsDetailSelectList.splice(this.goodsDetailSelectList.findIndex(()=>{
      //            return item=>item.code==row.code
      //        }),1);
      //     }else{//添加操作
      //         this.goodsDetailSelectList.push(row);
      //     }

      // }
      // this.currentSelection=selection;
      // this.oldSelection=selection;
      // this.goodsDetailSelectList=selection;
    },
    // 页数改变
    handleSizeChange (val) {
      // const that = this
      tmCommon.log(`每页 ${val} 条`)
      this.searchCondition.page.size = val
      this.jumpPage = 1
      this.searchCondition.page.page = this.jumpPage
      this.getGoodsPageList()
    },
    handleCurrentChange (val) {
      tmCommon.log(`当前页:  ${val} `)
      this.jumpPage = val
      this.searchCondition.page.page = this.jumpPage
      this.getGoodsPageList()
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column.property
      return row[property] === value
    },
    // 获取商品详情页面列表
    getGoodsPageList (callback) {
      const that = this
      const condition = {
        tenantCode: localStorage.getItem('tenantCode'),
        // "tenantCode": '88000035',
        keyword: that.searchCondition.keyword,
        page: {
          page: that.searchCondition.page.page,
          size: that.searchCondition.page.size
        },
        conditionList: [{
          saleStatus: 1
        }]
      }
      // for(let i in that.searchCondition){
      //     condition[i]=that.searchCondition[i];
      // }
      if (!condition.keyword) {
        delete condition.keyword
      }
      that.goodsDetailList = []
      that.searchCondition.page.page = this.jumpPage
      that.totalRecord = 100
      // tmCommon.error(JSON.stringify(condition))
      // that.$store.dispatch('getShopGoodsList', condition).then(res => {
      //   // tmCommon.log(res);
      //   const { status, msg, data, total } = res
      //   if (status === '200') {
      //     that.goodsDetailList = data
      //     that.searchCondition.page.page = this.jumpPage
      //     that.totalRecord = total
      //     // that.showSelect();
      //     // if(callback){
      //     //     callback()
      //     // }else{
      //     that.$nextTick(() => {
      //       that.showSelect()
      //     })
      //     // }
      //   } else {
      //     this.$message.error(msg)
      //   }
      // })
    },
    // 获取所有已选择的商品
    getAllGoods () {
      const goods = []
      // this.showSelectGoodsPage();
      // tmCommon.error(this.selectPageNoGoodsMap,this.selectGoodsList,this.searchCondition);

      for (const i in this.selectPageNoGoodsMap) {
        const goodList = this.selectPageNoGoodsMap[i]
        if (goodList && goodList.length > 0) {
          for (const j in goodList) {
            goods.push(goodList[j])
          }
        }
      }
      return goods
    },
    getAllGoodsLength () {
      return this.getAllGoods().length
    },
    // 选择商品页
    // selectGoodsPage(item){
    // tmCommon.log(item);
    //     this.activeGoodsPage=item;
    // },
    // 确认选择系统选择页
    confirmGoodsPage () {
      let goods = this.activeGoodsPage
      if (this.isMulti) {
        goods = this.getAllGoods()
        // for(let i in variablePool.selectPageNoGoodsMap){
        //     let goodList=variablePool.selectPageNoGoodsMap[i];
        //     if(goodList&&goodList.length>0){
        //         for(let j in goodList){
        //             goods.push(goodList[j]);
        //         }
        //     }
        // }
        // goods=this.goodsDetailSelectList;
        if (goods.length > 10) {
          this.$message.error('最多可选10个商品，当前已选中' + goods.length + '个商品')
          return
        }
      }
      this.$emit('confirmAction', goods)
    },
    closeGoodsPage () {
      this.$emit('closeAction')
    }
  },
  created () {
    // tmCommon.log("created-------------",this.selectGoodsList,this.goodsDetailList);
  },
  updated () {
    // tmCommon.log("updated-------------",this.$refs.goodsListTable,this.selectGoodsList,this.goodsDetailList);

  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
@media screen and (min-width: 1280px) and (max-width: 1440px) {
   .goods-page-dialog{
        .el-dialog__body{
            max-height: 542px!important;
        }
    }
}
@media screen and (min-width: 1920px){
    .goods-page-dialog{
        .el-dialog__body{
            max-height: 722px!important;
        }
    }
}
.goods-page-dialog{
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
    .goods-page-content{
        margin: 16px 32px;
        border: 1px solid #E8E8E8;
        .goods-page-header{
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
                        left:-5px;
                        font-size: 18px;
                        font-weight: 900;
                    }
                }
            }
        }
        .goods-page-table{
            thead{
                th{
                    padding: 0;
                    height: 50px;
                    line-height: 50px;
                    background-color: #FAFAFA;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #333;
                    // &:nth-child(2){
                    //     text-align: right;
                    //     padding-right: 15px
                    // }
                }
            }
            tbody{
                td{
                    // .img-box{
                    //     .img{
                    //         margin-left: 15px;
                    //     }

                    // }
                    .el-radio{
                        .img{
                            margin-left: 15px;
                        }
                        .el-radio__inner{
                            float: left;
                            margin-top: 12px;
                        }
                        .el-radio__label{
                            float: right;
                        }
                        // .el-radio__inner+.el-radio__label{

                        // }
                        .title{
                            color: #333;
                            // margin-top: 2px;
                            white-space: initial;
                        }
                    }
                    .img{
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                        vertical-align:middle;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-color: #F1F2F3;
                        float: left;
                    }

                    .title{
                        float: left;
                        font-size: 13px;
                        width: 200px;
                        height: 34px;
                        line-height: 18px;
                        // overflow: hidden;
                        // text-overflow: ellipsis;
                        // white-space:pre-wrap;
                        overflow : hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        // // p {
                        //     position:relative;
                        //     line-height:1.4em;
                        //     /* 3 times the line-height to show 3 lines */
                        //     // height:4.2em;
                        //     overflow:hidden;
                        // // }
                        // &::after {
                        //     content:"...";
                        //     font-weight:bold;
                        //     position:absolute;
                        //     bottom:0;
                        //     right:0;
                        //     background: #fff;
                        //     padding:0 20px 1px 45px;
                        //     // background:url(http://css88.b0.upaiyun.com/css88/2014/09/ellipsis_bg.png) repeat-y;
                        // }
                    }
                    // &:nth-child(2){
                    //     text-align: right;
                    //     padding-right: 20px
                    // }
                }
            }
        }
         .pager-box{
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            .left-pager{
                float: left;
                margin-left: 32px;
                .count{
                    color: #3366FF;
                }
            }
            .right-pager{
                float: right;
                margin-right: 32px;
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
