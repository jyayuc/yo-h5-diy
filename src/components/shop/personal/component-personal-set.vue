<template>
    <!-- 导航设置 -->
    <div class="component-operate-personal">
        <div class="nav-title">会员中心设置</div>
        <div class="component-operate-content">
            <div class="content-li">
                <div class="content-label">名称</div>
                <el-input class="content-txt" maxlength="10" placeholder="请输入页面名称" v-model="activeComponentData.name"></el-input>
                <component-count :content="activeComponentData.name" max-count="10"/>
            </div>
            <div class="content-li">
                <div class="content-label">背景</div>
                <div class="content-box">
                    <el-radio class="system-radio" label="SYSTEM" v-model="activeComponentData.imageType">系统图片</el-radio>
                    <ul class="img-list" v-if="activeComponentData.imageType=='SYSTEM'">
                        <li @click="selectSystemImg(item)" v-for="(item,index) in activeComponentData.systemImages"
                        :class="{'active':activeComponentData.imageSystemUrl&&activeComponentData.imageSystemUrl==item[activeComponentData.imageId]}"
                        :key="'img-index-'+index" :style="'background-image:url('+(getValue(item)?getValue(item):defaultImgSmall)+');'+(getValue(item)?'':'background-size:30px 20px;')">
                            <i class="el-icon-check" v-if="activeComponentData.imageSystemUrl==item[activeComponentData.imageId]"></i>
                            <!-- {{getValue(item)}} -->
                        </li>
                </ul>

                    <el-radio class="custom-radio" label="DIY" v-model="activeComponentData.imageType">自定义图片</el-radio>
                    <div class="custom-box" v-if="activeComponentData.imageType=='DIY'">
                        <p class="tips">建议尺寸750*390，仅支持PNG.JPG.GIF.BMP格式</p>
                        <i class="el-icon-plus" :class="{'no-plus':activeComponentData.imageDiyUrl}" @click.stop="showUploadDialog()" :style="activeComponentData.imageDiyUrl?'background-image:url('+activeComponentData.imageDiyUrl+');height:55px;width:106px;background-size:cover;background-repeat:no-repeat;background-position:center;':''">

                        </i>
                    </div>
                </div>
                <!-- <component-count :content="activeComponentData.desc" max-count="50"/> -->
            </div>
        </div>
        <!-- 上传组件 -->
        <component-upload v-if="!!showUploadDialogStatus" :accept="'image/gif, image/jpeg,image/png,image/bmp'" @confirmAction="confirmUploadDialog"  @closeAction="closeUploadDialog"/>

    </div>
</template>
<script>
import ComponentCount from './../component-count.vue'
import ComponentUpload from './../component-upload.vue'

const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'
export default {
  name: 'component-personal-set',
  components: {
    ComponentCount,
    ComponentUpload
  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      showUploadDialogStatus: false,
      systemImgList: [
        defaultImgBig,
        defaultImgSmall
      ]
      // activeComponentData:{
      //     imgType:'system'
      // }
    }
  },
  props: ['activeComponentData'],
  computed: {

  },
  mounted () {

  },
  methods: {
    getKey (item) {
      if (item) {
        for (const i in item) {
          return i
        }
      } else {
        return null
      }
    },
    getValue (item) {
      if (item) {
        for (const i in item) {
          return item[i]
        }
      } else {
        return null
      }
    },
    // 打开上传组件
    showUploadDialog (item) {
      const that = this
      // that.activeImg=item;
      that.showUploadDialogStatus = true
    },
    // 关闭上传窗口
    closeUploadDialog () {
      this.showUploadDialogStatus = false
    },
    selectSystemImg (item) {
      this.$set(this.activeComponentData, 'imageUrl', this.getValue(item))
      this.$set(this.activeComponentData, 'imageSystemUrl', this.getValue(item))
      this.$set(this.activeComponentData, 'imageDiyUrl', '')
      this.$set(this.activeComponentData, 'imageId', this.getKey(item))
      // this.activeComponentData.imageUrl=;
      // this.activeComponentData.imageId=this.getKey(item);
    },
    // 确认上传
    confirmUploadDialog (item) {
      if (item) {
        // this.activeComponentData.imageUrl=item.picUrl
        this.$set(this.activeComponentData, 'imageUrl', item.picUrl)
        this.$set(this.activeComponentData, 'imageSystemUrl', '')
        this.$set(this.activeComponentData, 'imageId', '')
        this.$set(this.activeComponentData, 'imageDiyUrl', item.picUrl)
      }
      this.closeUploadDialog()
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
.component-operate-personal{
    .component-operate-content{
        padding: 24px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
    }
    .content-li{
        position: relative;
    }
    .edit-page-name{
        // margin-top: 24px;
        color: rgba(102,102,102,0.90);
    }
    .edit-page-name-txt{
        margin-top: 8px;
        height:32px;
        // margin:8px auto;
        // width: 192px;
            font-size: 12px;
        display: block;
        color: rgba(51,51,51,0.90);
        .el-input__inner{
            // border: 1px solid #D9D9D9;
            border-radius: 2px;
            font-size: 12px;
            height:32px;
            line-height: 32px;
        }
    }
    .edit-page-desc{
        margin-top: 32px;
        color: rgba(102,102,102,0.90);
    }
    .edit-page-desc-txt{
        margin-top: 8px;
        font-size: 12px;
        resize: none;
        color: rgba(51,51,51,0.90);
        // height: 62px;
        .el-textarea{
            height: 62px;
            // margin-left: 8px;
            // flex: 1;
        }
        .el-textarea__inner{
        padding-bottom:10px;
        // height: 62px;
        }
    }
}
</style>
