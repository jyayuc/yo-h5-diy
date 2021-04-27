<template>
  <div class="shop-page shop-personal">
      <el-container>
        <shop-header head-title="会员中心设置" :show-save="true" @saveAction="shopBackImageSave"/>
        <el-main class="personal-content">
             <div class="left-box">

                    <div class="personal-left-content">
                        <div class="bg-box-bg" :style="'background-image:url('+shopPageData.imageUrl+')'">
                        </div>
                        <div class="bg-box" :style="'background-image:url('+personalBg+')'">
                            <div class="bg-box-top" v-text="shopPageData.name">

                            </div>
                        </div>
                    </div>

                </div>
                <div class="right-box">
                    <!-- 图片导航设置 -->
                    <component-personal-set :active-component-data="shopPageData"/>

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
import ComponentPersonalSet from '@/components/shop/personal/component-personal-set.vue'
const personalBg = '/static/img/personal/per-bg.png'
export default {
  components: {
    ShopHeader,
    ComponentPersonalSet
  },

  data () {
    return {
      shopPageData: {},
      saveShopBackImageStatus: false,
      personalBg: personalBg
    }
  },

  computed: {

  },

  methods: {
    // 获取个人中心背景详情
    shopBackImageDetail () {
      const that = this
      const condition = {
        // tenantCode:'88000035',
        tenantCode: localStorage.getItem('tenantCode')
      }
      // condition.pageNo=0;
      that.$store.dispatch('shopBackImageDetail', condition).then(res => {
        tmCommon.log(res)
        const { status, msg, data } = res
        if (status === '200') {
          // const {totalPages,total,list}=data;
          // data.imageType=""
          if (!data.imageType) {
            data.imageType = 'SYSTEM'
            if (data.systemImages && data.systemImages.length > 0) {
              const systemImage = data.systemImages[0]
              for (const i in systemImage) {
                data.imageUrl = systemImage[i]
                data.imageId = i
                break
              }
            }
          }
          if (data.imageType == 'DIY') {
            data.imageDiyUrl = data.imageUrl
          } else {
            data.imageSystemUrl = data.imageUrl
          }
          if (!data.name) {
            data.name = '会员中心'
          }
          that.shopPageData = data
        } else {
          this.$message.error(msg)
        }
      })
    },
    // 保存个人中心背景详情
    shopBackImageSave () {
      const that = this
      if (that.saveShopBackImageStatus) {
        return
      }
      that.saveShopBackImageStatus = true
      const shopPageData = that.shopPageData
      const condition = {
        // tenantCode:'88000035',
        tenantCode: localStorage.getItem('tenantCode'),
        id: shopPageData.id,
        name: shopPageData.name,
        imageUrl: shopPageData.imageType == 'DIY' ? shopPageData.imageDiyUrl : shopPageData.imageSystemUrl,
        imageId: shopPageData.imageId,
        imageType: shopPageData.imageType
        // "updaterId": shopPageData
      }
      // condition.pageNo=0;
      that.$store.dispatch('shopBackImageSave', condition).then(res => {
        tmCommon.log(res)
        const { status, msg, data } = res
        if (status === '200') {
          that.$message({
            type: 'success',
            message: '更新成功',
            onClose () {
              that.saveShopBackImageStatus = false
            }
          })
        } else {
          that.saveShopBackImageStatus = false
          this.$message.error(msg)
        }
      }).catch(err => {
        that.saveShopBackImageStatus = false
      })
    }
  },

  created () {
    this.shopBackImageDetail()
  }
//  updated(){
//    this.addOrChangeControl('PhoneInput')
//  },
}
</script>
<style lang="less">
@import "../../assets/less/pages/shop/personal.less";
</style>
