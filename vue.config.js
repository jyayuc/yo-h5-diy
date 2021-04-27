var webpack = require('webpack')
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const vConsolePlugin = require("vconsole-webpack-plugin"); // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']
const chalk = require('chalk')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
console.log(
  // chalk.rgb(0, 150, 73).bold.bgRgba(0, 0, 0)(`
  chalk.rgb(0, 150, 73).bold(` 
*        ┏┓   ┏┓+ +
*       ┏┛┻━━━┛┻┓ + +
*       ┃      ┃  
*       ┃   ━   ┃ ++ + + +
*       ████━████  ┃+
*       ┃       ┃ +
*       ┃   ┻   ┃
*       ┃      ┃ + +
*       ┗━┓   ┏━┛
*         ┃   ┃           
*         ┃   ┃ + + + +
*         ┃   ┃    Code is far away from bug with the animal protecting       
*         ┃   ┃ +     神兽保佑,代码无bug  
*         ┃   ┃
*         ┃   ┃  +         
*         ┃    ┗━━━┓ + +
*         ┃        ┣┓
*         ┃       ┏┛
*         ┗┓┓┏━┳┓┏┛ + + + +
*          ┃┫┫ ┃┫┫
*          ┗┻┛ ┗┻┛+ + + + `)
)
module.exports = {
  // 应用子路径，项目部署的基础路径
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  publicPath: '/',
  // 生产环境构建文件的目录
  outputDir: process.env.VUE_APP_API_HOST === 'prod' ? 'dist_prod' : 'dist',
  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: 'static',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  indexPath: 'index.html',
  // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  // 用于多页配置，默认是 undefined
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '微页面',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index', 'service']
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },
  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  runtimeCompiler: false,

  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [
    /* string or regex */
  ],

  // 是否为生产环境构建生成 source map？
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  crossorigin: undefined,
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
  integrity: false,
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: config => {
    // config.plugins.delete("html");
    // config.plugins.delete("preload");
    /**
     * 删除懒加载模块的prefetch，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch-index')
  },
  configureWebpack: config => {
    config.externals = {
      // "./cptable": "var cptable",
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      'element-ui': 'ELEMENT',
      axios: 'axios',
      moment: 'moment',
      accounting: 'accounting',
      'big.js': 'Big',
      qs: 'Qs'
    }
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.less'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        vendor: resolve('src/vendor')
      }
    }
    const pluginsPro = [
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       drop_debugger: true,
      //       drop_console: true
      //     }
      //   }
      // })
      new CompressionWebpackPlugin({
        // 文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
        threshold: 10240, // 对10K以上的数据进行压缩
        minRatio: 0.8,
        deleteOriginalAssets: false // 是否删除源文件
      })
      // Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
      // new BundleAnalyzerPlugin(),
    ]
    // 开发环境
    const pluginsDev = [
      // 移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
      // new vConsolePlugin({
      //   filter: [], // 需要过滤的入口文件
      //   enable: true // 发布代码前记得改回 false
      // })
    ]

    config.plugins = [
      ...config.plugins,
      // new webpack.optimize.CommonsChunkPlugin('common.js'),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery'
      })
    ]
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
      // config.entry.app = ['babel-polyfill', './src/main.js'];
      // config.externals = {
      // 'vue': 'Vue',
      // 'vue-router': 'VueRouter',
      // 'iview': 'iview',
      // 'vuex': 'vuex',
      // }
      config.plugins = [...config.plugins, ...pluginsPro]
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins, ...pluginsDev]
    }
  },

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: process.env.NODE_ENV === 'production',

    // 是否开启 CSS source map？
    sourceMap: process.env.NODE_ENV !== 'production',

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      // less: {
      //   prependData: `
      //    @import "@/assets/less/common.less";
      //   `
      // }
    },

    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    requireModuleExtension: true
  },

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 2000,
    https: false,
    hotOnly: false,
    disableHostCheck: true, //  新增该配置项
    // proxy: {
    // '/service': {
    //   // target: "http://localhost:8080",
    //   ws: false,
    //   secure: false,
    //   changeOrigin: true,
    //   pathRewrite: { '/service': '/' }
    // }
    // }, // string | Object
    allowedHosts: [
      // 'host.com',
      // 'subdomain.host.com',
      // 'subdomain2.host.com',
      // 'host2.com'
    ]
    // // color: true,
    // // compress: true,
    // before: (app, server) => {
    //   console.log(app, server);
    // },
    // after: (app, server) => {
    //   console.log(app, server);
    // }
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/tree/master/vue-cli-plugin-pwa
  pwa: {},

  // 三方插件的选项
  pluginOptions: {
    // ...
  }
}
