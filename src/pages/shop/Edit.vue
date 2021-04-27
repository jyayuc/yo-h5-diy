<template>
  <div class="shop-page shop-page-edit">
    <el-container>
      <shop-header
        @backAction="leaveShopEditPage"
        @publishAction="saveShopPage"
        head-title="微页面装修"
        :show-publish="true"
        :show-save="shopPageData.status != 1"
        @saveAction="saveShopPage('save')"
      ></shop-header>
      <el-main class="edit-content">
        <component-lib
          @dragStart="componentLibDragstart"
          @dragEnd="componentLibDragend"
        />
        <div class="center-box">
          <div class="component-box">
            <div class="component-show-box">
              <!-- <i class="el-icon-d-arrow-left"></i>
                            <i class="el-icon-d-arrow-right"></i> -->
              <!-- 店铺信息组件  背景图-->
              <component-info
                :class="{ active: activeComponentData === shopPageData }"
                :component-data="shopPageData"
                @selectComponent="selectCurrentComponent"
              />

              <!-- 可拖动组件 -->
              <drop
                class="component-drag-box"
                @dragover="componentListDragover"
                @dragleave="componentListDragleave"
                @drop="componentListDrop"
              >
                <!-- :image-x-offset="156"
                                    :image-y-offset="60" -->
                <drag
                  v-for="(item, index) in shopPageData.heads"
                  class="component-drag"
                  :key="'nav-drag-' + index"
                  effect-allowed="move"
                  drop-effect="move"
                  :data-index="index"
                  :image-x-offset="156"
                  :image-y-offset="60"
                  :class="{ active: activeComponentData === item && item.type != 'END' }"
                  @dragstart="componentListDragstart"
                  tag="section"
                  :draggable="item.type != 'END' ? true : false"
                  :transfer-data="{ index: index, tag: 'component-list' }"
                >
                  <i
                    class="el-icon-delete drag-click"
                    v-if="item.type != 'END'"
                    @click="removeCurrentComponent(index)"
                  ></i>
                  <div class="new" v-if="activeDragComponentIndex === index+''"></div>
                  <div class="border" v-if="item.type != 'END'"></div>

                  <div
                    class="top-box"
                    :data-index="index"
                    v-if="
                      activeDragComponentIndex != null &&
                      activeComponentType === 'component-lib'
                    "
                  ></div>
                  <div
                    class="cover-box"
                    :data-index="index"
                    v-if="
                      activeDragComponentIndex != null &&
                      activeComponentType === 'component-list'
                    "
                  ></div>
                  <div
                    class="bottom-box"
                    :data-index="index + 1"
                    v-if="
                      activeDragComponentIndex != null &&
                      activeComponentType === 'component-lib'
                    "
                  ></div>
                  <!-- 轮播图组件 swiper-->
                  <component-swiper
                    :ref="'swiper' + item.style + index"
                    v-if="item.type === 'SWIPER'"
                    @selectComponent="selectCurrentComponent"
                    :index="index"
                    :component-data="item"
                  />
                  <!-- <component-swiper :ref="'swiper'+item.style+index" v-if="item.type=='SWIPER'&&item.content.paddingType==2" @selectComponent="selectCurrentComponent" :index="index" :component-data="item"/> -->
                  <!-- <component-swiper1 :ref="'swiper'+item.style+index" v-if="item.type=='SWIPER'&&item.style=='broadcast'" @selectComponent="selectCurrentComponent" :count="1" :index="index" :component-data="item"/>
                                    <component-swiper2 :ref="'swiper'+item.style+index" v-if="item.type=='SWIPER'&&item.style=='broadcastTwoShow'" @selectComponent="selectCurrentComponent" :count="1" :index="index" :component-data="item"/>
                                    <component-swiper3 :ref="'swiper'+item.style+index" v-if="item.type=='SWIPER'&&item.style=='broadcastThreeShow'" @selectComponent="selectCurrentComponent" :count="1" :index="index" :component-data="item"/> -->
                  <!-- 商品列表组件 -->
                  <component-goods
                    v-if="item.type === 'COMMEND_PRODUCT'"
                    :icon-map="goodsIcoMap"
                    @selectComponent="selectCurrentComponent"
                    :index="index"
                    :component-data="item"
                  />
                  <!-- 图片组件 -->
                  <component-pic
                    v-if="item.type === 'PIC'"
                    @selectComponent="selectCurrentComponent"
                    :index="index"
                    :component-data="item"
                  />

                  <!-- 图片导航组件 -->
                  <component-pic-nav
                    v-if="item.type === 'NAVIGATION'"
                    @selectComponent="selectCurrentComponent"
                    :index="index"
                    :component-data="item"
                  />

                  <!-- 标题组件 -->
                  <component-title
                    v-if="item.type === 'TITLE'"
                    @selectComponent="selectCurrentComponent"
                    :index="index"
                    :component-data="item"
                  />

                  <!-- 文本组件 -->
                  <component-text
                    v-if="item.type === 'TEXT'"
                    @selectComponent="selectCurrentComponent"
                    :index="index"
                    :component-data="item"
                  />

                  <!-- 视频组件 -->
                  <component-video
                    v-if="item.type === 'VIDEO'"
                    @selectComponent="selectCurrentComponent"
                    :index="index"
                    :component-data="item"
                  />

                  <!-- 搜索组件 -->
                  <component-search
                    v-if="item.type === 'SECEACH_BOX'"
                    :index="index"
                    :component-data="item"
                    @selectComponent="selectCurrentComponent"
                  />

                  <!-- 结束组件 -->
                  <component-end
                    v-if="item.type === 'END' && activeComponentType === 'component-lib'"
                    :index="index"
                  />

                  <div class="component-scale" slot="image" v-if="!isSafari">
                    <!-- 轮播图组件 swiper-->
                    <component-swiper
                      :type="'solt'"
                      v-if="item.type === 'SWIPER'"
                      @selectComponent="selectCurrentComponent"
                      :count="1"
                      :index="index"
                      :component-data="item"
                    />
                    <!-- <component-swiper1 :type="'solt'"  v-if="item.type=='SWIPER'&&item.style=='broadcast'" @selectComponent="selectCurrentComponent" :count="1" :index="index" :component-data="item"/>
                                        <component-swiper2 :type="'solt'" v-if="item.type=='SWIPER'&&item.style=='broadcastTwoShow'" @selectComponent="selectCurrentComponent" :count="1" :index="index" :component-data="item"/>
                                        <component-swiper3 :type="'solt'" v-if="item.type=='SWIPER'&&item.style=='broadcastThreeShow'" @selectComponent="selectCurrentComponent" :count="1" :index="index" :component-data="item"/>
                                     -->
                    <!-- 商品列表组件 -->
                    <component-goods
                      v-if="item.type === 'COMMEND_PRODUCT'"
                      :icon-map="goodsIcoMap"
                      @selectComponent="selectCurrentComponent"
                      :index="index"
                      :component-data="item"
                    />
                    <!-- 图片组件 -->
                    <component-pic
                      v-if="item.type === 'PIC'"
                      @selectComponent="selectCurrentComponent"
                      :index="index"
                      :component-data="item"
                    />

                    <!-- 图片导航组件 -->
                    <component-pic-nav
                      v-if="item.type === 'NAVIGATION'"
                      @selectComponent="selectCurrentComponent"
                      :index="index"
                      :component-data="item"
                    />

                    <!-- 标题组件 -->
                    <component-title
                      v-if="item.type === 'TITLE'"
                      @selectComponent="selectCurrentComponent"
                      :index="index"
                      :component-data="item"
                    />

                    <!-- 文本组件 -->
                    <component-text
                      v-if="item.type === 'TEXT'"
                      @selectComponent="selectCurrentComponent"
                      :index="index"
                      :component-data="item"
                    />

                    <!-- 视频组件 -->
                    <component-video
                      v-if="item.type === 'VIDEO'"
                      @selectComponent="selectCurrentComponent"
                      :index="index"
                      :component-data="item"
                    />

                    <!-- 搜索组件 -->
                    <component-search
                      v-if="item.type === 'SECEACH_BOX'"
                      :index="index"
                      :component-data="item"
                      @selectComponent="selectCurrentComponent"
                    />
                  </div>
                </drag>
              </drop>

              <!--主页导航组件-->
            </div>
          </div>
        </div>
        <div class="right-box">
          <!-- 导航设置 -->
          <component-info-set
            v-if="activeComponentData.type === 'info'"
            :active-component-data="activeComponentData"
          />
          <!-- 轮播图设置 -->
          <component-swiper-set
            v-if="activeComponentData.type === 'SWIPER'"
            :active-component-data="activeComponentData"
          />
          <!-- 商品设置 -->
          <component-goods-set
            v-if="activeComponentData.type === 'COMMEND_PRODUCT'"
            :active-component-data="activeComponentData"
          />
          <!-- 图片设置 -->
          <component-pic-set
            v-if="activeComponentData.type === 'PIC'"
            :active-component-data="activeComponentData"
          />
          <!-- 图片导航设置 -->
          <component-pic-nav-set
            v-if="activeComponentData.type === 'NAVIGATION'"
            :active-component-data="activeComponentData"
          />
          <!-- 标题设置 -->
          <component-title-set
            v-if="activeComponentData.type === 'TITLE'"
            :active-component-data="activeComponentData"
          />
          <!-- 文本设置 -->
          <component-text-set
            v-if="activeComponentData.type === 'TEXT'"
            :active-component-data="activeComponentData"
          />
          <!-- 视频设置 -->
          <component-video-set
            v-if="activeComponentData.type === 'VIDEO'"
            :active-component-data="activeComponentData"
          />
          <!-- 搜索设置 -->
          <component-search-set
            v-if="activeComponentData.type === 'SECEACH_BOX'"
            :active-component-data="activeComponentData"
          />

          <!-- <div class="component-operate-other" v-if="false">
                        <div class="nav-title">导航设置</div>
                        <div class="component-operate-content">
                        </div>
                    </div> -->

          <!-- <el-button class="add-nav-btn" icon="el-icon-plus" type="primary" @click="addNav">增加</el-button> -->
        </div>
      </el-main>
      <el-footer> </el-footer>
    </el-container>
  </div>
</template>
<script>
// import { mapMutations, mapState, mapGetters  } from 'vuex'
// import 'swiper/dist/css/swiper.css'
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import tmCommon from '@/common/common'
// import testIcon from '../../../images/demo/upload.jpg'

// const defaultImgBig="/static/img/default-img-big.png"
// const defaultImgSmall="/static/img/default-img-small.png"
import ShopHeader from '@/components/shop/header.vue'
import ComponentLib from '@/components/shop/component-lib.vue'
import ComponentInfo from '@/components/shop/component-info.vue'
import ComponentInfoSet from '@/components/shop/component-info-set.vue'
import ComponentGoods from '@/components/shop/component-goods.vue'
import ComponentGoodsSet from '@/components/shop/component-goods-set.vue'
import ComponentSwiper from '@/components/shop/component-swiper.vue'
// import ComponentSwiper1 from '../components/component-swiper-1.vue'
// import ComponentSwiper2 from '../components/component-swiper-2.vue'
// import ComponentSwiper3 from '../components/component-swiper-3.vue'
import ComponentSwiperSet from '@/components/shop/component-swiper-set.vue'
import ComponentPic from '@/components/shop/component-pic.vue'
import ComponentPicSet from '@/components/shop/component-pic-set.vue'
import ComponentPicNav from '@/components/shop/component-pic-nav.vue'
import ComponentPicNavSet from '@/components/shop/component-pic-nav-set.vue'
import ComponentTitle from '@/components/shop/component-title.vue'
import ComponentTitleSet from '@/components/shop/component-title-set.vue'
import ComponentText from '@/components/shop/component-text.vue'
import ComponentTextSet from '@/components/shop/component-text-set.vue'
import ComponentVideo from '@/components/shop/component-video.vue'
import ComponentVideoSet from '@/components/shop/component-video-set.vue'
import ComponentSearch from '@/components/shop/component-search.vue'
import ComponentSearchSet from '@/components/shop/component-search-set.vue'
import ComponentEnd from '@/components/shop/component-end.vue'

const hotEn = '/static/img/edit/goods/hot-en.svg'
const hotZh = '/static/img/edit/goods/hot-zh.png'
const newEn = '/static/img/edit/goods/new-en.png'
const newZh = '/static/img/edit/goods/new-zh.png'

const goodsIcoMap = {
  1: newZh,
  2: hotZh,
  3: newEn,
  4: hotEn
}
// import ShopSwiper from '../components/swiper.vue'
const variablePool = tmCommon.variablePool

// let swiperStyleList=[//轮播图样式列表
//         {icon:swiperStyle1,type:1},
//         {icon:swiperStyle2,type:2},
//         {icon:swiperStyle3,type:3},
//     ];
// let picStyleList=[//轮播图样式列表
//         {icon:picStyle1,type:1},
//         {icon:picStyle2,type:2},
//         {icon:picStyle3,type:3},
//         {icon:picStyle4,type:4},
//         {icon:picStyle5,type:5},
//         {icon:picStyle6,type:6},
//     ];
// let goodsStyleList=[//商品图样式列表
//         {icon:goodsStyle1,type:1},
//         {icon:goodsStyle2,type:2},
//     ];

// let componentInfoData={
//         type:'info',
//         name:"XXXX店铺",
//         desc:"XXXX店铺详情",
//         // url:titleBg,
//     },
const componentSearchData = {
  type: 'SECEACH_BOX',
  sort: 0,
  content: {
    seceachHint: ''
  }
}
const componentSwiperData = {
  type: 'SWIPER',
  sort: 1,
  style: 'broadcast',
  content: {
    paddingType: 1
  },
  lines: [
    {
      content: {
        swiperPicName: '',
        swiperPicUrl: '',
        swiper2Url: '',
        swiper2Name: ''
      },
      goodsInfo: {}
    }
  ]
}
const componentPicData = {
  type: 'PIC',
  sort: 2,
  style: 'rowTwo',
  paddingType: 1,
  content: {
    paddingType: 1
  },
  lines: [
    {
      content: {
        swiperPicName: '',
        swiperPicUrl: '',
        swiper2Url: '',
        swiper2Name: ''
      },
      goodsInfo: {}
    },
    {
      content: {
        swiperPicName: '',
        swiperPicUrl: '',
        swiper2Url: '',
        swiper2Name: ''
      },
      goodsInfo: {}
    },
    {
      content: {
        swiperPicName: '',
        swiperPicUrl: '',
        swiper2Url: '',
        swiper2Name: ''
      },
      goodsInfo: {}
    }
  ]
}
const componentPicNavData = {
  type: 'NAVIGATION',
  sort: 2,
  style: 'bigSmall',
  lines: [
    {
      sort: 0,
      content: {
        navigationBackColor: '',
        navigationTitleColor: '',
        navigationPicName: '',
        navigationPicUrl: '',
        navigation2Url: ''
      }
    },
    {
      content: {
        navigationBackColor: '',
        navigationTitleColor: '',
        navigationPicName: '',
        navigationPicUrl: '',
        navigation2Url: ''
      }
    },
    {
      content: {
        navigationBackColor: '',
        navigationTitleColor: '',
        navigationPicName: '',
        navigationPicUrl: '',
        navigation2Url: ''
      }
    },
    {
      content: {
        navigationBackColor: '',
        navigationTitleColor: '',
        navigationPicName: '',
        navigationPicUrl: '',
        navigation2Url: ''
      }
    }
  ]
}
const componentGoodsData = {
  type: 'COMMEND_PRODUCT',
  style: 1, // 1 平铺   2列表
  sort: 0,
  content: {
    productType: 1, // 1 商品  商品分类
    productUrl: '', // 图片地址,
    productShowName: true, // 显示商品名,//boolean
    productShowPrice: true, // 显示商品价格,//boolean
    productShowSubscript: false, // 显示商品角标,//boolean
    productSubscriptType: 1 // 角标类型//1:新品;2:热卖;3:NEW;4:HOT
  },
  lines: []
}
const componentTitleData = {
  type: 'TITLE',
  content: {
    titleName: '', // 标题名,
    titleFont: '', // 标题字体,
    titleSize: 14, // 标题字大小
    titleColor: '#000000', // 标题颜色,
    titleAlign: '', // 标题对齐,//left,center,right
    titleIsMore: true, // 是否启用更多链接,//boolean
    titleMoreUrl: '', // 更多--链接,
    titleTextMore: true, // 是否显示更多
    titleArrowMore: true // 是否显示箭头
    // titleMoreShowType:1,//更多显示类型//1:显示;2:箭头
  }
}
const componentTextData = {
  type: 'TEXT',
  content: {
    textType: 'default', // 文本类型  default 普通文本 rich 富文本
    textShowStyle: 'roll', // 显示类型 roll 滚动显示 line 分行显示
    textContentDefault: '请填写内容，超过一行将滚动显示',
    textContentRich:
        '<p><span style="font-size: 16px;"><br/></span></p ><p><span style="font-size: 16px;">您现在使用的是一个富文本组件，在【富文本】里，您可以对文字进行</span><span style="font-size: 16px; font-family: 隶书, SimLi;">字体</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; font-weight: bold;">加粗</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; font-style: italic;">斜体</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; text-decoration-line: underline;">下划线</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; text-decoration-line: line-through;">删除线</span><span style="font-size: 16px;">、</span><span style="font-size: 16px; color: rgb(82, 140, 216);">文字颜色</span><span style="font-size: 16px;">、</span>      <span style="font-size: 16px; background-color: rgb(250, 226, 32);">背景色</span><span style="font-size: 16px;">、以及</span>      <span style="font-size: 26px;">字号大小</span><span style="font-size: 16px;">等排版操作。</span></p ><p><span style="font-size: 16px;"><br/></span></p ><span style="font-size: 16px; color: rgb(255, 255, 255);">------</span>',
    textContent: ''
  }
}
const componentEndData = {
  type: 'END'
}
const componentVideoData = {
  type: 'VIDEO',
  content: {
    paddingType: 1,
    videoUrl: '', // 视频地址,
    videoProportion: '', // 播放比例,
    videoCoverType: '', // 封面图类型,//可以参考--原视频封面,default;自定义封面--policy
    videoCoverUrl: '', // 封面图地址,
    videoTitle: '', // 视频标题,
    videoDesc: '' // 视频简介
  }
}

export default {
  components: {
    ShopHeader,
    ComponentLib, // 组件库
    ComponentInfo, // 店铺信息
    ComponentInfoSet, // 店铺信息设置
    ComponentSwiper, // 轮播图
    //  ComponentSwiper1,
    //  ComponentSwiper2,
    //  ComponentSwiper3,
    ComponentSwiperSet, // 轮播图设置
    ComponentPic, // 图片组合
    ComponentPicSet, // 图片组合设置
    ComponentPicNav, // 图片导航
    ComponentPicNavSet, // 图片导航设置
    ComponentTitle, // 标题
    ComponentTitleSet, // 标题设置
    ComponentText, // 文本
    ComponentTextSet, // 文本设置
    ComponentVideo, // 视频
    ComponentVideoSet, // 视频设置
    ComponentSearch, // 搜索
    ComponentSearchSet, // 搜索设置
    ComponentGoods, // 商品列表
    ComponentGoodsSet, // 商品列表设置
    ComponentEnd
    //  ShopSwiper,
    //  swiper,
    //  swiperSlide
  },
  data () {
    return {
      // testIcon:testIcon,
      // defaultImgBig:defaultImgBig,
      // // defaultImgSmall:defaultImgSmall,
      isSafari:
          /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
      saveShopPageStatus: false, // 保存状态
      activeComponentType: '',
      activeDragComponentIndex: null, // 当前选中的可拖动组件索引
      // activeDragComponent:null,//当前选中的可拖动组件
      showUploadImgDialogStatus: false, // 显示上传图片组件
      goodsIcoMap: goodsIcoMap,
      shopPageData: {
        id: this.$route.query.id,
        name: '',
        desc: '',
        type: 'info',
        tenantCode: localStorage.getItem('tenantCode'),
        // tenant_code:"20180707",
        heads: [
          componentSearchData,
          // componentSwiperData,
          // componentPicData,
          // componentPicNavData,
          // componentTextData,
          // componentTitleData,
          // componentGoodsData,
          // componentVideoData,
          componentEndData
        ]
      },
      activeComponentData: {} // 选中的组件数据
      // infoComponentData:componentInfoData,
      // searchComponentData:{
      //     type:'SECEACH_BOX',
      //     placeholder:"搜索..."
      // },
      // activeSliderImg:{},
      // activeSelectUploadImgObj:{},
      // componentLists:[
      //     // tmCommon.clone(componentSearchData),
      //     // tmCommon.clone(componentTextData),
      //     // // tmCommon.clone(componentVideoData),
      //     // tmCommon.clone(componentSwiperData),
      //     // tmCommon.clone(componentGoodsData),
      //     // tmCommon.clone(componentPicData),
      //     // tmCommon.clone(componentTitleData),
      //     // tmCommon.clone(componentPicNavData),
      // ],//组件列表
      // activeSelectStyle:null,//当前选中的轮播样式
      // activeStyle:null,//确认选中的轮播样式
      // styleList:[//轮播图样式列表
      //     {icon:style1,type:1},
      //     {icon:style2,type:2},
      //     {icon:style3,type:3},
      // ],
    }
  },

  computed: {},
  destroyed () {
    window.removeEventListener('beforeunload', this.beforeunloadHandler2, false)
    window.removeEventListener('popstate', this.beforeunloadHandler, false)
  },
  created () {
    const that = this
    that.activeComponentData = that.shopPageData
    that.getShopPageDetail()
  },
  mounted () {
    // const that = this
    //  window.onbeforeunload=function(){
    //     alert("确定要离开页面？提示编辑的内容还未保存，离开页面将会丢失");
    //     // that.leaveShopEditPage();
    //  };
    variablePool.unloadStatus = false
    // window.addEventListener('beforeunload',this.beforeunloadHandler2,false);
    // 页面刷新或关闭提示
    window.onbeforeunload = function (event) {
      event = event || window.event
      if (event) {
        event.returnValue = '确定要离开页面？提示编辑的内容还未保存，离开页面将会丢失'
      }
      return '确定要离开页面？提示编辑的内容还未保存，离开页面将会丢失'
    }
    //  window.addEventListener("popstate", function(e) {
    //     that.leaveShopEditPage();
    //     window.removeEventListener("popstate")
    // }, false);
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.beforeunloadHandler, false)
    }
  },
  methods: {
    beforeunloadHandler (e) {
      //   tmCommon.error("beforeunloadHandler",variablePool.unloadStatus)
      if (!variablePool.unloadStatus) {
        this.leaveShopEditPage()
      }
    },
    beforeunloadHandler2 (e) {
      const that = this
      //   tmCommon.error("beforeunloadHandler",variablePool.unloadStatus)
      if (!variablePool.unloadStatus) {
        const status = window.confirm(
          '确定要离开页面？提示编辑的内容还未保存，离开页面将会丢失'
        )
        if (status) {
          variablePool.unloadStatus = true
          // tmCommon.error("cancel",variablePool.unloadStatus)
          that.$router.push({ path: '/shop/manager' })
        } else {
          variablePool.unloadStatus = true
          that.saveShopPage('save')
        }
      }
    },

    leaveShopEditPage () {
      const that = this
      that
        .$confirm(
          "确定要离开页面？<br> <p class='leave-tips'>提示编辑的内容还未保存，离开页面将会丢失</p>",
          '离开页面',
          {
            confirmButtonText: '确定离开',
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
            cancelButtonText: '保存内容',
            customClass: 'shop-page-dialog',
            cancelButtonClass: 'shop-page-dialog-confirm',
            confirmButtonClass: 'shop-page-dialog-cancel'
          }
        )
        .then(() => {
          variablePool.unloadStatus = true
          // tmCommon.error("cancel",variablePool.unloadStatus)
          that.$router.push({ path: '/shop/manager' })
        })
        .catch((action) => {
          if (action === 'close') {
            variablePool.unloadStatus = false
            console.error('action', action, variablePool.unloadStatus)
          } else if (action === 'cancel') {
            console.error('action', action, variablePool.unloadStatus)
            variablePool.unloadStatus = true
            that.saveShopPage('save')
          }
        })
    },
    // 选择组件
    selectCurrentComponent (item, index) {
      this.activeDragComponentIndex = null
      item.orderIndex = index
      this.activeComponentData = item
    },
    // 点击发布
    openPublishPage () {
      const that = this
      //    this.$confirm('确定发布页面吗？', '提示', {
      //       confirmButtonText: '确认发布',
      //       cancelButtonText: '取消',
      //       customClass:"shop-page-dialog",
      //       cancelButtonClass:'shop-page-dialog-cancel',
      //       confirmButtonClass:'shop-page-dialog-confirm',
      //     }).then(() => {
      //     }).catch(() => {
      //       this.$message({
      //         type: 'info',
      //         message: '已取消发布'
      //       });
      //     });

      that.publishPage()
    },
    // 发布页面
    publishPage () {
      const that = this
      that.$store
        .dispatch('publishShopPage', { id: that.shopPageData.id })
        .then((res) => {
          // tmCommon.log(res)
          const { status, msg } = res
          if (status === '200') {
            that.$message({
              type: 'success',
              message: '页面保存并发布成功',
              duration: 300,
              onClose () {
                that.saveShopPageStatus = false
                that.$router.push({ path: '/shop/manager' })
              }
            })
          } else {
            that.saveShopPageStatus = false
            this.$message.error(msg)
          }
        })
        .catch((err) => {
          that.saveShopPageStatus = false
          tmCommon.error(err)
        })
    },
    // 获取页面详情
    getShopPageDetail () {
      const that = this
      const id = that.$route.query.id
      const type = that.$route.query.type
      if (!id && id !== 0 && id !== 1) {
        return
      }
      const tenantCode = localStorage.getItem('tenantCode')
      // tenantCode: '880001',
      // let   tenantCode='20180707';
      that.$store
        .dispatch('getShopPageDetail', { id: id, tenantCode: tenantCode })
        .then((res) => {
          res = {
            status: '200',
            msg: '查询详情成功',
            data: {
              id: 117,
              name: '极闪购运动生活馆11',
              desc: '',
              tenantCode: 88000087,
              status: '1',
              heads: [
                {
                  id: 19749,
                  type: 'SECEACH_BOX',
                  sort: '0',
                  createTime: '20181015163959',
                  updateTime: '20181015163959',
                  logicDelete: false,
                  pageId: 117,
                  content: '%7B%22seceachHint%22%3A%22%22%7D',
                  lines: []
                },
                {
                  id: 19750,
                  type: 'SWIPER',
                  sort: '1',
                  style: 'broadcast',
                  createTime: '20181015163959',
                  updateTime: '20181015163959',
                  logicDelete: false,
                  pageId: 117,
                  content: '%7B%7D',
                  lines: [
                    {
                      id: 38412,
                      headId: 19750,
                      content:
                          '{"swiperPicName":"","swiperPicUrl":"https://tic-casaba.oss-cn-shanghai.aliyuncs.com/88000087/95f02467-88ef-4096-a194-9aa4ed287e04.jpg","swiper2Url":"","swiper2Name":""}',
                      sort: 0,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo: '{}',
                      contentMap: {
                        swiperPicName: '',
                        swiper2Name: '',
                        swiperPicUrl:
                            'https://tic-casaba.oss-cn-shanghai.aliyuncs.com/88000087/95f02467-88ef-4096-a194-9aa4ed287e04.jpg',
                        swiper2Url: ''
                      }
                    },
                    {
                      id: 38413,
                      headId: 19750,
                      content:
                          '{"swiperPicName":"","swiperPicUrl":"https://tic-casaba.oss-cn-shanghai.aliyuncs.com/88000087/04d5eaf3-144c-4891-bf1b-1bd9fb5c2a32.jpg","swiper2Url":"","swiper2Name":""}',
                      sort: 1,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo: '{}',
                      contentMap: {
                        swiperPicName: '',
                        swiper2Name: '',
                        swiperPicUrl:
                            'https://tic-casaba.oss-cn-shanghai.aliyuncs.com/88000087/04d5eaf3-144c-4891-bf1b-1bd9fb5c2a32.jpg',
                        swiper2Url: ''
                      }
                    },
                    {
                      id: 38414,
                      headId: 19750,
                      content:
                          '{"swiperPicName":"","swiperPicUrl":"https://tic-casaba.oss-cn-shanghai.aliyuncs.com/88000087/adf353cf-61f5-4c0a-bfa8-c40706210090.jpg","swiper2Url":"","swiper2Name":""}',
                      sort: 2,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo: '{}',
                      contentMap: {
                        swiperPicName: '',
                        swiper2Name: '',
                        swiperPicUrl:
                            'https://tic-casaba.oss-cn-shanghai.aliyuncs.com/88000087/adf353cf-61f5-4c0a-bfa8-c40706210090.jpg',
                        swiper2Url: ''
                      }
                    },
                    {
                      id: 38415,
                      headId: 19750,
                      content:
                          '{"swiperPicName":"","swiperPicUrl":"https://tic-casaba.oss-cn-shanghai.aliyuncs.com/88000087/e154dbdf-599d-4b41-b7e4-0cf71b79e97f.jpg","swiper2Url":"","swiper2Name":""}',
                      sort: 3,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo: '{}',
                      contentMap: {
                        swiperPicName: '',
                        swiper2Name: '',
                        swiperPicUrl:
                            'https://tic-casaba.oss-cn-shanghai.aliyuncs.com/88000087/e154dbdf-599d-4b41-b7e4-0cf71b79e97f.jpg',
                        swiper2Url: ''
                      }
                    }
                  ]
                },
                {
                  id: 19751,
                  type: 'SWIPER',
                  sort: '2',
                  style: 'broadcast',
                  createTime: '20181015163959',
                  updateTime: '20181015163959',
                  logicDelete: false,
                  pageId: 117,
                  content: '%7B%22paddingType%22%3A1%7D',
                  lines: [
                    {
                      id: 38416,
                      headId: 19751,
                      content:
                          '{"swiperPicName":"","swiperPicUrl":"https://tic-casaba.oss-cn-shanghai.aliyuncs.com/88000087/95f02467-88ef-4096-a194-9aa4ed287e04.jpg","swiper2Url":"","swiper2Name":"","linkName":"","width":1280,"height":640}',
                      sort: 0,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo: '{}',
                      contentMap: {
                        swiperPicName: '',
                        width: 1280,
                        swiper2Name: '',
                        swiperPicUrl:
                            'https://tic-casaba.oss-cn-shanghai.aliyuncs.com/88000087/95f02467-88ef-4096-a194-9aa4ed287e04.jpg',
                        linkName: '',
                        swiper2Url: '',
                        height: 640
                      }
                    }
                  ]
                },
                {
                  id: 19752,
                  type: 'COMMEND_PRODUCT',
                  sort: '3',
                  style: '1',
                  createTime: '20181015163959',
                  updateTime: '20181015163959',
                  logicDelete: false,
                  pageId: 117,
                  content:
                      '%7B%22productType%22%3A1%2C%22productUrl%22%3A%22%22%2C%22productShowName%22%3Atrue%2C%22productShowPrice%22%3Atrue%2C%22productShowSubscript%22%3Afalse%2C%22productSubscriptType%22%3A1%7D',
                  lines: [
                    {
                      id: 38417,
                      headId: 19752,
                      content: '{}',
                      sort: 0,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/1537950937732053ce099-0443-4628-ba77-b70100603ba1.jpg","code":"7a262f7f-af3a-45d7-9040-2e04899e490d","subTitle":"CHAKRA BRA澳弥尼瑜伽服","salePrice":359,"saleStatus":1,"title":"AUMNIE| 女士新款运动内衣【脉轮胸围】","category":"运动内衣","listPrice":359,"listTime":"2018-09-26 17:10:45"}',
                      contentMap: {}
                    },
                    {
                      id: 38418,
                      headId: 19752,
                      content: '{}',
                      sort: 1,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/15379514987927f2ac4db-0c17-419a-86ab-d209bbe0bec15.jpg","code":"dcdb45bc-580a-4f3f-a726-822869167dc2","subTitle":"BOXED LOGO OVERSIZ","salePrice":295,"saleStatus":1,"title":"AUMNIE| 宽松露脐方形LOGO T恤 ","category":"T恤","listPrice":295,"listTime":"2018-09-26 17:10:45"}',
                      contentMap: {}
                    }
                  ]
                },
                {
                  id: 19753,
                  type: 'COMMEND_PRODUCT',
                  sort: '4',
                  style: '1',
                  createTime: '20181015163959',
                  updateTime: '20181015163959',
                  logicDelete: false,
                  pageId: 117,
                  content:
                      '%7B%22productType%22%3A1%2C%22productUrl%22%3A%22%22%2C%22productShowName%22%3Atrue%2C%22productShowPrice%22%3Atrue%2C%22productShowSubscript%22%3Afalse%2C%22productSubscriptType%22%3A1%7D',
                  lines: [
                    {
                      id: 38419,
                      headId: 19753,
                      content: '{}',
                      sort: 0,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/15379520697586b46898f-2661-4a6c-a930-bb1957bc70f2.jpg","code":"f18b3ddd-cf3d-4e3c-84f2-8632560068e9","subTitle":null,"salePrice":519,"saleStatus":1,"title":"耐克NIKE JD瑜伽垫2.0","category":"瑜伽垫","listPrice":519,"listTime":"2018-09-26 17:10:45"}',
                      contentMap: {}
                    },
                    {
                      id: 38420,
                      headId: 19753,
                      content: '{}',
                      sort: 1,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/15379523197655ea8d974-297a-4d5a-82e6-9588acb54c71.jpg","code":"aab26de2-5071-48a2-b89e-6c7b8751b8eb","subTitle":null,"salePrice":309,"saleStatus":1,"title":"耐克瑜伽毯3MM NYE02","category":"瑜伽毯","listPrice":309,"listTime":"2018-09-26 17:10:45"}',
                      contentMap: {}
                    }
                  ]
                },
                {
                  id: 19754,
                  type: 'COMMEND_PRODUCT',
                  sort: '5',
                  style: '1',
                  createTime: '20181015163959',
                  updateTime: '20181015163959',
                  logicDelete: false,
                  pageId: 117,
                  content:
                      '%7B%22productType%22%3A1%2C%22productUrl%22%3A%22%22%2C%22productShowName%22%3Atrue%2C%22productShowPrice%22%3Atrue%2C%22productShowSubscript%22%3Afalse%2C%22productSubscriptType%22%3A1%7D',
                  lines: [
                    {
                      id: 38421,
                      headId: 19754,
                      content: '{}',
                      sort: 0,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/15379501319912cc9ec27-b705-4fb9-9276-e3d4818b91ae.jpg","code":"8f3b3306-47a2-4075-9298-19848186d7b7","subTitle":null,"salePrice":179,"saleStatus":1,"title":"耐克NPC踝部护套 NMS32","category":"护套","listPrice":179,"listTime":"2018-09-26 17:10:45"}',
                      contentMap: {}
                    },
                    {
                      id: 38422,
                      headId: 19754,
                      content: '{}',
                      sort: 1,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/153795033177911cebb16-d7bf-4a6c-8f4c-2d893154dcb3.jpg","code":"28c26b95-310d-4148-906b-84bbbdc55041","subTitle":null,"salePrice":219,"saleStatus":1,"title":"耐克NPC小腿护套2.0 NMS72","category":"护套","listPrice":219,"listTime":"2018-09-26 17:10:45"}',
                      contentMap: {}
                    }
                  ]
                },
                {
                  id: 19755,
                  type: 'COMMEND_PRODUCT',
                  sort: '6',
                  style: '1',
                  createTime: '20181015163959',
                  updateTime: '20181015163959',
                  logicDelete: false,
                  pageId: 117,
                  content:
                      '%7B%22productType%22%3A1%2C%22productUrl%22%3A%22%22%2C%22productShowName%22%3Atrue%2C%22productShowPrice%22%3Atrue%2C%22productShowSubscript%22%3Afalse%2C%22productSubscriptType%22%3A1%7D',
                  lines: [
                    {
                      id: 38423,
                      headId: 19755,
                      content: '{}',
                      sort: 0,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/1537949607485ae25cf87-c9ba-4f91-8a69-ddd8070f004b.jpg","code":"1d14f3b3-3179-42e9-9f31-10fc6e92d5d0","subTitle":null,"salePrice":109,"saleStatus":1,"title":"NIKE耐克瑜伽砖 NYE12","category":"瑜伽砖","listPrice":109,"listTime":"2018-09-26 17:10:46"}',
                      contentMap: {}
                    },
                    {
                      id: 38424,
                      headId: 19755,
                      content: '{}',
                      sort: 1,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/1537949824219c53a9981-c181-4395-b054-b696e60853e4.jpg","code":"550ae783-4a31-4462-ae8c-57ece7c601b9","subTitle":null,"salePrice":209,"saleStatus":1,"title":"NIKE耐克VERSA TACK篮球 黑金","category":"篮球","listPrice":209,"listTime":"2018-09-26 17:10:45"}',
                      contentMap: {}
                    }
                  ]
                },
                {
                  id: 19756,
                  type: 'COMMEND_PRODUCT',
                  sort: '7',
                  style: '1',
                  createTime: '20181015163959',
                  updateTime: '20181015163959',
                  logicDelete: false,
                  pageId: 117,
                  content:
                      '%7B%22productType%22%3A1%2C%22productUrl%22%3A%22%22%2C%22productShowName%22%3Atrue%2C%22productShowPrice%22%3Atrue%2C%22productShowSubscript%22%3Afalse%2C%22productSubscriptType%22%3A1%7D',
                  lines: [
                    {
                      id: 38425,
                      headId: 19756,
                      content: '{}',
                      sort: 0,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/15379505029102c03084c-b2ae-432a-9a10-39b17bf734ae.jpg","code":"986976de-cf2d-4694-a775-f32d393d32f6","subTitle":null,"salePrice":299,"saleStatus":1,"title":"耐克N+IP5精英臀带NRN17","category":"臀带","listPrice":299,"listTime":"2018-09-26 17:10:45"}',
                      contentMap: {}
                    },
                    {
                      id: 38426,
                      headId: 19756,
                      content: '{}',
                      sort: 1,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/1537950677513da31398d-ae0a-47a0-86d5-2bc545c91fa0.jpg","code":"29667c71-0da5-420f-a11d-824863e88059","subTitle":null,"salePrice":189,"saleStatus":1,"title":"NIKE耐克轻巧跑步腰包NRL46","category":"跑步腰包","listPrice":189,"listTime":"2018-09-26 17:10:45"}',
                      contentMap: {}
                    }
                  ]
                },
                {
                  id: 19757,
                  type: 'COMMEND_PRODUCT',
                  sort: '8',
                  style: '1',
                  createTime: '20181015163959',
                  updateTime: '20181015163959',
                  logicDelete: false,
                  pageId: 117,
                  content:
                      '%7B%22productType%22%3A1%2C%22productUrl%22%3A%22%22%2C%22productShowName%22%3Atrue%2C%22productShowPrice%22%3Atrue%2C%22productShowSubscript%22%3Afalse%2C%22productSubscriptType%22%3A1%7D',
                  lines: [
                    {
                      id: 38427,
                      headId: 19757,
                      content: '{}',
                      sort: 0,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/1537949120132710e2b12-fb1a-45d1-b3a9-b8d713ef92e9.jpg","code":"744f0cbb-4983-452c-aab7-ad64a0a40c84","subTitle":null,"salePrice":189,"saleStatus":1,"title":"耐克印花运动束发带NJNC7","category":"束发带","listPrice":189,"listTime":"2018-09-26 17:10:54"}',
                      contentMap: {}
                    },
                    {
                      id: 38428,
                      headId: 19757,
                      content: '{}',
                      sort: 1,
                      createTime: '20181015163959',
                      updateTime: '20181015163959',
                      logicDelete: false,
                      pageId: 117,
                      goodsInfo:
                          '{"picUrl":"https://product-res.baozun.com/ucloud/88000087/images/1537947880316e30e8ade-25c2-47f2-9ce3-7680c1ed3209.jpg","code":"1614d99b-79a9-4e77-8d4c-c79458f2db48","subTitle":null,"salePrice":149,"saleStatus":1,"title":"耐克METALLIC束发带NJNG8","category":"束发带","listPrice":149,"listTime":"2018-09-26 17:10:54"}',
                      contentMap: {}
                    }
                  ]
                }
              ],
              pageType: 'home'
            }
          }
          // tmCommon.log(res)
          const { status, msg, data } = res
          if (status === '200') {
            data.type = 'info'
            if (type === 'copy') {
              data.id = ''
            }
            const heads = data.heads
            if (heads && heads.length > 0) {
              // tmCommon.log('排序前', heads, heads.length)
              heads.sort(function (a, b) {
                return parseInt(a.sort) - parseInt(b.sort)
              })
              // tmCommon.log('排序后', heads, heads.length)
              for (const i in heads) {
                if (heads[i].content) {
                  if (typeof heads[i].content === 'string') {
                    heads[i].content = tmCommon.jsonParse(heads[i].content)
                  }
                } else {
                  heads[i].content = {}
                }
                if (heads[i].type === 'TEXT') {
                  // 如果为文本需要处理
                  if (heads[i].content.textType === 'default') {
                    heads[i].content.textContentDefault = heads[i].content.textContent
                  } else if (heads[i].content.textType === 'rich') {
                    heads[i].content.textContentRich = heads[i].content.textContent
                  }
                }
                const lines = heads[i].lines
                if (lines && lines.length > 0) {
                  lines.sort(function (a, b) {
                    return a.sort > b.sort
                  })
                  for (const j in lines) {
                    if (lines[j].content) {
                      if (typeof lines[j].content === 'string') {
                        lines[j].content = tmCommon.jsonParse(lines[j].content)
                      }
                    } else {
                      lines[j].content = {}
                    }
                    if (lines[j].goodsInfo) {
                      if (typeof lines[j].goodsInfo === 'string') {
                        lines[j].goodsInfo = tmCommon.jsonParse(
                          lines[j].goodsInfo
                        )
                      }
                    } else {
                      lines[j].goodsInfo = {}
                    }
                  }
                }
              }
            } else {
              data.heads = []
            }
            // 添加END组件
            data.heads.push(componentEndData)
            // tmCommon.error(JSON.stringify(data));
            that.activeComponentData = that.shopPageData = data
          } else {
            this.$message.error(msg)
          }
        })
    },
    /// /点击保存
    saveShopPage (saveType) {
      if (this.saveShopPageStatus) {
        return
      }
      this.saveShopPageStatus = true
      const that = this
      const id = that.$route.query.id
      const type = that.$route.query.type
      const shopPageData = tmCommon.clone(that.shopPageData)
      let flag = true // 新增
      if (!!id || id === 0) {
        // 更新
        shopPageData.id = id
        flag = false
      }
      if (type === 'copy') {
        delete shopPageData.id
        flag = true // 新增
      }
      if (shopPageData.heads) {
        const heads = shopPageData.heads
        if (heads && heads.length > 0) {
          for (const i in heads) {
            heads[i].sort = i
            if (flag) {
              delete heads[i].id
              delete heads[i].pageId
            }
            const lines = heads[i].lines
            const type = heads[i].type
            switch (type) {
              case 'SWIPER':
                { let swiperFlag = false
                  for (const j in lines) {
                    if (!lines[j].content.swiperPicUrl) {
                      swiperFlag = true
                      break
                    }
                  }
                  if (swiperFlag === true) {
                    that.$message.error('请上传图片')
                    that.saveShopPageStatus = false
                    return
                  } }
                break
              case 'SECEACH_BOX':
                break
              case 'PIC':
                // 左大右小bigSmall;
                // 左小右大smallBig;
                // 一大两小big2Small;
                // 两小一大2smallBig;
                // 一行一个rowOne;
                // 一行两个rowTwo
                {
                  const style = heads[i].style
                  let lineFlag = false
                  switch (style) {
                    case 'bigSmall':
                    case 'smallBig':
                    case 'rowOne':
                    case 'rowTwo':
                      if (lines.length < 2) {
                        that.$message.error('请上传图片')
                        that.saveShopPageStatus = false
                        return
                      }
                      for (const j in lines) {
                        if (!lines[j].content.swiperPicUrl && j < 2) {
                          lineFlag = true
                          break
                        }
                      }
                      if (lineFlag === true) {
                        that.$message.error('请上传图片')
                        that.saveShopPageStatus = false
                        return
                      }
                      break
                    case 'big2Small':
                    case '2smallBig':
                      if (lines.length < 3) {
                        that.$message.error('请上传图片')
                        that.saveShopPageStatus = false
                        return
                      }
                      for (const j in lines) {
                        if (!lines[j].content.swiperPicUrl && j < 3) {
                          lineFlag = true
                          break
                        }
                      }
                      if (lineFlag === true) {
                        that.$message.error('请上传图片')
                        that.saveShopPageStatus = false
                        return
                      }
                      break
                  }
                }
                break
              case 'NAVIGATION':
                {
                  if (lines.length < 4) {
                    that.$message.error('请上传图片')
                    that.saveShopPageStatus = false
                    return
                  }
                  let navFlag = false
                  for (const j in lines) {
                    if (!lines[j].content.navigationPicUrl && j < 4) {
                      navFlag = true
                      break
                    }
                  }
                  if (navFlag === true) {
                    that.$message.error('请上传图片')
                    that.saveShopPageStatus = false
                    return
                  }
                }
                break
              case 'TITLE':
                break
              case 'COMMEND_PRODUCT':
                break
              case 'TEXT':
                if (heads[i].content.textType === 'default') {
                  heads[i].content.textContent = heads[i].content.textContentDefault
                } else if (heads[i].content.textType === 'rich') {
                  heads[i].content.textContent = heads[i].content.textContentRich
                }
                break
              case 'VIDEO':
                { const content = heads[i].content
                // tmCommon.error("video",content,content.videoUrl)
                  if (!content) {
                    that.$message.error('请选择视频')
                    that.saveShopPageStatus = false
                    return
                  }
                  if (!content.videoUrl) {
                    that.$message.error('请选择视频')
                    that.saveShopPageStatus = false
                    return
                  } }
                break
              default:
            }

            // eslint-disable-next-line no-prototype-builtins
            if (heads[i].hasOwnProperty('content')) {
              heads[i].content = JSON.stringify(heads[i].content)
            }

            if (lines && lines.length > 0) {
              for (const j in lines) {
                // eslint-disable-next-line no-prototype-builtins
                if (lines[j].hasOwnProperty('content')) {
                  lines[j].content = JSON.stringify(lines[j].content)
                }
                // eslint-disable-next-line no-prototype-builtins
                if (lines[j].hasOwnProperty('goodsInfo')) {
                  lines[j].goodsInfo = JSON.stringify(lines[j].goodsInfo)
                }
                lines[j].sort = j
                if (flag) {
                  delete lines[j].id
                  delete lines[j].pageId
                  delete lines[j].headId
                }
              }
            }
          }

          // 删除END组件
          for (const i in heads) {
            if (heads[i].type === 'END') {
              heads.splice(i, 1)
            }
          }
        }
      }
      // tmCommon.log(shopPageData)
      // tmCommon.log(JSON.stringify(shopPageData))
      that.$store
        .dispatch('saveShopPage', shopPageData)
        .then((res) => {
          // tmCommon.log(res)
          const { status, msg, data } = res
          if (status === '200') {
            if (saveType !== 'save') {
              // 1 为已发布
              that.shopPageData.id = data
              that.openPublishPage()
            } else {
              that.$message({
                type: 'success',
                message: '页面保存成功',
                duration: 300,
                onClose () {
                  that.saveShopPageStatus = false
                  that.$router.push({ path: '/shop/manager' })
                }
              })
            }
          } else {
            that.saveShopPageStatus = false
            this.$message.error(msg)
          }
        })
        .catch((err) => {
          that.saveShopPageStatus = false
          tmCommon.error(err)
        })
    },
    // //获取当前组件高度
    // getComponentHeight(ref,item){
    //     let refDom=this.$refs[ref];
    //     if(refDom){
    //         refDom=refDom[0];
    //     }
    //     // tmCommon.log("getComponentHeight",ref,refDom,refDom.$el.offsetHeight);
    //     return -(refDom.$el.offsetHeight/2);
    // },
    // 删除当前组件
    removeCurrentComponent (index) {
      const that = this
      const heads = this.shopPageData.heads
      const len = heads ? heads.length : 0
      if (len <= 1) {
        that.$message({
          type: 'warn',
          message: '请至少保留两个组件!'
        })
        return
      }
      that
        .$confirm('确定删除该组件吗？', '删除组件', {
          confirmButtonText: '确认删除',
          cancelButtonText: '取消',
          customClass: 'shop-page-dialog',
          cancelButtonClass: 'shop-page-dialog-cancel',
          confirmButtonClass: 'shop-page-dialog-confirm'
          //   type: 'warning'
        })
        .then(() => {
          that.activeComponentData = {}
          that.shopPageData.heads.splice(index, 1)
        })
        .catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 拖动开始处理
    componentListDragstart (data, event) {
      // tmCommon.log("componentListDragstart",data);
      event.stopPropagation()
      // event.preventDefault();
    },
    // 拖动进行中
    componentListDragover (data, event) {
      clearTimeout(variablePool.leaveTimeoutId)
      const that = this
      event.stopPropagation()
      event.preventDefault()
      const dataset = event.target.dataset
      // tmCommon.log(dataset)
      that.activeComponentType = data.tag
      // 在本组内  交换位置
      if (data.tag === 'component-list') {
        if (data.index === dataset.index) {
          // 如果是自己则直接返回
          return
        }
      }
      if (!dataset.index && dataset.index !== '0' && dataset.index !== '1') {
        return
      }
      // tmCommon.log("componentListDragover",data,dataset);
      if (dataset.index != null && dataset.index !== undefined) {
        // 存在就设置
        that.activeDragComponentIndex = dataset.index
      }
    },
    // 组件拖动离开
    componentListDragleave (data, event) {
      // if(true){
      //     return;
      // }
      // const that = this
      // const dataset = event.target.dataset
      // tmCommon.log("componentListDragleave",event);
      // this.activeComponentData
      // 在本组内  交换位置
      if (data.tag === 'component-list') {
      } else if (data.tag === 'component-lib') {
        // variablePool.leaveTimeoutId=setTimeout(function(){
        //     if(that.activeDragComponentIndex!=null){
        //         if(that.activeDragComponent){
        //             that.componentLists.splice(that.componentLists.indexOf(that.activeDragComponent),1);
        //         }
        //     }
        //     that.activeDragComponentIndex=null;
        //     that.activeDragComponent=null
        // },100);
        // tmCommon.log("componentListDragleave",dataset.index);
        // if(!dataset.index&&(dataset.index!=0&&dataset.index!=1)){
        //     that.activeDragComponentIndex=null;
        // }
      }
    },
    // 拖动结束
    componentLibDragend (data, event) {
      this.activeDragComponentIndex = null
    },
    // 组件库拖动开始
    componentLibDragstart (data, event) {
      this.activeComponentType = 'component-lib'
      this.activeComponentData = {}
    },
    // 拖动结束
    componentListDrop (data, event) {
      const that = this
      // that.activeDragComponent=null;
      // tmCommon.log(data,event);
      if (!data) {
        this.activeDragComponentIndex = null
        return
      }
      const dataset = event.target.dataset
      // tmCommon.log("componentListDrop",data.index,dataset.index,this.activeDragComponentIndex);
      // if(dataset.index==undefined){
      //     return;
      // }
      // 在本组内  交换位置
      // tmCommon.error("拖动成功！",data.tag)
      // if(data.tag=='component-list'){
      if (dataset.index === undefined) {
        this.activeDragComponentIndex = null
        // tmCommon.log('未发现dataset.index')
        return
      }
      if (data.tag === 'component-list') {
        if (data.index === dataset.index) {
          // 如果是自己则直接返回
          this.activeDragComponentIndex = null
          return
        }
        tmCommon.changeArrayElement(
          that,
          that.shopPageData.heads,
          data.index,
          that.activeDragComponentIndex
        )
      } else if (data.tag === 'component-lib') {
        // 从组件库中过来
        tmCommon.info('拖动成功！')
        if (that.shopPageData.heads.length < 1) {
          that.activeDragComponentIndex = '0'
        }
        if (that.activeDragComponentIndex != null) {
          const item = data.item
          if (!item) {
            return
          }
          let newItem = {}
          switch (item.type) {
            case 'SWIPER':
              newItem = newItem = tmCommon.clone(componentSwiperData)
              break
            case 'SECEACH_BOX':
              newItem = tmCommon.clone(componentSearchData)
              break
            case 'PIC':
              // newItem=componentPicData;
              newItem = tmCommon.clone(componentPicData)
              break
            case 'NAVIGATION':
              // newItem=componentPicNavData;
              newItem = tmCommon.clone(componentPicNavData)
              break
            case 'TITLE':
              // newItem=componentTitleData;
              newItem = tmCommon.clone(componentTitleData)
              break
            case 'COMMEND_PRODUCT':
              // newItem=componentTitleData;
              newItem = tmCommon.clone(componentGoodsData)
              break
            case 'TEXT':
              // newItem=componentTextData;
              newItem = tmCommon.clone(componentTextData)
              break
            case 'VIDEO':
              // newItem=componentVideoData;
              newItem = tmCommon.clone(componentVideoData)
              break
            default:
          }
          // newItem.isNew=true;
          // that.activeDragComponent=newItem;
          // tmCommon.log(JSON.stringify(newItem))
          that.activeComponentData = newItem
          that.shopPageData.heads.splice(that.activeDragComponentIndex, 0, newItem)
          // that.activeComponentData={};
        }
      }
      that.activeDragComponentIndex = null
    }

    /**
       * arr 数组
       * i  源索引
       * j  目标索引
       */
    // changeArrayElement(arr,i,j){
    //     // let i=arr.indexOf(source),j=arr.indexOf(dest);
    //     let that=this;
    //     let swap=arr[i];
    //     that.$set(arr,i,arr[j]);
    //     that.$set(arr,j,swap);
    //     // tmCommon.log(arr);
    //     return arr;
    // },
  }

  //  updated(){
  //    this.addOrChangeControl('PhoneInput')
  //  },
}
</script>
<style lang="less">
  @import "../../assets/less/pages/shop/edit.less";
</style>
