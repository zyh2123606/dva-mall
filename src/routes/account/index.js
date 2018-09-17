import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'

/**
 *账户中心
 *
 * @class Account
 * @extends {Component}
 */
class Account extends Component{
    render(){
        return (
            <Block bc='#fff' className={Styles.container} vf>
                <Block className={Styles.header} a='c' wf>
                    <Block ml={20} className={Styles.user_head}></Block>
                    <Block ml={20} fc='#fff' fs={20}>刘可可</Block>
                </Block>
                <Block fs={16} p={15}>我的订单</Block>
                <Block wf className={Styles.order_panel}>
                    <Block a='c' f={1} vf>
                        <Link to='/my-order'>
                            <Block a='c' vf>
                                <Block></Block>
                                <Block>全部</Block>
                            </Block>
                        </Link>
                    </Block>
                    <Block a='c' f={1} vf>
                        <Link to='/my-order/wait-pay'>
                            <Block a='c' vf>
                                <Block></Block>
                                <Block>待付款</Block>
                            </Block>
                        </Link>
                    </Block>
                    <Block a='c' f={1} vf>
                        <Link to='/my-order/wait-recive'>
                            <Block a='c' vf>
                                <Block></Block>
                                <Block>待收货</Block>
                            </Block>
                        </Link>
                    </Block>
                    <Block a='c' f={1} vf>
                        <Link to='/my-order/complete'>
                            <Block a='c' vf>
                                <Block></Block>
                                <Block>已完成</Block>
                            </Block>
                        </Link>
                    </Block>
                </Block>
                <Block className={Styles.act_menu} vf>
                    <Block className={Styles.act_item} wf a='c'>
                        <Block f={1}>收货地址</Block>
                        <i className={Styles.arrow_right}></i>
                    </Block>
                    <Block className={Styles.act_item} wf a='c'>
                        <Block f={1}>联系客服</Block>
                        <i className={Styles.arrow_right}></i>
                    </Block>
                    <Block className={Styles.act_item} wf a='c'>
                        <Block f={1}>联系客服经理</Block>
                        <i className={Styles.arrow_right}></i>
                    </Block>
                    <Block className={Styles.act_item} wf a='c'>
                        <Block f={1}>退出登录</Block>
                        <i className={Styles.arrow_right}></i>
                    </Block>
                </Block>
            </Block>
        )
    }
}

export default Account