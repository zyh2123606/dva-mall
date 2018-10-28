import { Component } from 'react'
import Home from '../home'
import Cart from '../shoppingCart'
import Account from '../account'
import { Route, Switch, Redirect } from 'react-router-dom'
import Block from 'fs-flex'
import Styles from './index.less'

class DefaultPage extends Component{
    state = { current: '/home'}
    menus = [
        {text: '首页', selectColor: '#FF8E44', iconCls: 'icon_home', path: '/home'},
        {text: '购物车', selectColor: '#FF8E44', iconCls: 'icon_cart', path: '/cart'},
        {text: '我的', selectColor: '#FF8E44', iconCls: 'icon_me', path: '/account'}
    ]
    handleChange(path){
        const { current } = this.state
        if(current === path) return
        this.setState({ current: path }, () => {
            const { location: { search }, history } = this.props
            history.push(path+search)
        })
    }
    static getDerivedStateFromProps(nextProps, prevState){
        const { pathname } = nextProps.history.location
        prevState.current = pathname
        return prevState
    }
    render(){
        const { current } = this.state
        return (
            <>  
                <Block w='100%' h='100%' pb={50}>
                    <Switch>
                        <Route path='/home' component={Home} exact />
                        <Route path='/cart' component={Cart} exact />
                        <Route path='/account' component={Account} exact />
                    </Switch>
                </Block>
                <Block className={Styles.foot_bar}>
                    <Block className={Styles.foot_bar_content} wf>
                        {this.menus.map(({iconCls, selectColor, path}, idx) => (
                            <Block fc={current === path?selectColor:'#ccc'} key={idx} onClick={this.handleChange.bind(this, path)} f={1} j='c' a='c'><i className={Styles[iconCls]} /></Block>
                        ))}
                    </Block>
                </Block>
            </>
        )
    }
}

export default DefaultPage