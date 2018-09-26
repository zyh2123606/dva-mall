import { Component } from 'react'
import { MessagePage } from '../../components'
import Block from 'fs-flex'

class SuccessPage extends Component{
    render(){
        const {match:{params:{orderId}}}  =this.props
        return <Block vf>
            <MessagePage status='success' message='支付成功' linkText='查看订单' linkUrl={`/order-complete/${orderId}`} />
        </Block>
    }
}

export default SuccessPage