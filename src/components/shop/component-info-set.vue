<template>
    <!-- 导航设置 -->
    <div class="component-operate-info">
        <div class="nav-title">页面设置</div>
        <div class="component-operate-content">
            <div class="content-li">
                <div class="edit-page-name">页面名称</div>
                <el-input class="edit-page-name-txt" maxlength="10" placeholder="请输入页面名称" v-model="activeComponentData.name"></el-input>
                <component-count :content="activeComponentData.name" max-count="10"/>
            </div>
            <div class="content-li">
                <div class="edit-page-desc">页面描述</div>
                <el-input
                    type="textarea" class="edit-page-desc-txt"
                    resize="none"
                    :rows="3"
                    maxlength="50"
                    v-model="activeComponentData.desc"
                    placeholder="用户通过微信分享该页面给朋友时，会自动显示页面描述"
                    >
                </el-input>
                <component-count :content="activeComponentData.desc" max-count="50"/>
            </div>
        </div>
    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"

import ComponentCount from './component-count.vue'
export default {
  name: 'component-info-set',
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
.component-operate-info{
    .component-operate-content{
        padding: 24px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
    }
    .content-li{
        position: relative;
    }
    .edit-page-name{
        // margin-top: 24px;
        color: rgba(102,102,102,0.90);
    }
    .edit-page-name-txt{
        margin-top: 8px;
        height:32px;
        // margin:8px auto;
        // width: 192px;
            font-size: 12px;
        display: block;
        color: rgba(51,51,51,0.90);
        .el-input__inner{
            // border: 1px solid #D9D9D9;
            border-radius: 2px;
            font-size: 12px;
            height:32px;
            line-height: 32px;
        }
    }
    .edit-page-desc{
        margin-top: 32px;
        color: rgba(102,102,102,0.90);
    }
    .edit-page-desc-txt{
        margin-top: 8px;
        font-size: 12px;
        resize: none;
        color: rgba(51,51,51,0.90);
        // height: 62px;
        .el-textarea{
            height: 62px;
            // margin-left: 8px;
            // flex: 1;
        }
        .el-textarea__inner{
        padding-bottom:10px;
        // height: 62px;
        }
    }
}
</style>
