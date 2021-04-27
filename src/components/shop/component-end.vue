<template>
    <div class="shop-page-component-end" data-type="END" :data-index="index">

    </div>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"

export default {
  name: 'component-end',
  components: {

  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,

    }
  },
  props: ['index'],
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
.shop-page-component-end{
    height:30px;
}
</style>
