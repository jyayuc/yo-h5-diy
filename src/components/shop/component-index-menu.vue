<template>
    <div v-text="componentData.name"
        class="component-page-index" :style="'background-image:url('+titleBg+')'"
        @click="selectCurrentComponent(componentData)">
    </div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'component-index-menu',
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

</style>
