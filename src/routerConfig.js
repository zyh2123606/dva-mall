/**
 * 路由配置
 */
import {homePage, orderDetailPage, myOrderPage, orderSurePage, accountPage, addressMgrPage, 
    addAddressPage,updateAddressPage, orderInfoPage, orderCompletePage, productPage, searchPage, 
    cartPage, successPage, failPage,deptSelect} from './lazyRoutes'
    
const RouteConfig = [
    {path: '/home', component: homePage, exact: true},
    {path: '/order-detail/:pid/:sessionId/:memId', component: orderDetailPage, exact: true},
    {path: '/my-order', component: myOrderPage, exact: false},
    {path: '/order-sure', component: orderSurePage, exact: true},
    {path: '/account/:sessionId/:memId', component: accountPage, exact: true},
    {path: '/address-mgr/:sessionId/:memId', component: addressMgrPage, exact: true},
    {path: '/add-address/:sessionId/:memId', component: addAddressPage, exact: true},
    {path: '/update-address/:sessionId/:memId', component: updateAddressPage, exact: true},
    {path: '/order-info/:orderId/:sessionId/:memId', component: orderInfoPage, exact: true},
    {path: '/product/:typeId/:sessionId/:memId', component: productPage, exact: true},
    {path: '/search/:parentType/:sessionId/:memId', component: searchPage, exact: true},
    {path: '/order-complete/:orderId/:sessionId/:memId', component: orderCompletePage, exact: true},
    {path: '/cart/:sessionId/:memId', component: cartPage, exact: true},
    {path: '/success/:orderId/:sessionId/:memId', component: successPage, exact: true},
    {path: '/fail', component: failPage, exact: true},
    {path: '/dept-select/:sessionId/:memId', component: deptSelect, exact: true}
]

export default RouteConfig
