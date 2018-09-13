import { Component } from 'react'
import Block from 'fs-flex'
import { connect } from 'dva'
import { Button } from 'antd-mobile'
import { Link } from 'react-router-dom'
import './index.less'

class Home extends Component{
    render(){
        return (
            <Block>
                <Button type="primary">确定</Button>
                <Link to='/order-detail'>商品详情</Link>
            </Block>
        )
    }
}

export default connect(state => state)(Home)