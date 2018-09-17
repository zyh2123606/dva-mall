import HttpBase from '../utils/httpBase'
import { Toast } from 'antd-mobile'

class DeptService extends HttpBase{
    constructor(){
        super('/api')
        //添加拦截器设置请求头
        this.$http.interceptors.request.use(config => {
            Toast.loading('正在请求', 15)
            return config
        })
    }
    // 查询门店信息
    getDeptInfo = (data=undefined) => {
        // return this.post('/get-detail-by-id', data)
        return this.get('/dept/getDeptInfo')
    }
    /**
     * 获取自提门店列表
     * skuid:商品SKUID
     * orderDeptId：下单门店ID
     */
    getAdoptDeptList=(skuid,orderDeptId)=>{
        return this.get(`/dept/getAdoptDeptList?skuid=${skuid}&orderDeptId=${orderDeptId}`);
    }

}

export default new DeptService()
