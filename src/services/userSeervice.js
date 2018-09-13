import HttpBase from '../utils/httpBase'

class UserService extends HttpBase{
    constructor(){
        super('/api')
    }
    login = (data=undefined) => {
        return this.post('/login', data)
    }
}

export default UserService
