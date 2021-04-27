<template>
    <div class="component-page-padding">
        <div class="padding-tag">边距</div>
        <div class="padding-box">
            <el-radio :label="1" v-model="componentData.content.paddingType">无边距</el-radio>
            <el-radio :label="2" v-model="componentData.content.paddingType">有边距</el-radio>
        </div>
    </div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'component-',
  components: {

  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall

    }
  },
  props: ['componentData'],
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
.component-page-padding{
    // .padding-li{
        display: flex;
        margin: 0 auto 25px;
        padding:0 24px;
    // }
    .padding-tag{
        // line-height: 50px;
        padding-right: 12px;
        line-height: 23px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(102,102,102,0.90);
    }
    .padding-box{
        flex: 1;
        .el-radio+.el-radio{
            margin-left: 32px;
        }
    }
}
</style>
