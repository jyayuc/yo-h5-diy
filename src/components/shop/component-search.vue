<template>
    <!-- 搜索组件 -->
    <div class="component-unit component-page-search" :data-index="index"
    @click="selectCurrentComponent(componentData)" >
        <el-input :data-index="index" readonly
            :placeholder="componentData.content.seceachHint?componentData.content.seceachHint:'请输入搜索提示'"
            prefix-icon="el-icon-search">
        </el-input>
    </div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'component-search',
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
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-page-search{
    // margin-top: 8px;
    background: #fff;
    height: 52px;
    overflow: hidden;
    *{
        cursor: move;
    }
    &.component-unit{
        .el-input{
            .el-input__inner{
                height: 42px;
            }
        }
    }
    .el-input{
        width: 340px;
        display: block;
        // height:50px;
        margin: 5px auto;
        .el-input__inner{
            height: 42px;
            line-height: 42px;
            border-radius: 10px;
            text-indent: 18px;
        }
        .el-icon-search{
            line-height: 0;
            color:#464646;
            font-size: 20px;
            font-weight: 900;
            margin-left: 10px;
        }
    }
}
</style>
