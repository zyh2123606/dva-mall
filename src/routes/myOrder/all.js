import { Component } from 'react'
import Block from 'fs-flex'
import Order from './order'
import { PullToRefresh, Empty } from '../../components'
import { Toast } from 'antd-mobile'
import Service from '../../services/orderService'

/**
 *全部
 *
 * @class All
 * @extends {Component}
 */
class All extends Component{
    state = { refreshing: true, data: null }
    pageIndex = 1
    pageSize = 10
    pageCount = 1
    async componentDidMount(){
        const currentmemid=1
        const statusall = 0//0获取全部状态
        const res = await Service.getMyOrder(currentmemid,statusall)
        const { data, code } = res
        if(code==="0000")
            this.setState({ data: data})
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
                {this.state.data?this.state.data.map(({orderCode,status,goodsList},idx)=>(
                  <Order key={idx} orderCode={orderCode} status = {status} goodsList={goodsList}/>

                )):<Empty/>}
            </PullToRefresh>
        )
    }
}

export default All
