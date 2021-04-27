<template>
    <!-- 文本设置 -->
    <div class="component-operate-text">
        <div class="nav-title">文本设置</div>
        <div class="component-operate-content">
            <div class="content-li">
                <span class="content-label">类型</span>
                <div class="radio-group">
                    <el-radio label="default" v-model="activeComponentData.content.textType">普通文本</el-radio>
                    <el-radio label="rich" v-model="activeComponentData.content.textType">富文本</el-radio>
                </div>
            </div>
            <div v-if="activeComponentData.content.textType=='default'">
                <div class="content-li">
                    <span class="content-label">显示</span>
                    <div class="radio-group">
                        <el-radio label="roll" v-model="activeComponentData.content.textShowStyle">滚动显示</el-radio>
                        <el-radio label="line" v-model="activeComponentData.content.textShowStyle">分行显示</el-radio>
                    </div>
                </div>
                <div class="content-li">
                    <span class="content-label content">内容</span>
                    <div class="textarea-box">
                        <el-input autosize resize="none" @blur="blurPlaceHolder" @focus="focusPlaceHolder" placeholder="请填写内容，超过一行将滚动显示" maxlength="300" type="textarea" v-model="activeComponentData.content.textContentDefault">
                        </el-input>
                        <span class="count">{{activeComponentData.content.textContentDefault?activeComponentData.content.textContentDefault.length:0}}/300</span>
                    </div>
                </div>
            </div>
            <div  class="content-li" v-else-if="activeComponentData.content.textType=='rich'">
                <!-- <span class="content-label">内容</span> -->
                <!--   <div class="radio-group">
                        <el-radio :label="1" v-model="activeComponentData.textType">普通文本</el-radio>
                        <el-radio :label="2" v-model="activeComponentData.textType">富文本</el-radio>
                    </div> -->
                <!-- <component-ckeditor :active-component-data="activeComponentData"/> -->
                <component-ueditor class="content-editor" :active-component-data="activeComponentData"/>
            </div>
        </div>
    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"
// import ComponentCkeditor from './component-ckeditor.vue'
import ComponentUeditor from './component-ueditor.vue'

export default {
  name: 'component-text-set',
  components: {
    // ComponentCkeditor,
    ComponentUeditor
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
    focusPlaceHolder () {
      if (this.activeComponentData.content.textContentDefault == '请填写内容，超过一行将滚动显示') {
        this.activeComponentData.content.textContentDefault = ''
      }
    },
    blurPlaceHolder () {
      if (!this.activeComponentData.content.textContentDefault) {
        this.activeComponentData.content.textContentDefault = '请填写内容，超过一行将滚动显示'
      }
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
.component-operate-text{
    .component-operate-content{
        padding: 24px 24px 0;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        .content-li{
            // height: 32px;
            display: flex;
            margin-bottom: 24px;
            .content-label{
                margin-top: 6px;
                margin-right: 15px;
                font-family: PingFangSC-Regular;
                font-size: 13px;
                color: rgba(102,102,102,0.90);
                &.content{
                    margin-top: 0;
                }
            }
            // .flex{
            //     flex:1;
            //     font-size: 12px;
            // }
            .content-editor{
                // flex:1;
                // width: 28px;
            }
            .radio-group{
                margin-top: 8px;
                flex: 1;
            }
            .textarea-box{
                flex: 1;
                position: relative;
                .count{
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    color: #BFBFBF;
                    position: absolute;
                    right: 6px;
                    bottom: 6px;
                }
            }
            .el-textarea{
                .el-textarea__inner{
                    min-height: 110px;
                    resize: none;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #000000;
                    letter-spacing: 0;
                    line-height: 21px;
                    padding-bottom: 18px;
                }
            }
        }
    }
}
</style>
