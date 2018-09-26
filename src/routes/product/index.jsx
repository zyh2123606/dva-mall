import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import ProductService from '../../services/productService'
import Constant from '../../utils/constant'
import {routerRedux} from 'dva/router';
import {connect} from 'dva'
import ImgErr from '../../assets/img/img_error.png'
/**
 *商品列表入口
 *
 * @class DefaultPage
 * @extends {Component}
 */
class DefaultPage extends Component{
    state={
        firstTypeList:[],// 第一级分类集合
        secondTypeList:[],// 第二级分类集合
    }
    async componentDidMount(){
        const {data,code} =await ProductService.getTypeList()
        if(code === Constant.responseOK){
            this.setState({firstTypeList:data})
            if(data && data.length>0){
                this.querychildTypeList(data[0].id)
            }
        }
    }
    async querychildTypeList(parentId){
        const {data,code} =await ProductService.getTypeList(parentId)
        if(code === Constant.responseOK){
            this.setState({secondTypeList:data})
        }
    }
    // 点击选中第一级菜单
    selectedParentItem(parent){
        this.querychildTypeList(parent.id)
    }
    // 选中第二级菜单
    selectChildItem(item){
        this.props.dispatch(routerRedux.push(`/search/${item.parentType}/${item.typeName}`))
    }
    renderSecondType=()=>{
        const {secondTypeList}=this.state
        return (
            <dl className={Styles.prod_panel}>
                {
                    secondTypeList.map((item,index)=>{
                        let itemClass=Styles.prod_item
                        if(index===2){
                            itemClass=Styles.prod_item_r_f
                        } else if((index+1)%3===0){
                            itemClass=Styles.prod_item_r
                        }
                        return <dd key={'child-type-'+index} className={itemClass} onClick={this.selectChildItem.bind(this,item)}><img src={item.logoPath?Constant.imgBaseUrl+item.logoPath:ImgErr} alt={item.title}/></dd>
                    })
                }
            </dl>
        )
    }
    render(){
        const {firstTypeList}=this.state
        return (
            <Block className={Styles.default_wrapper} wf>
                <Block className={Styles.left_menu}>
                {
                    firstTypeList.map((item,index)=>
                        <Block j='c' onClick={this.selectedParentItem.bind(this,item)} key={'firstType-'+index} a='c' className={Styles.menu_item}>{item.title}</Block>
                    )
                }
                </Block>
                <Block vf f={1} ml={15} mr={15}>
                    {this.renderSecondType()}
                </Block>
            </Block>
        )
    }
}

export default connect()(DefaultPage)