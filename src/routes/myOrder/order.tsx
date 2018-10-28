import { Component } from 'react'
import { Toast,Modal} from 'antd-mobile'
import Block from 'fs-flex'
import Styles from './index.less'
import Product from './product'
import Service from '../../services/orderService'
/**
 *商品
 *
 * @class Product
 * @extends {Component}
 */
class Order extends Component{
    deleteOrder=async()=>{
        const {auth} = this.props
        const myOrderSev = new Service(auth)
        const alert = Modal.alert
        alert('确认',`确认删除订单号为: ${this.props.orderCode} 的订单么？`,[{text:'取消',onPress:()=>console.log('cancel')},
            {text:'确认',onPress:()=>{
                (async(orderId)=>{
                    const res = await myOrderSev.deleteOrder(orderId)
                    const{code,msg} = res
                    if(code==="0000"){
                        this.props.delFunc(this.props.orderIndex)
                        Toast.info("删除成功!")
                    }else{
                        Toast.Info(msg)
                    }
                })(this.props.orderId)
            }},])

    }
    gotoLogistDetail(orderId){
        const { sessionId, memId } = this.props.auth || {}
        wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/order-info/${orderId}/${sessionId}/${memId}`})
    }
    createButByStatus(status, orderId){
        const data = Number(status)
        //1:完成 3:取消 5:待支付 8:待收货
        switch (data){
            case 1 :
                return (
                    //TODO invId有则开发票
                    <Block onClick={this.goToProdDetail.bind(this, orderId)} className={Styles.order_btn_ghost}>再次购买</Block>)
                break
            case 2 :
                return (<Block onClick={this.gotoLogistDetail.bind(this, orderId)} className={Styles.order_btn_normal}>查看物流</Block>)
                break
            case 3 :
                return null
                break
            case 8 :
                return (<Block onClick={this.gotoLogistDetail.bind(this, orderId)} className={Styles.order_btn_normal}>查看物流</Block>)
                break
            case 5 :
                return (<Block className={Styles.order_btn_primary}>去支付</Block>)
                break
            default:
                return null
        }
        return (<Block onClick={this.goToProdDetail.bind(this, orderId)} className={Styles.order_btn_ghost}>再次购买</Block>)
    }
    goToProdDetail(skuId){
        const { sessionId, memId } = this.props.auth || {}
        wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/order-detail/${skuId}/${sessionId}/${memId}`})
    }
    render(){
        const { status, orderId, auth } = this.props
        return (
            <Block vf className={Styles.prod_panel} p={15}>
                <Block pb={15} wf>
                    <Block f={1}>订单编号：{this.props.orderCode}</Block>
                </Block>
                {this.props.goodsList?this.props.goodsList.map((item,idx)=>(
                  <Product
                        status ={status}
                        key = {idx}
                        data={item}
                        orderId={orderId}
                        auth={auth}
                        {...this.props}
                  />
                  )):null}
                <Block mt={15} j='e'>
                    {this.createButByStatus(status, orderId)}
                </Block>
            </Block>
        )
    }
}

export default Order
