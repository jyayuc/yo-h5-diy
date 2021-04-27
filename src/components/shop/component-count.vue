<template>
    <div class="component-page-count">{{content?content.length:0}}/{{maxCount}}</div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"

export default {
  name: 'component-count',
  components: {

  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,

    }
  },
  props: ['content', 'maxCount'],
  computed: {

  },
  mounted () {

  },
  methods: {
  },
  async created () {

  },
  updated () {

  }
}
</script>
<style lang="less" scoped>
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-page-count{
    position: absolute;
    bottom:8px;
    right: 20px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #BFBFBF;
    letter-spacing: 0;
}
</style>
