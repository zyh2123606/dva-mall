import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { SearchBar, Button, Toast } from 'antd-mobile'
import ProductService from '../../services/productService'
import Constant from '../../utils/constant'
import {routerRedux} from 'dva/router';
import {connect} from 'dva'
import ImgErr from '../../assets/img/img_error.png'
import GoodsTypeService from '../../services/goodsTypeService';
import qs from 'qs'

/**
 *商品列表入口
 *
 * @class DefaultPage
 * @extends {Component}
 */
class DefaultPage extends Component{
    state={
        firstTypeList:[],// 第一级分类集合
        secondTypeList:null,// 第二级分类集合
        searchKeyword:null,//搜索值
        parentTypeId:0,//当前选中父级typeId
    }
    async componentDidMount(){
        document.title='商品分类'
        const { match:{params:{typeId,sessionId,memId}}} = this.props
        this.GoodsTypeService()
    }

    // 获取第第一级商品分类
    async GoodsTypeService(){
        const {match:{params:{sessionId,memId}},location}  =this.props
        const { deptId,accountId,firstType } = qs.parse(location.search.split('?')[1])
        const {RESP_CODE,DATA}=await new GoodsTypeService({sessionId,memId}).getFirststageGoodsType(deptId)
        if(Constant.responseOK===RESP_CODE){
            this.setState({firstTypeList:DATA})
            if(DATA && DATA.length>0){
                this.setState({parentTypeId:firstType?firstType:DATA[0].grandFatherTypeId})
                this.querychildTypeList(firstType?firstType:DATA[0].grandFatherTypeId)
            }
        }
    }

    // 获取第二级菜单数据
    async querychildTypeList(parentId){
        const {match:{params:{sessionId,memId}},location}  =this.props
        const { deptId,accountId } = qs.parse(location.search.split('?')[1])

        const {RESP_CODE,DATA}=await new GoodsTypeService({sessionId,memId}).getSecondstageGoodsType(deptId,parentId)
        if(Constant.responseOK===RESP_CODE){
            this.setState({secondTypeList:DATA,parentTypeId:parentId})
        }
    }


    // 点击选中第一级菜单
    selectedParentItem(parent){
        this.querychildTypeList(parent.grandFatherTypeId)
    }
    // 选中第二级菜单
    selectChildItem(item){
        const {match:{params:{sessionId,memId}},location}  =this.props
        const { deptId,accountId } = qs.parse(location.search.split('?')[1])
        let searchKeyword=this.state.searchKeyword
        if(!searchKeyword){
            searchKeyword='all'
        }
        // this.props.history.push(`/search?parentType=${item.parentTypeId}&keyword=${searchKeyword}&deptId=${deptId}&accountId=${accountId}`)
    
        const u=`https://iretail.bonc.com.cn/cnc/#/search?parentType=${item.parentTypeId}&keyword=${searchKeyword}&deptId=${deptId}&accountId=${accountId}`
        const _url =`/pages/newPage/newPage?url=${encodeURIComponent(u)}`
        wx.miniProgram.navigateTo({url: _url})
    }

    searchInputChange=(val)=>{
        this.setState({searchKeyword:val})
    }
    cancelInput=(val)=>{
        const {match:{params:{sessionId,memId}},location}  =this.props
        const { deptId,accountId } = qs.parse(location.search.split('?')[1])
        let searchKeyword=this.state.searchKeyword
        if(!searchKeyword){
            searchKeyword='all'
        }
        if(!val){
            val='all'
            const secondTypeList=this.state.secondTypeList
            console.log(secondTypeList)
            if(secondTypeList && secondTypeList.length>0 && secondTypeList[0].brandList &&secondTypeList[0].brandList.length>0){
                // console.log(secondTypeList)
                // this.props.history.push(`/search?parentType=${secondTypeList[0].brandList[0].parentTypeId}&keyword=${searchKeyword}&deptId=${deptId}&accountId=${accountId}`)
                const u=`https://iretail.bonc.com.cn/cnc/#/search?parentType=${secondTypeList[0].brandList[0].parentTypeId}&keyword=${searchKeyword}&deptId=${deptId}&accountId=${accountId}`
                const _url =`/pages/newPage/newPage?url=${encodeURIComponent(u)}`
                wx.miniProgram.navigateTo({url: _url})
            }
        }
        Toast.info('请输入关键词搜索！',1)
        // this.selectChildItem({parentType:this.state.parentTypeId,typeName:val})
    }
    onSubmit=(val)=>{
        if(!val){
            val='all'
        }
        this.selectChildItem({parentTypeId:this.state.parentTypeId,typeName:val})
    }

    renderSecondType=()=>{
        const {secondTypeList}=this.state
        console.log(secondTypeList===null || secondTypeList.length<1)
        return (
            <Block className={Styles.prod_panel} vf>
                {
                    secondTypeList===null || secondTypeList.length<1?<Block h={20}>暂无数据</Block>:
                    secondTypeList.map((secondType,secondTypeIndex)=>{
                        return <Block key={'second-'+secondTypeIndex}>
                                <Block h={20} fs={17} p={10}>{secondType.grandpaTypeName}</Block>
                                <Block f={1}>
                                {
                                    secondType.brandList && secondType.brandList.length>0 ?secondType.brandList.map((item,index)=>{
                                        return <Block a='c' j='c' key={'child-type-'+index} className={Styles.type_prod_item} onClick={this.selectChildItem.bind(this,item)}>
                                            <img src={item.parentTypeUrl?Constant.imgBaseUrl+item.parentTypeUrl:ImgErr} alt={item.grandFatherTypeName}/>
                                        </Block>
                                    }):<Block h={20}>暂无数据</Block>
                                }
                                </Block>
                        </Block>
                    })
                }
            </Block>
        )
    }
    
    render(){
        const {firstTypeList,searchKeyword,parentTypeId}=this.state
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
                            <Block j='c' 
                            onClick={this.selectedParentItem.bind(this,item)} 
                            key={'firstType-'+index} 
                            a='c' 
                            className={parseInt(parentTypeId)===parseInt(item.grandFatherTypeId)? Styles.menu_item_select: Styles.menu_item}>{item.grandFatherTypeName}</Block>
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