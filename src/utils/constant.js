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
    getWeekDays(){
        
        let days=[]
        for(let i=0;i<7;i++){
            var today = new Date();
            var targetday_milliseconds=today.getTime() + 1000*60*60*24*i;          
            today.setTime(targetday_milliseconds); //注意，这行是关键代码
            
            var tYear = today.getFullYear();  
            var tMonth = today.getMonth();  
            var tDate = today.getDate();  
            tMonth = this.doHandleMonth(tMonth + 1);  
            tDate = this.doHandleMonth(tDate);  

            var a = ["日", "一", "二", "三", "四", "五", "六"];  
            var str = "周"+ a[today.getDay()];  

            let dayStr=tMonth+"月"+tDate+'日（周'+str+')'; 
            days.push(dayStr)
        }
        return days
        
    },
    doHandleMonth(month){  
        var m = month;  
        if(month.toString().length == 1){  
        m = "0" + month;  
        } 
        return m;  
    },
    userData: {}
}
export default Constant;