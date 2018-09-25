import { Component } from 'react'
import Block from 'fs-flex'
import { connect } from 'dva'
import { Button } from 'antd-mobile'
import { Link } from 'react-router-dom'
import Styles from './index.less'

class Home extends Component{
    render(){
        return (
            <Block className={Styles.container}>
                
            </Block>
        )
    }
}

export default connect(state => state)(Home)