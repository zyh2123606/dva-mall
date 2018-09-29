import Block from 'fs-flex';
import React from 'react';
import {routerRedux} from 'dva/router';
import Constant from '../../utils/constant';
import {connect} from 'dva';
function OrderSuccess({match,dispatch}){
    const {params:{orderId,flag,shoppingcardId,sessionId,memId}}=match
    function showOrderDetail(){
        if(flag===Constant.responseOK){
            dispatch(routerRedux.push(`/order-complete/${orderId}/${shoppingcardId}/${sessionId}/${memId}`))
        }else if(flag===Constant.responseError){
            console.log('重新支付')
        } 
        
    }

    return (
        <Block f={1}>
            {
                flag===Constant.responseOK?
                <Block vf a='c' style={{top:'20%',width:'80px', backgroundColor:'red'}}>
                    <Block><img h={60} src='../../assets/wancehng.png' alt='成功'/></Block>
                    <Block onClick={showOrderDetail} style={{borderRadius:'15',height:'25px'}}>查看订单</Block>
                </Block>:
                <Block vf a='c' style={{top:'20%',width:'80px', backgroundColor:'red'}}>
                    <Block><img h={60} src='../../assets/shibai.png' alt='失败'/></Block>
                    <Block onClick={this.showOrderDetail} style={{borderRadius:'15',height:'25px'}}>重新支付</Block>
                </Block>
            }
            
        </Block>
    )
}
export default connect()(OrderSuccess);