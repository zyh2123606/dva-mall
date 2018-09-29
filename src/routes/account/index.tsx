import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Link } from 'react-router-dom'
import { Facebook } from 'react-content-loader'
import Service from '../../services/baseService'
import { Toast } from 'antd-mobile'

/**
 *账户中心
 *
 * @class Account
 * @extends {Component}
 */
class Account extends Component{
    state = {userInfo: null, deptInfo: {}}
    async componentDidMount(){
        document.title = '我的'
        const { params } = this.props.match
        this.AUTH = params
        const accountSev = new Service(params)
        const usRes = await accountSev.getUserInfo()
        if(usRes.code !== '0000') return Toast.info(usRes.msg)
        const depRes = await accountSev.getDeptInfo()
        if(depRes.code != '0000') return Toast.info(depRes.msg)
        this.setState({userInfo: usRes.data, deptInfo: depRes.data})
    }
    goToTarget(target){
        const {sessionId, memId} = this.AUTH
        wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/${target}/sessionId/memId`})
    }
    render(){
        const { userInfo } = this.state
        return (
            userInfo?<Block bc='#fff' className={Styles.container} vf>
                <Block className={Styles.header} vf>
                    <Block a='c' mt={30}>
                        <Block j='c' a='c' fc='#eee' fs={30} ml={20} className={Styles.user_head}>
                            {userInfo.avatar?<img src={userInfo.avatar} alt='' />
                            :<i className={Styles.icon_account} />}
                        </Block>
                        <Block ml={20} fc='#fff' fs={20}>{userInfo.nickname}</Block>
                    </Block>
                </Block>
                <Block fs={16} p={15}>我的订单</Block>
                <Block wf className={Styles.order_panel}>
                    <Block a='c' f={1} vf>
                        <Block onClick={this.goToTarget.bind(this, 'my-order')}>
                            <Block a='c' vf>
                                <Block className={Styles.orangeColor} fs={22}>
                                    <i className={Styles.icon_order} />
                                </Block>
                                <Block>全部</Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block a='c' f={1} vf>
                        <Block onClick={this.goToTarget.bind(this, 'my-order/wait-pay')}>
                            <Block a='c' vf>
                                <Block className={Styles.orangeColor} fs={22}>
                                    <i className={Styles.icon_wait_pay} />
                                </Block>
                                <Block>待付款</Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block a='c' f={1} vf>
                        <Block onClick={this.goToTarget.bind(this, 'my-order/wait-recive')}>
                            <Block a='c' vf>
                                <Block className={Styles.orangeColor} fs={22}>
                                    <i className={Styles.icon_wait_recive} />
                                </Block>
                                <Block>待收货</Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block a='c' f={1} vf>
                        <Block onClick={this.goToTarget.bind(this, 'my-order/complete')}>
                            <Block a='c' vf>
                                <Block className={Styles.orangeColor} fs={28}>
                                    <i className={Styles.icon_complete} />
                                </Block>
                                <Block>已完成</Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
                <Block className={Styles.act_menu} vf>
                    <Block onClick={this.goToTarget.bind(this, 'address-mgr')}>
                        <Block className={Styles.act_item} wf a='c'>
                            <Block f={1}>收货地址</Block>
                            <i className={Styles.arrow_right}></i>
                        </Block>
                    </Block>
                    <Block className={Styles.act_item} wf a='c'>
                        <Block f={1}>客服经理电话:{this.state.deptInfo.deptTel}</Block>
                        <i className={Styles.arrow_right}></i>
                    </Block>
                </Block>
            </Block>:
            <Block bc='#fff' className={Styles.container}>
                <Block p={15}>
                    <Facebook />
                </Block>
            </Block>
        )
    }
}

export default Account
