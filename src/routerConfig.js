/**
 * 路由配置
 */
import LazyComponent from './utils/lazyComponent'

const RouteConfig = [
    {path: '/', component: LazyComponent(import('./routes/home')), exact: true},
    {path: '/order-detail/:pid', component: LazyComponent(import('./routes/orderDetail')), exact: true},
    {path: '/my-order', component: LazyComponent(import('./routes/myOrder')), exact: false}
]

export default RouteConfig
