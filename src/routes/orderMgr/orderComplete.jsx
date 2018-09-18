import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Icon } from 'antd-mobile'
import OrderService from '../../services/orderService'
/**
 *订单完成
 *
 * @class OrderComplete
 * @extends {Component}
 */
class OrderComplete extends Component{
    state={
        orderInfo:{},//订单信息

    }
    async componentDidMount(){
        await this.queryOrderInfo()
    }
    async queryOrderInfo(){
        const {match:{params:{orderId,shoppingcardId}}}=this.props
        const {data,code}= await OrderService.queryOrderById(orderId)
        console.log('queryOrderInfo:',data)
        if(code==='1111'){
            this.setState({
                orderInfo:data
            })
        }
    }
    render(){
        const {orderInfo}=this.state
        return (
            <Block vf className={Styles.complete_container}>
                <Block a='c' className={Styles.header}>
                    <Block ml={15} className={Styles.order_ico} j='c' a='c'>
                        <Icon type='check' />
                    </Block>
                    <Block ml={10} fc='#fff'>订单完成</Block>
                </Block>
                <Block bc='#fff' pt={15} pb={15} a='c' wf fs={14}>
                    <Block className={Styles.pos_ico}></Block>
                    <Block vf f={1} mr={15}>
                        <Block wf>
                            <Block f={1}>刘可可</Block>
                            <Block>18313858906</Block>
                        </Block>
                        <Block mt={5} wf>
                            <Block>自提门店：青年路营业厅昆明市南关区东岭南街1103号</Block>
                        </Block>
                    </Block>
                </Block>
                <Block vf bc='#fff' pl={15} pr={15} mt={10} pb={15}>
                    <Block pt={10} pb={10} fs={16} style={{fontWeight: 'bold'}}>商品信息</Block>
                    <Block wf>
                        <Block className={Styles.prod_pic}></Block>
                        <Block f={1} ml={15}>
                            <Block>Apple AirPods无线蓝牙耳机 iphoneX双耳pods入耳式耳机</Block>
                            <Block mt={5} fs={12} fc='#999'>黑色</Block>
                            <Block wf>
                                <Block f={1}>×1</Block>
                                <Block className={Styles.orangeColor}>￥1099.00</Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
                <Block vf bc='#fff' pl={15} pr={15} mt={10} pb={15}>
                    <Block pt={10} pb={10} fs={16} style={{fontWeight: 'bold'}}>订单详情</Block>
                    <Block wf>
                        <Block f={1}>订单编号：</Block>
                        <Block>{orderInfo.orderCode}</Block>
                    </Block>
                    <Block mt={5} wf>
                        <Block f={1}>下单时间：</Block>
                        <Block>{orderInfo.createTime}</Block>
                    </Block>
                    <Block mt={5} wf>
                        <Block f={1}>收货方式：</Block>
                        <Block>{orderInfo.dispatchWay===2?'快递':(orderInfo.dispatchWay===3?'营业厅自提':'无配送')}</Block>
                    </Block>
                    <Block mt={5} wf>
                        <Block f={1}>订单状态：</Block>
                        <Block>{orderInfo.status===1?'待付款':(orderInfo.status===2?'待收货':'完成')}</Block>
                    </Block>
                    <Block mt={5} wf>
                        <Block f={1}>商品金额：</Block>
                        <Block className={Styles.orangeColor}>{orderInfo.totalMoney}</Block>
                    </Block>
                    {
                        orderInfo.dispatchWay===3?
                        <Block mt={10} wf style={{fontWeight: 'bold'}}>
                            <Block f={1}>　自提码：</Block>
                            <Block>{orderInfo.pickupCode}</Block>
                        </Block>:null
                    }
                </Block>
            </Block>
        )
    }
}

export default OrderComplete