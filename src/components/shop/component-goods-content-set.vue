<template>
  <!--商品列表内容设置-->
  <div class="component-goods-content-set">
    <div class="content-tag" v-text="title" v-if="!!title"></div>
    <div class="content-li">
      <span class="content-label">商品来源</span>
      <!-- <el-input class="content-txt" v-model="activeComponentData.title"></el-input>
             -->
      <div class="radio-group">
        <el-radio :label="1" v-model="activeComponentData.content.productType"
          >商品</el-radio
        >
        <!-- <el-radio :label="2" v-model="activeComponentData.content.productType">商品分类</el-radio> -->
      </div>
    </div>
    <div class="goods-box" v-if="activeComponentData.content.productType == 1">
      <div class="goods-list-box">
        <drop
          class="goods-list"
          @dragover="imgDragover"
          @dragleave="imgDragleave"
          @drop="imgDrop"
          v-if="activeComponentData.lines && activeComponentData.lines.length > 0"
        >
          <drag
            class="goods-drag"
            @dragstart="imgDragstart"
            :data-index="index"
            :transfer-data="{ index: index, tag: 'content-img' }"
            v-for="(item, index) in activeComponentData.lines"
            :key="'goods-box-index-' + index"
            :style="
              'background-image:url(' +
              (item.goodsInfo.picUrl ? item.goodsInfo.picUrl : defaultImgSmall) +
              ');' +
              (item.goodsInfo.picUrl ? '' : 'background-size:40px 25px;')
            "
          >
            <div class="new" v-if="activeDragComponentIndex == index"></div>
            <i class="el-icon-close" @click="removeImg(index)"></i>
          </drag>
          <div class="goods-drag add" @click="showGoodsPageDialog">...</div>
        </drop>
        <el-button
          type="primary"
          v-if="activeComponentData.lines && activeComponentData.lines.length < 1"
          @click="showGoodsPageDialog"
          >选择商品</el-button
        >
      </div>
    </div>
    <!-- <div class="goods-category-box" v-else-if="activeComponentData.productType==2">
            <div class="content-li">
                <span class="content-label">选择分类</span>
                    <el-select placeholder="选择分类" class="content-select" v-model="activeComponentData.content.category">
                        <el-option label="精选服饰" value="精选服饰"></el-option>
                        <el-option label="夏季促销" value="夏季促销"></el-option>
                    </el-select>
            </div>
            <div class="content-li">
                <span class="content-label">显示数量</span>
                <el-input class="content-txt" type="number" v-model="activeComponentData.content.goodsNumber"></el-input>
            </div>
        </div> -->
    <div class="content-li">
      <span class="content-label">显示内容</span>
      <!-- <el-input class="content-txt" v-model="activeComponentData.title"></el-input>
            -->
      <div class="checkbox-group">
        <el-checkbox v-model="activeComponentData.content.productShowName"
          >商品名称</el-checkbox
        >
        <el-checkbox v-model="activeComponentData.content.productShowPrice"
          >商品价格</el-checkbox
        >
        <el-checkbox v-model="activeComponentData.content.productShowSubscript"
          >商品角标</el-checkbox
        >
      </div>
    </div>
    <div class="icon-list" v-if="!!activeComponentData.content.productShowSubscript">
      <el-radio :label="1" v-model="activeComponentData.content.productSubscriptType"
        >新品</el-radio
      >
      <el-radio :label="2" v-model="activeComponentData.content.productSubscriptType"
        >热卖</el-radio
      >
      <el-radio :label="3" v-model="activeComponentData.content.productSubscriptType"
        >NEW</el-radio
      >
      <el-radio :label="4" v-model="activeComponentData.content.productSubscriptType"
        >HOT</el-radio
      >
    </div>

    <!-- 商品详情 -->
    <component-goods-detail
      :goods-show="!!showGoodsPageDialogStatus"
      @confirmAction="confirmGoodsPageDialog"
      :select-goods-list="activeComponentData.lines"
      :is-multi="true"
      @closeAction="closeGoodsPageDialog"
    />
  </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const hotEn="/static/img/edit/goods/hot-en.svg"
// const hotZh="/static/img/edit/goods/hot-zh.png"
// const newEn="/static/img/edit/goods/new-en.png"
// const newZh="/static/img/edit/goods/new-zh.png"
import ComponentGoodsDetail from '@/components/shop/component-goods-detail.vue'
import tmCommon from '@/common/common'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'component-goods-content-set',
  components: {
    ComponentGoodsDetail
  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      showGoodsPageDialogStatus: false, // 显示选择商品详情页面
      activeDragComponentIndex: null
      // hotEn:hotEn,
      // newEn:newEn,
      // hotZh:hotZh,
      // newZh:newZh,
      // activeCategory:"",//当前选中的分类
    }
  },
  props: ['activeComponentData', 'title'],
  computed: {},
  mounted () {},
  methods: {
    // 拖动开始处理
    imgDragstart (data, event) {
      tmCommon.log('imgDragstart', data)
      // this.isDrag=true;
      event.stopPropagation()
    },
    // 拖动进行中
    imgDragover (data, event) {
      // clearTimeout(variablePool.leaveTimeoutId);
      const that = this
      event.stopPropagation()
      event.preventDefault()
      const dataset = event.target.dataset
      // 在本组内  交换位置
      if (data.tag == 'content-img') {
        if (data.index == dataset.index) {
          // 如果是自己则直接返回
          return
        }
      }
      if (!dataset.index && dataset.index != 0 && dataset.index != 1) {
        return
      }
      // tmCommon.log("imgDragover",data,dataset);
      if (dataset.index != null && dataset.index != undefined) {
        // 存在就设置
        that.activeDragComponentIndex = dataset.index
      }
    },
    // 组件拖动离开
    imgDragleave (data, event) {
      // if(true){
      //     return;
      // }
      const that = this
      const dataset = event.target.dataset
      // tmCommon.log("imgDragleave",event);
      // 在本组内  交换位置
      if (data.tag == 'content-img') {
      }
    },
    // 拖动结束
    imgDragend (data, event) {
      this.activeDragComponentIndex = null
    },
    // 拖动结束
    imgDrop (data, event) {
      // this.isDrag=false;
      const that = this
      if (!data) {
        return
      }
      const dataset = event.target.dataset
      // tmCommon.log("imgDrop",data,dataset.index);
      // 在本组内  交换位置
      if (data.tag == 'content-img' && dataset.index != undefined) {
        if (data.index == dataset.index) {
          // 如果是自己则直接返回
          return
        }
        tmCommon.changeArrayElement(
          that,
          that.activeComponentData.lines,
          data.index,
          dataset.index
        )
      }
      this.activeDragComponentIndex = null
    },
    // 关闭商品详情选择窗口
    closeGoodsPageDialog () {
      this.showGoodsPageDialogStatus = false
    },
    // 删除轮播组件图片
    removeImg (index) {
      this.activeComponentData.lines.splice(index, 1)
    },
    // 确认商品详情选择
    confirmGoodsPageDialog (list) {
      const lines = []
      if (list) {
        list = tmCommon.clone(list)
        // tmCommon.log("confirmGoodsPageDialog",list)
        for (const i in list) {
          lines.push({ goodsInfo: list[i], sort: i })
          // this.activeComponentData.lines.push({goodsInfo:list[i],sort:i});
        }
      }
      // tmCommon.log(list,list.length);
      this.$set(this.activeComponentData, 'lines', lines)
      this.closeGoodsPageDialog()
    },
    // //选择跳转到不同页面
    // showSelectPage(type){
    //     let that=this;
    //     switch(type){
    //         case 'system':
    //             that.showSystemPageDialog();
    //             break;
    //         case 'micro':
    //             that.showMicroPageDialog();
    //             break;
    //         case 'detail':
    //             that.showGoodsPageDialog();
    //             break;
    //         default:

    //     }
    // },
    // //打开选择系统选择页
    // showSystemPageDialog(){
    //     this.showSystemPageDialogStatus=true;
    // },
    // //打开选择微页面选择窗口
    // showMicroPageDialog(){
    //     this.showMicroPageDialogStatus=true;
    // },
    // 打开选择商品列表页面选择窗口
    showGoodsPageDialog () {
      this.showGoodsPageDialogStatus = true
    }
  },
  async created () {},
  updated () {}
}
</script>
<style lang="less">
  // @import "../../../sheet/sass/shop/components/component-lib.less";
  .component-goods-content-set {
    border-top: 2px solid #e8e8e8;
    .content-tag {
      padding: 0 24px;
      margin-top: 5px;
      line-height: 50px;
      font-family: PingFangSC-Medium;
      font-size: 12px;
      color: rgba(51, 51, 51, 0.9);
    }
    .content-li {
      padding: 0 24px;
      // height: 32px;
      display: flex;
      margin-bottom: 24px;
      &.second {
        height: 20px;
      }
      .radio-group {
        margin-top: 8px;
        flex: 1;
      }
      .content-label {
        margin-right: 16px;
        margin-top: 8px;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        // flex: 1;
        color: rgba(102, 102, 102, 0.9);
      }
      .checkbox-group {
        margin-top: 10px;
        flex: 1;
        // margin-left: 8px;
        .el-checkbox {
          display: block;
        }
        .el-checkbox + .el-checkbox {
          margin-left: 0;
          margin-top: 14px;
        }
      }
      .content-select {
        flex: 1;
      }
      .content-txt {
        flex: 1;
      }
      // .flex{
      //     flex:1;
      //     font-size: 12px;
      // }
    }
    .goods-list-box {
      margin: 0 24px 24px 24px;
      padding-bottom: 7px;
      min-height: 140px;
      border: 1px solid #e8e8e8;
      .goods-list {
        overflow: hidden;
        .goods-drag {
          width: 58px;
          height: 58px;
          float: left;
          margin-left: 7px;
          margin-top: 7px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          background-color: #f1f2f3;
          position: relative;
          &:hover {
            .el-icon-close {
              display: block;
            }
          }
          .el-icon-close {
            display: none;
            color: #fff;
            // padding-top: 32px;
            // padding-right: 22px;
            cursor: pointer;
            position: absolute;
            right: -7px;
            top: -7px;
            z-index: 1;
            background-color: #ddd;
            padding: 3px;
            border-radius: 50%;
            text-align: center;
            // transform: translate(-50%,-50%);
            font-size: 10px;
            font-weight: 900;
            // &:hover{
            //     color:#36F;
            // }
          }
          .new {
            // height: 120px;
            height: 100%;
            position: absolute;
            width: 20px;
            left: 0;
            top: 0;
            overflow: hidden;
            background: rgba(51, 102, 255, 0.4);
            border: 1px solid #3366ff;
            * {
              opacity: 0;
            }
          }
          &.add {
            border: 1px solid #ddd;
            color: #3366ff;
            text-align: center;
            line-height: 45px;
            letter-spacing: 1px;
            font-size: 23px;
            font-weight: 900;
            cursor: pointer;
          }
        }
      }
      .el-button--primary {
        margin: 54px auto;
        padding: 0 17px;
        font-size: 14px;
        display: block;
      }
    }
    .icon-list {
      margin-top: -8px;
      margin-left: 110px;
      .el-radio {
        display: block;
        margin-bottom: 11px;
      }
      .el-radio + .el-radio {
        margin-left: 5px;
      }
    }
  }
</style>
