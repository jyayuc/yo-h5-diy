<template>
    <vue-ckeditor type="classic" :config="config" :editors="editors" v-model="activeComponentData.content"/>
    <!-- <vue-ckeditor type="balloon" :editors="editors" v-model="activeComponentData.content"/> -->
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
import VueCkeditor from 'vue-ckeditor5'
export default {
  name: 'component-ckeditor',
  components: {
    'vue-ckeditor': VueCkeditor.component
  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,
      config: {
        language: 'zh',
        // toolbar: [ 'undo','redo','|','bold', 'italic','underline'],
        // toolbar: [ 'undo','redo','|','bold', 'italic','underline', 'strikethrough', 'subscript', 'fontborder','fontfamily','fontsize','justifyleft','justifycenter','justifyright','imageleft','imageright','|','lineheight','insertunorderedlist','insertorderedlist'],

        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
          ]
        }
      },
      editors: {
        classic: ClassicEditor,
        balloon: BalloonEditor
      }
    }
  },
  props: ['activeComponentData'],
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

</style>
