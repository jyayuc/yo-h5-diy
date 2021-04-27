<template>
    <!-- 轮播图设置 -->
    <div class="component-operate-swiper">
        <div class="swiper-step-first" v-if="!showChangeStyleStatus">
            <div class="nav-title">轮播图设置</div>
            <div class="component-operate-content">
                <component-style-set :style-tag="'样式'" :active-component-data="activeComponentData" :style-map="swiperStyleMap" @showChangeStyle="showChangeStyle"/>

                <component-padding :component-data="activeComponentData"/>

                <component-content-set title="内容设置" @destroyCom="destroyCom"
                :img-upload-tips="swiperTipsMap[activeComponentData.style]"
                max-count="9" :add-btn-show="(activeComponentData.lines.length<9)"
                 :active-component-data="activeComponentData"
                :delete-btn-show="true"/>
            </div>
        </div>

        <component-style-list v-if="!!showChangeStyleStatus"
        @closeAction="closeSelectStyle"
        :style-map="swiperStyleMap"
        :active-component-data="activeComponentData"
        :show-change-style-status="showChangeStyleStatus"/>

    </div>
</template>
<script>
import tmCommon from '@/common/common'

import ComponentStyleSet from './component-style-set.vue'
import ComponentContentSet from './component-content-set.vue'
import ComponentStyleList from './component-style-list.vue'
import ComponentPadding from './component-padding.vue'

const swiperStyle1 = '/static/img/edit/swiper/swiper-style-1.svg'
const swiperStyle2 = '/static/img/edit/swiper/swiper-style-2.svg'
const swiperStyle3 = '/static/img/edit/swiper/swiper-style-3.svg'

const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

// let swiperStyleList=[//轮播图样式列表
//         {icon:swiperStyle1,type:'broadcast'},
//         {icon:swiperStyle2,type:'verticalSliding'},
//         {icon:swiperStyle3,type:'lateralSliding'},
//     ];
const swiperStyleMap = {
  broadcast: swiperStyle1, // 普通轮播
  // 'verticalSliding':swiperStyle2,
  broadcastTwoShow: swiperStyle2, // 两张图片显示轮播
  broadcastThreeShow: swiperStyle3 // 三张图片显示轮播
  // 'lateralSliding':swiperStyle3,
}

const swiperTipsMap = {
  broadcast: '建议尺寸750*500，仅支持PNG.JPG.GIF.BMP格式', // 普通轮播
  // 'verticalSliding':swiperStyle2,
  broadcastTwoShow: '建议尺寸610*500，仅支持PNG.JPG.GIF.BMP格式', // 两张图片显示轮播
  broadcastThreeShow: '建议尺寸460*320，仅支持PNG.JPG.GIF.BMP格式' // 三张图片显示轮播
}

export default {
  name: 'component-swiper-set',
  components: {
    ComponentStyleSet, // 设置样式
    ComponentStyleList, // 样式列表
    ComponentContentSet, // 内容设置
    ComponentPadding
  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      showChangeStyleStatus: false, // 选择样式窗口状态
      activeSwiperStyle: {},
      swiperStyleMap: swiperStyleMap,
      swiperTipsMap: swiperTipsMap
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
      // this.destroyCom();
    },
    destroyCom () {
      // let key='shop_swiper'+this.activeComponentData.orderIndex;
      // // let ref=this.$refs[key];
      // let ref=document.getElementById(key);
      // this.$nextTick(()=>{
      //     if(ref&&ref.swiper){
      //         // ref.swiper.destroy();
      //         // ref.swiper.init();
      //         ref.swiper.updateSlides();//更新数量
      //         ref.swiper.updateSlidesClasses();//更新类名
      //     }
      // })
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
        .component-content-set{
            height: 490px;
            overflow-y: auto;
            overflow-x: hidden;
        }
    }
}
</style>
