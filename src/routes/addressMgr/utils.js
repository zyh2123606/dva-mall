import { Toast} from 'antd-mobile'

export  function  checkFormat(addressInfo){
        if(addressInfo.conUser===undefined || addressInfo.conUser.length===0){
            Toast.info("请输入有效的收货人！")
            return false
        }
        if(addressInfo.conTel===undefined || addressInfo.conTel.length===0){
            Toast.info("请输入有效的联系电话！")
            return false
        }
        if(addressInfo.conTel.length!==11){
            Toast.info("请输入有效的手机号")
            return false
        }
        if(addressInfo.pcc===undefined || addressInfo.pcc.length===0){
            Toast.info("请输入有效的所属区域！")
            return false
        }
        if(addressInfo.street===undefined || addressInfo.street.length===0){
            Toast.info("请输入有效的街道地址！")
            return false
        }
        if(addressInfo.addrDetail===undefined || addressInfo.addrDetail.length===0){
            Toast.info("请输入有效的收货地址！")
            return false
        }
        return true
    }
