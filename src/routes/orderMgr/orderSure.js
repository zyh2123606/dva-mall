import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { List, InputItem, Button, DatePicker, Picker } from 'antd-mobile'
import { createForm } from 'rc-form'

/**
 *订单确认
 *
 * @class OrderSure
 * @extends {Component}
 */
const Item = List.Item
class OrderSure extends Component{
    state = {
        reciveWay: [{label: '送货上门', value: 1001}],
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
                        <img alt='' />
                    </Block>
                    <Block vf f={1} ml={15}>
                        <Block>Apple AirPods无线蓝牙耳机 iphoneX双耳pods入耳式耳机</Block>
                        <Block fs={12} fc='#666'>黑色</Block>
                        <Block wf>
                            <Block f={1}>×1</Block>
                            <Block className={Styles.orangeColor}>￥1099.00</Block>
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

const mainForm = createForm()(OrderSure)
export default mainForm