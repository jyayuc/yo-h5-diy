import { Constants } from '@/common/env'
import tmCommon from '@/common/common'
export default {
  dataCacheMap: {}, // 缓存数据map
  messageShowClose: true, // 消息提示是否显示关闭
  showMessage: true, // 是否显示验证消息
  ruleMessage: true, // 是否提示弹窗验证消息
  lang:
    tmCommon.getItem(Constants.LOCALSTORAGEKEY.LANGUAGE) ||
    tmCommon.variablePool.language ||
    'EN', // 默认语言
  userInfo: null // 用户信息
}
