import { Toast} from 'antd-mobile'

export  function  checkFormat(addressInfo){
        if(addressInfo.receiver===undefined || addressInfo.receiver.length===0){
            Toast.info("请输入有效的收货人！")
            return false
        }
        if(addressInfo.tel===undefined || addressInfo.tel.length===0){
            Toast.info("请输入有效的联系电话！")
            return false
        }
        if(addressInfo.tel.length!==11){
            Toast.info("请输入有效的手机号")
            return false
        }
        if(addressInfo.pcc===undefined || addressInfo.pcc.length===0){
            Toast.info("请输入有效的所属区域！")
            return false
        }
        if(addressInfo.address===undefined || addressInfo.address.length===0){
            Toast.info("请输入有效的收货地址！")
            return false
        }
        return true
    }
