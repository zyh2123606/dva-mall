import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Steps } from 'antd-mobile'
import { NavTopBar } from '../../components'

/**
 *查看物流
 *
 * @class OrderInfo
 * @extends {Component}
 */
const Step = Steps.Step
class OrderInfo extends Component{
    render(){
        const { history } = this.props
        return (
            <Block className={Styles.order_info} vf> 
                <NavTopBar title='物流详情' leftClick={()=>{history.goBack()}} />
                <Block ml={15} mr={15} mt={45}>
                    <Block className={Styles.info_title}>物流信息</Block>
                    <Block mt={5} wf>
                        <Block f={1}>订单编号：</Block>
                        <Block>201797398978999</Block>
                    </Block>
                    <Block mt={3} wf>
                        <Block f={1}>下单时间：</Block>
                        <Block>2018.05.03 09:00:00</Block>
                    </Block>
                    <Block mt={3} wf>
                        <Block f={1}>预计送达时间：</Block>
                        <Block>2018.05.06 09:00:00</Block>
                    </Block>
                    <Block className={Styles.info_title}>物流详情</Block>
                    <Block mt={15}>
                        <Steps current={1}>
                            <Step status='Finished' 
                                title='上门施工人员正赶去您家的途中。孙恒飞，电话 13223451234。感谢您的耐心等待。' 
                                description='2018/06/22 18:00:30'/>
                            <Step status='process' 
                                title='长春市自由大路网络施工分部已经派单。' 
                                description='2018/06/20 15:30:00'/>
                            <Step status='waiting'
                                title='网络施工部已经派单到长春市自由大路。'
                                description='2018/06/20 10:28:29'/>
                        </Steps>
                    </Block>
                </Block>
            </Block>
        )
    }
}

export default OrderInfo