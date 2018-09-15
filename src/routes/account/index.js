import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'

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
                    <Block j='c' f={1}>
                        <Block>全部</Block>
                    </Block>
                    <Block j='c' f={1}>
                        <Block>待付款</Block>
                    </Block>
                    <Block j='c' f={1}>
                        <Block>待收货</Block>
                    </Block>
                    <Block j='c' f={1}>
                        <Block>已完成</Block>
                    </Block>
                </Block>
            </Block>
        )
    }
}

export default Account