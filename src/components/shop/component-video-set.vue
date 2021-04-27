<template>
    <!-- 视频设置组件 -->
    <div class="component-operate-video">
        <div class="nav-title">视频设置</div>
        <div class="component-operate-content">
            <div class="content-upload-content">
                <component-padding class="video-padding" :component-data="activeComponentData"/>

                <p class="content-li">
                    <span class="content-label">视频</span>
                    <el-button @click="showUploadDialog(activeComponentData)" v-text="activeComponentData.content.videoUrl?'替换视频':'选择视频'"></el-button>
                </p>
                <p class="content-tips" v-text="imgUploadTips?imgUploadTips:'视频大小不超过50MB，建议宽高比16:9，仅支持MP4视频格式'">

                </p>
                <p class="content-li">
                    <span class="content-label">标题</span>
                    <el-input placeholder="请输入标题" v-model="activeComponentData.content.videoTitle" maxlength="30" clearable></el-input>
                    <component-count :content="activeComponentData.content.videoTitle" max-count="30"/>
                </p>
                <div class="content-li">
                    <span class="content-label">简介</span>
                    <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入简介"
                        resize="none"
                        v-model="activeComponentData.content.videoDesc" clearable maxlength="50">
                        </el-input>
                    <component-count :content="activeComponentData.content.videoDesc" max-count="50"/>
                </div>
            </div>
        </div>
        <!-- 上传组件 -->
        <component-upload-video :accept="'video/mp4'" v-if="!!showUploadDialogStatus" @confirmAction="confirmUploadDialog"  @closeAction="closeUploadDialog"/>

    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"

import ComponentUploadVideo from './component-upload-video.vue'
import ComponentCount from './component-count.vue'
import ComponentPadding from './component-padding.vue'

export default {
  name: 'component-video-set',
  components: {
    ComponentUploadVideo,
    ComponentCount,
    ComponentPadding
  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,
      showUploadDialogStatus: false // 是否显示上传组件
    }
  },
  props: ['activeComponentData', 'imgUploadTips'],
  computed: {

  },
  mounted () {

  },
  methods: {
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
    // 确认上传
    confirmUploadDialog (item) {
      if (item) {
        this.activeComponentData.content.videoUrl = item.picUrl
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
.component-operate-video{
    .component-operate-content{
        .content-upload-content{
            padding:0 24px;
            .video-padding{
                margin-top: 24px;
                padding: 0;
            }
            .content-li{
                // height: 32px;
                position: relative;
                display: flex;
                margin-top: 24px;
                .content-label{
                    margin-top: 8px;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #666666;
                }
                .el-button{
                    padding: 0 16px;
                    margin-left: 8px;
                    height:28px;
                    font-size: 12px;
                    line-height: 28px;
                }
                .el-input{
                    flex: 1;
                    margin-left: 8px;
                    .el-input__inner{
                        padding-right: 55px;
                    }
                }
                .el-textarea{
                    height: 110px;
                    margin-left: 8px;
                    flex: 1;
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
}
</style>
