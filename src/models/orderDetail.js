import { routerRedux } from 'dva/router'
export default {
    namespace: 'orderDetail',
    state: {
        typeId:0,// 商品ID
        colorId:0,// 商品颜色ID
        goodsNum:0,//商品数量
        defaultSkuPrice:0,//商品单价,
    },
    reducers:{
        saveOrder(state,{payload}){
            return {...state,payload}
        },
    },
    subscriptions: { 
        setup({ dispatch, history }) {
            history.listen(location => {
                
            })
        }
    },
    effects: {
        *goToPath({ params },{ call, put }){
            yield put(routerRedux.push(params))
        },
        *submitOrder({payload},{put}){
            yield put({
                type:'saveOrder',
                payload:{...payload}
            })
            // yield put() 跳转到确认订单页面
        }
    }
}