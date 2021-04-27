<template>
<!-- 标题组件 -->
<div class="component-unit component-page-title" :data-index="index"
@click="selectCurrentComponent(componentData)" >
    <div class="title-name"  :data-index="index"
    :style="(componentData.content.titleAlign?'text-align:'+componentData.content.titleAlign+';':'')+(componentData.content.titleColor?'color:'+componentData.content.titleColor+';':'')+(componentData.content.titleSize?'font-size:'+componentData.content.titleSize+'px;':'')+(componentData.content.titleFont?'font-family:'+componentData.content.titleFont+';':'')">
        {{componentData.content.titleName?componentData.content.titleName:'标题文字'}}
    </div>
    <div class="title-more" :data-index="index" v-if="componentData.content.titleIsMore">
        <span :data-index="index" v-if="componentData.content.titleTextMore">更多</span>
        <i class="el-icon-arrow-right" :data-index="index" v-if="componentData.content.titleArrowMore"></i></div>
</div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"

export default {
  name: 'component-title',
  components: {

  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,

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
    },
    // 跳转到更多
    jumpMore () {
      if (!this.componentData.content.titleIsMore) {
        return
      }
      const url = this.componentData.content.titleMoreUrl
      window.open(url)
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
.component-page-title{
    position: relative;
    background-color: #fff;
    padding: 0 20px;
    height: 54px;
    line-height: 54px;
    display: flex;
    position: relative;
    overflow: hidden;
    .title-name{
        flex: 1;
        // height: 54px;
        // line-height: 54px;
        margin-right: 5px;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #2E2E2E;
        flex: 1;
    }
    // &.left{
    //     text-align: left;
    // }
    // &.center{
    //     text-align: center;
    // }
    // &.right{
    //     text-align: right;
    // }
    .title-more{
        // position: absolute;
        // right:18px;
        // top:18px;
        // margin-top: 10px;

        // position: absolute;
        // top: 50%;
        // right: 20px;
        // transform: translate(0,-50%);
        // width: 80px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(102,102,102,0.90);
    }
}
</style>
