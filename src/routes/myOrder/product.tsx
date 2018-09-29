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
    createButByStatus(status:number, orderId:number, typeId:number){
        switch (status){
            case 1 :
                return (<Block className={Styles.prod_btn_primary}>去支付</Block>)
                break
            case 2 :
                return (<Block onClick={this.gotoLogistDetail.bind(this, orderId)} className={Styles.prod_btn_normal}>查看物流</Block>)
                break
            case 3 :
                return (<Block onClick={this.goToProdDetail.bind(this, orderId, typeId)} className={Styles.prod_btn_ghost}>再次购买</Block>)
                break
            default:
                return null
        }
        return (<Block onClick={this.goToProdDetail.bind(this, orderId, typeId)} className={Styles.prod_btn_ghost}>再次购买</Block>)
    }
    goToProdDetail(typeId:number){
        const { sessionId, memId } = this.props.auth || {}
        wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/order-detail/${typeId}/${sessionId}/${memId}`})
    }
    render(){
        const { status, orderId } = this.props
        const {goodsName,logoPath,price,amount,typeId} = this.props.data
        return (
                <Block wf className={Styles.prod_cont}>
                    <Block j='c' className={Styles.prod_pic}>
                        <img src={logoPath?Constant.imgBaseUrl+logoPath:ImgErr} alt=''/>
                    </Block>
                    <Block f={1} ml={10} vf>
                        <Block>{goodsName}</Block>
                        <Block mt={5} wf>
                            <Block f={1}>实付：<span className={Styles.orangeColor}>￥ {price}</span></Block>
                            <Block>×{amount}</Block>
                        </Block>
                        <Block mt={15} j='e'>
                            {this.createButByStatus(status, orderId, typeId)}
                        </Block>
                    </Block>
                </Block>
        )
    }
}

export default Product
