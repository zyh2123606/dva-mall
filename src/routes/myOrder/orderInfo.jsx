import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Steps } from 'antd-mobile'
import Service from '../../services/orderService'
import { Toast } from 'antd-mobile'

/**
 *查看物流
 *
 * @class OrderInfo
 * @extends {Component}
 */
const Step = Steps.Step
class OrderInfo extends Component{
    state = {logisticsData: null}
    async componentDidMount(){
        document.title = '物流详情'
        const { params } = this.props.match
        this.AUTH = params
        const MyOrderSev = new Service(params)
        const res = await MyOrderSev.getLogisticsDetail(params.orderId)
        const { code, data, msg } = res
        if(code !== '0000') return Toast.info(msg, 1)
        this.setState({logisticsData: data})
    }
    render(){
        const { logisticsData } = this.state
        return (
            logisticsData?<Block className={Styles.order_info} vf> 
                <Block ml={15} mr={15}>
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
                    {logisticsData.length?<Block mt={15}>
                        <Steps current={logisticsData.length}>
                            {logisticsData.map(({createTime, logisticsInfo}, idx) => (
                                    <Step key={idx} status='Finished' 
                                        title={logisticsInfo} 
                                        description={createTime}/>
                                ))
                            }
                        </Steps>
                    </Block>
                    :<Block fc='#999' mt={10}>暂无物流信息</Block>}
                </Block>
            </Block>:null
        )
    }
}

export default OrderInfo