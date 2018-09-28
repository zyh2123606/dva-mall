import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class AddressService extends HttpBase{
    constructor(){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            Toast.loading('正在请求', 15)
            return config
        })
    }
    getMyAddress= (data=undefined) => {
        return this.get(`/mem/addr/getList?memId=${data.memId}`, data)
    }
    updateAddress=(data=undefined)=>{
        return this.postJson('/mem/addr/update',data)
    }
    deleteAddress=(data=undefined)=>{
        return this.get(`/mem/addr/delete?addrId=${data.addrId}&memId=${data.memId}`)
    }
}

export default new AddressService()
