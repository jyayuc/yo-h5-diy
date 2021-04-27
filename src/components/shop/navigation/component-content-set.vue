<template>
    <div class="component-navigation-content-set">
        <div class="content-tag" v-text="title" v-if="!!title"></div>
        <drop class="content-img-list"
        @dragover="imgDragover"
        @dragleave="imgDragleave"
        @drop="imgDrop" :class="{'no-top-line':!title}">
            <drag class="content-drag"
            @dragstart="imgDragstart"
            :data-index="index"
            :transfer-data="{index:index,tag:'content-img' }"
            v-for="(item,index) in activeComponentData.lines"
            v-if="count==undefined||index<count"
            :key="'content-img-'+index">
                <div class="new" v-if="activeDragComponentIndex==index"></div>
                <div class="content-drag-content" @click="showImgMenu(item,index)" :data-index="index">
                    <div class="content-left" :data-index="index">
                        <i class="el-icon-caret" :class="{'el-icon-caret-bottom':activeComponentData.activeImg==item,'el-icon-caret-right':activeComponentData.activeImg!=item}"></i>
                        <div class="content-img" :data-index="index" :style="'background-image:url('+(item.icon?item.icon:defaultImgSmall)+');'+(item.icon?'':'background-size:26px 18px;')">
                        </div>
                        <p class="content-img-name" v-text="item.name"></p>
                    </div>
                    <i class="el-icon-delete" @click.stop="removeImg(index)" v-if="!!deleteBtnShow"></i>
                </div>
                <div class="content-upload-content" :data-index="index" v-if="activeComponentData.activeImg==item">
                    <p class="content-li" :data-index="index">
                        <span class="content-label">图标</span>
                        <el-button class="save-btn" @click.stop="showSelectIconDialog(item)" v-text="item.icon?'替换图标':'上传图标'"></el-button>
                    </p>
                    <!-- <p class="content-tips" :data-index="index" v-text="loadTipsText(index)">
                    </p> -->
                    <p class="content-li nav" :data-index="index">
                        <span class="content-label">名称</span>
                        <el-input v-model="item.name" placeholder="请输入名称" maxlength="4"></el-input>
                        <component-count :content="item.name" max-count="4"/>
                    </p>
                    <p class="content-li" :data-index="index">
                        <span class="content-label">链接</span>
                        <el-select :data-index="index" placeholder="选择跳转的页面" @change="showSelectPage(item.linkName)" class="content-select" v-model="item.linkName">
                            <el-option :data-index="index" label="系统页面" value="system"></el-option>
                            <el-option :data-index="index" label="微页面" value="micro"></el-option>
                            <el-option :data-index="index" label="商品详情" value="detail"></el-option>
                        </el-select>
                    </p>
                </div>
            </drag>
        </drop>
        <el-button class="add-img-btn" v-if="!!addBtnShow" :disabled="activeComponentData.lines.length>=maxCountValue" icon="el-icon-plus" type="primary" @click="addImg">增加</el-button>
        <!-- 上传组件 -->
        <!-- <component-upload v-if="!!showUploadDialogStatus" :accept="'image/gif, image/jpeg,image/png,image/bmp'" @confirmAction="confirmUploadDialog"  @closeAction="closeUploadDialog"/> -->

        <!-- 系统页面 -->
        <component-system-page :select-item="activeComponentData.activeImg.urlName" @confirmAction="confirmSystemPageDialog"  @closeAction="closeSystemPageDialog" :page-show="!!showSystemPageDialogStatus"/>
        <!-- 微页面 -->
        <component-micro-page :select-item="activeComponentData.activeImg.url" @confirmAction="confirmMicroPageDialog"  @closeAction="closeMicroPageDialog" :page-show="!!showMicroPageDialogStatus"/>
        <!-- 商品详情 -->
        <component-goods-detail :select-item="{code:activeComponentData.activeImg.code}" :goods-show="showGoodsPageDialogStatus" @confirmAction="confirmGoodsPageDialog"  @closeAction="closeGoodsPageDialog"/>
    </div>
</template>
<script>
// import ComponentUpload from './../component-upload.vue';
import ComponentSystemPage from './../component-system-page.vue'
import ComponentMicroPage from './../component-micro-page.vue'
import ComponentGoodsDetail from './../component-goods-detail.vue'
import tmCommon from '@/common/common'
import ComponentCount from './../component-count.vue'
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'
export default {
  name: 'component-navigation-content-set',
  components: {
    // ComponentUpload,
    ComponentSystemPage,
    ComponentMicroPage,
    ComponentGoodsDetail,
    ComponentCount
  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      activeDragComponentIndex: null,
      // activeImg:{},//选中的swiper图片
      // showUploadDialogStatus:false,//是否显示上传组件
      showGoodsPageDialogStatus: false, // 显示选择商品详情页面
      showSystemPageDialogStatus: false, // 显示选择系统页面
      showMicroPageDialogStatus: false, // 显示选择微页面
      maxCountValue: 9
    }
  },
  props: ['activeComponentData', 'type', 'imgUploadTips', 'imageName', 'title', 'addBtnShow', 'deleteBtnShow', 'count', 'maxCount', 'headerName'],
  computed: {

  },
  created () {
    // tmCommon.log(this.maxCount,this.count,this.activeComponentData);
    if (!this.maxCount) {
      this.maxCountValue = 9
    } else {
      this.maxCountValue = this.maxCount
    }
    tmCommon.warn(typeof (this.imgUploadTips))
  },
  mounted () {

  },
  methods: {
    loadTipsText (index) {
      const imgUploadTips = this.imgUploadTips
      // tmCommon.warn("loadTipsText----",imgUploadTips,index);
      if (typeof (imgUploadTips) === 'string') {
        return (imgUploadTips || '建议尺寸640*320，仅支持PNG、JPG、GIF、BMP格式')
      } else {
        return (imgUploadTips && imgUploadTips[index] ? imgUploadTips[index] : '建议尺寸640*320，仅支持PNG、JPG、GIF、BMP格式')
      }
    },
    // 添加轮播组件图片
    addImg () {
      const that = this
      const lines = this.activeComponentData.lines
      const len = lines ? lines.length : 0
      if (len >= that.maxCountValue) {
        that.$message({
          type: 'warn',
          message: '最多支持设置' + that.maxCountValue + '张!'
        })
        return
      }
      let item = null
      item = {
        goodsInfo: {},
        // tenantCode:88000035,
        tenantCode: localStorage.getItem('tenantCode')
      }
      this.activeComponentData.activeImg = item
      this.activeComponentData.lines.push(this.activeComponentData.activeImg)
      this.activeComponentData.activeImgIndex = this.activeComponentData.lines.length - 1
      // this.showImgMenu(this.activeComponentData.activeImg,this.activeComponentData.lines.length-1);
    },
    // 删除轮播组件图片
    removeImg (index) {
      this.activeComponentData.lines.splice(index, 1)
    },
    // 显示轮播组件图片上传详情
    showImgMenu (item, index) {
      let obj = item
      if (this.activeComponentData.activeImg == item) {
        obj = {
        }
      }
      obj.linkName = obj.urlName
      this.activeComponentData.activeImg = obj
      this.activeComponentData.activeImgIndex = index
      const url = this.activeComponentData.activeImg.url
      if (url) {
        this.activeComponentData.activeImg.code = url.substring(url.lastIndexOf('spuCode=') + 8, url.length)
        // tmCommon.error(this.activeComponentData.activeImg.code)
      }
    },
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
        if (data.index == dataset.index) { // 如果是自己则直接返回
          return
        }
      }
      if (!dataset.index && (dataset.index != 0 && dataset.index != 1)) {
        return
      }
      // tmCommon.log("imgDragover",data,dataset);
      if (dataset.index != null && dataset.index != undefined) { // 存在就设置
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
        if (data.index == dataset.index) { // 如果是自己则直接返回
          return
        }
        tmCommon.changeArrayElement(that, that.activeComponentData.lines, data.index, dataset.index)
      }
      this.activeDragComponentIndex = null
    },
    // 显示选择图标窗口
    showSelectIconDialog () {
      this.$emit('showSelectIconDialog')
    },
    // 关闭系统页选择窗口
    closeSystemPageDialog () {
      this.showSystemPageDialogStatus = false
    },
    // 确认系统页选择
    confirmSystemPageDialog (item) {
      // tmCommon.log("confirmSystemPageDialog",item);
      if (!this.isUrlOnly(item.url)) {
        this.closeSystemPageDialog()
        return
      }
      this.activeComponentData.activeImg.url = item.url
      this.activeComponentData.activeImg.urlName = item.name
      this.activeComponentData.activeImg.linkName = item.name
      this.closeSystemPageDialog()
    },
    isUrlOnly (url) {
      const lines = this.activeComponentData.lines
      for (const i in lines) {
        const line = lines[i]
        if (line.url == url) {
          this.$message.error('跳转页面不能重复,请重新填写~')
          return false
        }
      }
      return true
    },
    // 关闭微页面选择窗口
    closeMicroPageDialog () {
      // if(this.type=='navigation'){
      //     this.activeComponentData.activeImg.content.navigation2Name="";
      // }else{
      //     this.activeComponentData.activeImg.url="";
      // }
      this.showMicroPageDialogStatus = false
    },
    // 确认微页面选择
    confirmMicroPageDialog (item) {
      if (!this.isUrlOnly(item.url)) {
        this.closeMicroPageDialog()
        return
      }
      this.activeComponentData.activeImg.url = item.url
      this.activeComponentData.activeImg.urlName = item.name
      this.activeComponentData.activeImg.linkName = item.name
      this.closeMicroPageDialog()
    },
    // 关闭商品详情选择窗口
    closeGoodsPageDialog () {
      this.showGoodsPageDialogStatus = false
    },
    // 确认商品详情选择
    confirmGoodsPageDialog (item) {
      if (!item) {
        this.closeMicroPageDialog()
        return
      }
      const url = '/pages/pdp/pdp?spuCode=' + item.code
      if (!this.isUrlOnly(url)) {
        this.closeMicroPageDialog()
        return
      }
      // this.activeComponentData.activeImg.swiper2Name="";
      this.activeComponentData.activeImg.url = url
      this.activeComponentData.activeImg.urlName = '商品详情-' + item.title
      this.activeComponentData.activeImg.linkName = this.activeComponentData.activeImg.urlName
      this.activeComponentData.activeImg.code = item.code
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
      this.activeComponentData.activeImg.linkName = this.activeComponentData.activeImg.urlName
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
  updated () {

  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-navigation-content-set{
    border-top:2px solid #E8E8E8;
    .content-tag{
        padding: 0 24px;
        margin-top: 5px;
        line-height: 50px;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: rgba(51,51,51,0.90);
    }
    .content-img-list{
        border-top:1px solid #E8E8E8;
        border-bottom:1px solid #E8E8E8;
        &.no-top-line{
            border-top:none;
        }
        .content-drag{
            border-top:1px solid #E8E8E8;
            &:first-child{
                border-top:none;
            }
            .new{
                // height: 120px;
                height: 20px;
                overflow: hidden;
                background: rgba(51,102,255,0.40);
                border: 1px solid #3366FF;
                *{
                    opacity: 0;
                }
            }
        }
        .content-drag-content{
            cursor: move;
            display: flex;
            // height: 77px;
            align-content: space-between;
            .content-left{
                flex: 1;
                display: flex;
            }
            .el-icon-caret{
                margin:33px 21px;
                cursor: pointer;
                color: #999;
            }
            .content-img{
                margin-top: 14px;
                width: 50px;
                cursor: pointer;
                height: 50px;
                background-color: #F1F2F3;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 25px 25px;
            }
            .content-img-name{
                margin:28px 25px;
                font-size: 12px;
                color: #666666;
                cursor: pointer;
                font-family: PingFangSC-Regular;
            }
            .el-icon-delete{
                color: #999;
                padding-top: 32px;
                padding-right: 22px;
                cursor:pointer;
                font-size: 14px;
                font-weight: 900;
                &:hover{
                    color:#36F;
                }
            }
        }
        .content-upload-content{
            padding:24px;
            .content-li{
                height: 32px;
                position: relative;
                display: flex;
                .content-label{
                    margin-top: 8px;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #666666;
                    margin-right: 8px;
                }
                .save-btn{
                    height: 28px;
                    line-height: 28px;
                    font-family: PingFangSC-Semibold;
                    font-size: 12px;
                    color: #3366FF;
                    letter-spacing: 0;
                    text-align: center;
                    background: #fff;
                    border: 1px solid #3366FF;
                    padding: 0 16px;
                    &:hover{
                        color: #fff;
                    background: #3366FF;
                    }
                    // margin-left: 8px;
                }
                &.nav{
                    margin: 25px auto;
                }
                .el-input{
                    flex:1;
                }
                .content-select{
                    flex:1;
                    // margin-left: 8px;
                    // width: 230px;
                    // .el-input__suffix{
                    //     top:4px;
                    // }
                    .el-input__inner{
                        // height:32px;
                        // font-family: PingFangSC-Regular;
                        font-size: 12px;
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
    .add-img-btn{
        margin: 32px auto;
        // float: left;
        display: block;
        background: #3366FF;
        border-radius: 2px;
        height:32px;
        line-height: 32px;
        padding:0 17px;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        .el-icon-plus{
            font-weight: 900;
        }
        // &[disabled]{
        //     background: #999999;
        // }
    }
}
</style>
