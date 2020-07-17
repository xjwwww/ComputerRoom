const webpackBase = require("./webpack.config.base")
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
    mode:'production',
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename:'css/[id].css'
        }),
        new CleanWebpackPlugin(),
    ],
    module: { // 配置所有第三方loader 模块的
        rules: [ // 第三方模块的匹配规则
          { test: /\.css$/, use: [
              { loader:MiniCssExtractPlugin.loader,options:{publicPath: '../'}},
              { loader: 'css-loader', options: { importLoaders: 1} },
              'postcss-loader'
            ] 
          },
        ]
    }
});