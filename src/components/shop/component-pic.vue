<template>
    <!-- 图片组件 -->
    <div class="component-unit component-page-pic" :data-index="index"
    @click="selectCurrentComponent(componentData)" :class="{'padding':componentData.content.paddingType==2}">
        <ul :data-index="index"
        :class="{'pic-img-box1':componentData.style=='rowTwo','pic-img-box2':componentData.style=='rowOne','pic-img-box3':componentData.style=='bigSmall','pic-img-box4':componentData.style=='smallBig','pic-img-box5':componentData.style=='big2Small','pic-img-box6':componentData.style=='2smallBig'}"
        class="pic-img-box">
            <li :data-index="index"
            :style="(componentData.style=='rowOne'?'height:'+getHeight(img)+'px;':'')+'background-image:url('+(img.content.swiperPicUrl?img.content.swiperPicUrl:defaultImgBig)+');'+(img.content.swiperPicUrl?'':'background-size:80px 60px;')"
                v-for="(img,imgIndex) in componentData.lines"
                v-if="(componentData.style=='rowTwo'||componentData.style=='rowOne'||componentData.style=='bigSmall'||componentData.style=='smallBig')&&imgIndex<2||(componentData.style=='big2Small'||componentData.style=='2smallBig')&&imgIndex<3"
                :key="'pic-img-'+imgIndex">
                </li>
        </ul>
    </div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'component-pic',
  components: {

  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall

    }
  },
  props: ['activeComponentData', 'componentData', 'index'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 选择组件
    selectCurrentComponent (item) {
      this.$emit('selectComponent', item)
    },
    getHeight (item) {
      // let heightArr=[];
      // let lines=this.componentData.lines;
      // for(let i in lines){
      let height = item.content.height
      let width = item.content.width
      if (!width && width != 0 && width != 1) {
        width = 0
      }
      let totalWidth = 375
      if (this.componentData.content.paddingType == 2) {
        totalWidth = 335
      }
      const ratio = width / totalWidth
      if (height == 'auto') {
        height = 0
      } else if (!height) {
        height = 0
      }
      if (ratio == 0) {
        height = 0
      } else {
        height = height / ratio
      }
      // heightArr.push(height);
      // }
      // this.maxHeight=Math.max.apply(Math, heightArr);
      return height == 0 ? 168 : height
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
.component-page-pic{
    padding: 10px 0;
    &.padding{
        padding: 10px 20px;
        .pic-img-box{
            &.pic-img-box1{
                li{
                    height: 75px;
                    &:first-child{
                        margin-right: 5px;
                    }
                    &:last-child{
                        margin-left:5px;
                    }
                }
            }
            &.pic-img-box2{
                li{
                    // margin-top: 10px;
                    // margin-bottom: 10px;
                    &:nth-child(2){
                        margin-top:10px;
                    }
                }
            }
            &.pic-img-box3{
                li{
                    // height: 148px;
                    &:nth-child(2){
                        width: 110px;
                    }
                    &:nth-child(1){
                        margin-right: 10px;
                        // flex:1;
                    }
                }
            }
            &.pic-img-box4{
                li{
                    // height: 210px;
                    &:nth-child(1){
                        width: 143px;
                    }
                    &:nth-child(2){
                        margin-left: 10px;
                        // flex:1;
                    }
                }
            }
            &.pic-img-box5{
                // padding: 10px 20px;
                // height: 250px;
                li{
                    float: left;
                    margin-bottom: 10px;
                    &:first-child{
                        width: 215px;
                        height: 230px;
                        margin-right: 10px;
                        margin-bottom: 0;
                    }
                    &:nth-child(2),&:nth-child(3){
                        width: 110px;
                        height: 110px;
                    }
                    &:nth-child(3){
                        margin-bottom: 0;
                    }
                }
            }
            &.pic-img-box6{
                height: 230px;
                li{
                    &:nth-child(1),&:nth-child(2){
                        width: 110px;
                        height: 110px;
                        // left:20px;
                    }
                    // &:nth-child(1){
                    //     margin-top: 10px;
                    // }
                    &:nth-child(2){
                        margin-top: 120px;
                    }
                    &:nth-child(3){
                        width: 215px;
                        height: 230px;
                        // right: 0;
                        // top:0;
                    }
                }
            }
        }
    }
    .pic-img-box{
        width:100%;
        overflow: hidden;
        background-color: #fff;
        li{
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            background-color: #F1F2F3;
        }
        &.pic-img-box1{
            display: flex;
            li{
                flex: 1;
                height: 124px;
            }
        }
        &.pic-img-box2{
            li{
                height: 168px;
                // margin-top: 10px;
                // margin-bottom: 10px;
                // &:nth-child(2){
                //     // margin-bottom:10px;
                // }
            }
        }
        &.pic-img-box3{
            // padding: 10px 20px;
            display: flex;
            li{
                height: 160px;
                &:nth-child(2){
                    width: 127px;
                }
                &:nth-child(1){
                    // margin-right: 10px;
                    flex:1;
                }
            }
        }
        &.pic-img-box4{
            // padding: 10px 20px;
            display: flex;
            li{
                height: 210px;
                &:nth-child(1){
                    width: 165px;
                }
                &:nth-child(2){
                    // margin-left: 10px;
                    flex:1;
                }
            }
        }
        &.pic-img-box5{
            // padding: 10px 20px;
            li{
                float: left;
                // margin-bottom: 10px;
                &:first-child{
                    width: 245px;
                    height: 260px;
                    // margin-right: 10px;
                    margin-bottom: 0;
                }
                &:nth-child(2),&:nth-child(3){
                    width: 130px;
                    height: 130px;
                }
                &:nth-child(3){
                    margin-bottom: 0;
                }
            }
        }
        &.pic-img-box6{
            position: relative;
            height: 260px;
            li{
                // float: left;
                // margin-bottom: 12px;
                &:nth-child(1),&:nth-child(2){
                    width: 130px;
                    height: 130px;
                    position: absolute;
                    left:0;
                }
                // &:nth-child(1){
                //     // margin-top: 10px;
                // }
                &:nth-child(2){
                    margin-top: 130px;
                }
                &:nth-child(3){
                    width: 245px;
                    height: 260px;
                    // margin-right: 14px;
                    position: absolute;
                    right: 0;
                    top:0;
                }
            }
        }
    }
}
</style>
