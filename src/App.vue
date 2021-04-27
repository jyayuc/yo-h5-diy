<template>
  <div id="app">
    <div :class="'full-loading '+loadingClass"><FullLoading/></div>
    <keep-alive>
      <router-view
        class="child-view flex-content-box"
        v-if="$route.meta.cache"
      ></router-view>
    </keep-alive>
    <router-view
      class="child-view flex-content-box"
      v-if="!$route.meta.cache"
    ></router-view>
  </div>
</template>
<script>
import FullLoading from '@/components/common/Loading.vue'
// import tmCommon from '@/common/common'
// // eslint-disable-next-line no-undef
// const { mapActions, mapGetters, mapMutations } = Vuex
export default {
  name: 'App',
  components: {
    FullLoading
  },
  data () {
    return {
      loadingClass: 'hide'
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="less">
@import './assets/less/main.less';
</style>
