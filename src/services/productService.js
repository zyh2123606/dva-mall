import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class ProductService extends HttpBase{
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

    // 获取商品详情
    getGoodsDetai=(data)=>{
        return this.postJson('/goodsInfoMallController/queryGoodsDetails',data)
    }

    getDetailById = (typeId=undefined,cloudShelfId=undefined) => {
        if(typeId){
            return this.get(`/goods/getGoodsInfo?typeId=${typeId}`)
        }
        return this.get(`/goods/getGoodsInfo?cloudShelfId=${cloudShelfId}`)
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
    searchGoods=(params)=>{
        return this.postJson('goods/search',params)
    }

    //联系客服
    connectService=(token)=>{
        this.post(`https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${token}`)
    }
}

export default ProductService;
