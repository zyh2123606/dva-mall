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
    getHomeData = ({ accountId, deptId }) => {
        return this.post('/salesWebToWoStore/index', { accountId, deptId })
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
