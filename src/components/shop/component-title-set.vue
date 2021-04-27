<template>
    <!-- 标题设置 -->
    <div class="component-operate-title">
        <div class="nav-title">标题设置</div>
        <div class="component-operate-content">
            <p class="content-li">
                <span class="content-label">标题</span>
                <el-input class="content-txt"  placeholder="请输入标题" maxlength="6" v-model="activeComponentData.content.titleName"></el-input>
                <component-count :content="activeComponentData.content.titleName" max-count="6"/>
            </p>
            <!-- <p class="content-li">
                <span class="content-label">字体</span>
                <el-select
                class="content-select"  placeholder="请选择字体" v-model="activeComponentData.content.titleFont">
                    <el-option label="默认字体" value=""></el-option>
                    <el-option label="cursive" value="cursive"></el-option>
                    <el-option label="宋体" value="宋体"></el-option>
                    <el-option label="新宋体" value="新宋体"></el-option>
                    <el-option label="华文楷体" value="华文楷体"></el-option>
                </el-select>
            </p> -->
            <p class="content-li">
                <span class="content-label">字号</span>
                <el-slider :min="10" :max="30" class="content-txt" v-model="activeComponentData.content.titleSize"></el-slider>
            </p>
            <div class="content-li">
                <span class="content-label">颜色</span>
                <div class="content-color">
                    <div class="color-right">
                    <div class="color-txt">{{activeComponentData.content.titleColor}}</div><el-color-picker v-model="activeComponentData.content.titleColor"></el-color-picker>
                    </div>
                </div>
            </div>
            <div class="content-li">
                <span class="content-label">对齐</span>
                <el-button-group class="content-group">
                    <el-button type="primary" @click="selectTextAlign('left')" icon="el-icon-text-left" :class="{'active':activeComponentData.content.titleAlign=='left'}"></el-button>
                    <el-button type="primary" @click="selectTextAlign('center')" icon="el-icon-text-center" :class="{'active':activeComponentData.content.titleAlign=='center'}"></el-button>
                    <el-button type="primary" @click="selectTextAlign('right')" icon="el-icon-text-right" :class="{'active':activeComponentData.content.titleAlign=='right'}"></el-button>
                </el-button-group>
            </div>
        </div>
        <div class="component-operate-content line">
            <div class="content-li">
                <span class="content-label flex">是否启用更多链接</span>
                <el-switch class="content-switch"
                    style="display: block"
                    v-model="activeComponentData.content.titleIsMore"
                    active-color="#3366FF"
                    inactive-color="#D9D9D9"
                    active-text="是"
                    inactive-text="否">
                </el-switch>
            </div>
            <p class="content-li" v-if="activeComponentData.content.titleIsMore">
                <span class="content-label">链接</span>
                <el-select placeholder="选择跳转的页面"
                 @change="showSelectPage(activeComponentData.content.linkName)"
                class="content-select" v-model="activeComponentData.content.linkName">
                    <el-option label="系统页面" value="system"></el-option>
                    <el-option label="微页面" value="micro"></el-option>
                    <el-option label="商品详情" value="detail"></el-option>
                </el-select>
            </p>
            <div class="content-li" v-if="activeComponentData.content.titleIsMore">
                <span class="content-label">显示</span>
                <div class="content-check-box">
                    <el-checkbox class="content-checkbox" v-model="activeComponentData.content.titleTextMore">更多</el-checkbox>
                    <el-checkbox class="content-checkbox" v-model="activeComponentData.content.titleArrowMore">箭头</el-checkbox>
                </div>
            </div>
        </div>

        <!-- 系统页面 -->
        <component-system-page :select-item="activeComponentData.content.linkName" @confirmAction="confirmSystemPageDialog"  @closeAction="closeSystemPageDialog"  :page-show="!!showSystemPageDialogStatus"/>
        <!-- 微页面 -->
        <component-micro-page :select-item="activeComponentData.content.titleMoreUrl" @confirmAction="confirmMicroPageDialog"  @closeAction="closeMicroPageDialog" :page-show="!!showMicroPageDialogStatus"/>
        <!-- 商品详情 -->
        <component-goods-detail :select-item="activeComponentData.goodsInfo" :goods-show="showGoodsPageDialogStatus" @confirmAction="confirmGoodsPageDialog"  @closeAction="closeGoodsPageDialog"/>

    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"
import ComponentSystemPage from './component-system-page.vue'
import ComponentMicroPage from './component-micro-page.vue'
import ComponentGoodsDetail from './component-goods-detail.vue'
import ComponentCount from './component-count.vue'

export default {
  name: 'component-title-set',
  components: {
    ComponentSystemPage,
    ComponentMicroPage,
    ComponentGoodsDetail,
    ComponentCount
  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,
      showGoodsPageDialogStatus: false, // 显示选择商品详情页面
      showSystemPageDialogStatus: false, // 显示选择系统页面
      showMicroPageDialogStatus: false // 显示选择微页面
      // activeLinkItem:{},//选中的链接对象
    }
  },
  props: ['activeComponentData'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 设置对齐方式
    selectTextAlign (align) {
      this.activeComponentData.content.titleAlign = align
    },
    // 关闭系统页选择窗口
    closeSystemPageDialog () {
      this.showSystemPageDialogStatus = false
    },
    // 确认系统页选择
    confirmSystemPageDialog (item) {
      // console.log("confirmSystemPageDialog",item);
      if (item) {
        this.activeComponentData.content.titleMoreUrl = item.url
        this.activeComponentData.content.titleMoreName = item.name
        this.activeComponentData.content.linkName = item.name
      } else {
        this.activeComponentData.content.titleMoreUrl = ''
        this.activeComponentData.content.titleMoreName = ''
        this.activeComponentData.content.linkName = ''
      }
      this.closeSystemPageDialog()
    },
    // 关闭微页面选择窗口
    closeMicroPageDialog () {
      this.showMicroPageDialogStatus = false
    },
    // 确认微页面选择
    confirmMicroPageDialog (item) {
      if (item) {
        this.activeComponentData.content.titleMoreUrl = item.url
        // this.activeComponentData.content.titleMoreUrl="/page/home/home?pageId="+item.id;
        this.activeComponentData.content.titleMoreName = item.name
        this.activeComponentData.content.linkName = item.name
      } else {
        this.activeComponentData.content.titleMoreUrl = ''
        this.activeComponentData.content.titleMoreName = ''
        this.activeComponentData.content.linkName = ''
      }
      this.closeMicroPageDialog()
    },
    // 关闭商品详情选择窗口
    closeGoodsPageDialog () {
      this.showGoodsPageDialogStatus = false
    },
    // 确认商品详情选择
    confirmGoodsPageDialog (item) {
      if (item) {
        // this.activeComponentData.content.titleMoreUrl="";
        this.activeComponentData.content.titleMoreUrl = '/pages/pdp/pdp?spuCode=' + item.code
        this.activeComponentData.content.titleMoreName = '商品详情-' + item.title
        this.activeComponentData.content.linkName = this.activeComponentData.content.titleMoreName
        this.activeComponentData.goodsInfo = item
      }
      this.closeGoodsPageDialog()
    },
    // 选择跳转到不同页面
    showSelectPage (type) {
      const that = this
      switch (type) {
        case 'system':
          that.showSystemPageDialog()
          break
        case 'micro':
          that.showMicroPageDialog()
          break
        case 'detail':
          that.showGoodsPageDialog()
          break
        default:
      }
      this.activeComponentData.content.linkName = this.activeComponentData.content.titleMoreName
    },
    // 打开选择系统选择页
    showSystemPageDialog () {
      this.showSystemPageDialogStatus = true
    },
    // 打开选择微页面选择窗口
    showMicroPageDialog () {
      this.showMicroPageDialogStatus = true
    },
    // 打开选择商品列表页面选择窗口
    showGoodsPageDialog () {
      this.showGoodsPageDialogStatus = true
    }
  },
  async created () {

  },
  updated () {

  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-operate-title{
    .component-operate-content{
        padding: 24px 24px 0;
        font-family: PingFangSC-Regular;
        // font-size: 12px;
        &.line{
            border-top: 1px solid #E8E8E8;
            // padding-top: 0;
        }
        .content-li{
            height: 32px;
            position: relative;
            display: flex;
            margin-bottom: 24px;
            &.second{
                height: 20px;
            }
            .el-input__inner{
                font-size: 14px;
            }
            .content-check-box{
                margin-top: 8px;
                flex: 1;
                margin-left: 8px;
            }
            .content-label{
                margin-top: 8px;
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: rgba(102,102,102,0.90);
            }
            .flex{
                flex:1;
                // font-size: 12px;
            }
            .content-switch{
                margin-top: 7px;
                .el-switch__label{
                    display: none;
                    position: absolute;
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    transform: scale(.8);
                    color: rgba(255,255,255,0.93);
                    z-index: 1;
                    &.el-switch__label--right{
                        top:0;
                        left:0;
                        margin-left: 5px;
                        margin-top: 2px;
                    }
                    &.el-switch__label--left{
                        top:0;
                        right:0;
                        margin-right: 5px;
                        margin-top: 2px;
                    }
                    &.is-active{
                        display: block;
                    }
                }
            }
            .content-group{
                flex: 1;
                display:flex;
                margin-left: 8px;
                .el-button{
                    flex: 1;
                    padding: 0;
                    border: 1px solid #D9D9D9;
                    // border-radius: 2px;
                    background-color: #fff;
                    color: #000;
                    i{
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: contain;
                        margin-top: 5px;
                        padding: 10px;
                    }
                    .el-icon-text-left{
                        background-image: url('/static/img/edit/title/title-left.svg')
                    }
                    .el-icon-text-center{
                        background-image: url('/static/img/edit/title/title-center.svg')
                    }
                    .el-icon-text-right{
                        background-image: url('/static/img/edit/title/title-right.svg')
                    }
                    &:hover,&.active{
                        z-index: 1;
                        border: 1px solid #3366FF;
                        .el-icon-text-left{
                            background-image: url('/static/img/edit/title/title-left-on.svg')
                        }
                        .el-icon-text-center{
                            background-image: url('/static/img/edit/title/title-center-on.svg')
                        }
                        .el-icon-text-right{
                            background-image: url('/static/img/edit/title/title-right-on.svg')
                        }
                    }
                }
            }
            .content-color{
                flex: 1;
                // text-align: right;
                .color-right{
                    float: right;
                    height: 30px;
                    .el-color-picker__trigger{
                        float: left;
                        width: 30px;
                        height: 30px;
                        border-radius: 0;
                        .el-color-picker__color{
                            border:none;
                        }
                        .el-color-picker__icon{
                            display: none;
                        }
                    }
                    .color-txt{
                        float: left;
                        border: 1px solid #E8EDF0;
                        border-radius: 2px;
                        width: 90px;
                        font-size: 12px;
                        text-indent: 8px;
                        color: rgba(102,102,102,0.90);
                        line-height: 30px;
                        border-right: 0;
                        height: 30px;
                    }
                }
            }
            .content-txt{
                flex:1;
                // font-family: PingFangSC-Semibold;
                font-size: 14px;
                // color: #3366FF;
                // border: 1px solid #3366FF;
                // padding: 0 16px;
                margin-left: 8px;
                // &.el-slider{
                //     width: 95%;
                // }
                .el-slider__runway{
                    height: 3px;
                }
                .el-slider__button-wrapper{
                    top:-16px;
                }
                .el-slider__bar{
                    background: #3366FF;
                    height: 3px;
                    border-radius: 3px;
                }
                .el-slider__button{
                    border: 1px solid #D9D9D9;
                    box-shadow: 0 0 6px 0 rgba(0,0,0,0.10);
                    width: 12px;
                    height: 12px;
                }
                .el-input__inner{
                    height: 32px;
                    line-height: 32px;
                }
            }
            .content-select{
                margin-left: 8px;
                // width: 230px;
                flex: 1;
                .el-input__suffix{
                    top:4px;
                }
                .el-input__inner{
                    height:32px;
                    font-family: PingFangSC-Regular;
                    // font-size: 12px;
                    // color: #BFBFBF;
                    .el-icon-arrow-up{
                        line-height: 0;
                    }
                }
            }
        }
        .content-tips{
            margin-top: 8px;
            margin-left: 15px;
            margin-bottom: 25px;
            transform: scale(.9);
            font-family: PingFangSC-Regular;
            font-size: 10px;
            color: rgba(102,102,102,0.90);
        }
    }
}
</style>
