<template>
    <!-- 图片导航设置 -->
    <div class="component-operate-pic-nav">
        <div class="nav-title">图片导航设置</div>
        <div class="component-operate-content">
            <component-content-set img-upload-tips="建议尺寸112*112，仅支持PNG、JPG、GIF、BMP格式" :count="4" type="navigation" :active-component-data="activeComponentData"/>
        </div>
    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"

import ComponentContentSet from './component-content-set.vue'
export default {
  name: 'component-pic-nav-set',
  components: {
    ComponentContentSet // 内容设置
  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,

    }
  },
  props: ['activeComponentData'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 保存动作
  },
  async created () {

  },
  updated () {

  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-operate-pic-nav{
    .nav-title{
        border-bottom: none;
    }
}
</style>
