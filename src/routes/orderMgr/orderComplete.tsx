import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Icon,Button } from 'antd-mobile'
import OrderService from '../../services/orderService'
import Constant from '../../utils/constant';
import qs from 'qs'
/**
 *订单完成
 *
 * @class OrderComplete
 * @extends {Component}
 */
class OrderComplete extends Component{
    state={
        address:{
            conUser:null,
            conTel:null,
            addrDetail:null,
        },
        saleStoreGoods:[
            {
                goodsName:null,
                salePrice:null,
                goodsNum:null,
                skuId:null,
                goodsImg:null
    
            }
        ],
        saleOrderInfo:{
            fullname:null,
            deptAddress:null,
            dispatchDate:null,
            orderNum:null,
            creatTime:null,
            payMode:null,
            orderStatus:null,
            dispatchWay:null,
            totalPrice:null,
            balaMoney:null,
            ticketNum:null,
            feeMoney:null,
            totalPrice:null,

        }

    }
    async componentDidMount(){
        document.title = '订单完成'
        this.queryOrderInfo()
    }
    async queryOrderInfo(){
        const { orderNum,orderId,deptId,accountId } = qs.parse(this.props.location.search.split('?')[1])
        const {RESP_CODE,DATA}= await new OrderService(1,15).getOrderDetail({
            DATA:{
                orderNum:orderNum,
                orderId:orderId,
            },
            deptId:deptId,
            accountId:accountId

        })
        if(RESP_CODE===Constant.responseOK){
            this.setState({
                address:DATA.address,
                saleStoreGoods:DATA.saleStoreGoods,
                saleOrderInfo:DATA.saleOrderInfo,
            })
        }
    }

    gotoPay=()=>{
        const saleOrderInfo=this.state.saleOrderInfo
        const {deptId,accountId } = qs.parse(this.props.location.search.split('?')[1])
        const params=JSON.stringify({
            accountId:accountId,
            orderNum:saleOrderInfo.orderNum,
            orderId:saleOrderInfo.orderId,
            deptId:deptId,
            title:'小程序支付',
            balaMoney:saleOrderInfo.balaMoney
        })
        wx.miniProgram.navigateTo({url: `/pages/payPage/payPage?params=${params}`})
    }
    render(){
        const {address,saleStoreGoods,saleOrderInfo}=this.state
        let orderStatus=''
        switch(saleOrderInfo.orderStatus){
            case '1':
                orderStatus='完成'
                break;
            case '3':
                orderStatus='取消'
                break;
            case '5':
                orderStatus='待支付'
                break;
            case '8':
                orderStatus='待收货'
                break;
            
        }
        return (
            <Block vf className={Styles.complete_container}>
                <Block f={1}>
                    <Block a='c' className={Styles.header}>
                        <Block ml={15} className={Styles.order_ico} j='c' a='c'>
                            <Icon type='check' />
                        </Block>
                        <Block ml={10} fc='#fff'>{orderStatus}</Block>
                    </Block>
                    {
                    address && address.conUser?
                    <Block bc='#fff' pt={15} pb={15} a='c' wf fs={14}>
                        <Block className={Styles.pos_ico}></Block>
                        <Block vf f={1} mr={15}>
                            <Block wf>
                                <Block f={1}>{address.conUser}</Block>
                                <Block>{address.conTel}</Block>
                            </Block>
                            <Block mt={5} wf>
                                <Block>{address.addrDetail}</Block>
                            </Block>
                        </Block>
                    </Block>:null
                    }
                    
                    <Block vf bc='#fff' pl={15} pr={15} mt={10} pb={15}>
                        <Block pt={10} pb={10} fs={16} style={{fontWeight: 'bold'}}>商品信息</Block>
                        {
                            saleStoreGoods.map((item,index)=>{
                                return <Block mt={5} wf key={'goods-item-'+index}>
                                <Block className={Styles.prod_pic}><img style={{width:'78px'}} src={Constant.imgBaseUrl+item.goodsimg} alt={item.goodsName}/></Block>
                                <Block f={1} ml={15}>
                                    <Block>{item.goodsName}</Block>
                                    {/* <Block wf>
                                        {
                                        item.attrList?item.attrList.map((attrItem,idx)=>{
                                            return <Block key={'goods-skuattr-'+idx} mt={5} ml={5} fs={12} fc='#999'>{attrItem.attrCode}</Block>
                                        }):null
                                    }
                                    </Block> */}
                                    <Block wf>
                                        <Block f={1}>×{item.goodsNum}</Block>
                                        <Block className={Styles.orangeColor}>￥{item.salePrice}</Block>
                                    </Block>
                                </Block>
                            </Block>
                            })
                        }
                    </Block>
                    <Block vf bc='#fff' pl={15} pr={15} mt={10} pb={15}>
                        <Block pt={10} pb={10} fs={16} style={{fontWeight: 'bold'}}>订单详情</Block>
                        <Block wf>
                            <Block f={1}>自提门店</Block>
                            <Block>{saleOrderInfo.fullname}</Block>
                        </Block>
                        <Block wf>
                            <Block f={1}>自提地址</Block>
                            <Block>{saleOrderInfo.deptAddress}</Block>
                        </Block>
                        <Block wf>
                            <Block f={1}>订单编号：</Block>
                            <Block>{saleOrderInfo.orderNum}</Block>
                        </Block>
                        <Block mt={5} wf>
                            <Block f={1}>下单时间：</Block>
                            <Block>{saleOrderInfo.creatTime}</Block>
                        </Block>
                        <Block mt={5} wf>
                            <Block f={1}>支付方式：</Block>
                            <Block>{saleOrderInfo.payMode}</Block>
                        </Block>
                        <Block mt={5} wf>
                            <Block f={1}>订单状态：</Block>
                            <Block>{orderStatus}</Block>
                        </Block>
                        
                    </Block>

                    <Block vf bc='#fff' pl={15} pr={15} mt={10} pb={15}>
                        <Block pt={10} pb={10} fs={16} style={{fontWeight: 'bold'}}>订单明细</Block>
                        <Block wf>
                            <Block f={1}>商品金额：</Block>
                            <Block>{saleOrderInfo.totalPrice}</Block>
                        </Block>
                        <Block wf>
                            <Block f={1}>总金额：</Block>
                            <Block>{saleOrderInfo.balaMoney}</Block>
                        </Block>
                    </Block>
                </Block>
                {
                    saleOrderInfo && saleOrderInfo.orderStatus==='5'?<Block h={35} m={10} >
                    <Button style={{borderRadius: 25}} type='primary' onClick={this.gotoPay}>去支付</Button>
                </Block>:null
                }
            </Block>
        )
    }
}

export default OrderComplete