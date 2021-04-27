<template>
    <div class="component-operate-style-set">
        <div class="swiper-tag" v-text="title?title:'样式设置'">样式设置</div>
        <div class="swiper-style-box">
            <span class="swiper-style-title" v-text="styleTag?styleTag:''"></span>
            <div class="swiper-img">
                <img :src="styleMap[activeComponentData.style]">
            </div>
            <el-button type="text" class="change-style-btn" @click="showChangeStyle">更换样式<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>
    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"

export default {
  name: 'component-style-set',
  components: {

  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,
    }
  },
  props: ['activeComponentData', 'title', 'styleMap', 'styleTag'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 显示选择样式组件
    showChangeStyle () {
      this.$emit('showChangeStyle')
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
.component-operate-style-set{
    .swiper-style-title{
        line-height: 50px;
        padding-right: 12px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(102,102,102,0.90);
    }
    .swiper-tag{
        padding: 0 24px;
        margin-top: 5px;
        line-height: 50px;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: rgba(51,51,51,0.90);
    }
    .swiper-style-box{
        display: flex;
        padding: 0 24px 24px;
        align-content: space-between;
        // border-bottom:2px solid #E8E8E8;
        .swiper-img{
            width: 88px;
            height: 54px;
            background: #FFFFFF;
            border: 1px solid #E8E8E8;
            img{
                width: 88px;
                height: 54px;
            }
        }
        .change-style-btn{
            flex: 1;
            text-align: right;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #3366FF;
            .el-icon-arrow-right{
                color:#999999;
            }
        }
    }
}
</style>
