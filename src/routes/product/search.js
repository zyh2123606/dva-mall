import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { SearchBar, Button } from 'antd-mobile'

/**
 *商品搜索页
 *
 * @class SearchProduct
 * @extends {Component}
 */
class SearchProduct extends Component{
    state = {
        popVisible: false,
        curMenu: null
    }
    menus = [
        {key: 100, title: '综合'},
        {key: 200, title: '品牌'},
        {key: 300, title: '价格'},
        {key: 400, title: '颜色'}
    ]
    menuHandleClk(curMenu){
        this.setState({curMenu, popVisible: true})
    }
    render(){
        const { popVisible, curMenu } = this.state
        return (
            <Block className={Styles.search_wrapper} vf>
                <SearchBar placeholder='请输入商品名称查询'
                    showCancelButton={true} 
                    cancelText={<Button style={{marginTop: 6, borderRadius: 15}} type='primary' size='small'>搜索</Button>}/>
                <Block className={Styles.contrl} wf>
                    {this.menus.map(({key, title}, idx) => (
                        <Block onClick={this.menuHandleClk.bind(this, key)} key={idx} f={1} j='c' a='c'>
                            <Block mr={5} className={key===curMenu?Styles.orangeColor:''}>{title}</Block>
                            <i className={key===curMenu?Styles.arrow_b:Styles.arrow_t}></i>
                        </Block>
                    ))}
                </Block>
                <Block f={1} className={Styles.sear_content}>
                    <Block wf className={Styles.sear_list_item}>
                        <Block className={Styles.prod_pic}></Block>
                        <Block f={1} ml={15}>
                            <Block>小米 红米Note5 全网通版 4GB+64G 红色 全网联通4G手机 双卡双待</Block>
                            <Block mt={5} wf>
                                <Block f={1}>
                                    <Block mt={5} className={Styles.prod_tag}>4GB</Block>
                                    <Block mt={5} className={Styles.prod_tag}>极光白/黑金/宝石红</Block>
                                </Block>
                                <Block mt={5} className={Styles.orangeColor}>￥2799.00</Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
                {/* 弹出层 */}
                <section style={{display: popVisible?'block':'none'}} className={Styles.search_masker} onClick={this.close}>
                    <article className={Styles.search_pop}>
                        <Block className={Styles.normalTag}>白色</Block>
                        <Block className={Styles.activeTag}>白色</Block>
                        <Block className={Styles.normalTag}>白色</Block>
                        <Block className={Styles.normalTag}>白色</Block>
                        <Block className={Styles.normalTag}>白色</Block>
                    </article>
                </section>
            </Block>
        )
    }
}

export default SearchProduct