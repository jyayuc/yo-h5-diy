<template>
    <div class="left-box">
        <div class="nav-title">组件库</div>
        <div class="tab-pane-component">
            <drag v-for="(item,index) in componentLibs" :key="'component-'+index"
            class="component-box"
            effect-allowed="move"
            drop-effect="move"
            @dragend="dragEnd"
            @dragstart="dragStart"
            :image-x-offset="60"
            :image-y-offset="60"
            :data-index="index"
            :transfer-data="{ item: item,index:index,tag:'component-lib' }">
                <div  class="component" :style="'background-image:url('+item.icon+')'">
                </div>
                <div  class="component scale" slot="image"  :style="'background-image:url('+item.iconOn+')'" v-if="!isSafari">

                </div>
            </drag>
        </div>
    </div>
</template>
<script>
const swiperIcon = '/static/img/edit/swiper.png'
const swiperIconOn = '/static/img/edit/swiper-on.png'
const titleIcon = '/static/img/edit/title.png'
const titleIconOn = '/static/img/edit/title-on.png'
const textIcon = '/static/img/edit/text.png'
const textIconOn = '/static/img/edit/text-on.png'
const picIcon = '/static/img/edit/pic.png'
const picIconOn = '/static/img/edit/pic-on.png'
const picNavIcon = '/static/img/edit/pic-nav.png'
const picNavIconOn = '/static/img/edit/pic-nav-on.png'
const videoIcon = '/static/img/edit/video.png'
const videoIconOn = '/static/img/edit/video-on.png'
const goodsIcon = '/static/img/edit/goods.png'
const goodsIconOn = '/static/img/edit/goods-on.png'
const searchIcon = '/static/img/edit/search.png'
const searchIconOn = '/static/img/edit/search-on.png'

const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'components-lib',
  components: {

  },

  data () {
    return {
      isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      // 组件类型---SECEACH_BOX搜索框;SWIPER,轮播图;COMMEND_PRODUCT,
      // 推荐商品;VIDEO,视频;TEXT,文本;TITLE,标题;NAVIGATION,图片导航;
      componentLibs: [
        { type: 'SWIPER', name: '轮播', icon: swiperIcon, iconOn: swiperIconOn },
        { type: 'COMMEND_PRODUCT', name: '商品', icon: goodsIcon, iconOn: goodsIconOn },
        { type: 'PIC', name: '图片', icon: picIcon, iconOn: picIconOn },
        { type: 'NAVIGATION', name: '图片导航', icon: picNavIcon, iconOn: picNavIconOn },
        { type: 'TITLE', name: '标题', icon: titleIcon, iconOn: titleIconOn },
        { type: 'TEXT', name: '文本', icon: textIcon, iconOn: textIconOn },
        { type: 'VIDEO', name: '视频', icon: videoIcon, iconOn: videoIconOn },
        { type: 'SECEACH_BOX', name: '搜索', icon: searchIcon, iconOn: searchIconOn }
      ] // 组件库
    }
  },
  // props: ['dragEnd'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 保存动作
    dragEnd () {
      this.$emit('dragEnd')
    },
    dragStart () {
      this.$emit('dragStart')
    }
  },
  async created () {

  },
  updated () {

  }
}
</script>
<style lang="less" scoped>
@import "../../assets/less/components/shop/component-lib.less";

</style>
