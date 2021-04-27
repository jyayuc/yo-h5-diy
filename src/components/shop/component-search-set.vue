<template>
 <!-- 搜索设置 -->
    <div class="component-operate-search">
        <div class="nav-title">搜索设置</div>
        <div class="component-operate-content">
            <div class="content-li">
                <div class="edit-search-label">搜索提示</div>
                <el-input class="edit-search-txt" maxlength="20" placeholder="请输入搜索提示" clearable v-model="activeComponentData.content.seceachHint"></el-input>
                <component-count :content="activeComponentData.content.seceachHint" max-count="20"/>
            </div>
        </div>
    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"
import ComponentCount from './component-count.vue'

export default {
  name: 'component-search-set',
  components: {
    ComponentCount
  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,

    }
  },
  props: ['activeComponentData'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 保存动作
  },
  async created () {

  },
  updated () {

  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-operate-search{
    .component-operate-content{
        padding: 24px 28px 24px 22px;
    }
.content-li{
        display: flex;
    position: relative;
}
    .edit-search-label{
        margin-top: 6px;
        color: rgba(102,102,102,0.90);
        width: 60px;
    }
    .edit-search-txt{
        flex: 1;
        margin-left: 8px;
        background: #FFFFFF;
        // border: 1px solid #D9D9D9;
        border-radius: 2px;
        .el-input__inner{
            padding-right: 60px;
            font-size: 12px;
            line-height: 32px;
            height: 32px;
        }
    }
}
</style>
