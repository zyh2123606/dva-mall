import HttpBase from '../utils/httpBase'
import Constant from '../utils/constant'
import { Toast } from 'antd-mobile'

class UserService extends HttpBase{
    constructor(){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            config.headers.common['CSESSIONID'] = Constant.userData.sessionId
            Toast.loading('正在请求', 15)
            return config
        })
    }
    login = (data=undefined) => {
        return this.post('/login', data)
    }
    //获取用户收货列表
    getAddressList=(userId)=>{
        return this.get(`/mem/addr/getList?memId=${userId}`)
    }
}

export default new UserService()
