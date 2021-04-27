<template>
  <div class="shop-page shop-style">
        <shop-header head-title="配色设置" :show-save="true" @saveAction="shopStyleSave"/>
        <el-container>
            <el-main class="style-content">
                <div class="left-box">
                    <ul class="style-set-list">
                        <li :style="'background-image:url('+item+')'" :key="index" v-for="(item,index) in shopPageData.activeStyle.list">
                            <!-- <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2087425560,4061683816&fm=26&gp=0.jpg" alt=""> -->
                        </li>
                    </ul>
                 </div>

                <div class="right-box">
                    <component-style-set :active-component-data="shopPageData"/>
                </div>
            </el-main>
            <el-footer>

            </el-footer>
        </el-container>
  </div>
</template>
<script>
// import { mapMutations, mapState, mapGetters  } from 'vuex'
import tmCommon from '@/common/common'
import ShopHeader from '@/components/shop/header.vue'
import ComponentStyleSet from '@/components/shop/style/component-style-set.vue'

// let image1=require("../../images/demo/1.jpg");
// let image2=require("../../images/demo/2.jpg");
// let image3=require("../../images/demo/3.jpg");
// const hotEn='/static/img/edit/goods/hot-en.svg'
const styleList = [
  {
    code: '#333333,#333333,#FD6F66',
    list: [
      '/static/img/style/01/1.png',
      '/static/img/style/01/2.png',
      '/static/img/style/01/3.png'
    ]
  },
  {
    code: '#04569B,#04569B,#FD6F66',
    list: [
      '/static/img/style/02/1.png',
      '/static/img/style/02/2.png',
      '/static/img/style/02/3.png'
    ]
  },
  {
    code: '#3366FF,#4B74FF,#FD6F66',
    list: [
      '/static/img/style/03/1.png',
      '/static/img/style/03/2.png',
      '/static/img/style/03/3.png'
    ]
  },
  {
    code: '#3AC169,#3AC169,#FDC059',
    list: [
      '/static/img/style/04/1.png',
      '/static/img/style/04/2.png',
      '/static/img/style/04/3.png'
    ]
  },
  {
    code: '#FF8046,#FF8046,#FD6F66',
    list: [
      '/static/img/style/05/1.png',
      '/static/img/style/05/2.png',
      '/static/img/style/05/3.png'
    ]
  },
  {
    code: '#F4766E,#F4766E,#FDC059',
    list: [
      '/static/img/style/06/1.png',
      '/static/img/style/06/2.png',
      '/static/img/style/06/3.png'
    ]
  },
  {
    code: '#CB4040,#CB4040,#FDC059',
    list: [
      '/static/img/style/07/1.png',
      '/static/img/style/07/2.png',
      '/static/img/style/07/3.png'
    ]
  }
]

export default {
  components: {
    ShopHeader,
    ComponentStyleSet
  },

  data () {
    return {
      saveShopStyleStatus: false,
      shopPageData: {
        styleList: styleList,
        activeStyle: {
          list: []
        }
      }
      // cardList:[
      //     image1,
      //     image2,
      //     image3,
      //     image3,
      //     image3,
      // ]
    }
  },

  computed: {

  },

  methods: {
    // 获取配色详情
    shopStyleDetail () {
      const that = this
      const condition = {
        // tenantCode:'88000035',
        tenantCode: localStorage.getItem('tenantCode')
      }
      // condition.pageNo=0;
      that.$store.dispatch('shopStyleDetail', condition).then(res => {
        tmCommon.log(res)
        const { status, msg, data } = res
        if (status === '200') {
          that.shopPageData.styleColor = data.styleColor
          that.shopPageData.id = data.id
          that.shopPageData.tenantCode = data.tenantCode
          let flag = false
          for (const i in styleList) {
            if (styleList[i].code == data.styleColor) {
              that.shopPageData.activeStyle = styleList[i]
              flag = true
              break
            }
          }
          if (!flag) {
            that.shopPageData.activeStyle = styleList[0]
          }
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 保存配色
    shopStyleSave () {
      const that = this
      if (that.saveShopStyleStatus) {
        return
      }
      that.saveShopStyleStatus = true
      const shopPageData = that.shopPageData
      const condition = {
        // tenantCode:'88000035',
        tenantCode: localStorage.getItem('tenantCode'),
        id: shopPageData.id,
        styleColor: shopPageData.activeStyle.code
        // "updaterId": shopPageData
      }
      // condition.pageNo=0;
      that.$store.dispatch('shopStyleSave', condition).then(res => {
        tmCommon.log(res)
        const { status, msg, data } = res
        if (status === '200') {
          that.$message({
            type: 'success',
            message: '更新成功',
            onClose () {
              that.saveShopStyleStatus = false
            }
          })
        } else {
          this.$message.error(msg)
          that.saveShopStyleStatus = false
        }
      }).catch(err => {
        that.saveShopStyleStatus = false
        tmCommon.error(err)
      })
    }
  },

  created () {
    this.shopStyleDetail()
    //    this.shopPageData.activeStyle=this.shopPageData.styleList[0]
  }
//  updated(){
//    this.addOrChangeControl('PhoneInput')
//  },
}
</script>
<style lang="less">
@import "../../assets/less/pages/shop/style.less";
</style>
