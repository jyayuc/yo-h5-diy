<template>
    <!-- 轮播图组件 swiper-->
    <div class="component-unit component-page-swiper"
    :data-index="index" >
        <component-swiper1 :type="type" :ref="'swiper'+componentData.style+index" v-if="componentData.type=='SWIPER'&&componentData.style=='broadcast'" @selectComponent="selectCurrentComponent" :count="1" :index="index" :component-data="componentData"/>
        <component-swiper2 :type="type" :ref="'swiper'+componentData.style+index" v-if="componentData.type=='SWIPER'&&componentData.style=='broadcastTwoShow'" @selectComponent="selectCurrentComponent" :count="1" :index="index" :component-data="componentData"/>
        <component-swiper3 :type="type" :ref="'swiper'+componentData.style+index" v-if="componentData.type=='SWIPER'&&componentData.style=='broadcastThreeShow'" @selectComponent="selectCurrentComponent" :count="1" :index="index" :component-data="componentData"/>
    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"
import ComponentSwiper1 from './component-swiper-1.vue'
import ComponentSwiper2 from './component-swiper-2.vue'
import ComponentSwiper3 from './component-swiper-3.vue'
import tmCommon from '@/common/common'
export default {
  name: 'component-swiper',
  components: {
    ComponentSwiper1,
    ComponentSwiper2,
    ComponentSwiper3
  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,
    }
  },
  props: ['componentData', 'index', 'type'],
  computed: {

  },
  mounted () {

  },
  created () {
    // tmCommon.error("重新创建组件")
  },
  methods: {
    //   //选择组件
    selectCurrentComponent (item) {
      this.$emit('selectComponent', item)
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
.component-page-swiper{
    background-color: #fff;
    // .swiper-img-box{
    //     background-position: center;
    //     background-size: contain;
    //     background-repeat: no-repeat;
    //     background-color:  #F1F2F3;
    //     // border: 1px solid red;
    //     &.swiper-img-box1{
    //         width:375px;
    //         // transform:scale(1)!important;
    //     }
    //     &.swiper-img-box2{
    //         width: 365px;
    //         margin-left: -40px;
    //         // transform:scale(1)!important;
    //     }
    //     &.swiper-img-box3{
    //         width: 300px;
    //         height: 170px;
    //         margin-left: -55px;
    //         margin-top: 5px;
    //     }
    //     // &.first{
    //         // margin-left:0;
    //         // width: 315px;
    //     // }
    //     // &.is-active{
    //     //     transform: translateX(-345px) scale(1)!important;
    //     // }
    // }
    // .swiper-slide{
    //     background-position: center;
    //     background-size: 80px 60px;
    //     background-repeat: no-repeat;
    //     background-color:  #F1F2F3;
    // }
    // .swiper-container{
    //     height:225px ;
    //     .swiper-button-next,.swiper-button-prev{
    //         outline: none;
    //     }
    //     .swiper-slide1 {
    //         width: 100%;
    //     }
    //     .swiper-slide2 {
    //         width: 60%;
    //     }
    //     .swiper-slide3{
    //         width: 60%;
    //         height: 225px;
    //     }
    // }
    // .el-carousel__indicator{
    //     padding: 5px;
    //     .el-carousel__button{
    //         width: 6px;
    //         height: 6px;
    //         border-radius:50%;
    //         background: #B1B1B2;
    //     }
    //     &.is-active{
    //         .el-carousel__button{
    //             background:#393A3A;
    //         }
    //     }
    // }
}
</style>
