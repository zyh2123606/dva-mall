import HttpBase from '../utils/httpBase'

class UserService extends HttpBase{
    constructor(){
        super('/api')
    }
    login = (data=undefined) => {
        return this.post('/login', data)
    }
    //获取用户收货列表
    getAddressList=(userId)=>{
        return this.get(`/mem/addr/getList?userId=${userId}`)
    }
}

export default new UserService()
