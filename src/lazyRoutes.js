import Loadable from 'react-loadable'

export const homePage = Loadable({loader: () => import('./routes/home'), loading: () =>(<div></div>)})
export const orderDetailPage = Loadable({loader: () => import('./routes/orderMgr'), loading: () =>(<div></div>)})
export const myOrderPage = Loadable({loader: () => import('./routes/myOrder'), loading: () =>(<div></div>)})
export const orderSurePage = Loadable({loader: () => import('./routes/orderMgr/orderSure'), loading: () =>(<div></div>)})
export const accountPage = Loadable({loader: () => import('./routes/account'), loading: () =>(<div></div>)})
export const addressMgrPage = Loadable({loader: () => import('./routes/addressMgr'), loading: () =>(<div></div>)})
export const addAddressPage = Loadable({loader: () => import('./routes/addressMgr/create'), loading: () =>(<div></div>)})
export const updateAddressPage = Loadable({loader: () => import('./routes/addressMgr/update'), loading: () =>(<div></div>)})
export const orderInfoPage = Loadable({loader: () => import('./routes/myOrder/orderInfo'), loading: () =>(<div></div>)})
export const orderCompletePage = Loadable({loader: () => import('./routes/orderMgr/orderComplete'), loading: () =>(<div></div>)})
export const productPage = Loadable({loader: () => import('./routes/product'), loading: () =>(<div></div>)})
export const searchPage = Loadable({loader: () => import('./routes/product/search'), loading: () =>(<div></div>)})
export const cartPage = Loadable({loader: () => import('./routes/shoppingCart'), loading: () =>(<div></div>)})
export const myOrderAllPage = Loadable({loader: () => import('./routes/myOrder/all'), loading: () =>(<div></div>)})
export const myOrderWaitPayPage = Loadable({loader: () => import('./routes/myOrder/waitPay'), loading: () =>(<div></div>)})
export const myOrderWaitRecivePage = Loadable({loader: () => import('./routes/myOrder/waitRecive'), loading: () =>(<div></div>)})
export const myOrderCompletePage = Loadable({loader: () => import('./routes/myOrder/complete'), loading: () =>(<div></div>)})
export const myOrderCancelPage = Loadable({loader: () => import('./routes/myOrder/cancel'), loading: () =>(<div></div>)})
export const successPage = Loadable({loader: () => import('./routes/message/success'), loading: () => (<div></div>)})
export const failPage = Loadable({loader: () => import('./routes/message/fail'), loading: () => (<div></div>)})
export const deptSelect = Loadable({loader: () => import('./routes/deptSelect/index'), loading: () => (<div></div>)})

