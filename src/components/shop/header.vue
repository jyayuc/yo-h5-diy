<template>
    <div class="shop-header-box">
        <div class="shop-style-header">
            <i class="el-icon-back" @click="goBack()"></i><span class="title" v-text="headTitle?headTitle:''"></span>
        </div>
        <div class="shop-right-header">
            <el-button class="save-btn" v-if="showSave" @click="saveAction">保存</el-button>
            <el-button type="primary" v-if="showPublish"  class="publish-btn" @click="publishAction">保存并发布</el-button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'shop-header',
  components: {

  },

  data () {
    return {
    }
  },
  props: ['headTitle', 'backUrl', 'showPublish', 'showSave', 'backAction'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 保存动作
    saveAction () {
      this.$emit('saveAction')
    },
    // 发布动作
    publishAction () {
      this.$emit('publishAction')
    },
    // 返回操作
    goBack () {
      // if(this.backUrl){
      this.$emit('backAction')
      //     return;
      // }
      // let backUrl=this.backUrl;
      // if(backUrl){
      //     this.$router.push(backUrl);
      // }else{
      //     this.$router.go(-1);
      // }
    }
  },
  async created () {

  },
  updated () {

  }
}
</script>
<style lang="less">
@import "../../assets/less/pages/shop/header.less";
</style>
