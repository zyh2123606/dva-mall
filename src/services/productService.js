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
    // 查询商品属性，根据parentID
    getTypeList=(parentTypeId=undefined)=>{
        if(parentTypeId){
            return this.get(`/goods/getTypeList?parentType=${parentTypeId}`)
        }
        return this.get('/goods/getTypeList')
    }

    queryFilterItem=(parentType)=>{
        return this.get(`/goods/getFacet?parentTypeId=${parentType}`)
    }
}

export default new ProductService()
