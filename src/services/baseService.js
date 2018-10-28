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
        return this.all([this.getProdList(data), this.getProdTypeList(data)])
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
    getDeptInfo = () => {
        return this.get('/dept/getDeptInfo?id=1')
    }
	//获取用户信息
    getUserInfo = (accountId = '') => {
        return this.get(`/mem/info/${accountId}`)
    }
}

export default BaseService
