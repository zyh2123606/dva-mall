import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { List, InputItem, Button, DatePicker, Picker } from 'antd-mobile'
import { createForm } from 'rc-form'
import {connect} from 'dva';
/**
 *订单确认
 *
 * @class OrderSure
 * @extends {Component}
 */
const Item = List.Item
class OrderSure extends Component{
    state = {
        reciveWay: [{label: '送货上门', value: 1001},{label: '营业厅自提', value: 1002}],
        businessHall: [{label: '南屏街店', value: '1002'}]
    }
    //日期选择
    dateHandleChange = date => {
        const { getFieldProps } = this.props.form
        const { onChange } = getFieldProps('date')
        onChange(date)
    }
    //提交订单
    orderSubmit = e => {
        const { form } = this.props
    }
    render(){
        const { getFieldProps } = this.props.form
        const { reciveWay, businessHall } = this.state
        const {typeId,colorId,goodsNum,defaultSkuPrice,logoPath,colorName,title}=this.props
        return (
            <Block vf className={Styles.order_sure_wrapper}>
                <List>
                    <Picker
                        data={reciveWay}
                        cols={1}
                        {...getFieldProps('recive')}>
                        <Item arrow='horizontal' extra='请选择'>收货方式</Item>
                    </Picker>
                </List>
                <Block wf bc='#fff' p={15} mt={10}>
                    <Block className={Styles.prod_pic}>
                        <img alt={title} src={logoPath} />
                    </Block>
                    <Block vf f={1} ml={15}>
                        <Block>{title}</Block>
                        <Block fs={12} fc='#666'>{colorName}</Block>
                        <Block wf>
                            <Block f={1}>×{goodsNum}</Block>
                            <Block className={Styles.orangeColor}>￥{defaultSkuPrice*goodsNum}</Block>
                        </Block>
                    </Block>
                </Block>
                <List renderHeader='收货信息'>
                    <Item arrow='horizontal' multipleLine wrap>
                        <Block vf>
                            <Block wf f={1} style={{fontWeight: 'bold'}}>
                                <Block f={1}>张三</Block>
                                <Block>18313858906</Block>
                            </Block>
                            <Block mt={5}>收货地址：长春市万宁区 自由大路与百汇街交汇处 自由大路 1000号</Block>
                        </Block>
                    </Item>
                    <Picker
                        data={businessHall}
                        cols={1}
                        {...getFieldProps('business')}>
                        <Item wrap arrow='horizontal' extra='请选择'>推荐自提营业厅</Item>
                    </Picker>
                    <Item>
                        <Block wf>
                            <Block f={1}>门店库存量</Block>
                            <Block className={Styles.order_pop_wrap}>1件
                                <Block className={Styles.order_popover}>可以看看其他门店哦</Block>
                                <i className={Styles.pop_arr}></i>
                            </Block>
                        </Block>
                    </Item>
                    <Item extra={<Block className={Styles.orangeColor}>￥1099.00</Block>}>商品金额</Item>
                </List>
                <Block m={15} mt={20}>
                    <Button style={{borderRadius: 25}} type='primary' onClick={this.orderSubmit}>提交订单</Button>
                </Block>
            </Block>
        )
    }
}

function mapStateToProps(state){
    const {typeId,colorId,goodsNum,defaultSkuPrice,logoPath,colorName,title}=state.orderDetail
    return {typeId,colorId,goodsNum,defaultSkuPrice,logoPath,colorName,title}
}

const mainForm = createForm()(OrderSure)
export default connect(mapStateToProps)(mainForm)