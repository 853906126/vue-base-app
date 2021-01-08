const port = 8089 // dev port
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const Timestamp = new Date().getTime()
module.exports = {
  publicPath: '/',
  // outputDir: 'ge-wrok-platform-web',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // ----------用测内网代理---------------
      '/custCenter': {
        target: 'http://xxxxx:xxx',
        changeOrigin: true,
        pathRewrite: {
          '^/custCenter': '',
        },
      },
      '/projectCenter': {
        target: 'http://xxxx:xxxx',
        changeOrigin: true,
        pathRewrite: {
          '^/projectCenter': '/project',
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '基础框架'
      return args
    })
  },
  configureWebpack: {
    devtool: 'source-map',
    output: {
      // 输出打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `js/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
      chunkFilename: `js/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`,
    },
    plugins: [
      new MiniCssExtractPlugin({
        // 修改打包后css文件名
        filename: `css/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.css`,
        chunkFilename: `css/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.css`,
      }),
    ],
  },
}
