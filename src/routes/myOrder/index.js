import { Component } from 'react'
import Block from 'fs-flex'
import { Route, Switch } from 'react-router-dom'
import { Tabs } from 'antd-mobile'
import Styles from './index.less'
import {myOrderCancelPage, myOrderAllPage, myOrderWaitPayPage, myOrderWaitRecivePage, myOrderCompletePage } from '../../lazyRoutes'
import qs from 'qs'

/**
 *我的订单
 *
 * @class MyOrder
 * @extends {Component}
 */
class MyOrder extends Component{
    state = {currentTab: '', tabIndex: 0}
    componentDidMount(){
        document.title='我的订单'
    }
    static getDerivedStateFromProps(nextProps, prevState){
        const { pathname } = nextProps.location
        if(pathname.includes('/cancel')){
            prevState.currentTab = '/cancel'
            prevState.tabIndex = 4
        }else if(pathname.includes('/complete')){
            prevState.currentTab = '/complete'
            prevState.tabIndex = 3
        }else if(pathname.includes('/wait-pay')){
            prevState.currentTab = '/wait-pay'
            prevState.tabIndex = 1
        }else if(pathname.includes('/wait-recive')){
            prevState.currentTab = '/wait-recive'
            prevState.tabIndex = 2
        }else{
            prevState.currentTab = ''
            prevState.tabIndex = 0
        }
        return prevState
    }
    tabs = [
        {sub: '', title: '全部'},
        {sub: '/wait-pay', title: '待付款'},
        {sub: '/wait-recive', title: '待收货'},
        {sub: '/complete', title: '已完成'},
        {sub: '/cancel', title: '已取消'}
    ]
    //tab切换
    tabHandleChange = tab => {
        const { sub } = tab
        if(this.state.currentTab === sub) return
        const { history, match:{url}, location:{search} } = this.props
        const { accountId } = qs.parse(search.split('?')[1])
        history.push(`${url}${sub}?accountId=${accountId}`)
    }
    render(){
        const { currentTab, tabIndex } = this.state
        const { url } = this.props.match
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
                            swipeable={false} initialPage={currentTab} page={tabIndex} onTabClick={this.tabHandleChange} tabs={this.tabs}>
                            <Switch>
                                <Route path={`${url}/`} exact component={myOrderAllPage} />
                                <Route path={`${url}/wait-pay`} exact component={myOrderWaitPayPage} />
                                <Route path={`${url}/wait-recive`} exact component={myOrderWaitRecivePage} />
                                <Route path={`${url}/complete`} exact component={myOrderCompletePage} />
                                <Route path={`${url}/cancel`} exact component={myOrderCancelPage} />
                            </Switch>
                        </Tabs>
                    </section>
                </Block>
            </Block>
        )
    }
}

export default MyOrder
