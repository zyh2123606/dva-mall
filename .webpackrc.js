const themeConfig = require('./themeConfig')
const path = require('path')

export default{
    entry: 'src/index.js',
    theme: themeConfig,
    copy: [
        {from: 'src/swiper.css', to: 'swiper.css'}
    ],
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
            target: 'https://newretail.bonc.com.cn/top_mall',
            changeOrigin: true,
            pathRewrite: {'^/api': '/api'}
        }
    }
}
