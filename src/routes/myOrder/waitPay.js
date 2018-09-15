import { Component } from 'react'
import Product from './product'
import { PullToRefresh, Empty } from '../../components'
import { Toast } from 'antd-mobile'

/**
 *待付款
 *
 * @class WaitPay
 * @extends {Component}
 */
class WaitPay extends Component{
    state = { refreshing: true, data: null }
    pageIndex = 1
    pageSize = 10
    pageCount = 1
    componentDidMount(){

    }
    //获取数据
    async getList(loading=true){
        const { pageIndex, pageSize } = this
    }
    //下拉刷新
    pulUpFresh = () => {
        if(this.pageIndex >= this.pageCount){
            Toast.info('已没有更多数据')
            this.setState({ refreshing: false})
            return
        }
        this.pageIndex++
        this.setState({refreshing: true})
    }
    render(){
        const { refreshing, data } = this.state
        return (
            <PullToRefresh
                direction='up'
                distanceToRefresh={40}
                refreshing={refreshing}
                onRefresh={this.pulUpFresh}
                damping={100}>
                <Product />
                <Empty />
            </PullToRefresh>
        )
    }
}

export default WaitPay