<template>
<!-- 图片导航组件 -->
    <div class="component-unit component-page-pic-nav" :data-index="index"
    @click="selectCurrentComponent(componentData)" >
        <ul class="page-nav-list" :data-index="index">
            <li :data-index="index"
            v-for="(item,liIndex) in componentData.lines"
            :key="'page-pic-nav-li'+liIndex">
                <div class="img" :data-index="index" :style="'background-image:url('+(item.content.navigationPicUrl?item.content.navigationPicUrl:defaultImgSmall)+');'+(item.content.navigationPicUrl?'':'background-size:40px 30px;')">

                </div>
                <p class="title" :data-index="index" v-text="item.content.navigationPicName">

                </p>
            </li>
        </ul>
    </div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'component-pic-nav',
  components: {

  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall

    }
  },
  props: ['componentData', 'index'],
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
<style lang="less" scoped>
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-page-pic-nav{
    background-color: #fff;
    padding: 10px 0;
    .page-nav-list{
        display: flex;
        li{
            flex: 1;
            .img{
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 50%;
                width: 56px;
                height: 56px;
                margin:0 auto;
                background-color: #F1F2F3;
            }
            .title{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #666;
                margin-top: 2px;
                text-align: center;
            }
        }
    }
}
</style>
