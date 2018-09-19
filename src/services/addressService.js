import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class AddressService extends HttpBase{
  constructor(){
    super('/mem')
    //添加拦截器设置请求头
    this.$http.interceptors.request.use(config => {
      Toast.loading('正在请求', 15)
      return config
    })
  }
  getMyAddress= (data=undefined) => {
    return this.get('/addr/getList', data)
  }
}

export default new AddressService()
