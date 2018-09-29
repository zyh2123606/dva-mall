import { Component } from 'react'
import Block from 'fs-flex'
import Order from './order'
import { PullToRefresh, Empty } from '../../components'
import { Toast } from 'antd-mobile'
import Service from '../../services/orderService'
import qs from 'qs'

/**
 *待收货
 *
 * @class WaitRecive
 * @extends {Component}
 */
class WaitRecive extends Component{
    state = { refreshing: true, data: null }
    pageIndex = 1
    pageSize = 10
    pageCount = 1
    async componentDidMount(){
        const { search } = this.props.location
        this.AUTH = qs.parse(search.split('?')[1])
        const MyOrderSev = new Service(this.AUTH)
        const statuswaitrecive = 2//2获取待收货订单
        const res = await MyOrderSev.getMyOrder(statuswaitrecive)
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
    deleteOrderInState=(index)=>{
        let tempData = this.state.data
        tempData.splice(index,1)
        this.setState({data:tempData})
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
                {data?
                    data instanceof Array && data.length?
                    this.state.data.map(({orderCode,status,goodsList,id},idx)=>(
                        <Order {...this.props} auth={this.AUTH} key={idx} orderCode={orderCode} status = {status} goodsList={goodsList} orderId={id} orderIndex={idx} delFunc={this.deleteOrderInState}/>
                    )):<Empty />
                :null}
            </PullToRefresh>
        )
    }
}

export default WaitRecive
