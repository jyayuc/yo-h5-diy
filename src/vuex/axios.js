/* eslint-disable camelcase */
/* eslint-disable no-undef */
import { Constants } from '@/common/env'
import tmCommon from '@/common/common'
// import jsonminify from 'jsonminify'
// import axios from "axios";
// import Mprogress from "mprogress/mprogress.min";
// import Qs from "qs";
// const mprogress = new Mprogress({
//   template: 3
// });
// Vue函数添加一个原型属性$axios 指向axios,这样vue实例或组件中不用再去重复引用Axios 直接用this.$axios就能执行axios 方法
const CancelToken = axios.CancelToken
async function get (options = {}, callback = () => {}) {
  return request('get', options, callback)
}
async function put (options = {}, callback = () => {}) {
  return request('put', options, callback)
}
async function post (options = {}, callback = () => {}) {
  return request('post', options, callback)
}
async function del (options = {}, callback = () => {}) {
  return request('delete', options, callback)
}

async function request (type = 'get', options = {}, callback = () => {}) {
  if (!options) {
    options = {}
  }
  // noLogin  为true 代表 不需要走登录拦截
  let { url = '', params = {}, headers = {}, vm, retry = 1, needToken = false, noLogin = false } = options
  if (!vm) {
    vm = window.$vm
  }
  const { $store: store = {} } = vm
  // 数据加载进度条开始
  vm.$NProgress.start()
  if (!params) {
    params = {}
  }
  if (!headers) {
    headers = {}
  }
  if (options.headers) {
    for (const i in options.headers) {
      if (Object.prototype.hasOwnProperty.call(options.headers, i)) {
        headers[i] = options.headers[i]
      }
    }
  }

  !headers['Content-Type'] &&
    (headers['Content-Type'] = 'application/x-www-form-urlencoded')
  retry && (headers.retry = 1)
  !headers.clientId && (headers.clientId = 'web_application')
  !headers.clientTime && (headers.clientTime = Date.now())
  !headers['request-type'] && (headers['request-type'] = 'ajax')
  !headers.isAjax && (headers.isAjax = true)
  !headers['X-Requested-With'] &&
    (headers['X-Requested-With'] = 'XMLHttpRequest')
  if (store) {
    const userInfo = store.getters.getUserInfo || {}
    const { token = '' } = userInfo || {}
    if (needToken) {
      if (token) {
        headers[Constants.AUTHORIZATION] = token
      }
      const { hotel_id = '' } = userInfo || ''
      if (hotel_id) {
        // console.log('hotel_id=', hotel_id)
        headers.hotelid = hotel_id
      }
    }
  }
  // tmCommon.warn(new Date(), '当前请求地址：', url, '当前请求参数', params)
  let data = null
  const cancelToken = new CancelToken(cancel => {
    // 强行中断请求要用到的
    vm.$httpRequestList.push(cancel)
  })
  if (type === 'get') {
    data = getFunc(url, cancelToken, params, headers, callback)
  } else if (type === 'post') {
    data = postFunc(url, cancelToken, params, headers, callback)
  } else if (type === 'delete') {
    data = delFunc(url, cancelToken, params, headers, callback)
  } else if (type === 'put') {
    data = putFunc(url, cancelToken, params, headers, callback)
  } else {
    data = postFunc(url, cancelToken, params, headers, callback)
  }

  // 判断返回值处理
  return new Promise((resolve, reject) => {
    // 封装axios
    const ajax = data
      .then(res => {
        // 数据加载进度条结束
        vm.$NProgress.done()
        let { data: _data } = res
        // _data = _data && typeof _data === 'string' ? JSON.parse(jsonminify(_data)) : _data
        _data = _data && typeof _data === 'string' ? JSON.parse(_data) : _data || {}
        let { data = '', code = '', msg = '' } = _data
        try {
          data =
            data && typeof data === 'string' ? JSON.parse(data) : data
        } catch (err) {
          tmCommon.error('类型转换异常', err)
        }
        if (code === Constants.CODES.LOGIN && !noLogin) {
          vm.$jumpLogin()
          reject(res)
        } else {
          if (code === Constants.CODES.SYSTEM_ERROR) {
            // 系统错误
            code = Constants.CODES.ERROR
            msg = '系统开小差了，请重试！'
          }
          // else if (code === Constants.CODES.PARAM_ERROR) {
          //   // 参数错误
          //   code = Constants.CODES.ERROR
          //   msg = '参数错误'
          // }
          // const { totalNum = 0 } = result || {}
          // if (totalNum) {
          //   result.totalNum = Number(totalNum || 0)
          // }
          _data.code = code
          _data.message = msg || ''
          _data.result = data
          delete _data.data
          delete _data.msg
          res.data = _data
          resolve(res)
        }
      })
      .catch(error => {
        // 数据加载进度条结束
        vm.$NProgress.done()
        // 中断请求和请求出错的处理
        if (error.message === Constants.INTERRUPT) {
          tmCommon.log(`已中断请求url=${url}`)
          reject(error)
        } else {
          reject(error)
        }
      })
    return ajax
  })
}
/**
 * post 请求
 * @param {*} params
 * @param {*} callback
 */
async function postFunc (url, cancelToken, params, headers) {
  return axios.post(url, Qs.stringify(params), {
    cancelToken: cancelToken,
    headers: headers,
    timeout: Constants.AXIOTIMEOUT
  })
}
/**
 * put 请求
 * @param {*} params
 * @param {*} callback
 */
async function putFunc (url, cancelToken, params, headers) {
  return axios.put(url, Qs.stringify(params), {
    cancelToken: cancelToken,
    headers: headers,
    timeout: Constants.AXIOTIMEOUT
  })
}
/**
 * delete 请求
 * @param {*} params
 * @param {*} callback
 */
async function delFunc (url, cancelToken, params, headers) {
  return axios.patch(url, Qs.stringify(params), {
    // params:params,
    // data:params,
    cancelToken: cancelToken,
    headers: headers,
    timeout: Constants.AXIOTIMEOUT
  })
}

/**
 * get 请求
 * @param {*} params
 * @param {*} callback
 */

async function getFunc (url, cancelToken, params, headers) {
  return axios.get(url, {
    cancelToken: cancelToken,
    params: params,
    headers: headers,
    timeout: Constants.AXIOTIMEOUT
  })
}

export { get, post, put, del }
