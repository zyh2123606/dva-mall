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
    createButByStatus(status){
        switch (status){
            case 1 :
                return (<Block className={Styles.prod_btn_primary}>去支付</Block>)
                break
            case 2 :
                return (<Block className={Styles.prod_btn_normal}>查看物流</Block>)
                break
            case 3 :
                return (<Block className={Styles.prod_btn_ghost}>再次购买</Block>)
                break
            default:
                return null
        }
        return (<Block className={Styles.prod_btn_ghost}>再次购买</Block>)
    }
    render(){
        const status = this.props.status
        const {goodsName,imgurl,Money,Amount} = this.props.data
        return (
                <Block wf className={Styles.prod_cont}>
                    <Block j='c' className={Styles.prod_pic}>
                        <img src={imgurl}/>
                    </Block>
                    <Block f={1} ml={10} vf>
                        <Block>{goodsName}</Block>
                        <Block mt={5} wf>
                            <Block f={1}>实付：<span className={Styles.orangeColor}>￥ {Money}</span></Block>
                            <Block>×{Amount}</Block>
                        </Block>
                        <Block mt={15} j='e'>
                            {this.createButByStatus(status)}
                        </Block>
                    </Block>
                </Block>
        )
    }
}

export default Product
