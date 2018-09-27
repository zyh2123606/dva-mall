/**
 * 路由配置
 */
import {homePage, orderDetailPage, myOrderPage, orderSurePage, accountPage, addressMgrPage, 
    addAddressPage,updateAddressPage, orderInfoPage, orderCompletePage, productPage, searchPage, 
    cartPage, successPage, failPage} from './lazyRoutes'
    
const RouteConfig = [
    {path: '/home/:sessionId/:memId', component: homePage, exact: true},
    {path: '/order-detail/:pid', component: orderDetailPage, exact: true},
    {path: '/my-order', component: myOrderPage, exact: false},
    {path: '/order-sure/:shoppingcardId', component: orderSurePage, exact: true},
    {path: '/account/:sessionId/:memId', component: accountPage, exact: false},
    {path: '/address-mgr', component: addressMgrPage, exact: true},
    {path: '/add-address', component: addAddressPage, exact: true},
    {path: '/update-address', component: updateAddressPage, exact: true},
    {path: '/order-info/:orderId', component: orderInfoPage, exact: true},
    {path: '/product', component: productPage, exact: true},
    {path: '/search/:parentType/:name', component: searchPage, exact: true},
    {path: '/order-complete/:orderId', component: orderCompletePage, exact: true},
    {path: '/cart/:sessionId/:memId', component: cartPage, exact: true},
    {path: '/success/:orderId', component: successPage, exact: true},
    {path: '/fail', component: failPage, exact: true}
]

export default RouteConfig
