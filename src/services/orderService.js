import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class OrderService extends HttpBase{
    constructor(){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            Toast.loading('正在请求', 15)
            return config
        })
    }
    getMyOrder = (memId,orderCode)=>{
        if(orderCode){
            return this.get(`rder/getList?memId=${memId}&orderCode=${orderCode}`)
        }
        let res = this.get(`order/getList?memId=${memId}`)
        debugger
        return res
    }  
    addOrder=(data=undefined)=>{
        return this.postJson('/order/create',data)
    }

    queryOrderById=(data)=>{
        return this.post('/order/pay',data)
    }

    getOrderList=(memId,orderCode)=>{
        if(orderCode){
            return this.get(`order/getList?memId=${memId}&orderCode=${orderCode}`)
        }
        return this.get(`order/getList?memId=${memId}`)
    }
}

export default new OrderService()
