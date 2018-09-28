export default {
    namespace: 'userInfo',
    state: {
        memId:null,
        sessionId:null
    },
    reducers: {
        setUserInfo(state, {payload:{memId,sessionId}}) {
            state.memId=memId
            state.sessionId=sessionId
            return {...state};
        },
      },
    subscriptions: { 
       
    },
    effects: {
        
    }
}