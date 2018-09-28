import { routerRedux } from 'dva/router'
import {Toast} from 'antd-mobile'
export default {
    state:{},
    namespace: 'base',
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