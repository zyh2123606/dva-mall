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
    componentDidMount(){

    }
    render(){
        return (
            <Block vf className={Styles.prod_panel}p={15}>
                <Block pb={15} wf>
                    <Block f={1}>订单编号：{this.props.order_id}</Block>
                    <Block>删除</Block>
                </Block>
                {this.props.products?this.props.products.map((item,idx)=>(
                  <Product
                    key = {idx}
                    data={item}
                  />
                  )):null}
            </Block>
        )
    }
}

export default Order
