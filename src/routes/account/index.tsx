import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Link } from 'react-router-dom'
import { Facebook } from 'react-content-loader'
import Constant from '../../utils/constant'
import Service from '../../services/baseService'
import { Toast } from 'antd-mobile'

/**
 *账户中心
 *
 * @class Account
 * @extends {Component}
 */
class Account extends Component{
    state = {userInfo: null}
    async componentDidMount(){
        document.title = '我的'
        const { params } = this.props.match
        Constant.userData = params
        const memId = params.memId || 7
        const res = await Service.getUserInfo(memId)
        const { code, data, msg } = res
        if(code !== '0000') return Toast.info(msg)
        const result = await Service.getHomeData()
        this.setState({
            userInfo: data,
            deptInfo: result[4].data || {}
            })
    }
    goToTarget(target){
        wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/${target}`})
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
                        <Block f={1}>联系客服</Block>
                        <i className={Styles.arrow_right}></i>
                    </Block>
                    <Block className={Styles.act_item} wf a='c'>
                        <Block f={1}>客服经理电话:{this.state.deptInfo.deptTel}</Block>
                        <i className={Styles.arrow_right}></i>
                    </Block>
                    <Block className={Styles.act_item} wf a='c'>
                        <Block f={1}>退出登录</Block>
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
