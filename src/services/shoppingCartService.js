/**
 * 购物车管理 service
 */
import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'
import Constant from '../utils/constant'


 class ShoppingCartService extends HttpBase{
    constructor(){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            config.headers.common['CSESSIONID'] = Constant.userData.sessionId
            Toast.loading('正在请求', 15)
            return config
        })
    }

    save=(data=undefined)=>{
        return this.postJson('cart/update',data)
    }

    //查询当前用户购物车商品数量（分页数据怎么传有待考量）
    query=({memId,cartIdList})=>{
        return this.postJson('cart/getMyCartList',{memId:memId,cartIdList:cartIdList}) 
    }

    //删除购物车
    delete=(cartId,memId)=>{
        return this.get(`cart/delete?cartId=${cartId}&memId=${memId}`) 
    }
 }
 export default new ShoppingCartService();