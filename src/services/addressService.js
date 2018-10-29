import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class AddressService extends HttpBase{
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
    getMyAddress= (data=undefined) => {
        return this.postJson(`https://newretail.bonc.com.cn/top_mall/api/salesWebToWoStore/queryMemberAddress`, {accountId:this.MEMID})
    }
    saveAddress= (data=undefined) => {
        data['accountId']=this.MEMID
        const pData ={accountId:this.MEMID,DATA:data}
        return this.postJson(`https://newretail.bonc.com.cn/top_mall/api/salesWebToWoStore/saveMemberAddress`, pData)
    }
    updateAddress=(data=undefined)=>{
        data['accountId']=this.MEMID
        const pData ={accountId:this.MEMID,DATA:data}
        return this.postJson(`https://newretail.bonc.com.cn/top_mall/api/salesWebToWoStore/updateMemberAddress`, pData)
    }
    deleteAddress=(data=undefined)=>{
        const pData = {accountId:this.MEMID,DATA:{addrId:data.addrId}}
        return this.postJson(`https://newretail.bonc.com.cn/top_mall/api/salesWebToWoStore/removeMemberAddress`, pData)
    }
}

export default AddressService;
