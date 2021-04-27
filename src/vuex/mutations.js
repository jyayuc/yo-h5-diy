/* !!
 * $store.commit
 * ===== ===== =====
 */
import { Constants } from '@/common/env'
import { getLang } from '@/common/lang/index'
import tmCommon from '@/common/common'

export default {
  // 设置登录用户信息
  setUserInfo (state, item) {
    if (item) {
      tmCommon.setItem(
        Constants.LOCALSTORAGEKEY.USERKEY.USERINFO,
        JSON.stringify(item)
      )
    } else {
      tmCommon.removeItem(Constants.LOCALSTORAGEKEY.USERKEY.USERINFO)
    }
    state.userInfo = item
  },
  // 设置缓存对象
  setDataCacheMap (state, item) {
    const dataCacheMap = state.dataCacheMap || {}
    const key = item.key
    const value = item.value
    dataCacheMap[key] = value
  },
  // 设置当前的语言环境
  setCurrentLang (state, item) {
    tmCommon.setItem(Constants.LOCALSTORAGEKEY.LANGUAGE, item)
    state.lang = item
    state.langObj = getLang(item)
  }
}
