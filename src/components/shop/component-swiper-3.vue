<template>
<div class="component-unit component-page-swiper-3" :class="{'padding':componentData.content.paddingType==2}"
    :data-index="index"
    @click="selectCurrentComponent(componentData,index)" >
        <swiper :id="'shop_swiper'+index" v-if="type!='solt'&&reloadStatus" :options="swiperOption3" class="shop-swiper-container  shop-swiper-container3" :data-index="index" >
            <!-- :style="'background-image:url('+(img.content.swiperPicUrl?img.content.swiperPicUrl:defaultImgBig)+');'+(img.content.swiperPicUrl?'':'background-size:80px 60px;height:160px;')" -->
            <!-- :style="!img.content.swiperPicUrl?'background-image:url('+defaultImgBig+');background-size:80px 60px;height:160px;':''" -->
            <swiper-slide
            :data-index="index"
            :style="(!img.content.swiperPicUrl?'background-image:url('+defaultImgBig+');background-size:80px 60px;':'background-image:url('+img.content.swiperPicUrl+');')+'height:'+maxHeight+'px'"
            class="swiper-slide3"
            v-for="(img,imgIndex) in componentData.lines"
            :key="'slider-1-'+imgIndex">
            <!-- <img :src="img.content.swiperPicUrl" :data-index="index" v-if="img.content.swiperPicUrl"> -->
            </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            <div class="swiper-button-prev" slot="button-prev" v-if="componentData.lines.length>1"></div>
            <div class="swiper-button-next" slot="button-next" v-if="componentData.lines.length>1"></div>
        </swiper>
        <div v-else class="shop-swiper-container  shop-swiper-container3 shop-swiper-container-thumb">
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
  name: 'component-swiper-3',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      maxHeight: 'auto',
      swiperOption3: {
        // effect: 'coverflow',
        simulateTouch: false,
        // grabCursor: true,
        autoHeight: true, // enable auto height
        loop: true,
        loopAdditionalSlides: 1,
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
        autoplay: this.componentData.lines.length > 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      reloadStatus: true // 重新加载
    }
  },
  props: ['componentData', 'index', 'type'],
  computed: {
    cData: function () {
      return this.componentData
    }
  },
  watch: {
    cData: {
      handler (curVal, oldVal) {
        this.reloadStatus = false
        // this.getMaxNumber();
        // this.swiperOption3.spaceBetween=this.componentData.content.paddingType==1?0:10
        this.swiperOption3.autoplay = this.componentData.lines.length > 1
        this.$nextTick(() => {
          this.reloadStatus = true
        })
      },
      deep: true
    }
  },
  mounted () {

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
        // let ratio=width/223;
        let totalWidth = 223
        if (this.componentData.content.paddingType === 2) {
          totalWidth = 223
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
      let h = Math.max.apply(Math, heightArr)
      if (h === 0) {
        h = 160
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

.component-page-swiper-3{
    &.padding{
        padding: 10px 0;
    }
    .swiper-slide{
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        background-color:  #F1F2F3;

    }
    .swiper-container{
        .swiper-button-next,.swiper-button-prev{
            outline: none;
        }
    }
    .shop-swiper-container-thumb{
        height: 160px;
    }
    .shop-swiper-container3{
        // height: 160px;
        .swiper-slide3{
            text-align: center;
            width: 223px;
            img{
                // width: 100%;
                vertical-align: middle;
            }
        }
    }
}
</style>
