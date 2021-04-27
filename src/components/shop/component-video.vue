<template>
   <!-- 视频组件 -->
    <div class="component-unit component-page-video" :class="{'padding':componentData.content.paddingType==2}" :data-index="index"
    @click="selectCurrentComponent(componentData)" >
            <!-- poster="http://static.fdc.com.cn/avatar/usercenter/5996999fa093c04d4b4dbaf1_162.jpg"  -->
        <div class="video-box"
            :data-index="index">
            <div class="video-poster"  v-if="!!showPlayStatus" :data-index="index" :style="'background-image:url('+componentData.content.videoUrl+'?x-oss-process=video/snapshot,t_7000,f_jpg,w_800,h_600,m_fast)'">
                <i class="el-icon-play" :data-index="index" @click="videoPlay"></i>
            </div>
                <!-- :poster="componentData.content.videoUrl+'?x-oss-process=video/snapshot,t_7000,f_jpg,w_800,h_600,m_fast'" -->
            <div class="video-v-box" :data-index="index">
                <video ref="videoDom" class="video"
                width="100%"
                @click="videoPlay('video')"
                height="182"
                :preload="true"
                :data-index="index"
                controls
                :src="componentData.content.videoUrl">
                    your browser does not support the video tag
                </video>
            </div>
        </div>
        <p class="video-title" :data-index="index" v-text="componentData.content.videoTitle" v-if="!!componentData.content.videoTitle"></p>
        <p class="video-desc" :data-index="index" v-if="!!componentData.content.videoDesc" :class="showMoreStatus?'more':''">
            {{componentData.content.videoDesc}}
            <i :data-index="index" @click="showMore" :class="showMoreStatus?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </p>
    </div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'component-video',
  components: {

  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      showMoreStatus: false,
      showPlayStatus: true
    }
  },
  props: ['componentData', 'index'],
  computed: {

  },
  mounted () {
    const that = this
    const videoDom = this.$refs.videoDom
    if (videoDom) {
      videoDom.addEventListener('pause', function () {
        that.showPlayStatus = true
        // console.log("当前状态pause")
      }, false)
      videoDom.addEventListener('play', function () {
        that.showPlayStatus = false
        // console.log("当前状态play")
      }, false)
    }
  },
  methods: {
    // 显示更多
    showMore () {
      this.showMoreStatus = !this.showMoreStatus
    },
    // 视频播放
    videoPlay (type) {
      if (type == 'video') {
        if (this.showPlayStatus) {
          return
        }
      }
      const videoDom = this.$refs.videoDom
      if (videoDom) {
        if (videoDom.paused) { // 已经暂停则播放否则就暂停
          this.showPlayStatus = false
          videoDom.play()
        } else {
          this.showPlayStatus = true
          videoDom.pause()
        }
      }
    },
    // 选择组件
    selectCurrentComponent (item) {
      this.$emit('selectComponent', item)
    },
    getCapture () {
      var video, output
      var scale = 0.3
      var initialize = function () {
        output = document.getElementById('output')
        video = document.getElementById('video')
        video.addEventListener('click', captureImage)
      }
      var captureImage = function () {
        var canvas = document.createElement('canvas')
        canvas.width = video.videoWidth * scale
        canvas.height = video.videoHeight * scale
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
        var img = document.createElement('img')
        img.src = canvas.toDataURL('image/png')
        output.appendChild(img)
      }
      initialize()
    }

  },
  async created () {

  },
  updated () {

  }
}
</script>
<style lang="less" scoped>
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-page-video{
    background-color: #fff;
    padding:10px 0;
    &.padding{
        padding: 10px 20px;
        .video-title{
            margin: 24px 0 0;
        }
        .video-desc{
            margin: 10px 0 0;
        }
    }
    .video-poster{
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #F1F2F3;
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        top:0;
        z-index: 1;
    }
    .el-icon-play{
        background-size: 40px 40px;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url(/static/img/edit/video/video-play.svg);
        // padding: 20px;
        width: 100%;
        height: 100%;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
        z-index: 1;
    }
    .video-box{
        // width:40px;
        // height: 40px;
        // height: 182px;
        position: relative;
        background-color:#F1F2F3;
        .video{
            height: 182px;
            // object-fit:fill;
        }
    }
    .video-v-box{
        height: 182px;
    }
    .video-title{
        margin: 24px 20px 0;
        // margin: 0 20px;
    }
    .video-desc{
        // margin-top: 10px;
        margin: 10px 20px 0;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #3B3939;
        letter-spacing: 0;
        line-height: 18px;
        height:20px;
        position: relative;
        overflow: hidden;
        padding-right: 20px;
        word-wrap: break-word;
        word-break: break-all;
        &.more{
            height: auto;
            overflow: auto;
        }
        i{
            position: absolute;
            right: 2px;
            top:2px;
            opacity: 0.63;
            color:rgb(182, 181, 181);
            font-size: 13px;
        }
    }
}
</style>
