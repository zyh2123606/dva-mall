/**
 * 路由配置
 */
import {orderDetailPage, myOrderPage, orderSurePage, addressMgrPage, 
    addAddressPage,updateAddressPage, orderInfoPage, orderCompletePage, productPage, searchPage, successPage, failPage, deptSelect, defaultPage} from './lazyRoutes'
    
const RouteConfig = [
    {path: '/mall', component: defaultPage},
    {path: '/order-detail', component: orderDetailPage, exact: true},
    {path: '/my-order', component: myOrderPage, exact: false},
    {path: '/order-sure', component: orderSurePage, exact: true},
    {path: '/address-mgr/:sessionId/:memId', component: addressMgrPage, exact: true},
    {path: '/add-address/:sessionId/:memId', component: addAddressPage, exact: true},
    {path: '/update-address/:sessionId/:memId', component: updateAddressPage, exact: true},
    {path: '/order-info/:orderId/:sessionId/:memId', component: orderInfoPage, exact: true},
    {path: '/product/:typeId/:sessionId/:memId', component: productPage, exact: true},
    {path: '/search/:parentType/:sessionId/:memId', component: searchPage, exact: true},
    {path: '/order-complete', component: orderCompletePage, exact: true},
    {path: '/success/:orderId/:sessionId/:memId', component: successPage, exact: true},
    {path: '/fail', component: failPage, exact: true},
    {path: '/dept-select/:accountId', component: deptSelect, exact: true}
]

export default RouteConfig
