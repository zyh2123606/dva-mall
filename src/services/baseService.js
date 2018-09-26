import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class BaseService extends HttpBase{
    constructor(){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            return config
        })
    }
    //获取用户收货列表
    getHomeData = data => {
        return this.all([this.getBannerList(), this.getSpecialProducts(), 
            this.getHotProducts(), this.getNewProducts(), this.getProductTypes()])
    }
    //获取banner图
    getBannerList = () => {
        return this.get('/commend/getGoodsList?reType=1&deptId=1')
    }
    //特惠商品
    getSpecialProducts = () => {
        return this.get('/commend/getGoodsList?reType=2&deptId=1')
    }
    //热门商品
    getHotProducts = () => {
        return this.get('/commend/getGoodsList?reType=3&deptId=1')
    }
    //新品上架
    getNewProducts = () => {
        return this.get('/commend/getGoodsList?reType=4&deptId=1')
    }
    //获取商品分类
    getProductTypes = () => {
        return this.get('/commend/getGoodsList?reType=5&deptId=1')
    }
}

export default new BaseService()
