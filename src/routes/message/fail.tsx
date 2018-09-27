import { Component } from 'react'
import { MessagePage } from '../../components'
import Block from 'fs-flex'

class SuccessPage extends Component{
    componentDidMount(){
        document.title='支付失败'
    }
    render(){
        return <Block vf>
            <MessagePage status='fail' message='支付失败' linkText='重新支付' linkUrl='/' />
        </Block>
    }
}

export default SuccessPage