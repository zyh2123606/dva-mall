import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'

/**
 *商品
 *
 * @class Product
 * @extends {Component}
 */
class Product extends Component{
    componentDidMount(){

    }
    render(){
        return (
            <Block vf className={Styles.prod_panel}p={15}>
                <Block pb={15} wf>
                    <Block f={1}>订单编号：{this.props.order_id}</Block>
                    <Block>删除</Block>
                </Block>
                <Block wf className={Styles.prod_cont}>
                    <Block j='c' className={Styles.prod_pic}>
                        <img />
                    </Block>
                    <Block f={1} ml={10} vf>
                        <Block>小米 红米Note5 全网通版64G 红色全网联通4G手机 双卡双待</Block>
                        <Block mt={5} wf>
                            <Block f={1}>实付：<span className={Styles.orangeColor}>￥2799.00</span></Block>
                            <Block>×1</Block>
                        </Block>
                        <Block mt={15} j='e'>
                            <Block className={Styles.prod_btn_ghost}>再次购买</Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        )
    }
}

export default Product
