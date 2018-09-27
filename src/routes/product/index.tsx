import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { SearchBar, Button, Toast } from 'antd-mobile'
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
        searchKeyword:'',//搜索值
        parentTypeId:'',//当前选中父级typeId
    }
    async componentDidMount(){
        document.title='商品分类'
        const { match:{params:{typeId}}} = this.props
        const {data,code} =await ProductService.getTypeList()
        // TODO 从路由中取TypeId，根据首页选中的typeId进行当前页面选中的tab以及tab下的品牌
        if(code === Constant.responseOK){
            this.setState({firstTypeList:data})
            if(data && data.length>0){
                if(typeId){
                    this.querychildTypeList(typeId)
                }else{
                    this.querychildTypeList(data[0].id)
                }
            }
        }
    }
    async querychildTypeList(parentId){
        this.setState({parentTypeId:parentId})
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
        wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/search/${item.parentType}/${item.typeName}`})
    }

    searchInputChange=(val)=>{
        this.setState({searchKeyword:val})
    }
    cancelInput=(val)=>{
        this.selectChildItem({parentType:this.state.parentTypeId,typeName:val})
    }
    onSubmit=(val)=>{
        this.selectChildItem({parentType:this.state.parentTypeId,typeName:val})
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
                        return <dd key={'child-type-'+index} className={itemClass} onClick={this.selectChildItem.bind(this,item)}><img style={{height:'87px'}} src={item.logoPath?Constant.imgBaseUrl+item.logoPath:ImgErr} alt={item.title}/></dd>
                    })
                }
            </dl>
        )
    }
    
    render(){
        const {firstTypeList,searchKeyword,parentTypeId}=this.state
        const { history } = this.props
        return (
            <Block className={Styles.default_wrapper} vf>
                {/* <Block>
                    <NavTopBar leftClick={()=>{history.goBack()}} title='商品搜索' />
                </Block> */}
                <Block>
                    <SearchBar placeholder='请输入商品名称查询'
                    showCancelButton={true} 
                    onChange={this.searchInputChange}
                    value={searchKeyword?searchKeyword:''}
                    onSubmit={this.cancelInput}
                    onCancel={this.cancelInput}
                    cancelText={<Button style={{marginTop: 6, borderRadius: 15}} type='primary' size='small' onSubmit={this.onSubmit}>搜索</Button>}/>
                </Block>
                <Block wf style={{marginTop:'10px'}}>
                    <Block className={Styles.left_menu}>
                    {
                        firstTypeList.map((item,index)=>
                            <Block j='c' onClick={this.selectedParentItem.bind(this,item)} key={'firstType-'+index} a='c' className={parentTypeId===item.id? Styles.menu_item_select: Styles.menu_item}>{item.title}</Block>
                        )
                    }
                    </Block>
                    <Block vf f={1} ml={15} mr={15}>
                        {this.renderSecondType()}
                    </Block>
                </Block>
            </Block>
        )
    }
}

export default connect()(DefaultPage)