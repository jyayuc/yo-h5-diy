/* eslint-disable no-undef */
// import moment from "moment";
import tmCommon from '@/common/common'

export default {
  install (Vue) {
    Vue.filter(
      '$dateFormat',
      (value, format = 'YYYY-MM-DD HH:mm', symbol = '--') => {
        if (!value) {
          return symbol || value
        }
        let str = value.length === 13 ? value : value + '000'
        if (typeof str === 'string') {
          str = Number(str)
        }
        if (isNaN(str)) {
          try {
            value = moment(value).format(format)
            return value
          } catch (ex) {
            value = ''
          }
          if (!value) {
            return value
          }
        }
        return moment(str).format(format)
      }
    )
    Vue.filter(
      '$priceFormat',
      (value, fixed = 2, symbol = '￥', isAbs = false) => {
        if (!value) {
          return symbol + '0.00'
        }
        if (isAbs) {
          value = Math.abs(value)
          return symbol + Big(value).div(100).toFixed(fixed)
        } else {
          if (value > 0) {
            return symbol + Big(value).div(100).toFixed(fixed)
          } else {
            return '-' + symbol + Math.abs(Big(value).div(100).toFixed(fixed))
          }
        }
      }
    )
    Vue.filter(
      '$countdown',
      (
        milliseconds,
        format = '{dd}天{hh}小时{mm}分{ss}秒',
        _double = true,
        showDay = true
      ) => {
        if (format) {
          let day = parseInt(milliseconds / (1000 * 60 * 60 * 24), 10)
          let hour = parseInt(
            (milliseconds - day * 1000 * 60 * 60 * 24) / (1000 * 60 * 60),
            10
          )
          let minutes = parseInt(
            (milliseconds - day * 1000 * 60 * 60 * 24 - hour * 1000 * 60 * 60) /
              (1000 * 60),
            10
          )
          let seconds = parseInt(
            (milliseconds -
              day * 1000 * 60 * 60 * 24 -
              hour * 1000 * 60 * 60 -
              minutes * 1000 * 60) /
              1000,
            10
          )
          if (!showDay) {
            hour = day * 24 + hour
            day = 0
          }
          if (_double) {
            day = day < 10 ? '0' + day : day
            hour = hour < 10 ? '0' + hour : hour
            minutes = minutes < 10 ? '0' + minutes : minutes
            seconds = seconds < 10 ? '0' + seconds : seconds
          }
          return tmCommon.substitute(format, {
            dd: day,
            hh: hour,
            mm: minutes,
            ss: seconds
          })
        } else {
          return parseInt(milliseconds / 1000) + 's'
        }
      }
    )
  }
}
