var path = require('path')
var fs = require('fs')
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");


const os = require('os');

function getNetworkIp() {
    let needHost = ''; // 打开的host
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    console.log('--------------------xjw--------------------------------')
    console.log(needHost)
    return needHost;
}


// 合并配置文件
module.exports = webpackMerge(webpackBase, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "../dist"), //当前文件的目录
        // host: '192.168.1.235',
        host: getNetworkIp(),
        port: 9000, //端口改为9000
        // host:'192.168.3.16',
        disableHostCheck: true,
        compress: true,
        // open: true, // 自动打开浏览器，适合懒人
        index: 'monitorpage.html', // 与HtmlWebpackPlugin中配置filename一样
        proxy: {
            '/software': {
                // target: 'http://192.168.1.42:8080/software', //目标接口域名
                target: 'https://www.kitozer.net:9000/software',
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/software': '' //重写接口
                }
            }
        },
        before(app) {
            app.get('/projectConfigImg/:filename', function(req, res) {
                    fs.readFile(`./src/js/projectConfig/img/${req.params.filename}`, (err, data) => {
                        if (err) {
                            console.log(err)
                            res.status(404).end()
                        }
                        res.end(data)
                    })
                }),
                app.get('/projectConfig/:filename', function(req, res) {
                    fs.readFile(`./src/js/projectConfig/${req.params.filename}`, (err, data) => {
                        if (err) {
                            console.log(err)
                            res.status(404).end()
                        }
                        res.end(data)
                    })
                })
        }
    },
    module: { // 配置所有第三方loader 模块的
        rules: [ // 第三方模块的匹配规则
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            },
        ]
    }
});