<template>
 <!-- 文本组件 -->
<div class="component-unit component-page-text" :data-index="index"
@click="selectCurrentComponent(componentData)" >
    <div class="text-content" :data-index="index" v-if="componentData.content.textType=='rich'" v-html="(componentData.content.textContentRich?componentData.content.textContentRich:'')"></div>
    <div class="text-content" :data-index="index" v-if="(componentData.content.textType=='default'&&componentData.content.textShowStyle=='line')||(componentData.content.textType=='default'&&componentData.content.textShowStyle=='roll'&&getCharLen(componentData.content.textContentDefault)<=46)" v-text="(componentData.content.textContentDefault?componentData.content.textContentDefault:'')"></div>
        <!-- <Marquee :data-index="index" :speed="'quick'"  :content="componentData.content.textContentDefault" v-if="componentData.content.textType=='default'&&componentData.content.textShowStyle=='roll'"></Marquee> -->
    <!-- <marquee-text class="text-content" :text="componentData.content.textContentDefault" v-if="componentData.content.textType=='default'&&componentData.content.textShowStyle=='roll'">
    </marquee-text> -->
    <marquee behavior="scroll" loop="-1" v-text="(componentData.content.textContentDefault?componentData.content.textContentDefault:'')" v-if="(componentData.content.textType=='default'&&componentData.content.textShowStyle=='roll')&&getCharLen(componentData.content.textContentDefault)>46"></marquee>

</div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'
// import Css from 'vue-marquee-horizontal/dist/vue-marquee.min.css'
// import Marquee from 'vue-marquee-horizontal';
// import MarqueeText from 'vue-marquee-text';
export default {
  name: 'component-text',
  components: {
    // Marquee
    // MarqueeText
  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall
      // defaultRich:'<p><span style="font-size: 16px;"><br/></span></p ><p><span style="font-size: 16px;">您现在使用的是一个富文本组件，在【富文本】里，您可以对文字进行</span><span style="font-size: 16px; font-family: 隶书, SimLi;">字体</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; font-weight: bold;">加粗</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; font-style: italic;">斜体</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; text-decoration-line: underline;">下划线</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; text-decoration-line: line-through;">删除线</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; color: rgb(82, 140, 216);">文字颜色</span><span style="font-size: 16px;">、</span>      <span style="font-size: 16px; background-color: rgb(250, 226, 32);">背景色</span><span style="font-size: 16px;">、以及</span>      <span style="font-size: 26px;">字号大小</span><span style="font-size: 16px;">等排版操作。</span></p ><p><span style="font-size: 16px;"><br/></span></p ><span style="font-size: 16px; color: rgb(255, 255, 255);">------</span>',
    }
  },
  props: ['componentData', 'index'],
  computed: {

  },
  mounted () {

  },
  methods: {
    loadSpeed () {
      let speed = 'slow'
      const len = this.componentData.content.textContentDefault.length
      if (len > 200) {
        speed = 'slow'
      } else if (len <= 200 && len > 100) {
        speed = 'middle'
      } else {
        speed = 'quick'
      }
      return speed
    },
    // 选择组件
    selectCurrentComponent (item) {
      this.$emit('selectComponent', item)
    },
    getCharLen (s) {
      let l = 0
      const a = s.split('')
      for (let i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
          l++
        } else {
          l += 2
        }
      }
      return l
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
.component-page-text{
    padding: 10px 20px;
    min-height: 45px;
    background-color: #fff;
    .text-content{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #000;
        letter-spacing: 0;
        line-height: 21px;
        word-wrap: break-word;
        word-break: break-all;
    }
    // .mt {
    //     vertical-align: middle;
    //     font-size: 16px;
    //     // color: #272727;
    //     // font-weight: 600;
    //     // max-width: 200px;
    // }
}
</style>
