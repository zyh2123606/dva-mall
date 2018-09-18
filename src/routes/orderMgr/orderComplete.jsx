import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Icon } from 'antd-mobile'

/**
 *订单完成
 *
 * @class OrderComplete
 * @extends {Component}
 */
class OrderComplete extends Component{
    render(){
        return (
            <Block vf className={Styles.complete_container}>
                <Block a='c' className={Styles.header}>
                    <Block ml={15} className={Styles.order_ico} j='c' a='c'>
                        <Icon type='check' />
                    </Block>
                    <Block ml={10} fc='#fff'>订单完成</Block>
                </Block>
                <Block bc='#fff' pt={15} pb={15} a='c' wf fs={14}>
                    <Block className={Styles.pos_ico}></Block>
                    <Block vf f={1} mr={15}>
                        <Block wf>
                            <Block f={1}>刘可可</Block>
                            <Block>18313858906</Block>
                        </Block>
                        <Block mt={5} wf>
                            <Block>自提门店：青年路营业厅昆明市南关区东岭南街1103号</Block>
                        </Block>
                    </Block>
                </Block>
                <Block vf bc='#fff' pl={15} pr={15} mt={10} pb={15}>
                    <Block pt={10} pb={10} fs={16} style={{fontWeight: 'bold'}}>商品信息</Block>
                    <Block wf>
                        <Block className={Styles.prod_pic}></Block>
                        <Block f={1} ml={15}>
                            <Block>Apple AirPods无线蓝牙耳机 iphoneX双耳pods入耳式耳机</Block>
                            <Block mt={5} fs={12} fc='#999'>黑色</Block>
                            <Block wf>
                                <Block f={1}>×1</Block>
                                <Block className={Styles.orangeColor}>￥1099.00</Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
                <Block vf bc='#fff' pl={15} pr={15} mt={10} pb={15}>
                    <Block pt={10} pb={10} fs={16} style={{fontWeight: 'bold'}}>订单详情</Block>
                    <Block wf>
                        <Block f={1}>订单编号：</Block>
                        <Block>201797398978999</Block>
                    </Block>
                    <Block mt={5} wf>
                        <Block f={1}>下单时间：</Block>
                        <Block>2018.05.03 09:00:00</Block>
                    </Block>
                    <Block mt={5} wf>
                        <Block f={1}>收货方式：</Block>
                        <Block>营业厅自提</Block>
                    </Block>
                    <Block mt={5} wf>
                        <Block f={1}>订单状态：</Block>
                        <Block>已完成</Block>
                    </Block>
                    <Block mt={5} wf>
                        <Block f={1}>商品金额：</Block>
                        <Block className={Styles.orangeColor}>¥1099.00</Block>
                    </Block>
                    <Block mt={10} wf style={{fontWeight: 'bold'}}>
                        <Block f={1}>　自提码：</Block>
                        <Block>008 077 902 901</Block>
                    </Block>
                </Block>
            </Block>
        )
    }
}

export default OrderComplete