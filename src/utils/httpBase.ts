/**
 * ajax请求基类
 * @class HttpBase
 */
import Axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'

interface HttpInterFace{
    get: (url: string, config: any) => any,
    post: (url: string, data: any, config: any) => any,
    postJson: (url: string, data: any, config: any) => any,
    put: (url: string, data: any, config: any) => any,
    delete: (url: string, data: any, config: any) => any,
    cancel: () => void
}
class HttpBase implements HttpInterFace {
    private source: any
    public $http: any
    public dataMethodDefault: any
    constructor(base_url: string){
        const cancelToken = Axios.CancelToken
        this.source = cancelToken.source()
        this.$http = Axios.create({baseURL: base_url})
        this.dataMethodDefault = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true,
            transformRequest: [(data: any) => qs.stringify(data)],
            timeout: 30000
        }
        //添加拦截器，提前处理返回的数据
        this.$http.interceptors.response.use((response: any) => {
            Toast.hide()
            let { data } = response
            return data
        }, (err: any) => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 400: err.message = '请求错误'
                        break
                    case 401: err.message = '未授权，请登录'
                        break
                    case 403: err.message = '拒绝访问'
                        break
                    case 404: err.message = `请求地址出错: ${err.response.config.url}`
                        break
                    case 408:
                        err.message = '请求超时'
                        break
                    case 500: err.message = '服务器内部错误'
                        break
            
                    case 501: err.message = '服务未实现'
                        break
                    case 502: err.message = '网关错误'
                        break
                    case 503: err.message = '服务不可用'
                        break
                    case 504: err.message = '网关超时'
                        break
                    case 505: err.message = 'HTTP版本不受支持'
                        break
                    default:
                }
            }
            Toast.info(err.response.status + err.message)
            return Promise.reject(err)
        })
    }
    /**
     * get 请求
     * 
     * @param {any} url 请求地址
     * @param {any} [config={}] 参数
     * @returns 
     * @memberof HttpBase
     */
    get(url: string, config = {}){
        return this.$http.get(url, {...this.dataMethodDefault, ...config})
    }
    /**
     * pos请求
     * 
     * @param {any} url 请求地址
     * @param {any} [data=undefined] 携带的数据
     * @param {any} config 参数
     * @returns 
     * @memberof HttpBase
     */
    post(url: string, data=undefined, config={}){
        return this.$http.post(url, data, {...this.dataMethodDefault, ...config})
    }
    /**
     * post 请求，json格式
     * @param url 
     * @param data 
     */
    postJson(url: string, data=undefined){
        return this.$http.post(url,data,{
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            withCredentials: true,
            timeout: 30000
        })
    }
    /**
     * 主要用于更新
     * 
     * @param {any} url 请求地址
     * @param {any} [data=undefined] 携带的数据
     * @param {any} config 参数
     * @returns 
     * @memberof HttpBase
     */
    put(url: string, data=undefined, config={}){
        return this.$http.put(url, data, {...this.dataMethodDefault, ...config})
    }
    /**
     * 删除
     * 
     * @param {any} url 请求地址
     * @param {any} [config={}] 参数
     * @returns 
     * @memberof HttpBase
     */
    delete(url: string, data: undefined, config={}){
        return this.$http.delete(url, {...this.dataMethodDefault, ...config})
    }
    /**
     * 取消请求
     */
    cancel(){
        this.source.cancel()
    }
    /**
     * 一次并发多个请求
     */
    all(iterable:[]){
        return Axios.all(iterable)
    }
}

export default HttpBase
