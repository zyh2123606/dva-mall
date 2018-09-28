import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'
import Constant from '../utils/constant'

class OrderService extends HttpBase{
    constructor(){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            config.headers.common['CSESSIONID'] = Constant.userData.sessionId
            Toast.loading('正在请求', 15)
            return config
        })
    }
    getMyOrder = (memId,status)=>{
        if(status){
            return this.get(`order/getList?memId=${memId}&status=${status}`)
        }
        let res = this.get(`order/getList?memId=${memId}`)
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
    //支付接口
    pay=(orderCode,memId)=>{
        return this.get(`/order/pay?orderCode=${orderCode}&memId=${memId}`)
    }
    //物流详情
    getLogisticsDetail = orderId => {
        return this.get(`/order/getLogisticsList?orderId=${orderId}`)
    }
    //删除订单接口
    deleteOrder = ( memId,orderId ) => {
        return this.get(`/order/delete/${memId}/${orderId}`)
    }
}

export default new OrderService()
