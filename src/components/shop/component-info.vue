<template>
    <!-- 店铺信息组件  背景图-->
    <div v-text="componentData.name"
        class="component-page-info" :style="'background-image:url('+titleBg+')'"
        @click="selectCurrentComponent(componentData)">
    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"
const titleBg = '/static/img/edit/title-bg.png'
export default {
  name: 'component-page-info',
  components: {

  },

  data () {
    return {
      titleBg: titleBg
    }
  },
  props: ['componentData'],
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
.component-page-info{
    cursor: pointer;
    background-color: #fff;
    background-position: center;
    background-size:contain;
    background-repeat: no-repeat;
    text-align: center;
    line-height: 80px;
    height:70px;
}
</style>
