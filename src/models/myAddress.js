import { routerRedux } from 'dva/router'
export default {
    namespace: 'myAddress',
    state: {
        address:''
    },
    reducers:{
        editAddress(state,{payload}){
            state.address = payload.address
            debugger
            return {...state}
        },
    },
    subscriptions: {
    },
    effects: {
    }
}