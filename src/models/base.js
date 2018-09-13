import { routerRedux } from 'dva/router'
export default {
    namespace: 'base',
    state: {},
    subscriptions: { 
        setup({ dispatch, history }) {
            history.listen(location => {
                
            })
        }
    },
    effects: {
        *goToPath({ params },{ call, put }){
            yield put(routerRedux.push(params))
        }
    }
}