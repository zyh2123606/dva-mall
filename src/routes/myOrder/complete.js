import { Component } from 'react'
import Block from 'fs-flex'
import Order from './order'
import { PullToRefresh, Empty } from '../../components'
import { Toast } from 'antd-mobile'
import Service from '../../services/orderService'
import qs from 'qs'

/**
 *已完成
 *
 * @class Complete
 * @extends {Component}
 */
class Complete extends Component{
    state = { refreshing: true, data: null }
    pageIndex = 0
    pageSize = 50
    pageCount = 1
    async componentDidMount(){
        const { search } = this.props.location
        this.AUTH = qs.parse(search.split('?')[1])
        const MyOrderSev = new Service(this.AUTH)
        const statuswaitpay = "1"//1获取已完成订单
        const pData = {deptId:258,DATA:{currentPage:this.pageIndex,countPerPage:this.pageSize,orderStatus:statuswaitpay}}
        const res = await MyOrderSev.getMyOrder(pData)
        const { DATA, RESP_CODE } = res
        if(RESP_CODE==="0000")
            this.setState({ data: DATA.list})
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
                    this.state.data.map(({orderNum,orderStatus,saleStoreGoods, orderId},idx)=>(
                        <Order {...this.props} key={idx} auth={this.AUTH} orderCode={orderNum} status = {orderStatus} goodsList={saleStoreGoods} orderId={orderId} orderIndex={idx} delFunc={this.deleteOrderInState}/>
                    )):<Empty />
                :null}
            </PullToRefresh>
        )
    }
}

export default Complete
