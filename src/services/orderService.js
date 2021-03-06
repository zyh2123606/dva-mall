import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class OrderService extends HttpBase{
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
    getMyOrder = (status)=>{
        if(status){
            return this.get(`order/getList?memId=${this.MEMID}&status=${status}`)
        }
        let res = this.get(`order/getList?memId=${this.MEMID}`)
        return res
    }  
    addOrder=(data=undefined)=>{
        return this.postJson('/order/create',data)
    }

    queryOrderById=(data)=>{
        return this.post('/order/pay',data)
    }

    getOrderList=(orderCode)=>{
        if(orderCode){
            return this.get(`order/getList?memId=${this.MEMID}&orderCode=${orderCode}`)
        }
        return this.get(`order/getList?memId=${this.MEMID}`)
    }
    //支付接口
    pay=(orderCode)=>{
        return this.get(`/order/pay?orderCode=${orderCode}&memId=${this.MEMID}`)
    }
    //物流详情
    getLogisticsDetail = orderId => {
        return this.get(`/order/getLogisticsList?orderId=${orderId}`)
    }
    //删除订单接口
    deleteOrder = (orderId ) => {
        return this.get(`/order/delete/${this.MEMID}/${orderId}`)
    }
}

export default OrderService;
