const Constant = {
    responseOK:'0000',
    responseError:'1111',
    imgBaseUrl:'https://iretail.bonc.com.cn/pic/',
    toMoney(num){
        return (num/100).toFixed(2);
    },
    setUserInfo(memId,sessinId){
        localStorage.setItem('memId',memId)
        localStorage.setItem('sessionId',sessinId)
    },
    getUserInfo(){
        const memId=localStorage.getItem('memId')
        const sessionId=localStorage.getItem('sessionId')
        return {memId,sessionId}
    }
    userData: {}
}
export default Constant;