import { Component } from 'react';
import Block from 'fs-flex';
import Styles from './index.less'
import { Link } from 'react-router-dom'
import { Facebook } from 'react-content-loader'
import Service from '../../services/baseService'
import { Toast } from 'antd-mobile'
import Qs from 'qs'

/**
 *账户中心
 *
 * @class Account
 * @extends {Component}
 */
class Account extends Component{
    state = {userInfo: null, deptInfo: {}, auth: {}}
    async componentDidMount(){
        document.title = '我的'
        const { search } = this.props.location
        let params = search.split('?')[1] || ''
        params = Qs.parse(params)
        const accountSev = new Service()
        const usRes = await accountSev.getUserInfo(params)
        if(usRes.RESP_CODE !== '0000') return Toast.info(usRes.RESP_DESC)
        let depRes = null
        if(usRes.DATA.recentDeptid){
            depRes = await accountSev.getDeptInfo({accountId:params.accountId,deptId:usRes.DATA.recentDeptid})
            if(depRes.RESP_CODE != '0000') return Toast.info(depRes.RESP_DESC)
        }
        this.setState({userInfo: usRes.DATA || {}, deptInfo: depRes?depRes.DATA:null, auth: params})
    }
    goToTarget(target){
        wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/${target}`})
    }
    render(){
        const { userInfo, auth } = this.state
        return (
            userInfo?<Block bc='#fff' className={Styles.container} vf>
                <Block className={Styles.header} vf>
                    <Block a='c' mt={30}>
                        <Block j='c' a='c' fc='#eee' fs={30} ml={20} className={Styles.user_head}>
                            {userInfo.wxImg?<img src={userInfo.wxImg} alt='' />
                            :<i className={Styles.icon_account} />}
                        </Block>
                        <Block ml={20} fc='#fff' fs={20}>{userInfo.wxNickname}</Block>
                    </Block>
                </Block>
                <Block fs={16} p={15}>我的订单</Block>
                <Block wf className={Styles.order_panel}>
                    <Block a='c' f={1} vf>
                        <Block onClick={this.goToTarget.bind(this, `my-order?accontId=${auth.accountId}`)}>
                            <Block a='c' vf>
                                <Block className={Styles.orangeColor} fs={22}>
                                    <i className={Styles.icon_order} />
                                </Block>
                                <Block>全部</Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block a='c' f={1} vf>
                        <Block onClick={this.goToTarget.bind(this, `my-order/wait-pay?accountId=${auth.accountId}`)}>
                            <Block a='c' vf>
                                <Block className={Styles.orangeColor} fs={22}>
                                    <i className={Styles.icon_wait_pay} />
                                </Block>
                                <Block>待付款</Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block a='c' f={1} vf>
                        <Block onClick={this.goToTarget.bind(this, `my-order/wait-recive?accountId=${auth.accountId}`)}>
                            <Block a='c' vf>
                                <Block className={Styles.orangeColor} fs={22}>
                                    <i className={Styles.icon_wait_recive} />
                                </Block>
                                <Block>待收货</Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block a='c' f={1} vf>
                        <Block onClick={this.goToTarget.bind(this, `my-order/complete?accountId=${auth.accountId}`)}>
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
                    <Block onClick={this.goToTarget.bind(this, `address-mgr/${auth.accountId}/${auth.accountId}`)}>
                        <Block className={Styles.act_item} wf a='c'>
                            <Block f={1}>收货地址</Block>
                            <i className={Styles.arrow_right}></i>
                        </Block>
                    </Block>
                    <Block className={Styles.act_item} wf a='c'>
                        <Block f={1}>客服经理电话:{this.state.deptInfo?this.state.deptInfo.conTel:""}</Block>
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
