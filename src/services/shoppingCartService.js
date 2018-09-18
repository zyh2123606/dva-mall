/**
 * 购物车管理 service
 */
import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'


 class ShoppingCartService extends HttpBase{
    constructor(){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            Toast.loading('正在请求', 15)
            return config
        })
    }

    save=(data=undefined)=>{
        return this.post('cart/update',data)
    }

    //查询当前用户购物车商品数量（分页数据怎么传有待考量）
    query=(data)=>{
        return this.get(`cart/myCartList?memId=${data.memId}&cartIdList=${JSON.stringify(data.shoppingCarId)}`)
    }
 }
 export default new ShoppingCartService();