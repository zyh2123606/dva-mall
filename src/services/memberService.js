import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class MemBerService extends HttpBase{
    constructor({sessionId,memId}){
        super('https://newretail.bonc.com.cn/top_mall/api')
        this.MEMID=memId
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            Toast.loading('正在请求', 15)
            config.headers.common['CSESSIONID']=sessionId
            return config
        })
    }
    save= (data=undefined) => {
        return this.postJson(`/MemberMallController/saveMemberBasicInfo`, data)
    }
    query=(data)=>{
        return this.postJson('/MemberMallController/queryMemberBasicInfoByDeptIdAndTelnum',data)
    }
}

export default MemBerService;
