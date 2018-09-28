import { routerRedux } from 'dva/router'
import {Toast} from 'antd-mobile'
export default {
    namespace: 'base',
    state: {
        memId:null,
        sessionId:null
    },
    reducers: {
        setUserInfo(state, {payload:{memId,sessionId}}) {
            return { memId: memId,sessionId:sessionId};
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
        }
    }
}