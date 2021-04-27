<template>
    <!-- 商品列表组件-->
    <div class="component-unit component-page-goods"  :data-index="index"
        @click="selectCurrentComponent(componentData)">
        <ul class="page-goods-list"
        :data-index="index"
        :class="{'page-goods-list1':componentData.style==1,'page-goods-list2':componentData.style==2}">
            <li v-for="(item,goodsIndex) in (componentData.lines&&componentData.lines.length>0?componentData.lines:[{goodsInfo:{}},{goodsInfo:{}}])"
            :data-index="index"
            :key="'page-goods-li-'+goodsIndex">
                <div class="img"
                :data-index="index"
                :style="'background-image:url('+(item.goodsInfo.picUrl?item.goodsInfo.picUrl:defaultImgBig)+');'+(item.goodsInfo.picUrl?'':'background-size:80px 55px;')">
                    <i class="icon" :data-index="index" v-if="!!componentData.content.productShowSubscript&&iconMap[componentData.content.productSubscriptType]" :style="'background-image:url('+iconMap[componentData.content.productSubscriptType]+');'"></i>
                </div>
                <div class="text" :data-index="index">
                    <p class="title" :data-index="index" v-text="item.goodsInfo.title?item.goodsInfo.title:'商品图片'" v-if="componentData.content.productShowName"></p>
                    <p class="price" :data-index="index" v-if="componentData.content.productShowPrice">
                        <span class="symbol" :data-index="index">￥</span>
                        <span v-text="item.goodsInfo.salePrice?item.goodsInfo.salePrice:'0.00'" :data-index="index"></span>
                    </p>
                    <p class="price2" :data-index="index" v-if="componentData.content.productShowPrice" v-text="item.goodsInfo.listPrice?'￥'+item.goodsInfo.listPrice:'￥0.00'"></p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
// const defaultImgSmall="/static/img/default-img-small.png"

export default {
  name: 'component-goods',
  components: {

  },

  data () {
    return {
      defaultImgBig: defaultImgBig
      // defaultImgSmall:defaultImgSmall,

    }
  },
  props: ['componentData', 'index', 'iconMap'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 选择组件
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
// .active,:hover{
//     .component-page-goods{
//         .page-goods-list{
//             padding: 8px 18px;
//         }
//     }
// }
.component-page-goods{
    background-color: #fff;
    .page-goods-list{
        overflow: hidden;
        padding: 10px 20px;
        text-align: center;
        li{
           .img{
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                background-color: #F1F2F3;
                border-radius: 4px;
                position: relative;
           }
           .icon{
                position: absolute;
                top:10px;
                left:10px;
                padding: 11px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
           }
           .title{
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: #333;
                letter-spacing: 0;
                // text-align: left;
                line-height: 18px;
                height: 36px;
                overflow: hidden;
            }
            .price{
                // margin-top: 20px;
                font-family: PingFangSC-Semibold;
                font-size: 16px;
                color: #030000;
                // text-align: left;
                .symbol{
                    font-size: 13px;
                    color: #031E3F;
                    margin-right: -5px;
                }
            }
            .price2{
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #C9C9C9;
                letter-spacing: 0;
                line-height: 11px;
                text-decoration: line-through;
                // text-align: left;
                // margin-bottom: 5px;
            }
        }
    }
    .page-goods-list1{
        li{
            float: left;
            width:160px;
            margin-bottom: 20px;
            &:nth-child(2n+2){
                margin-left:15px;
            }
            .img{
                height:160px;
                width:160px;
                margin-bottom: 12px;

            }

            // .title{
            //     // font-family: PingFangSC-Regular;
            //     // font-size: 13px;
            //     // color: #333333;
            //     // letter-spacing: 0;
            //     // text-align: center;
            //     // line-height: 18px;
            // }
            // .price{
            //     // font-family: PingFangSC-Semibold;
            //     // font-size: 16px;
            //     // color: #030000;
            //     .symbol{
            //         // font-size: 13px;
            //         // color: #031E3F;
            //     }
            // }
            // .price2{
            //     font-family: PingFangSC-Regular;
            //     font-size: 11px;
            //     color: #C9C9C9;
            //     letter-spacing: 0;
            //     line-height: 11px;
            // }
        }
    }
    .page-goods-list2{
        padding-top: 10px;
        padding-bottom:10px;
        li{
            // float: left;
            margin-top: 20px;
            display: flex;
            &:first-child{
                margin-top: 0;
            }
            .img{
                width:110px;
                height: 110px;

                // border-radius: 4px;
            }
            .text{
                flex: 1;
                margin-left: 20px;
            }
            .title{
                // font-family: PingFangSC-Regular;
                font-size: 14px;
                // color: #333;
                // letter-spacing: 0;
                margin-top: 0;
                text-align: left;
                line-height: 18px;
            }
            .price{
                margin-top: 15px;
                text-align: left;
                // font-family: PingFangSC-Semibold;
                // font-size: 16px;
                // color: #030000;
                // .symbol{
                //     font-size: 13px;
                //     color: #031E3F;
                // }
            }
            .price2{
                margin-top: 5px;
                margin-bottom: 0;
                text-align: left;
                // font-family: PingFangSC-Regular;
                // font-size: 11px;
                // color: #C9C9C9;
                // letter-spacing: 0;
                // line-height: 11px;
            }
        }
    }
}
</style>
