module.exports = {
  aliyun: {
    nocaptcha: {
      // ali-yun captcha appkey
      // 500,000 times per year
      appkey: '',
      h5appkey: ''
    }
  },
  google: {
    ga: [''],
    geo: ''
  },
  routerMode: 'history',
  axioTimeout: 1000 * 15, // 超时时间为15s
  imageServer: 'https://upload.jsd1818.com', // 图片域名
  host: 'https://data.jsd1818.com', // 后端接口地址
  mockHost: 'https://jsd1818.com/testJsonData',
  debug: false
}
