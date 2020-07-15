const webpackBase = require("./webpack.config.base")

// 引入 webpack-merge 插件, 用来合并文件
const webpackMerge = require("webpack-merge")

/*
    mini-css-extract-plugin 插件是用来提取css到单独的文件的, 
    通过配合html-webpack-plugin插件的使用，生成的html就会自动引入css文件
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// clean-webpack-plugin的作用：在每次生成dist目录前，先删除本地的dist文件
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