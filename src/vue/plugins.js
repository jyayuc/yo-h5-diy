/* eslint-disable no-undef */
// import Vue from "vue";
// import Remote from "@/common/Remote.js";
import tmCommon from '@/common/common'
import { imageServer } from '@/common/env'
import RouterURL from '@/router/routers.conf'
import Print from '@/common/lib/print'
import ECharts from '@/components/common/ECharts'
// echarts 皮肤
import themes from '@/common/lib/echarts/macarons'
// import accounting from "accounting";
// import Big from "big.js";
// import moment from "moment";
// 设置处理不做 四舍五入
Big.RM = 0

moment.locale('en', {
  weekdays: '星期天_星期一_星期二_星期三_星期四_星期五_星期六'.split('_')
})

export default {
  install (Vue) {
    // 时间格式化
    Vue.prototype.$moment = moment
    // 路由配置
    Vue.prototype.$RouterURL = RouterURL
    // bigjs
    Vue.prototype.$big = Big
    // // 是否开启路由动画
    // Vue.prototype.$isTransition = true
    // 图表
    ECharts.registerTheme('macarons', themes)
    Vue.component('v-chart', ECharts)
    // 打印插件
    Vue.prototype.$print = Print
    // 成功消息
    Vue.prototype.$$msgSuccess = function (msg = '', options = {}) {
      return this.$message({
        showClose: this.$store.state.messageShowClose,
        message: this.$lang(msg),
        type: 'success',
        ...options
      })
    }
    // 警告消息
    Vue.prototype.$$msgWarn = function (msg = '', options = {}) {
      return this.$message({
        showClose: this.$store.state.messageShowClose,
        message: this.$lang(msg),
        type: 'warning',
        ...options
      })
    }
    // 错误消息
    Vue.prototype.$$msgError = function (msg = '', options = {}) {
      return this.$message({
        showClose: this.$store.state.messageShowClose,
        message: this.$lang(msg),
        type: 'error',
        ...options
      })
    }
    // 普通消息
    Vue.prototype.$$msgInfo = function (msg = '', options) {
      return this.$message({
        showClose: this.$store.state.messageShowClose,
        message: this.$lang(msg),
        type: 'info',
        ...options
      })
    }

    Vue.prototype.$dataList = [
      { id: 1, name: '测试数据', startTime: '2020-06-10' },
      { id: 2, name: '测试数据', startTime: '2020-06-10' },
      { id: 3, name: '测试数据', startTime: '2020-06-10' },
      { id: 4, name: '测试数据', startTime: '2020-06-10' },
      { id: 5, name: '测试数据', startTime: '2020-06-10' },
      { id: 6, name: '测试数据', startTime: '2020-06-10' },
      { id: 7, name: '测试数据', startTime: '2020-06-10' },
      { id: 8, name: '测试数据', startTime: '2020-06-10' },
      { id: 9, name: '测试数据', startTime: '2020-06-10' },
      { id: 10, name: '测试数据', startTime: '2020-06-10' },
      { id: 11, name: '测试数据', startTime: '2020-06-10' },
      { id: 12, name: '测试数据', startTime: '2020-06-10' },
      { id: 13, name: '测试数据', startTime: '2020-06-10' },
      { id: 14, name: '测试数据', startTime: '2020-06-10' },
      { id: 15, name: '测试数据', startTime: '2020-06-10' },
      { id: 16, name: '测试数据', startTime: '2020-06-10' },
      { id: 17, name: '测试数据', startTime: '2020-06-10' },
      { id: 18, name: '测试数据', startTime: '2020-06-10' },
      { id: 19, name: '测试数据', startTime: '2020-06-10' },
      { id: 20, name: '测试数据', startTime: '2020-06-10' },
      { id: 21, name: '测试数据', startTime: '2020-06-10' },
      { id: 22, name: '测试数据', startTime: '2020-06-10' },
      { id: 23, name: '测试数据', startTime: '2020-06-10' },
      { id: 24, name: '测试数据', startTime: '2020-06-10' },
      { id: 25, name: '测试数据', startTime: '2020-06-10' },
      { id: 26, name: '测试数据', startTime: '2020-06-10' },
      { id: 27, name: '测试数据', startTime: '2020-06-10' },
      { id: 28, name: '测试数据', startTime: '2020-06-10' },
      { id: 29, name: '测试数据', startTime: '2020-06-10' }
    ]

    // 全局方法 获取语言
    Vue.prototype.$lang = function (key = '', options = '') {
      // let { $store } = this;
      // if (!$store) {
      //   $store = $vm.$store;
      //   this.$store = $store;
      // }
      // let langObj = $store.getters.getLangObj;
      return tmCommon.langKey(null, key, options)
    }

    // 全局方法 转化大数据展示  num 值  fixed 代表要保留多少位小数  format 是否需要格式化 type 1为正常模式 2 为 如果传入小数位为4位  保留的是2位，则保留两位，如果小数位小于保留的小数位则直接展示
    Vue.prototype.$format = function (num, fixed) {
      try {
        num = Number(num)
      } catch (ex) {
        return num
      }
      return this.$toBig(num, fixed, '', 2)
    }
    // 全局方法 转化大数据展示  num 值  fixed 代表要保留多少位小数  format 是否需要格式化 type 1为正常模式 2 为 如果传入小数位为4位  保留的是2位，则保留两位，如果小数位小于保留的小数位则直接展示
    Vue.prototype.$toBig = function (
      num = '',
      fixed = false,
      format = false,
      type = '1'
    ) {
      if (!num) {
        num = 0
      }
      let val = ''
      try {
        if (fixed) {
          if (type === 2) {
            num = num + ''
            const index = num.indexOf('.')
            if (index > -1) {
              // 有小数位
              const point = num.substring(index + 1)
              const { length: _len = 0 } = point || ''
              if (_len < fixed) {
                val = Big(num).toFixed()
              } else {
                val = Big(num).toFixed(fixed)
              }
            } else {
              val = Big(num).toFixed()
            }
          } else {
            val = Big(num).toFixed(fixed)
          }
        } else {
          val = Big(num).toFixed()
        }
        if (format) {
          if (Big(val).gt(0.01)) {
            val = accounting.formatMoney(val, { format: '%v' })
          }
        }
      } catch (err) {
        tmCommon.error('[main.js][toBig]', num, fixed, format, err)
      }
      return val
    }

    // // 全局cron表达式翻译
    // Vue.prototype.$cronAnalysis = function (cron) {
    //   var text = ''
    //   var value = cron.split(' ')
    //   if (value[5] === '?') {
    //     text =
    //       value[6] +
    //       '年' +
    //       value[4] +
    //       '月' +
    //       value[3] +
    //       '日' +
    //       value[2] +
    //       '点' +
    //       value[1] +
    //       '分触发任务'
    //   } else {
    //     text = '每周'
    //     var weeks = value[5].split(',')
    //     var list = ['日', '一', '二', '三', '四', '五', '六']
    //     if (weeks.length == 7) {
    //       text = '每周一至周日' + value[2] + '点' + value[1] + '分触发任务'
    //     } else {
    //       weeks.forEach(function (week, index) {
    //         text += list[week - 1]
    //         if (index < weeks.length - 1) {
    //           text += '、'
    //         }
    //       })
    //       text += value[2] + '点' + value[1] + '分触发任务'
    //     }
    //   }
    //   return text
    // }

    // 全局路由跳转 query 方式
    Vue.prototype.$priceConvert = function (price) {
      return price ? tmCommon.numberHandle(price) : ''
    }
    // 全局路由跳转 query 方式
    Vue.prototype.$breakJumpLogin = function () {
      const { $route } = this
      const { meta } = $route
      const { requireAuth } = meta || {}
      if (!requireAuth) {
        return
      }
      this.$jumpLogin()
    }
    // 全局路由跳转 query 方式   flag  为true 不需要重定向地址
    Vue.prototype.$jumpLogin = function (flag) {
      if (flag) {
        this.$jumpPage('login', {}, {}, true)
      } else {
        const redirecturl = encodeURIComponent(this.$route.fullPath)
        this.$jumpPage('login', { redirecturl: redirecturl })
      }
    }

    // 全局跳转
    Vue.prototype.$jumpPage = function (url, params, query, redirect) {
      if (!params) {
        params = {}
      }
      if (!query) {
        query = {}
      }
      if (url === 'login' && !redirect) {
        // 如果是登录路由则自动加上 ,{redirecturl:encodeURIComponent(window.location.href)}
        // let redirecturl=encodeURIComponent(window.location.href)
        const redirecturl = encodeURIComponent(this.$route.fullPath)
        query.redirecturl = redirecturl
      }
      this.$router.push({
        name: url,
        params: params || {},
        query: query || {}
      })
    }
    // 全局跳转
    Vue.prototype.$backJumpPage = function (url, params, query) {
      if (!params) {
        params = {}
      }
      this.$router.push({
        name: url,
        params: params || {},
        query: query || {}
      })
    }

    // 全局window.location跳转
    Vue.prototype.$openPage = function (url, flag, options = {}) {
      if (!url) {
        return
      }
      if (flag) {
        window.open(
          url,
          options.name || '_blank',
          options.specs || '',
          options.replace || false
        )
      } else {
        window.location.href = url
      }
    }
    // 全局跳转
    Vue.prototype.$replacePage = function (url, params, query, type) {
      if (!params) {
        params = {}
      }
      if (url.indexOf('/') > -1) {
        this.$router.replace(url)
        // this.$loadingShow();
      } else {
        this.$router.replace({
          name: url,
          params: params || {},
          query: query || {}
        })
        // this.$loadingShow();
      }
    }

    // 加载图片
    Vue.prototype.$loadImgUrl = function (url) {
      if (!url) {
        return ''
      }
      if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
        return url
      }
      return imageServer + url
    }

    Vue.prototype.$historyBack = function (back) {
      const that = this
      if (!back) {
        back = -1
      }
      if (window.jumpFromLogin) {
        back = -2
        window.jumpFromLogin = false
      }
      that.$router.go(back)
    }
    // 加载事件
    Vue.prototype.$loadingShow = function (type) {
      if (typeof type === 'boolean') {
        if (type) {
          type = 'block'
        } else {
          type = 'none'
        }
      }
      if (!type) {
        type = 'none'
      }
      const loading = document.getElementById('bm-loading')
      if (loading) {
        loading.style.display = type
        // document.body.removeChild(loading)
      }
    }
    // // 失去焦点事件
    // Vue.prototype.$blurEvent = function(e) {
    //   e.stopPropagation();
    //   $vm.timeoutId = setTimeout(() => {
    //     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    //   }, 200);
    // };
    // // 获取焦点事件
    // Vue.prototype.$focusEvent = function(e) {
    //   e.stopPropagation();
    //   clearTimeout($vm.timeoutId);
    // };

    // 截取字符串   str 输入源   start 从头保留几个字符   end 结尾保留几个字符   symbol 中需要替换成的字符
    Vue.prototype.$ellipsis = function (str, start, end, symbol) {
      return (
        str.substr(0, start) +
        (str.length > start ? symbol || '******' : '') +
        str.substr(str.length - end || str.length - start)
      )
    }
  }
}
