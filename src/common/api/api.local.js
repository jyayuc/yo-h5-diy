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
  axioTimeout: 1000 * 60, // 超时时间为15s
  imageServer: 'https://data.jsd1818.com', // 图片域名
  // host: 'https://api-business.jsd1818.com', // 后端接口地址
  host: 'http://localhost:2020/admin', // 后端接口地址
  mockHost: 'http://localhost:2000/testJsonData',
  debug: false
}
