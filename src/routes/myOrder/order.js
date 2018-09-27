import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import Product from './product'

/**
 *商品
 *
 * @class Product
 * @extends {Component}
 */
class Order extends Component{
    render(){
        const { status, orderId } = this.props
        return (
            <Block vf className={Styles.prod_panel} p={15}>
                <Block pb={15} wf>
                    <Block f={1}>订单编号：{this.props.orderCode}</Block>
                    <Block>删除</Block>
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
