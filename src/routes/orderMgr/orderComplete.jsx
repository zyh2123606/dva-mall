import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Icon } from 'antd-mobile'
import OrderService from '../../services/orderService'
import Constant from '../../utils/constant';
/**
 *订单完成
 *
 * @class OrderComplete
 * @extends {Component}
 */
class OrderComplete extends Component{
    state={
        orderInfo:{//订单信息
            Id:0,
            orderCode:0,
            createTime:'',
            totalMoney:0,
            actualMoney:0,
            status:0,
            dispatchWay:0,
            deptId:0,
            deptName:'',
            adoptDeptId:0,
            adoptDeptName:'',
            addressInfo:{
                provinceName:'',
                cityName:'',
                defaultFlag:0,
                receiver:'',
                tel:null,
                address:''
            },
            memo:'',
            goodsList:[
                
            ],
            pickupCode:0,
            logisticsDealer:'',
            logisticsCode:''
        },

    }
    async componentDidMount(){
        document.title = '订单完成'
        await this.queryOrderInfo()
    }
    async queryOrderInfo(){
        const {match:{params:{orderId}}}=this.props
        const {data,code}= await OrderService.getOrderList(1,orderId)
        if(code===Constant.responseOK){
            this.setState({
                orderInfo:data[0]
            })
        }
    }
    render(){
        const {orderInfo,orderInfo:{addressInfo,goodsList}}=this.state
        return (
            <Block vf className={Styles.complete_container}>
                <Block a='c' className={Styles.header}>
                    <Block ml={15} className={Styles.order_ico} j='c' a='c'>
                        <Icon type='check' />
                    </Block>
                    <Block ml={10} fc='#fff'>{orderInfo.status===1?'待付款':(orderInfo.status===2?'待收货':'订单完成')}</Block>
                </Block>
                {
                   orderInfo.dispatchWay===2?
                   <Block bc='#fff' pt={15} pb={15} a='c' wf fs={14}>
                    <Block className={Styles.pos_ico}></Block>
                    <Block vf f={1} mr={15}>
                        <Block wf>
                            <Block f={1}>{addressInfo.receiver}</Block>
                            <Block>{addressInfo.tel}</Block>
                        </Block>
                        <Block mt={5} wf>
                            <Block>{addressInfo.address}</Block>
                        </Block>
                    </Block>
                </Block>:null
                }
                
                <Block vf bc='#fff' pl={15} pr={15} mt={10} pb={15}>
                    <Block pt={10} pb={10} fs={16} style={{fontWeight: 'bold'}}>商品信息</Block>
                    {
                        goodsList.map((item,index)=>{
                            return <Block mt={5} wf key={'goods-item-'+index}>
                            <Block className={Styles.prod_pic}><img style={{width:'78px'}} src={Constant.imgBaseUrl+item.logoPath} alt={item.goodsName}/></Block>
                            <Block f={1} ml={15}>
                                <Block>{item.goodsName}</Block>
                                <Block wf>
                                    {
                                    item.attrList?item.attrList.map((attrItem,idx)=>{
                                        return <Block key={'goods-skuattr-'+idx} mt={5} ml={5} fs={12} fc='#999'>{attrItem.attrCode}</Block>
                                    }):null
                                }
                                </Block>
                                <Block wf>
                                    <Block f={1}>×{item.amount}</Block>
                                    <Block className={Styles.orangeColor}>￥{Constant.toMoney(item.price)}</Block>
                                </Block>
                            </Block>
                        </Block>
                        })
                    }
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
                        <Block className={Styles.orangeColor}>{Constant.toMoney(orderInfo.totalMoney)}</Block>
                    </Block>
                    {
                        orderInfo.dispatchWay===3?
                        <Block mt={10} wf style={{fontWeight: 'bold'}}>
                            <Block f={1}>　自提码：</Block>
                            <Block>{orderInfo.pickupCode}</Block>
                        </Block>:null
                    }
                    {
                        orderInfo.dispatchWay===2?
                        <Block mt={10} wf style={{fontWeight: 'bold'}}>
                            <Block f={1}>物流单号：</Block>
                            <Block>{orderInfo.logisticsCode}</Block>
                        </Block>:null
                    }
                </Block>
            </Block>
        )
    }
}

export default OrderComplete