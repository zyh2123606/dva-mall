const themeConfig = require('./themeConfig')
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
    proxy:{
        proxy: {
            '/api/vc': {
                target: 'https://app.yostom.com/api/vc',
                changeOrigin: true,
                pathRewrite: {'^/api/vc': ''}
            }
        }
    }
}
