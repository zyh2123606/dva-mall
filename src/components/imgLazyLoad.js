import { Component } from 'react'
import Block from 'fs-flex'
import Styled from 'styled-components'

/**
 *图片懒加载
 *
 * @class ImgLazyLoad
 * @extends {Component}
 */
class ImgLazyLoad extends Component{
    state = {isLoad: false}
    render(){
        const { children } = this.props
        return (
            <Block>
                {children}
                <Loading>图片加载中</Loading>
            </Block>
        )
    }
}

//容器
const LazyContainer = Styled(Block)`
    position: relative;
    min-height: 200px;
`;

//loading组件
const Loading = Styled(Block) `
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

export default ImgLazyLoad