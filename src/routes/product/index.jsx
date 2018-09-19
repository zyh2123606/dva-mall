import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'

/**
 *商品列表入口
 *
 * @class DefaultPage
 * @extends {Component}
 */
class DefaultPage extends Component{
    render(){
        return (
            <Block className={Styles.default_wrapper} wf>
                <Block className={Styles.left_menu}>
                    <Block j='c' a='c' className={Styles.menu_item}>移动终端</Block>
                    <Block j='c' a='c' className={Styles.menu_item}>穿戴设备</Block>
                    <Block j='c' a='c' className={Styles.menu_item}>智能家居</Block>
                    <Block j='c' a='c' className={Styles.menu_item}>辅助配件</Block>
                </Block>
                <Block vf f={1} ml={15} mr={15}>
                    <Block pt={10} pb={10} className={Styles.orangeColor}>手机</Block>
                    <dl className={Styles.prod_panel}>
                        <dd className={Styles.prod_item}></dd>
                        <dd className={Styles.prod_item}></dd>
                        <dd className={Styles.prod_item_r_f}></dd>

                        <dd className={Styles.prod_item}></dd>
                        <dd className={Styles.prod_item}></dd>
                        <dd className={Styles.prod_item_r}></dd>

                        <dd className={Styles.prod_item}></dd>
                        <dd className={Styles.prod_item}></dd>
                        <dd className={Styles.prod_item_r}></dd>
                    </dl>
                </Block>
            </Block>
        )
    }
}

export default DefaultPage