const Constant = {
    responseOK:'0000',
    responseError:'1111',
    imgBaseUrl:'https://iretail.bonc.com.cn/pic/',
    toMoney(num){
        return (num/100).toFixed(2);
    },
    userData: {}
}
export default Constant;