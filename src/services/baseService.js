import HttpBase from '../utils/httpBase'

class BaseService extends HttpBase{
    constructor(props){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            const { sessionId=undefined } = props || {}
            config.headers.common['CSESSIONID'] = sessionId
            return config
        })
    }
    //获取用户收货列表
    getHomeData = (data=undefined) => {
        return this.all([this.getProdList(data), this.getProdTypeList(data), this.getInitDeptInfo(data)])
    }
    //获取商品详情
    getProdList = (data=undefined) => {
        return this.post('/salesWebToWoStore/index', data)
    }
    //获取商品类型列表
    getProdTypeList = (data=undefined) => {
        return this.post('/goodsInfoMallController/typeList', data)
    }
    //获取门店信息
    getDeptInfo = (data=undefined) => {
        return this.postJson('/salesWebToWoStore/initDept', data)
    }
    //获取初始化门店信息
    getInitDeptInfo(data){
        return this.post('/salesWebToWoStore/initDept', data)
    }
	//获取用户信息
    getUserInfo = (data=undefined) => {
        return this.postJson(`salesWebToWoStore/queryMemAccountInfo`,data)
    }
}

export default BaseService
