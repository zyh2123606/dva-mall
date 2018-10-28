import { Component } from 'react'
import { TabBar } from 'antd-mobile'
import Home from '../home'
import Cart from '../shoppingCart'
import Account from '../account'
import { Route, Switch } from 'react-router-dom'

class DefaultPage extends Component{
    render(){
        return (
            <Switch>
                <Route path='/' component={Home} />
            </Switch>
        )
    }
}

export default DefaultPage