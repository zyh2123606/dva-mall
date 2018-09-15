import React, { Component } from 'react'
import { PullToRefresh, Icon } from 'antd-mobile'
import Block from 'fs-flex'

/**
 *下拉刷新组件
 *
 * @class PullToRefreshComponent
 * @extends {Component}
 */
class PullToRefreshComponent extends Component{
    render(){
        return (
            <PullToRefresh {...this.props}
                style={{width: '100%', height: '100%', overflow: 'hidden', overflowY: 'auto'}}
                indicator={{
                    activate: <Block fc='#999' pt={10}>松开立即刷新</Block>,
                    deactivate: <Block fc='#999' pt={10}>下拉刷新</Block>,
                    release: <Block fc='#666' pt={10} wf j='c' a='c'><Icon type='loading' /><span style={{marginLeft: 5}}>正在加载...</span></Block>,
                    finish: <Block fc='#666' pt={10}>完成刷新</Block>
                }}/>
        )
    }
}

export default PullToRefreshComponent