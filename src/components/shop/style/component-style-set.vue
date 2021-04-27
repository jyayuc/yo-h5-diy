<template>
    <!-- 导航设置 -->
    <div class="component-operate-style">
        <div class="nav-title">配色设置</div>
        <div class="component-operate-content">
            <ul class="style-set-opts">
                <li v-for="(item,index) in activeComponentData.styleList" :key="index" >
                    <el-radio v-model="activeComponentData.activeStyle" :label="item">配色{{index+1}}</el-radio>
                    <span class="color-box" :style="'border-width:1px;border-style:solid;border-color:'+getCodeArr(item.code)[0]"> </span>
                    <span class="color-box" :style="'background:'+getCodeArr(item.code)[1]"> </span>
                    <span class="color-box" :style="'background:'+getCodeArr(item.code)[2]"> </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
const defaultImgBig = '/static/img/default-img-big.png'
const defaultImgSmall = '/static/img/default-img-small.png'

// import ComponentCount from './../component-count.vue';
export default {
  name: 'component-style-set',
  components: {
    // ComponentCount,
  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      defaultImgSmall: defaultImgSmall,
      styleOption: 1
      // colorList:[
      //     {color:'#f00',name:'默认'},
      //     {color:'#ff0',name:'配色一'},
      //     {color:'#fd0',name:'配色二'},
      //     {color:'#f2f',name:'配色三'},
      //     {color:'#f0f',name:'配色四'},
      //     {color:'#f22',name:'配色五'},
      // ],
    }
  },
  props: ['activeComponentData'],
  computed: {

  },
  mounted () {

  },
  methods: {
    getCodeArr (str) {
      return str.split(',')
    }
  },
  async created () {

  },
  // filters: {
  //     split: function (value) {
  //         if (!value) return []
  //         return value.split(',')
  //     }
  // },
  updated () {

  }
}
</script>
<style lang="less">
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-operate-style{
    .component-operate-content{
        padding: 24px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        .style-set-opts{
            li{
                display: flex;
                margin-top: 30px;
                margin-bottom: 10px;
                .el-radio{
                    width:140px;
                    margin-left: 25px;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: rgba(102,102,102,0.90);
                    .el-radio__inner{
                        width: 18px;
                        height: 18px;
                    }
                    .el-radio__input.is-checked .el-radio__inner{
                        border: 2px solid #3366FF;
                        background: #FFF;
                    }
                    .el-radio__input.is-checked + .el-radio__label {
                        color: rgba(102,102,102,0.90);
                    }
                    .el-radio__inner::after {
                        width: 9px;
                        height: 9px;
                        border-radius: 100%;
                        background-color: #3366FF;
                    }
                }
                .color-box{
                    padding: 17px;
                    margin-right: 8px;
                }
            }
        }
    }
}
</style>
