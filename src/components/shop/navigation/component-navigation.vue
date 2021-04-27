<template>
    <ul class="component-page-navigation">
        <li v-for="(item,index) in componentData.lines"
        @click="selectNav(item)"
        :class="{'active':item==activeNav}" :key="'bg-'+index">
            <i class="bg-icon" :style="'background-image:url('+item.icon+')'"></i>
            <i class="bg-title" :style="'width:'+366/componentData.lines.length+'px'" v-text="item.name"></i>
        </li>
    </ul>
</template>
<script>
// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"

export default {
  name: 'component-count',
  components: {

  },

  data () {
    return {
      // defaultImgBig:defaultImgBig,
      // defaultImgSmall:defaultImgSmall,
      activeNav: null

    }
  },
  props: ['componentData', 'index'],
  computed: {

  },
  mounted () {

  },
  methods: {
    // 选中导航
    selectNav (item) {
      // this.activeNav=item;
    }
  },
  async created () {
    // if(this.componentData.lines.length>0){
    //     this.activeNav=this.componentData.lines[0]
    // }
  },
  updated () {

  }
}
</script>
<style lang="less" scoped>
// @import "../../../sheet/sass/shop/components/component-lib.less";
.component-page-navigation{
    position: absolute;
    bottom:0;
    left: 2px;
    right: 2px;
    // width:100%;
    height:54px;
    line-height:54px;
    display: flex;
    background-color: #fff;
    border: 2px solid rgba(51,102,255,0.70);
    li{
        flex: 1;
        text-align:center;
        display: flex;
        flex-direction: column;
        color: #000;
        background-color: #fff;
        cursor: pointer;
        &.active{
            color: #fff;
            // .bg-title{
            // }
            background-color: #000;
        }
        .bg-icon{
            // flex: 1;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 22px 22px;
            margin-top: 5px;
            height: 25px;
            line-height: 25px;
        }
        .bg-title{
            margin-top: 2px;
            height: 15px;
            line-height: 15px;
            font-style: normal;
            font-family: PingFangSC-Regular;
            font-size: 10px;
            // color: rgba(102,102,102,0.90);
            overflow: hidden;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
