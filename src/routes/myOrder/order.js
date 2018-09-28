import { Component } from 'react'
import { Toast } from 'antd-mobile'
import Block from 'fs-flex'
import Styles from './index.less'
import Product from './product'
import Service from '../../services/orderService'
import Constant from '../../utils/constant'
/**
 *商品
 *
 * @class Product
 * @extends {Component}
 */
class Order extends Component{
    deleteOrder=async()=>{
        const memId = Constant.getUserInfo().memId
        const orderId = this.props.orderId
        const res = await Service.deleteOrder(memId,orderId)
        const{code,msg} = res
        if(code==="0000"){
            this.props.delFunc(this.props.orderIndex)
            Toast.info("删除成功!")
        }else{
            Toast.Info(msg)
        }

    }
    render(){
        const { status, orderId } = this.props
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
                  />
                  )):null}
            </Block>
        )
    }
}

export default Order
