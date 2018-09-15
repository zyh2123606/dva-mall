import { Component } from 'react'
import Block from 'fs-flex'
import { Route } from 'react-router-dom'
import { Tabs } from 'antd-mobile'
import Styles from './index.less'
import LazyComponent from '../../utils/lazyComponent'

/**
 *我的订单
 *
 * @class MyOrder
 * @extends {Component}
 */
const allPage = LazyComponent(import('./all'))
const waitPayPage = LazyComponent(import('./waitPay'))
const waitRecivePage = LazyComponent(import('./waitRecive'))
const completePage = LazyComponent(import('./complete'))
class MyOrder extends Component{
    state = {currentTab: '/'}
    tabs = [
        {target: '', title: '全部'},
        {target: '/wait-pay', title: '待付款'},
        {target: '/wait-recive', title: '待收货'},
        {target: '/complete', title: '已完成'}
    ]
    //tab切换
    tabHandleChange = tab => {
        const { target } = tab
        if(this.state.currentTab === target || target === '') return
        this.setState({currentTab: target}, () => {
            const { history, match: { url } } = this.props
            history.replace(url+target)
        })
    }
    render(){
        const { match: { url } } = this.props
        const { currentTab } = this.state
        return (
            <Block className={Styles.container} vf>
                <Tabs swipeable={false} activeTab={currentTab} onTabClick={this.tabHandleChange} tabs={this.tabs}>
                    <Route component={allPage} />
                    <Route path={`${url}/wait-pay`} component={waitPayPage} />
                    <Route path={`${url}/wait-recive`} component={waitRecivePage} />
                    <Route path={`${url}/complete`} component={completePage} />
                </Tabs>
            </Block>
        )
    }
}

export default MyOrder