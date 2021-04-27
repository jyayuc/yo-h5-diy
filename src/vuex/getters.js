import { Constants } from '@/common/env'
import { getLang } from '@/common/lang/index'
import tmCommon from '@/common/common'

export default {
  getLangObj (state) {
    let langObj = state.langObj
    if (!langObj) {
      const lang = state.lang
      langObj = getLang(lang)
    }
    return langObj
  },
  getUserInfo (state) {
    let userInfo = state.userInfo
    if (!userInfo) {
      userInfo = tmCommon.getItem(Constants.LOCALSTORAGEKEY.USERKEY.USERINFO)
      userInfo = JSON.parse(userInfo)
    }
    userInfo = JSON.parse(JSON.stringify(userInfo))
    if (!userInfo) {
      userInfo = {}
    }
    return userInfo
  },
  // 获取缓存数据对象
  getDataCacheMap (state) {
    const dataCacheMap = state.dataCacheMap
    return key => {
      return dataCacheMap[key]
    }
  }
}
