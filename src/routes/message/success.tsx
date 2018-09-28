import { Component } from 'react'
import { MessagePage } from '../../components'
import Block from 'fs-flex'
import {Button} from 'antd-mobile'

class SuccessPage extends Component{
    componentDidMount(){
        document.title='支付成功'
    }
    payTest=()=>{
        //https://wxpay.wxutil.com/mch/pay/h5.v2.php
        window.location.href='https://wxpay.wxutil.com/mch/pay/h5.v2.php'
    }
    render(){
        const {match:{params:{orderId}}}  =this.props
        return <Block vf>
            <MessagePage status='success' message='支付成功' linkText='查看订单' linkUrl={`/order-complete/${orderId}`} />
            <Block>
                <Button onClick={this.payTest}>支付测试</Button>
            </Block>
        </Block>
    }
}

export default SuccessPage