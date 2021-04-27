<template>
    <div class="component-icon-list">
        <div class="nav-title">{{title?title:'更换图标'}}
            <i class="el-icon-close" @click="closeSelectIcon"></i>
        </div>
        <ul class="icon-list-box">
            <li :class="{'active':activeSelectIcon==icon}"
            v-for="(icon,index) in activeComponentData.iconList"
            @click="selectIcon(icon)"
            :key="'icon-list-'+index"
            :style="'background-image:url('+icon.iconUrl+')'">

            </li>
        </ul>
        <el-button type="primary" class="publish-btn" @click="confirmSelectIcon" v-text="btnName?btnName:'确定'"></el-button>
    </div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

export default {
  name: 'component-icon-list',
  components: {

  },

  data () {
    return {
      defaultImgBig: defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      activeSelectIcon: ''
      // iconList:[
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      //     {icon:defaultImgSmall},
      // ]
    }
  },
  props: ['activeComponentData', 'title', 'btnName'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 选择图标
    selectIcon (item) {
      this.activeSelectIcon = item
    },
    closeSelectIcon () {
      this.$emit('closeAction')
    },
    // 确认选择图标
    confirmSelectIcon () {
      const that = this
      that.$emit('confirmAction', that.activeSelectIcon)
    }
  },
  created () {
    // this.activeSelectIcon=this.activeComponentData.style;
  },
  updated () {

  }
}
</script>
<style lang="less" scoped>
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-icon-list{
    background-color: #fff;
    .nav-title{
        .el-icon-close{
            float: right;
            margin-right: 20px;
            margin-top: 18px;
            font-size: 20px;
            cursor: pointer;
        }
    }
    .icon-list-box{
        padding: 18px 21px 26px;
        overflow: hidden;
        li{
            float: left;
            width: 36px;
            height: 36px;
            background-position: center;
            background-size: 20px 20px;
            background-repeat: no-repeat;
            // margin-left: 14px;
            margin-bottom:4px;
            cursor: pointer;
            border: 1px solid #fff;
            // &:nth-child(2n+1){
            //     margin-left: 0;
            // }
            &:hover,&.active{
                border: 1px solid #3366FF;
            }
        }
    }
    .publish-btn{
        padding: 0 18px;
        margin-left: 25px;
    }
}
</style>
