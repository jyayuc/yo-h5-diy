<template>
    <!-- 图片导航设置 -->
    <div class="component-operate-navigation">
        <div class="first-step" v-if="!showSelectIconStatus">
            <div class="nav-title">图片导航设置</div>
            <div class="component-operate-content">
                <component-content-set :add-btn-show="true"
                img-upload-tips="建议尺寸112*112，仅支持PNG、JPG、GIF、BMP格式"
                max-count="5"
                @showSelectIconDialog="showSelectIconDialog"
                :delete-btn-show="true"
                :active-component-data="activeComponentData"/>
            </div>
        </div>

        <component-icon-list v-if="!!showSelectIconStatus"
        @closeAction="closeSelectIcon"
        @confirmAction="confirmSelectIcon"
        :active-component-data="activeComponentData"
        :show-change-style-status="showSelectIconStatus"/>

    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"

import ComponentContentSet from './component-content-set.vue'
import ComponentIconList from './component-icon-list.vue'
export default {
  name: 'component-navigation-set',
  components: {
    ComponentIconList, // 选择图标设置
    ComponentContentSet // 内容设置
  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,
      showSelectIconStatus: false,
      activeSelectIcon: {}
    }
  },
  props: ['activeComponentData'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 打开显示选择图标
    showSelectIconDialog () {
      this.showSelectIconStatus = true
    },
    // 关闭窗口
    closeSelectIcon () {
      this.showSelectIconStatus = false
    },
    // 确认选择
    confirmSelectIcon (item) {
      this.activeComponentData.activeImg.icon = item.iconUrl
      let obj = {}
      console.error('----', this.activeComponentData.activeImgIndex)
      if (this.activeComponentData.activeImgIndex || this.activeComponentData.activeImgIndex == 0) {
        obj = this.activeComponentData.lines[this.activeComponentData.activeImgIndex]
        if (obj) {
          obj.icon = item.iconUrl
        }
        this.$set(this.activeComponentData.lines, this.activeComponentData.activeImgIndex, obj)
      }
      this.closeSelectIcon()
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
// .component-operate-navigation{
//     background-color: #fff;

// }
</style>
