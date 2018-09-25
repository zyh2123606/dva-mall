const themeConfig = require('./themeConfig')
const path = require('path')

export default{
    entry: 'src/index.js',
    theme: themeConfig,
    env: {
        development: {
            extraBabelPlugins: [
                "dva-hmr",
                ["import", {"libraryName": "antd-mobile", "style": true}]
            ]
        },
        production: {
            publicPath: "",
            extraBabelPlugins: [
                ["import", {"libraryName": "antd-mobile", "style": true}]
            ]
        }
    },
    proxy: {
        '/api': {
            target: 'https://iretail.bonc.com.cn/',
            // target: 'http://127.0.0.1:8080',
            changeOrigin: true,
            pathRewrite: {'^/api': '/api'}
        }
    }
}
