import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class ProductService extends HttpBase{
    constructor(){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            Toast.loading('正在请求', 15)
            return config
        })
    }
    getDetailById = (data=undefined) => {
        return this.get(`/goods/getGoodsInfo?typeId=${data}`)
    }

    queryPriceByGoodsColor=(data)=>{
        return this.postJson('/goods/getSkuInfo',data)
    }
}

export default new ProductService()
