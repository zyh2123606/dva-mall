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
    getAddressList=(data)=>{
        return this.postJson('/salesWebToWoStore/queryMemberAddress',data)
    }

    // 查询可开发票信息salesWebToWoStore/queryInvoiceType
    queryInvoiceType=(data)=>{
        return this.postJson('/salesWebToWoStore/queryInvoiceType',data)
    }

    // 获取可用红包MemberMallController/queryRedTicket
    queryRedTicket=(data)=>{
        return this.postJson('/MemberMallController/queryRedTicket',data)
    }
    // 获取会员信息
    queryMember=(data)=>{
        return this.postJson('/MemberMallController/queryMemberBasicInfoByDeptIdAndTelnum',data)
    }
}

export default UserService;
