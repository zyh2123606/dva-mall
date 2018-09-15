const path = require('path')
export default function (config, env) {
    const svgDirs = [
        require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
        path.resolve(__dirname, 'src/assets/svg')  // 自己私人的 svg 存放目录
    ]
    config.module.rules.push({
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: svgDirs
    })
    return config
}