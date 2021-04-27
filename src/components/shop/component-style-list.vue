<template>
    <div class="swiper-step-second">
        <div class="nav-title">{{title?title:'选择轮播样式'}}
            <i class="el-icon-close" @click="closeSelectStyle"></i>
        </div>
        <ul class="style-list-box">
            <li :class="{'active':activeSelectStyle==key}"
            v-for="(style,key,index) in styleMap"
            @click="selectStyle(key)"
            :key="'style-list-'+index"
            :style="'background-image:url('+style+')'">
            </li>
        </ul>
        <el-button type="primary" class="publish-btn" @click="confirmSelectStyle" v-text="btnName?btnName:'确定'"></el-button>
    </div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'component-style-list',
  components: {

  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      activeSelectStyle: ''
    }
  },
  props: ['activeComponentData', 'title', 'btnName', 'styleMap'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 选择轮播样式
    selectStyle (item) {
      this.activeSelectStyle = item
    },
    closeSelectStyle () {
      this.$emit('closeAction')
    },
    // 确认选择轮播样式
    confirmSelectStyle () {
      const that = this
      that.activeComponentData.style = that.activeSelectStyle
      that.$emit('closeAction')
    }
  },
  created () {
    this.activeSelectStyle = this.activeComponentData.style
  },
  updated () {

  }
}
</script>
<style lang="less" scoped>
// @import "../../../sheet/sass/shop/components/component-lib.less";
.swiper-step-second{
    .nav-title{
        .el-icon-close{
            float: right;
            margin-right: 20px;
            margin-top: 18px;
            font-size: 20px;
            cursor: pointer;
        }
    }
    .style-list-box{
        padding: 32px 24px 16px;
        overflow: hidden;
        li{
            float: left;
            width: 128px;
            height: 82px;
            background-position: center;
            background-size: 122px 76px;
            background-repeat: no-repeat;
            margin-left: 14px;
            margin-bottom:16px;
            cursor: pointer;
            border: 1px solid #E8E8E8;
            padding: 3px;
            &:nth-child(2n+1){
                margin-left: 0;
            }
            &.active{
                border: 1px solid #3366FF;
            }
        }
    }
    .publish-btn{
        padding: 0 18px;
        margin-left: 25px;
    }
}
</style>
