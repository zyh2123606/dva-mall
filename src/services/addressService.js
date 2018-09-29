import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class AddressService extends HttpBase{
    constructor({sessionId,memId}){
        super('/api')
        this.MEMID=memId
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            Toast.loading('正在请求', 15)
            config.headers.common['CSESSIONID']=sessionId
            return config
        })
    }
    getMyAddress= (data=undefined) => {
        return this.get(`/mem/addr/getList?memId=${this.MEMID}`, data)
    }
    updateAddress=(data=undefined)=>{
        return this.postJson('/mem/addr/update',data)
    }
    deleteAddress=(data=undefined)=>{
        return this.get(`/mem/addr/delete?addrId=${data.addrId}&memId=${this.MEMID}`)
    }
}

export default AddressService;
