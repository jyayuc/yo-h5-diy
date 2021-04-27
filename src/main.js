/* eslint-disable no-undef */
import App from './App'
// import './registerServiceWorker'
import router from './router'
import store from './vuex'
import { Constants } from '@/common/env'
// import ECharts from '@/components/common/ECharts'
import tmCommon from '@/common/common'
import Plugins from '@/vue/plugins'
import Filters from '@/vue/filters'
import Directives from '@/vue/directives'
import RouterURL from '@/router/routers.conf'
// 加载进度
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import VueClipboard from 'vue-clipboard2'
import VueDragDrop from 'vue-drag-drop'
// 引入vue-amap
import VueAMap from 'vue-amap'

// 使用拖动控件
Vue.use(VueDragDrop)
// 使用剪贴板功能
Vue.use(VueClipboard)
// Vue.use(skeleton);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: Constants.AMAP.key,
  // 插件集合
  plugin: [
    'AMap.Autocomplete',
    'AMap.Geolocation',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.Geocoder',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor'
  ],
  // 高德 sdk 版本，默认为 1.4.4
  v: Constants.AMAP.version
})
Vue.use(Plugins)
Vue.use(Filters)
Vue.use(Directives)

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 100, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
router.beforeEach((to, from, next) => {
  const $vm = window.$vm
  NProgress.start()
  tmCommon.log('判断路由切换检测是否强行中断，')
  // 路由切换检测是否强行中断，
  $vm &&
    $vm.$httpRequestList &&
    $vm.$httpRequestList.forEach(cancel => {
      cancel(Constants.INTERRUPT) // 给个标志，中断请求
    })
  // next();
  const $store = router.app.$store || store
  const langObj = $store ? $store.getters.getLangObj : null
  const docTitle = to.meta.title
  if (docTitle) {
    document.title = tmCommon.langKey(langObj, '微页面') // +langKey(langObj,docTitle)
  }
  // tmCommon.log("beforeEach,当前路由title=",to.meta.title,to.name,to.path)
  tmCommon.log('beforeEach,当前路由to=', to, ',from:', from)
  // if (!RouterURL[to.name]) {
  //   // 如果路由配置不存在则跳到404页
  //   next({
  //     name: RouterURL['*'].name
  //   })
  //   return
  // }
  const userInfo = $store.getters.getUserInfo
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (userInfo && userInfo.token) {
      // 通过vuex state获取当前的token是否存在
      next()
    } else {
      if (from.name === RouterURL.login.name) {
        next()
      } else {
        next({
          name: RouterURL.login.name,
          query: { redirecturl: encodeURIComponent(to.fullPath) } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  const loading = document.getElementById('fullLoading')
  loading && (loading.style.display = 'none')
  NProgress.done()

  // const $store = router.app.$store || store
  // $store.commit('setDataCacheMap', {
  //   key: Constants.DATACACHEMAPKEY.BREADCRUMBLIST,
  //   value: null
  // })
})

// RemoteObject.init(router);
// Vue.prototype.remoteObject = RemoteObject;
Vue.prototype.$NProgress = NProgress

window.$vm = new Vue({
  router,
  store,
  render: h => h(App)
})
window.$vm.$httpRequestList = []
window.$vm.$mount('#app')
