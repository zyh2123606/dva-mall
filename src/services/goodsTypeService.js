import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class GoodsTypeService extends HttpBase{
    constructor({sessionId,accountId}){
        super('/api')
        this.accountId=accountId
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            config.headers.common['CSESSIONID']=sessionId
            Toast.loading('正在请求', 15)
            return config
        })
    }

    // 获取以及商品分类
    getFirststageGoodsType=(deptId)=>{
        return this.postJson('/goodsInfoMallController/typeList',{
            deptId:deptId,
            accountId:this.accountId
        })
    }
    
    // 获取第二级商品分类
    getSecondstageGoodsType=(deptId,parentId)=>{
        return this.postJson('/goodsInfoMallController/queryGoodsBrand',{
            DATA:{grandFatherTypeId:parentId},
            deptId:deptId,
            accountId:this.accountId
        })
    }

}

export default GoodsTypeService;
