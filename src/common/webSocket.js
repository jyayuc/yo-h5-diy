/**
 * websocket 初始化
 * @param {*} url
 * @param {*} options
 */
import tmCommon from '@/common/common'

function FqWebSocket (url, options, params) {
  tmCommon.log('---------url=' + url)
  if ('WebSocket' in window) {
    tmCommon.warn('恭喜，当前浏览器支持Websocket')
    const webSocket = new WebSocket(url)
    if (options.onpen) {
      webSocket.onopen = function (evt) {
        options.onopen(evt, webSocket, params)
      }
    }
    if (options.onerror) {
      webSocket.onerror = function (evt) {
        options.onerror(evt, webSocket, params)
      }
    }
    if (options.onmessage) {
      webSocket.onmessage = function (evt) {
        options.onmessage(evt, webSocket, params)
      }
    }
    if (options.onclose) {
      webSocket.onclose = function (evt) {
        options.onclose(evt, webSocket, params)
      }
    }
    return webSocket
  } else {
    tmCommon.warn('当前浏览器不支持Websocket')
  }
}

export default FqWebSocket
