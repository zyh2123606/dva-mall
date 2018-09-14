/**
 * 路由配置
 */
import LazyComponent from './utils/lazyComponent'

const RouteConfig = [
    {path: '/', component: LazyComponent(import('./routes/home')), exact: true},
    {path: '/order-detail', component: LazyComponent(import('./routes/orderDetail')), exact: true},
    {path: '/submit-order', component: LazyComponent(import('./routes/submitOrder')), exact: true},
]

export default RouteConfig
