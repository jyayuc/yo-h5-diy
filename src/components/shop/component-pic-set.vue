<template>
<!-- 图片设置 -->
    <div class="component-operate-pic">
        <div class="pic-step-first" v-if="!showChangeStyleStatus">
            <div class="nav-title">图片设置</div>
            <div class="component-operate-content">
                <component-style-set :style-tag="'样式'" :style-map="picStyleMap"
                :active-component-data="activeComponentData"
                @showChangeStyle="showChangeStyle"/>

                <component-padding :component-data="activeComponentData"/>

                <component-content-set title="内容设置" image-name="图片"
                :img-upload-tips="picTipsMap[activeComponentData.style]"
                :active-component-data="activeComponentData"
                :count="(activeComponentData.style=='rowTwo'||activeComponentData.style=='rowOne'||activeComponentData.style=='bigSmall'||activeComponentData.style=='smallBig')?2:(activeComponentData.style=='big2Small'||activeComponentData.style=='2smallBig')?3:0"/>

            </div>
        </div>
        <component-style-list title="选择图片组合样式"
        :style-map="picStyleMap"
        v-if="!!showChangeStyleStatus" @closeAction="closeSelectStyle"
        :active-component-data="activeComponentData"
        :show-change-style-status="showChangeStyleStatus"/>
    </div>
</template>
<script>
import ComponentStyleSet from './component-style-set.vue'
import ComponentContentSet from './component-content-set.vue'
import ComponentStyleList from './component-style-list.vue'
import ComponentPadding from './component-padding.vue'
const picStyle1 = '/static/img/edit/pic/pic-style1.svg'
const picStyle2 = '/static/img/edit/pic/pic-style2.svg'
const picStyle3 = '/static/img/edit/pic/pic-style3.svg'
const picStyle4 = '/static/img/edit/pic/pic-style4.svg'
const picStyle5 = '/static/img/edit/pic/pic-style5.svg'
const picStyle6 = '/static/img/edit/pic/pic-style6.svg'
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

const picStyleMap = {
  rowTwo: picStyle1, // 一行两个rowTwo
  rowOne: picStyle2, // 一行一个rowOne
  bigSmall: picStyle3, // 左大右小bigSmall;
  smallBig: picStyle4, // 左小右大smallBig;
  big2Small: picStyle5, // 一大两小big2Small;
  '2smallBig': picStyle6 // 两小一大2smallBig;
}

const picTipsMap = {
  rowTwo: { 0: '建议尺寸324*150，仅支持PNG、JPG、GIF、BMP格式', 1: '建议尺寸324*150，仅支持PNG、JPG、GIF、BMP格式' }, // 一行两个rowTwo
  rowOne: { 0: '建议尺寸750*336，仅支持PNG、JPG、GIF、BMP格式', 1: '建议尺寸750*336，仅支持PNG、JPG、GIF、BMP格式' }, // 一行一个rowOne
  bigSmall: { 0: '建议尺寸434*296，仅支持PNG、JPG、GIF、BMP格式', 1: '建议尺寸216*296，仅支持PNG、JPG、GIF、BMP格式' }, // 左大右小bigSmall;
  smallBig: { 0: '建议尺寸274*420，仅支持PNG、JPG、GIF、BMP格式', 1: '建议尺寸380*420，仅支持PNG、JPG、GIF、BMP格式' }, // 左小右大smallBig;
  big2Small: { 0: '建议尺寸432*520，仅支持PNG、JPG、GIF、BMP格式', 1: '建议尺寸216*250，仅支持PNG、JPG、GIF、BMP格式', 2: '建议尺寸216*250，仅支持PNG、JPG、GIF、BMP格式' }, // 一大两小big2Small;
  '2smallBig': { 0: '建议尺寸216*250，仅支持PNG、JPG、GIF、BMP格式', 1: '建议尺寸216*250，仅支持PNG、JPG、GIF、BMP格式', 2: '建议尺寸432*520，仅支持PNG、JPG、GIF、BMP格式' }
  // 两小一大2smallBig;
}

export default {
  name: 'component-pic-set',
  components: {
    ComponentStyleSet, // 设置样式
    ComponentStyleList, // 样式列表
    ComponentContentSet, // 内容设置
    ComponentPadding
  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      showChangeStyleStatus: false, // 选择轮播样式窗口状态
      picStyleMap: picStyleMap,
      picTipsMap: picTipsMap
    }
  },
  props: ['activeComponentData'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 打开选择轮播样式
    showChangeStyle () {
      this.showChangeStyleStatus = true
    },
    // 确认选择轮播样式
    closeSelectStyle () {
      this.showChangeStyleStatus = false
    }
  },
  created () {
  },
  updated () {
    // console.warn("XXXXXXXX",this.picTipsMap[this.activeComponentData.style],this.activeComponentData.style)

  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
 .component-operate-pic{
    // .pic-step-second{
    //     .nav-title{
    //         .el-icon-close{
    //             float: right;
    //             margin-right: 20px;
    //             margin-top: 18px;
    //             font-size: 20px;
    //             cursor: pointer;
    //         }
    //     }
    //     .style-list-box{
    //         padding: 32px 24px 16px;
    //         overflow: hidden;
    //         li{
    //             float: left;
    //             width: 128px;
    //             height: 82px;
    //             background-position: center;
    //             background-size: contain;
    //             background-repeat: no-repeat;
    //             margin-left: 14px;
    //             margin-bottom:16px;
    //             border: 1px solid #E8E8E8;
    //             &:nth-child(2n+1){
    //                 margin-left: 0;
    //             }
    //             &.active{
    //                 border: 1px solid #3366FF;
    //             }
    //         }
    //     }
    //     .publish-btn{
    //         padding: 0 18px;
    //         margin-left: 25px;
    //     }
    // }
    .component-operate-content{
        padding: 0;
    }
    // .pic-tag{
    //     padding: 0 24px;
    //     margin-top: 5px;
    //     line-height: 50px;
    //     font-family: PingFangSC-Medium;
    //     font-size: 12px;
    //     color: rgba(51,51,51,0.90);
    // }
    // .pic-style-box{
    //     display: flex;
    //     padding: 0 24px 24px;
    //     align-content: space-between;
    //     border-bottom:2px solid #E8E8E8;
    //     .pic-img{
    //         width: 88px;
    //         height: 54px;
    //         background: #FFFFFF;
    //         border: 1px solid #E8E8E8;
    //         img{
    //             width: 88px;
    //             height: 54px;
    //         }
    //     }
    //     .change-style-btn{
    //         flex: 1;
    //         text-align: right;
    //         font-family: PingFangSC-Regular;
    //         font-size: 12px;
    //         color: #3366FF;
    //         .el-icon-arrow-right{
    //             color:#999999;
    //         }
    //     }
    // }
    // .pic-img-list{
    //     border-top:1px solid #E8E8E8;
    //     border-bottom:1px solid #E8E8E8;
    //     .pic-drag{
    //         border-top:1px solid #E8E8E8;
    //         &:first-child{
    //             border-top:none;
    //         }
    //     }
    //     .pic-drag-content{
    //         cursor: move;
    //         display: flex;
    //         // height: 77px;
    //         align-content: space-between;
    //         .pic-left{
    //             flex: 1;
    //             display: flex;
    //         }
    //         .el-icon-caret-right{
    //             margin:33px 21px;
    //             color: #999999;
    //         }
    //         .pic-img{
    //             margin-top: 14px;
    //             width: 50px;
    //             height: 50px;
    //             background-repeat: no-repeat;
    //             background-position: center;
    //             background-size: contain;
    //         }
    //         .el-icon-delete{
    //             color: #999;
    //             padding-top: 32px;
    //             padding-right: 22px;
    //             cursor:pointer;
    //             font-size: 14px;
    //             font-weight: 900;
    //             &:hover{
    //                 color:#36F;
    //             }
    //         }
    //     }
    //     .pic-upload-content{
    //         padding:24px;
    //         .pic-li{
    //             height: 32px;
    //             .pic-label{
    //                 font-family: PingFangSC-Regular;
    //                 font-size: 12px;
    //                 color: #666666;
    //             }
    //             .save-btn{
    //                 // height: 28px;
    //                 // line-height: 28px;
    //                 // font-family: PingFangSC-Semibold;
    //                 // font-size: 12px;
    //                 // color: #3366FF;
    //                 // border: 1px solid #3366FF;
    //                 padding: 0 16px;
    //                 margin-left: 8px;
    //             }
    //             .pic-select{
    //                 margin-left: 8px;
    //                 .el-input__inner{
    //                     height:32px;
    //                     font-family: PingFangSC-Regular;
    //                     font-size: 12px;
    //                     color: #BFBFBF;
    //                     .el-icon-arrow-up{
    //                         line-height: 0;
    //                     }
    //                 }
    //             }
    //         }
    //         .pic-tips{
    //             margin-top: 8px;
    //             margin-left: 15px;
    //             margin-bottom: 25px;
    //             transform: scale(.9);
    //             font-family: PingFangSC-Regular;
    //             font-size: 10px;
    //             color: rgba(102,102,102,0.90);
    //         }
    //     }
    // }
    // .add-img-btn{
    //     margin: 32px auto;
    //     // float: left;
    //     display: block;
    //     background: #3366FF;
    //     border-radius: 2px;
    //     height:32px;
    //     line-height: 32px;
    //     padding:0 17px;
    //     font-family: PingFangSC-Semibold;
    //     font-size: 14px;
    //     .el-icon-plus{
    //         font-weight: 900;
    //     }
    //     &[disabled]{
    //         background: #999999;
    //     }
    // }
}
</style>
