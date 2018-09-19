import { routerRedux } from 'dva/router'
export default {
    namespace: 'myAddress',
    state: {
        editIndex:0,
        edityFlag:false,
        data:[]
    },
    reducers:{
        initState(state,{payload}){
            state.data = payload
          return {...state}
        },
        editAddress(state,{payload}){
            state.editIndex = payload.editIndex
            state.editFlag = payload.editFlag
            return {...state}
        },
    },
    subscriptions: {
    },
    effects: {
    }
}