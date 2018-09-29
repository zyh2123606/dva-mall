import { Component } from 'react'
import Block from 'fs-flex'
import { Route } from 'react-router-dom'
import { Tabs } from 'antd-mobile'
import Styles from './index.less'
import { myOrderAllPage, myOrderWaitPayPage, myOrderWaitRecivePage, myOrderCompletePage } from '../../lazyRoutes'

/**
 *我的订单
 *
 * @class MyOrder
 * @extends {Component}
 */
class MyOrder extends Component{
    state = {currentTab: ''}
    componentDidMount(){
        document.title='我的订单'
    }
    tabs = [
        {target: '', title: '全部'},
        {target: '/wait-pay/:sessionId/:memId', title: '待付款'},
        {target: '/wait-recive/:sessionId/:memId', title: '待收货'},
        {target: '/complete/:sessionId/:memId', title: '已完成'}
    ]
    //tab切换
    tabHandleChange = tab => {
        const { target } = tab
        if(this.state.currentTab === target) return
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
                <Block f={1} style={{position: 'relative'}}>
                    <section style={{
                        position: 'absolute', 
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0, 
                        overflow: 'hidden',
                        overflowY: 'auto',
                        WebkitOverflowScrolling: 'touch'
                    }}>
                        <Tabs 
                            swipeable={false} activeTab={currentTab} onTabClick={this.tabHandleChange} tabs={this.tabs}>
                            <myOrderAllPage />
                            <Route path={`${url}/wait-pay/:sessionId/:memId`} component={myOrderWaitPayPage} />
                            <Route path={`${url}/wait-recive/:sessionId/:memId`} component={myOrderWaitRecivePage} />
                            <Route path={`${url}/complete/:sessionId/:memId`} component={myOrderCompletePage} />
                        </Tabs>
                    </section>
                </Block>
            </Block>
        )
    }
}

export default MyOrder