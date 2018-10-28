import cookie from 'react-cookies'

const Constant = {
    responseOK:'0000',
    responseError:'1111',
    imgBaseUrl:'https://newretail.bonc.com.cn',
    toMoney(num){
        return (num/100).toFixed(2);
    },
    setUserInfo(memId,sessionId){
        // localStorage.setItem('memId',memId)
        // localStorage.setItem('sessionId',sessinId)
        cookie.save('userInfo', {memId:memId,sessionId:sessionId}, { path: '/' })
    },
    getUserInfo(){
        // const memId=localStorage.getItem('memId')
        // const sessionId=localStorage.getItem('sessionId')
        const {memId,sessionId}=cookie.load('userInfo')
        return {memId,sessionId}
    },
    userData: {}
}
export default Constant;