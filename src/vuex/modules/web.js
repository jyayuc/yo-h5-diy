// import { URL } from "@/common/env";
// import tmCommon from "@/common/common";
// import { post, get } from "@/store/axios";
// import { Constants } from "@/common/env";
export default {
  namespaced: true, // 必须加它不然报错
  strict: process.env.NODE_ENV !== 'production',
  state: {
    currentNav: null
  },
  getters: {
    // //获取缓存数据对象
    getCurrentNav (state) {
      return state.currentNav || ''
    }
  },
  mutations: {
    // 设置缓存对象
    setCurrentNav (state, item = '') {
      state.currentNav = item || ''
    }
  },
  actions: {}
}
