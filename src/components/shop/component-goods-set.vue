<template>
    <!-- 商品列表设置 -->
    <div class="component-operate-swiper">
        <div class="swiper-step-first" v-if="!showChangeStyleStatus">
            <div class="nav-title">商品设置</div>
            <div class="component-operate-content">
                <component-style-set title="排列样式" :style-map="goodsStyleMap" :active-component-data="activeComponentData" @showChangeStyle="showChangeStyle"/>

                <component-goods-content-set  title="内容设置" :active-component-data="activeComponentData" :add-btn-show="true" :delete-btn-show="true"/>
            </div>
        </div>

        <component-style-list :style-map="goodsStyleMap" v-if="!!showChangeStyleStatus" btn-name="提交" title="选择商品列表样式" @closeAction="closeSelectStyle" :active-component-data="activeComponentData" :show-change-style-status="showChangeStyleStatus"/>

    </div>
</template>
<script>
import ComponentStyleSet from './component-style-set.vue'
import ComponentStyleList from './component-style-list.vue'
import ComponentGoodsContentSet from './component-goods-content-set.vue'

const goodsStyle1 = '/static/img/edit/goods/goods-style-1.svg'
const goodsStyle2 = '/static/img/edit/goods/goods-style-2.svg'
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

const goodsStyleMap = {
  1: goodsStyle1,
  2: goodsStyle2
}
export default {
  name: 'component-goods-set',
  components: {
    ComponentStyleSet, // 设置样式
    ComponentStyleList, // 样式列表
    ComponentGoodsContentSet // 内容设置
  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      showChangeStyleStatus: false, // 选择样式窗口状态
      goodsStyleMap: goodsStyleMap
    }
  },
  props: ['activeComponentData'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 打开选择样式
    showChangeStyle () {
      this.showChangeStyleStatus = true
    },
    // 确认选择样式
    closeSelectStyle () {
      this.showChangeStyleStatus = false
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
.component-operate-swiper{
    .component-operate-content{
        padding: 0;
    }
}
</style>
