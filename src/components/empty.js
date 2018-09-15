import { Component } from 'react'
import Block from 'fs-flex'

/**
 *没有数据时
 *
 * @class Empty
 * @extends {Component}
 */
class Empty extends Component{
    render(){
        return (
            <Block w='100%' mt={50} vf a='c'>
                <Block fs={16}>暂无数据</Block>
                <Block fc='#999' mt={5}>当前没有数据，或刷新再试</Block>
            </Block>
        )
    }
}

export default Empty