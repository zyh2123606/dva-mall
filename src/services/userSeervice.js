import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class UserService extends HttpBase{
    constructor({sessionId,memId}){
        super('/api')
        this.MEMID=memId
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            config.headers.common['CSESSIONID']=sessionId
            Toast.loading('正在请求', 15)
            return config
        })
    }
    login = (data=undefined) => {
        return this.post('/login', data)
    }
    //获取用户收货列表
    getAddressList=()=>{
        return this.get(`/mem/addr/getList?memId=${this.MEMID}`)
    }
}

export default UserService;
