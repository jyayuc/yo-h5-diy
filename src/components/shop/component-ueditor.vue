
<template>
   <div class="shop-page-editor">
        <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
/* eslint-disable no-undef */
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"
// import '../../../lib/utf8-jsp/ueditor.config'
// import '../../../lib/utf8-jsp/themes/default/css/ueditor.min.css'
// import '../../../lib/utf8-jsp/ueditor.all';
// import '../../../lib/utf8-jsp/lang/zh-cn/zh-cn';
import '@/assets/utf8-jsp/ueditor.config'
import '@/assets/utf8-jsp/themes/default/css/ueditor.min.css'
import '@/assets/utf8-jsp/ueditor.all'
import '@/assets/utf8-jsp/lang/zh-cn/zh-cn'
export default {
  name: 'component-ueditor',
  components: {

  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,
      defaultConfig: {
        // wordCount
        wordCount: true, // 是否开启字数统计
        autoFloatEnabled: false,
        elementPathEnabled: false, // 元素路径是否显示
        maximumWords: 1000, // 允许的最大字符数
        // 字数统计提示，{#count}代表当前字数，{#leave}代表还可以输入多少字符数,留空支持多语言自动切换，否则按此配置显示
        wordCountMsg: '{#count}/1000', // 当前已输入 {#count} 个字符，您还可以输入{#leave} 个字符
        // 超出字数限制提示  留空支持多语言自动切换，否则按此配置显示
        //, wordOverFlowMsg:''    //<span style="color:red;">你输入的字符个数已经超出最大允许值，服务器可能会拒绝保存！</span>

        // 这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
        toolbars: [[
          'undo', // 撤销
          'redo', // 重做
          '|',
          'bold', // 加粗
          'italic', // 斜体
          'underline', // 下划线
          'strikethrough', // 删除线
          'subscript', // 下标
          // 'fontborder', //字符边框
          'forecolor',
          'backcolor'
        ],
        //  [
        //     // 'fontfamily', //字体
        //  ],
        [
          'fontsize', // 字号
          'justifyleft', // 居左对齐
          'justifycenter', // 居中对齐
          'justifyright', // 居右对齐
          'justifyjustify', // 两端对齐
          'imageleft', // 左浮动
          'imageright', // 右浮动
          '|',
          'lineheight' // 行间距
        ],
        [
          'insertunorderedlist', // 无序列表
          'insertorderedlist' // 有序列表
        ]
        ]
        // 'fontfamily':[
        //     { label:'',name:'songti',val:'宋体'},
        //     { label:'',name:'kaiti',val:'新宋体'},
        //     { label:'',name:'yahei',val:''},
        //     { label:'',name:'heiti',val:''},
        //     { label:'',name:'lishu',val:''},
        // ]
      }

    }
  },
  props: {
    activeComponentData: {
      type: Object
    },
    config: {
      type: Object
    }
  },
  computed: {

  },
  mounted () {
    const _this = this

    /**
        * UEditor模拟placeholder效果
        * @param {string} justPlainText 这个是文本placeholder(只能是文本, 如果是html, 下面的focus事件比较可能不成功.)
        * @example var editor = UE.getEditor(id); editor.placeholder("Please enter some text...");
        */
    //    let defaultRich='<p><span style="font-size: 16px;"><br/></span></p ><p><span style="font-size: 16px;">您现在使用的是一个富文本组件，在【富文本】里，您可以对文字进行</span><span style="font-size: 16px; font-family: 隶书, SimLi;">字体</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; font-weight: bold;">加粗</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; font-style: italic;">斜体</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; text-decoration-line: underline;">下划线</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; text-decoration-line: line-through;">删除线</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; color: rgb(82, 140, 216);">文字颜色</span><span style="font-size: 16px;">、</span>      <span style="font-size: 16px; background-color: rgb(250, 226, 32);">背景色</span><span style="font-size: 16px;">、以及</span>      <span style="font-size: 26px;">字号大小</span><span style="font-size: 16px;">等排版操作。</span></p ><p><span style="font-size: 16px;"><br/></span></p ><span style="font-size: 16px; color: rgb(255, 255, 255);">------</span>'
    const defaultRich = _this.activeComponentData.content.textContentRich
    // eslint-disable-next-line no-extend-native
    String.prototype.trim = function () {
      return this.replace(/^(\s*)|(\s*)$/g, '')
    }
    UE.Editor.prototype.placeholder = function (justPlainText) {
      var _editor = this

      _editor.addListener('focus', function () {
        var localHtml = _editor.getPlainTxt()
        if (localHtml.indexOf('------') > -1) {
          _editor.setContent(' ')
          _this.activeComponentData.content.textContentRich = ' '
        }
      })

      _editor.addListener('blur', function () {
        var localHtml = _editor.getContent()
        if (!localHtml) {
          _editor.setContent(justPlainText)
          _this.activeComponentData.content.textContentRich = justPlainText
        }
      })

      _editor.ready(function () {
        _editor.fireEvent('blur')
      })
    }
    _this.editor = UE.getEditor('editor', this.defaultConfig) // 初始化UE
    _this.editor.placeholder(defaultRich)
    _this.editor.addListener('ready', function () {
      _this.editor.setContent(_this.activeComponentData.content.textContentRich) // 确保UE加载完成后，放入内容。
      // _this.editor.focus();
    })
    _this.editor.addListener('contentChange', function () {
      _this.activeComponentData.content.textContentRich = _this.editor.getContent()
      // _this.editor.setContent(_this.activeComponentData.content); // 确保UE加载完成后，放入内容。
    })
  },
  methods: {
    // 加载完成
    getContent () { // 获取内容方法
      return this.editor.getContent()
    }
  },
  created () {
    if (this.config) {
      this.defaultConfig = this.config
    }
  },
  updated () {

  },
  destroyed () {
    this.editor.destroy()
  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
.shop-page-editor{
    iframe{
        height: 100%;
    }

    .edui-default .edui-colorpicker-nocolor {
        line-height: 12px;
        height: 18px;
    }
}
</style>
