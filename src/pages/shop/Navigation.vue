<template>
  <div class="shop-page shop-navigation">
        <el-container>
        <shop-header head-title="导航设置" :show-save="true" @saveAction="shopNavigationSave"/>
            <el-main class="navigation-content">
                <!-- <div class="left-box">
                    <div class="bg-box">
                        <div class="bg-box-top">
                            XXXX店铺
                        </div>
                        <ul class="bg-box-bottom">
                            <li v-for="(item,index) in activeComponentData.lines"
                            @click="selectNav(item)"
                            :class="{'active':item==activeNav}" :key="'bg-'+index">
                                <i class="bg-icon" :style="'background-image:url('+item.icon+')'"></i>
                                <i class="bg-title" :style="'width:'+360/activeComponentData.lines.length+'px'" v-text="item.name"></i>
                            </li>
                        </ul>
                    </div>

                </div>  -->
                <div class="center-box">
                    <div class="navigation-box" :style="'background-image:url('+tabBg+')'">
                        <component-navigation :component-data="activeComponentData"/>
                    </div>
                </div>
                <div class="right-box">
                    <!-- 图片导航设置 -->
                    <component-navigation-set   :active-component-data="activeComponentData"/>

                </div>
            </el-main>
        <el-footer>

        </el-footer>
        </el-container>
  </div>
</template>
<script>
import tmCommon from '@/common/common'
import ComponentNavigationSet from '@/components/shop/navigation/component-navigation-set.vue'
import ShopHeader from '@/components/shop/header.vue'
import ComponentNavigation from '@/components/shop/navigation/component-navigation.vue'
const tabBg = '/static/img/navigation/tab_bg.png'

const variablePool = {}
export default {
  components: {
    ShopHeader,
    ComponentNavigationSet,
    ComponentNavigation // 导航显示
  },
  data () {
    return {
      tabBg: tabBg,
      shopPageData: {},
      saveShopNavigationStatus: false, // 保存状态
      activeComponentData: {
        lines: [],
        activeImg: {},
        activeImgIndex: null
      }
    }
  },

  computed: {

  },

  methods: {
    // 获取导航详情
    shopNavigationDetail (callback) {
      const that = this
      const condition = {
        // tenantCode:'88000035',
        tenantCode: localStorage.getItem('tenantCode')
      }
      // condition.pageNo=0;
      that.$store.dispatch('shopNavigationDetail', condition).then(res => {
        tmCommon.log(res)
        const { status, msg, data } = res
        if (status === '200') {
          // that.activeComponentData.lines=data;
          // if(!data||data.length<1){
          // {"status":"200","msg":"success","data":[{"name":"首页","url":"pages/home/home"},{"name":"全部商品","url":"pages/plp/plp"},{"name":"购物车","url":"pages/shopcart/shopcart"},{"name":"会员中心","url":"pages/account/account"}]}
          // }
          that.$set(that.activeComponentData, 'lines', data)
          if (callback) {
            callback()
          }
        } else {
          this.$message.error(msg)
          if (callback) {
            callback()
          }
        }
      }).catch(err => {
        if (callback) {
          callback()
        }
      })
    },
    // 获取导航图标列表
    navigationIconList () {
      const that = this
      const condition = {
        // tenantCode:'88000035',
        tenantCode: localStorage.getItem('tenantCode')
      }
      // condition.pageNo=0;
      that.$store.dispatch('navigationIconList', condition).then(res => {
        tmCommon.log(res)
        const { status, msg, data } = res
        if (status === '200') {
          that.$set(that.activeComponentData, 'iconList', data)
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 保存导航
    shopNavigationSave () {
      const that = this
      if (that.saveShopNavigationStatus) {
        return
      }
      that.saveShopNavigationStatus = true
      const shopPageData = that.shopPageData
      let condition = {
        // tenantCode:'88000035',
        tenantCode: localStorage.getItem('tenantCode')
      }
      condition = this.activeComponentData.lines
      if (condition && condition.length > 0) {
        for (const i in condition) {
          const cond = condition[i]
          cond.sort = i
          if (!cond.name) {
            that.$message.error('请输入导航名称')
            that.saveShopNavigationStatus = false
            return
          }
          if (!cond.icon) {
            that.$message.error('请上传图标')
            that.saveShopNavigationStatus = false
            return
          }
          if (!cond.url) {
            that.$message.error('请选择链接')
            that.saveShopNavigationStatus = false
            return
          }
        }
      }
      // condition.pageNo=0;
      that.$store.dispatch('shopNavigationSave', condition).then(res => {
        tmCommon.log(res)
        const { status, msg, data } = res
        if (status === '200') {
          that.$message({
            type: 'success',
            message: '更新成功',
            onClose () {
              that.shopNavigationDetail(() => {
                that.saveShopNavigationStatus = false
              })
            }
          })
        } else {
          this.$message.error(msg)
          that.saveShopNavigationStatus = false
        }
      }).catch(err => {
        that.saveShopNavigationStatus = false
      })
    }
  },

  created () {
    this.shopNavigationDetail()
    this.navigationIconList()
  }
//  updated(){
//    this.addOrChangeControl('PhoneInput')
//  },
}
</script>
<style lang="less">
@import "../../assets/less/pages/shop/navigation.less";
</style>
