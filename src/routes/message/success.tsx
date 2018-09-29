import { Component } from 'react'
import { MessagePage } from '../../components'
import Block from 'fs-flex'

class SuccessPage extends Component{
    componentDidMount(){
        document.title='支付成功'
    }
    render(){
        const {match:{params:{orderId,sessionId,memId}}}  =this.props
        return <Block vf>
            <MessagePage status='success' message='支付成功' linkText='查看订单' linkUrl={`/order-complete/${orderId}/${sessionId}/${memId}`} />
        </Block>
    }
}

export default SuccessPage