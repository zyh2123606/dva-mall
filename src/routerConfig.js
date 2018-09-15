/**
 * 路由配置
 */
import LazyComponent from './utils/lazyComponent'

const RouteConfig = [
    {path: '/', component: LazyComponent(import('./routes/home')), exact: true},
    {path: '/order-detail/:pid', component: LazyComponent(import('./routes/orderMgr')), exact: true},
    {path: '/my-order', component: LazyComponent(import('./routes/myOrder')), exact: false},
    {path: '/order-sure/:pid', component: LazyComponent(import('./routes/orderMgr/orderSure')), exact: true},
    {path: '/account', component: LazyComponent(import('./routes/account')), true: false}
]

export default RouteConfig
