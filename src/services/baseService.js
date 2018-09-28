import HttpBase from '../utils/httpBase'
import Constant from '../utils/constant'

class BaseService extends HttpBase{
    constructor(){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            config.headers.common['CSESSIONID'] = Constant.userData.sessionId
            return config
        })
    }
    //获取用户收货列表
    getHomeData = () => {
        return this.all([this.getSpecialProducts(), this.getHotProducts(), this.getNewProducts(),
            this.getTypesList(), this.getDeptInfo(),this.getAllBanne()])
    }
    //获取banner图
    getBannerList = () => {
        return this.get('/commend/getGoodsList?reType=1&deptId=1')
    }
    //特惠商品
    getSpecialProducts = () => {
        return this.get('/commend/getGoodsList?reType=1&deptId=1')
    }
    //热门商品
    getHotProducts = () => {
        return this.get('/commend/getGoodsList?reType=2&deptId=1')
    }
    //新品上架
    getNewProducts = () => {
        return this.get('/commend/getGoodsList?reType=3&deptId=1')
    }
    //获取商品分类
    getProductTypes = () => {
        return this.get('/commend/getGoodsList?reType=5&deptId=1')
    }
    getTypesList = () => {
        return this.get('/ad/getList?adType=5')
    }
    //获取用户信息
    getUserInfo = memId => {
        return this.get(`/mem/info/${memId}`)
    }
    //获取门店信息
    getDeptInfo = () => {
        return this.get('/dept/getDeptInfo?id=1')
    }

    // 获取首页所有类别下的banner图片信息（地址、名称）
    getAllBanne=()=>{
        return this.get(`/ad/getList`)
    }
}

export default new BaseService()
