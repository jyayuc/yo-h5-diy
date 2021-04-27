/* eslint-disable no-undef */
// import { Constants } from "@/common/env";
// import Big from "big.js";
// import md5 from '@/assets/js/MD5'
// import CryptoJS from "crypto-js";
// 设置处理不做 四舍五入
// Big.RM = 0;
// 变量池
const variablePool = {
  language: (function () {
    var lang = (navigator.language || '').toLowerCase()
    var language = lang.indexOf('zh') > -1 ? 'ZH' : 'EN'
    return language.toUpperCase()
  })(),
  isPC: (function () {
    const userAgentInfo = (navigator.userAgent || '').toLowerCase()
    const Agents = [
      'Android',
      'iPhone',
      'SymbianOS',
      'Windows Phone',
      'iPad',
      'iPod'
    ]
    let flag = true
    for (let i = 0; i < Agents.length; i++) {
      const agent = Agents[i].toLowerCase()
      if (userAgentInfo.indexOf(agent) > -1) {
        flag = false
        break
      }
    }
    return flag
  })(),
  token: function () {
    // return cookie.getItem("toKen")
  },
  // language:'zh-cn',
  isWechat: false,
  countdownTimeIds: {
    // 存储倒计时定时器id
  },
  regs: {
    email: /^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@([A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$/, // 电子邮件
    pass: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![~!`@#$%^&*()_+|[\]\-={};':"<>?,./]+$)^[0-9A-Za-z~!`@#$%^&*()_+|[\]\-={};':"<>?,./]{8,32}$/, // 密码
    name: /^(?=.*[a-zA-Z0-9])[^]{1,50}$/, // 姓名
    mobile: /^1\d{10}$/, // 手机号
    number: /^[0-9]+$/, // 数字
    loginPass: /^[0-9A-Z-a-z]{8,}$/,
    userName: /^[A-Z-a-z][0-9A-Z-a-z]{3,15}$/, // 4-16 个字母或者字母和数字
    payPass: /^[0-9]{6}$/,
    // eslint-disable-next-line no-control-regex
    noChinese: /[^\x00-\xff]/gi
  }
}

const common = {
  // 是否为debug模式
  debugMode: (function () {
    var flag = true
    // if (process.env.NODE_ENV == 'development') {
    //     flag = true;
    // } else
    if (process.env.NODE_ENV === 'production') {
      flag = false
    }
    console.log('current env is ', flag)
    return flag
  })(),
  // 链接地址池
  // URL: URL,
  // 变量池
  variablePool: variablePool,
  log () {
    const that = this
    if (console) {
      that.debugMode && console.log.apply(console, arguments)
    }
  },
  error () {
    // let that = this;
    if (console) {
      console.error.apply(console, arguments)
    }
  },
  warn () {
    const that = this
    if (console) {
      that.debugMode && console.warn.apply(console, arguments)
    }
  },
  info () {
    const that = this
    if (console) {
      that.debugMode && console.info.apply(console, arguments)
    }
  },
  debug () {
    const that = this
    if (console) {
      that.debugMode && console.debug.apply(console, arguments)
    }
  },
  group () {
    const that = this
    if (console) {
      that.debugMode && console.group.apply(console, arguments)
    }
  },
  // //1、活动正在进行中 ，2、活动还未开始 3、活动已经结束
  // compareTime(item) {
  //   // let that=this
  //   let { stime, ctime, etime } = item;
  //   // ctime+=10000
  //   if (Number(ctime) >= Number(stime) && Number(ctime) <= Number(etime)) {
  //     //活动正在进行中
  //     common.warn("活动正在进行中");
  //     // if(type=='click'){
  //     //     that.gameViewStep='second'
  //     // }
  //     // that.$nextTick(()=>{
  //     //     that.initGame()
  //     // })
  //     // eslint-disable-next-line no-undef
  //     let time = moment(Number(etime)).diff(Number(ctime));
  //     let expireTime = parseInt(time / 1000);
  //     return { status: 2, expireTime: expireTime };
  //   } else if (Number(ctime) > Number(etime)) {
  //     //活动已经结束
  //     common.warn("活动已经结束");
  //     // that.$emit('closeAction')
  //     return { status: 3, expireTime: 0 };
  //   } else if (Number(ctime) < Number(stime)) {
  //     //活动还未开始
  //     common.warn("活动还未开始", stime - ctime);
  //     let time = moment(Number(stime)).diff(Number(ctime));
  //     let expireTime = parseInt(time / 1000);
  //     return { status: 1, expireTime: expireTime };
  //   }
  // },
  // 递归处理树结构
  recursiveTree (
    list = [],
    pIdKey = 'pId',
    idKey = 'id',
    childrenKey = 'children'
  ) {
    const data = JSON.parse(JSON.stringify(list)) // 浅拷贝不改变源数据
    const result = []
    if (!Array.isArray(data)) {
      return result
    }
    data.forEach(item => {
      delete item[childrenKey]
    })
    const map = {}
    data.forEach(item => {
      map[item[idKey]] = item
    })
    data.forEach(item => {
      const parent = map[item[pIdKey]]
      if (parent) {
        (parent[childrenKey] || (parent[childrenKey] = [])).push(item)
      } else {
        result.push(item)
      }
    })
    return result
  },
  /**
 * @returns {string}
 */
  createUniqueString () {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
  },
  clone (item) {
    return item && typeof item === 'object'
      ? JSON.parse(JSON.stringify(item))
      : item
  },
  // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
  sheet2blob (sheet, sheetName) {
    sheetName = sheetName || 'sheet1'
    const workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    }
    workbook.Sheets[sheetName] = sheet
    // 生成excel的配置项
    const wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
    }
    const wbout = XLSX.write(workbook, wopts)
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
    // 字符串转ArrayBuffer
    function s2ab (s) {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
      return buf
    }
    return blob
  }, // 参数src为图片地址，name为下载时图片的名称
  downloadImage (src, name) {
    var image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
      var canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height

      var context = canvas.getContext('2d')
      context.drawImage(image, 0, 0, image.width, image.height)
      var url = canvas.toDataURL('image/png')

      // 生成一个a元素
      var a = document.createElement('a')
      // 创建一个单击事件
      var event = new MouseEvent('click')

      // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
      a.download = name || '下载图片名称.png'
      // 将生成的URL设置为a.href属性
      a.href = url

      // 触发a的单击事件
      a.dispatchEvent(event)
    }

    image.src = src
  },
  numberHandle (str) {
    if (!str) return str
    return Big(str).times(100).toString()
  },
  // 下载文件
  downloadFile (fileUrl, fileName) {
    // 浏览器支持fetch则用blob下载，避免浏览器点击a标签，跳转到新页面预览的行为
    if (window.fetch) {
      fetch(fileUrl)
        .then(res => res.blob())
        .then(blob => {
          const a = document.createElement('a')
          const url = window.URL.createObjectURL(blob)
          a.href = url
          a.download = fileName
          a.click()
        })
    } else {
      const a = document.createElement('a')
      a.href = fileUrl
      a.target = '_blank'
      a.download = filename
      a.click()
    }
  },
  /**
   * 通用的打开下载对话框方法，没有测试过具体兼容性
   * @param url 下载地址，也可以是一个blob对象，必选
   * @param saveName 保存文件名，可选
   */
  openDownloadDialog (url, saveName) {
    if (typeof url === 'object' && url instanceof Blob) {
      url = URL.createObjectURL(url) // 创建blob地址
    }
    var aLink = document.createElement('a')
    aLink.href = url
    aLink.download = (saveName || '').trim() // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event
    if (window.MouseEvent) event = new MouseEvent('click')
    else {
      event = document.createEvent('MouseEvents')
      event.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
    }
    aLink.dispatchEvent(event)
  },
  //   testApp(url, callback) {
  //     let timeout,
  //       t = 1000,
  //       hasApp = true;
  //     let ifr = document.createElement("iframe");
  //     setTimeout(() => {
  //       if (hasApp) {
  //         common.log("安装了app");
  //       } else {
  //         common.log("未安装app");
  //       }
  //       document.body.removeChild(ifr);
  //       if (callback) {
  //         callback(hasApp);
  //       }
  //     }, 2000);

  //     let t1 = Date.now();
  //     ifr.setAttribute("src", url);
  //     ifr.setAttribute("style", "display:none");
  //     document.body.appendChild(ifr);
  //     timeout = setTimeout(() => {
  //       let t2 = Date.now();
  //       if (!t1 || t2 - t1 < t + 100) {
  //         hasApp = false;
  //       }
  //     }, t);
  //   },
  //   load_js(src, callback) {
  //     let set_src = src.split(",");
  //     let load_num = 0;
  //     for (let i = 0; i < set_src.length; i++) {
  //       let url = set_src[i];
  //       let obj = document.getElementById(url);
  //       if (!obj) {
  //         let js = document.createElement("script");
  //         js.src = url;
  //         // js.async = true
  //         // js.defer = true
  //         js.id = url;
  //         document.head.appendChild(js);
  //         if (callback && typeof callback == "function") {
  //           js.onload = function() {
  //             ++load_num;
  //             //全部加载完毕
  //             if (load_num === set_src.length) {
  //               callback();
  //             }
  //           };
  //         }
  //       } else {
  //         ++load_num;
  //         //全部加载完毕
  //         if (load_num === set_src.length) {
  //           callback();
  //         }
  //       }
  //     }
  //   },
  substitute (str, data) {
    if (data && typeof data === 'object') {
      return str.replace(/\{([^{}]+)\}/g, function (match, key) {
        var value = data[key]
        return value !== undefined ? '' + value : ''
      })
    } else {
      return str.toString()
    }
  },
  removeItem (key, type) {
    if (type === 1) {
      sessionStorage.removeItem(key)
    } else if (type === 2) {
      localStorage.removeItem(key)
    } else {
      localStorage.removeItem(key)
    }
  },
  // 设置本地存储数据
  setItem (key, value, type) {
    if (!value) {
      value = null
    }
    try {
      if (type === 1) {
        sessionStorage.setItem(key, value)
        if (!value) {
          sessionStorage.removeItem(key)
        }
      } else if (type === 2) {
        localStorage.setItem(key, value)
        if (!value) {
          localStorage.removeItem(key)
        }
      } else {
        localStorage.setItem(key, value)
        if (!value) {
          localStorage.removeItem(key)
        }
      }
    } catch (oException) {
      if (oException.name === 'QuotaExceededError') {
        common.log('超出本地存储限额！')
        // 如果历史信息不重要了，可清空后再设置
        const userInfo = $vm.$store.getters.getUserInfo
        localStorage.clear()
        that.$store.commit('setUserInfo', userInfo)
        if (type === 1) {
          sessionStorage.setItem(key, value)
          if (!value) {
            sessionStorage.removeItem(key)
          }
        } else if (type === 2) {
          localStorage.setItem(key, value)
          if (!value) {
            localStorage.removeItem(key)
          }
        } else {
          localStorage.setItem(key, value)
          if (!value) {
            localStorage.removeItem(key)
          }
        }
      }
    }
  },
  // 获取本地存储数据
  getItem (key, type) {
    let item = null
    if (type === 1) {
      item = sessionStorage.getItem(key)
    } else if (type === 2) {
      item = localStorage.getItem(key)
    } else {
      item = localStorage.getItem(key)
    }
    if (item === 'undefined') {
      item = null
    }
    return item
  },
  /**
   * id 倒计时场景id
   * time 倒计时时间
   * intervalCallback  每次时间递减执行需要执行的函数
   * callback  倒计时完成需要执行的函数
   */
  countdownTime (id, time, intervalCallback, callback) {
    const that = this
    // if(!id){
    //     that.error("The function countdownTime params id is no found!")
    //     return;
    // }
    if (time < 1) {
      clearTimeout(variablePool.countdownTimeIds[id])
      if (callback) {
        callback()
      }
      return
    }
    variablePool.countdownTimeIds[id] = setTimeout(() => {
      time--
      if (intervalCallback) {
        intervalCallback(time)
      }
      that.countdownTime(id, time, intervalCallback, callback)
    }, 1000)
  },
  // 获取语言
  langKey (langObj, key, options) {
    let str = key
    if (langObj && langObj[key]) {
      str = langObj[key]
    }
    if (options) {
      str = common.substitute(str, options)
    }
    return str
  },
  // md5加密
  commonMd5 (str) {
    return md5(str)
  },
  // 转换json
  jsonParse (content) {
    content = decodeURIComponent(content)
    try {
      return JSON.parse(content)
    } catch (error) {
      common.error(error)
      try {
        // eslint-disable-next-line no-new-func
        return new Function('return ' + content)()
      } catch (error) {
        common.error(error)
        // eslint-disable-next-line no-eval
        return eval('(' + content + ')')
      }
    }
  },
  trim (x) {
    return x.replace(/^\s+|\s+$/gm, '')
  },
  // 获取指定字符
  getString (str, count, symbol) {
    if (str.length > count) {
      return str.substring(0, count) + (symbol || '...')
    } else {
      return str
    }
  },
  clone (obj) {
    // for(let i in source){
    //   dest[i]=source[i];
    // }
    // Handle the 3 simple types, and null or undefined
    if (obj == null || typeof obj !== 'object') return obj

    // 传入的是日期
    if (obj instanceof Date) {
      const copy = new Date()
      copy.setTime(obj.getTime())
      return copy
    }

    // 传入的是数组
    if (obj instanceof Array) {
      const copy = []
      for (let i = 0, len = obj.length; i < len; ++i) {
        copy[i] = this.clone(obj[i])
      }
      return copy
    }

    // 传入的是对象
    if (obj instanceof Object) {
      const copy = {}
      for (var attr in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr])
      }
      return copy
    }

    throw new Error("Unable to copy obj! Its type isn't supported.")
  },
  formatDate (str) {
    return str.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, function ($0, $1, $2, $3, $4, $5, $6) {
      const time = $1 + '-' + $2 + '-' + $3 + ' ' + $4 + ':' + $5
      // console.log(time);
      return time
    })
  },
  changeArrayElement (that, arr, i, j) {
    // let i=arr.indexOf(source),j=arr.indexOf(dest);
    const swap = arr[i]
    that.$set(arr, i, arr[j])
    that.$set(arr, j, swap)
    return arr
  }
  //   aesEncrypt(word) {
  //     let key = CryptoJS.enc.Utf8.parse(Constants.SECRETKEY); // 加密秘钥 16位
  //     let iv = CryptoJS.enc.Utf8.parse(Constants.SECRETIV); // 加密矢量
  //     let srcs = CryptoJS.enc.Utf8.parse(word);
  //     let encrypted = CryptoJS.AES.encrypt(srcs, key, {
  //       iv: iv,
  //       mode: CryptoJS.mode.CBC,
  //       padding: CryptoJS.pad.Pkcs7
  //     });
  //     return encrypted.toString();
  //   },
  //   //解密
  //   aesDecrypt(word) {
  //     let key = CryptoJS.enc.Utf8.parse(Constants.SECRETKEY); // 加密秘钥 16位
  //     let iv = CryptoJS.enc.Utf8.parse(Constants.SECRETIV); // 加密矢量
  //     let decrypt = CryptoJS.AES.decrypt(word, key, {
  //       iv: iv,
  //       mode: CryptoJS.mode.CBC,
  //       padding: CryptoJS.pad.Pkcs7
  //     });
  //     return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  //   },
  // deferLoad (component, time = 0) {
  //     return (resolve) => {
  //         window.setTimeout(() => resolve(component), time)
  //     };
  // },
  //   aesEncrypt(word) {
  //     let key = CryptoJS.enc.Utf8.parse(Constants.SECRETKEY); // 加密秘钥 16位
  //     let iv = CryptoJS.enc.Utf8.parse(Constants.SECRETIV); // 加密矢量
  //     let srcs = CryptoJS.enc.Utf8.parse(word);
  //     let encrypted = CryptoJS.AES.encrypt(srcs, key, {
  //       iv: iv,
  //       mode: CryptoJS.mode.CBC,
  //       padding: CryptoJS.pad.Pkcs7
  //     });
  //     return encrypted.toString();
  //   },
  //   //解密
  //   aesDecrypt(word) {
  //     let key = CryptoJS.enc.Utf8.parse(Constants.SECRETKEY); // 加密秘钥 16位
  //     let iv = CryptoJS.enc.Utf8.parse(Constants.SECRETIV); // 加密矢量
  //     let decrypt = CryptoJS.AES.decrypt(word, key, {
  //       iv: iv,
  //       mode: CryptoJS.mode.CBC,
  //       padding: CryptoJS.pad.Pkcs7
  //     });
  //     return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  //   },
}
// window.tmCommon=common
export default common
