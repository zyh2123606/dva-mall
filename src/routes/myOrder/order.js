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
    render(){
        const { status, orderId, auth } = this.props
        return (
            <Block vf className={Styles.prod_panel} p={15}>
                <Block pb={15} wf>
                    <Block f={1}>订单编号：{this.props.orderCode}</Block>
                    <Block onClick={ this.deleteOrder.bind(this) }>删除</Block>
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
            </Block>
        )
    }
}

export default Order
