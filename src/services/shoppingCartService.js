/**
 * 购物车管理 service
 */
import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'


 class ShoppingCartService extends HttpBase{
    constructor({sessionId,memId}){
        console.log(`sessionId  memId:${memId}`)
        super('https://newretail.bonc.com.cn/top_mall/api')
        this.MEMID=memId
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            config.headers.common['CSESSIONID']=sessionId
            Toast.loading('正在请求', 15)
            return config
        })
    }

    add=(data)=>{
        return this.postJson('ShopCartController/saveMemberMallCart',data)
    }
    save=(data=undefined)=>{
        return this.postJson('ShopCartController/changeMemberMallCart',data)
    }

    //查询当前用户购物车商品数量（分页数据怎么传有待考量）
    query=(data)=>{
        return this.postJson('ShopCartController/queryMemberMallCart',data) 
    }

    //删除购物车
    delete=(data)=>{
        return this.postJson(`ShopCartController/delMemberMallCart`,data) 
    }
 }
 export default ShoppingCartService;