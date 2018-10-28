import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import ImgErr from '../../assets/img/img_error.png'
import Constant from '../../utils/constant'
import { withRouter } from 'react-router-dom'

/**
 *商品
 *
 * @class Product
 * @extends {Component}
 */
class Product extends Component{
    gotoLogistDetail(orderId:number){
        const { sessionId, memId } = this.props.auth || {}
        wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/order-info/${orderId}/${sessionId}/${memId}`})
    }
    createButByStatus(status:number, orderId:number, skuId:number){
        const data = Number(status)
        //1:完成 3:取消 5:待支付 8:待收货
        switch (data){
            case 1 :
                return (
                    //TODO invId有则开发票
                    <Block onClick={this.goToProdDetail.bind(this, orderId, skuId)} className={Styles.prod_btn_ghost}>再次购买</Block>)
                break
            case 2 :
                return (<Block onClick={this.gotoLogistDetail.bind(this, orderId)} className={Styles.prod_btn_normal}>查看物流</Block>)
                break
            case 3 :
                return null
                break
            case 8 :
                return (<Block onClick={this.gotoLogistDetail.bind(this, orderId)} className={Styles.prod_btn_normal}>查看物流</Block>)
                break
            case 5 :
                return (<Block className={Styles.prod_btn_primary}>去支付</Block>)
                break
            default:
                return null
        }
        return (<Block onClick={this.goToProdDetail.bind(this, orderId, skuId)} className={Styles.prod_btn_ghost}>再次购买</Block>)
    }
    goToProdDetail(skuId:number){
        const { sessionId, memId } = this.props.auth || {}
        wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/order-detail/${skuId}/${sessionId}/${memId}`})
    }
    render(){
        const { status, orderId } = this.props
        const {goodsName,goodsimg,salePrice,goodsNum,skuId} = this.props.data
        return (
                <Block wf className={Styles.prod_cont}>
                    <Block j='c' className={Styles.prod_pic}>
                        <img src={goodsimg?Constant.imgBaseUrl+goodsimg:ImgErr} alt=''/>
                    </Block>
                    <Block f={1} ml={10} vf>
                        <Block>{goodsName}</Block>
                        <Block mt={5} wf>
                            <Block f={1}>实付：<span className={Styles.orangeColor}>￥ {salePrice?salePrice:0.00}</span></Block>
                            <Block>×{goodsNum}</Block>
                        </Block>
                    </Block>
                </Block>
        )
    }
}

export default Product
