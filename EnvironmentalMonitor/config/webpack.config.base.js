// 由于 webpack 是基于Node进行构建的，所有，webpack的配置文件中，任何合法的Node代码都是支持的
var path = require('path')
// 在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
// 如果要配置插件，需要在导出的对象中，挂载一个 plugins 节点
var HTMLWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 用来优化打包之后文件提交的工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
var webpack=require('webpack')
const config = require("./config")

// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = []
// 入口文件集合
let Entries = {}

config.HTMLDirs.forEach((page) => {
  const htmlPlugin = new HTMLWebpackPlugin({
      filename: `${page}.html`,
      template: path.resolve(__dirname, `../src/${page}.html`),
      chunks: [page, 'common'],
      favicon: path.resolve('./src/img/logo/logo.png'),
  });
  HTMLPlugins.push(htmlPlugin);
  Entries[page] = ["babel-polyfill",path.resolve(__dirname, `../src/js/page/${page}.js`)];
})

// 当以命令行形式运行 webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打包 的文件的 入口 和 出口文件，此时，他会检查项目根目录中的配置文件，并读取这个文件，就拿到了导出的这个 配置对象，然后根据这个对象，进行打包构建
module.exports = {
  entry: Entries, // 入口文件
  devtool:"cheap-module-source-map",
  output: { // 指定输出选项
    path: path.join(__dirname, '../dist'), // 输出路径; __dirname 指向当前执行文件(如:webpack.config.base.js)所在的目录路径
    filename: 'js/[name].bundle.[hash].js', // 指定输出文件的名称;  [name] --> 入口名称
    chunkFilename: 'js/[name].min.js' // [name] --> 入口名称
  },
  plugins: [ // 所有webpack  插件的配置节点
    ...HTMLPlugins,
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin({openAnalyzer: false}),
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:'jquery',
      'window.$':'jquery',
      'window.jQuery':'jquery'
    }),
  ],

  module: { // 配置所有第三方loader 模块的
    rules: [ // 第三方模块的匹配规则
      // { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
      // { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
      
      // 处理 图片路径的 loader
      // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
      { test: /\.(jpe?g|png|gif|bmp)$/,
        use: [{loader: 'url-loader',options: { limit:10000,name: 'img/[hash:8]-[name].[ext]'}},{loader: 'image-webpack-loader',},],
        exclude: /node_modules/
      },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
      { test: /\.vue$/, use: 'vue-loader' }, // 处理 .vue 文件的 loader
      { test: /\.(htm|html)$/i, loader: 'html-withimg-loader' },
      { test:path.resolve('jquery'), loader:'expose-loader?$!expose-loader?jQuery' },
      {
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        enforce: "pre",
        //指定检查的目录
        include: [path.resolve(__dirname, '../src')],
        exclude: [path.resolve(__dirname, '../src/components/security/video')],
        //eslint检查报告的格式规范
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      }
    ],
  },
  resolve: {
    alias: {
      '@':path.resolve('src')// 这样配置后 @ 可以指向 src 目录
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        // echart: {
        //   name:"echart",
        //   // test: /[\\/]src[\\/]components[\\/]base[\\/]tab[\\/]baseHistoryInquiry[\\/]js[\\/]/,
        //   // test: /[\\/]node_modules[\\/][^\\/]*?echarts[^\\/]*?[\\/]/,
        //   test:/[\\/]node_modules[\\/]/,
        //   // test: path.resolve(__dirname, "../node_modules/[^\\/]*?echarts[^\\/]*?/"),
        //   priority: -10
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true
        // },
        common: {
          name:"common",
          chunks:"initial",
          minChunks: 2,
          minSize: 0,
          priority:-20
        },
        base:{
          name:"base",
          chunks:"all",
          minChunks:2,
          priority:-30
        },
        default: {
          priority: -40,
          reuseExistingChunk: true
        },
      }
    }
  }
}