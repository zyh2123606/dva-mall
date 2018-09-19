/**
 * 路由配置
 */
import LazyComponent from './utils/lazyComponent'
const RouteConfig = [
    {path: '/', component: LazyComponent(import('./routes/home')), exact: true},
    {path: '/order-detail/:pid', component: LazyComponent(import('./routes/orderMgr')), exact: true},
    {path: '/my-order', component: LazyComponent(import('./routes/myOrder')), exact: false},
    {path: '/order-sure/:shoppingcardId', component: LazyComponent(import('./routes/orderMgr/orderSure')), exact: true},
    {path: '/account', component: LazyComponent(import('./routes/account')), exact: false},
    {path: '/address-mgr', component: LazyComponent(import('./routes/addressMgr')), exact: true},
    {path: '/add-address', component: LazyComponent(import('./routes/addressMgr/create')), exact: true},
    {path: '/order-info/:orderId', component: LazyComponent(import('./routes/myOrder/orderInfo')), exact: true},
    {path: '/order-complete/:orderId', component: LazyComponent(import('./routes/orderMgr/orderComplete')), exact: true},
    {path: '/product', component: LazyComponent(import('./routes/product')), exact: true},
    {path: '/search', component: LazyComponent(import('./routes/product/search')), exact: true},
    {path: '/order-complete/:orderId/:shoppingcardId', component: LazyComponent(import('./routes/orderMgr/orderComplete')), exact: true}
]

export default RouteConfig
