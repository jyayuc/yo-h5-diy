<template>
<div class="component-unit component-page-swiper-1" :class="{'padding':componentData.content.paddingType==2}"
    :data-index="index"
    @click="selectCurrentComponent(componentData,index)">
        <swiper ref="swiperRef1" :id="'shop_swiper'+index" v-if="type!='solt'&&reloadStatus" :options="swiperOption1" class="shop-swiper-container  shop-swiper-container1" :data-index="index" >
            <!-- :style="!img.content.swiperPicUrl?'background-image:url('+defaultImgBig+');background-size:80px 60px;height:250px;':''" -->
            <template
            v-for="(img,imgIndex) in componentData.lines">
            <swiper-slide
            :style="(!img.content.swiperPicUrl?'background-image:url('+defaultImgBig+');background-size:80px 60px;':'background-image:url('+img.content.swiperPicUrl+');')+'height:'+maxHeight+'px'"
            :data-index="index"
            class="swiper-slide1"
            :key="'slider-1-'+imgIndex" v-if="type=='solt'?imgIndex<1:true">
                <!-- <img :src="img.content.swiperPicUrl" :data-index="index" v-if="img.content.swiperPicUrl"> -->
            </swiper-slide>
            </template>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev" v-if="componentData.lines.length>1"></div>
            <div class="swiper-button-next" slot="button-next" v-if="componentData.lines.length>1"></div>
        </swiper>
        <div v-else class="shop-swiper-container  shop-swiper-container1 shop-swiper-container-thumb">
            <template
            v-for="(img,imgIndex) in componentData.lines">
            <swiper-slide
            :style="'background-image:url('+(img.content.swiperPicUrl?img.content.swiperPicUrl:defaultImgBig)+');'+(img.content.swiperPicUrl?'':'background-size:80px 60px;')"
            :data-index="index"
            class="swiper-slide1"
            :key="'slider-1-'+imgIndex" v-if="imgIndex==0">
            </swiper-slide>
            </template>
        </div>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
// import tmCommon from '@/common/common'
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'
export default {
  name: 'component-swiper-1',
  components: {
    Swiper,
    SwiperSlide
  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      maxHeight: 'auto',
      swiperOption1: {
        slidesPerView: 1,
        autoHeight: true, // enable auto height
        simulateTouch: false,
        observer: true,
        observeParents: true,
        loop: true,
        loopAdditionalSlides: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: this.componentData.lines.length > 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      reloadStatus: true
    }
  },
  props: ['componentData', 'index', 'type'],
  computed: {
    cData: function () {
      return this.componentData
    }
  },
  mounted () {

  },
  watch: {
    cData: {
      handler (curVal, oldVal) {
        this.reloadStatus = false
        this.swiperOption1.autoplay = this.componentData.lines.length > 1
        this.getMaxNumber()
        this.$nextTick(() => {
          this.reloadStatus = true
        })
      },
      deep: true
    }
  },
  methods: {
    // 选择组件
    selectCurrentComponent (item, index) {
      this.$emit('selectComponent', item, index)
    },
    getMaxNumber () {
      const heightArr = []
      const lines = this.componentData.lines
      for (const i in lines) {
        let height = lines[i].content.height
        let width = lines[i].content.width
        if (!width && width !== 0 && width !== 1) {
          width = 0
        }
        let totalWidth = 375
        if (this.componentData.content.paddingType === 2) {
          totalWidth = 335
        }
        const ratio = width / totalWidth
        if (height === 'auto') {
          height = 0
        } else if (!height) {
          height = 0
        }
        if (ratio === 0) {
          height = 0
        } else {
          height = height / ratio
        }
        heightArr.push(height)
      }
      // this.maxHeight=Math.max.apply(Math, heightArr);
      let h = Math.max.apply(Math, heightArr)
      if (h === 0) {
        h = 250
      }
      this.maxHeight = h
    }
  },
  created () {
    this.getMaxNumber()
  },
  updated () {
  }
}
</script>
<style lang="less">

.component-page-swiper-1{
    padding: 10px 0;
    background-color: #fff;
    .swiper-slide{
        background-position: center;
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-color:  #F1F2F3;

    }
    &.padding{
        padding: 10px 20px;
    }
    .swiper-container{
        .swiper-button-next,.swiper-button-prev{
            outline: none;
        }
    }
    .shop-swiper-container-thumb{
        height: 250px;
    }
    .shop-swiper-container1{
        // height: 250px;
        .swiper-slide1{
            text-align: center;
            img{
                // width: 100%;
                vertical-align: middle;
            }
        }
        .swiper-pagination{
            text-align: right;
            padding-right: 15px;
            // padding-bottom: 24px;
            // right: 20px;
            bottom: 20px;
            .swiper-pagination-bullet{
                width: 5px;
                height: 5px;
                opacity: 0.45;
                background: #D8D8D8;
                outline: none;
                &.swiper-pagination-bullet-active{
                    background: #fff;
                    opacity: 1;
                }
            }
        }
    }
}
</style>
