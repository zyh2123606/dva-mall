import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { SearchBar, Button, Toast } from 'antd-mobile'
import { PullToRefresh, Empty } from '../../components'
import ProductService from '../../services/productService'
import Constatn from '../../utils/constant'
import Constant from '../../utils/constant';
import {connect} from 'dva';
import qs from 'qs'
import sortAsc from '../../assets/img/sortAsc.png'
import sortAscChecked from '../../assets/img/sortAscChecked.png'
import sortDesc from '../../assets/img/sortDesc.png'
import sortDescChecked from '../../assets/img/sortDescChecked.png'

/**
 *商品搜索页
 *
 * @class SearchProduct
 * @extends {Component}
 */
class SearchProduct extends Component{
    state = { 
        refreshing: true, 
        data: null, 
        popVisible: false, 

        goods:[],// 商品列表
        searchKeyword:null,//关键词
        sortDefault:true,//综合排序
        sales:null,// 按照销量排序：null不排序，asc升序，desc降序
        price:null,// 按价格量排序：null不排序，asc升序，desc降序
    }
    pageIndex = 1
    pageSize = 10
    pageCount = 1
    menus = [
        {title: '综合',content:[]},
    ]
    async queryGoods(){
        const {searchKeyword,sortDefault,sales,price}=this.state
        const {match:{params:{sessionId,memId}},location}  =this.props
        const { parentType,deptId,accountId } = qs.parse(location.search.split('?')[1])
        let paramData={
            currentPage:0,
            countPerPage:100,
        }
        if(!sortDefault){
            // 不是综合排序才解析排序参数
            if(sales && sales==='asc'){
                paramData.SalesSort=1
            }else if(sales && sales==='desc'){
                paramData.SalesSort=2
            }else if(price && price==='asc'){
                paramData.priceSort=1
            }else if(price && price==='desc'){
                paramData.priceSort=2
            }
        }
        if(searchKeyword && searchKeyword!=='all'&&searchKeyword!==''){
            //判断是否输入关键字
            console.log(`searchKeyword:${searchKeyword}`)
            paramData.goodsNameDim=searchKeyword//关键字
        }else{
            paramData.parentTypeId=parentType;
        }
        const {RESP_CODE,DATA}=await new ProductService({sessionId,memId}).searchGoods({
            deptId:deptId,
            accountId:accountId,
            DATA:paramData
        })
        if (RESP_CODE === Constant.responseOK){
            this.setState({goods:DATA})
        }
    }
    async componentDidMount() {
        document.title='搜索'
        const { location} = this.props
        const { name,keyword} = qs.parse(location.search.split('?')[1])
        
        if(keyword && keyword!=='all'){
            this.setState({searchKeyword:name})
        }

        setTimeout(() => {
            this.queryGoods()
        }, 200);
    }
    getKeyWords=()=>{
        const { location} = this.props
        return qs.parse(location.search.split('?')[1])
    }
   
    searchInputChange=(value)=>{
        this.setState({searchKeyword:value})
    }
    cancelInput=(val)=>{
        this.setState({searchKeyword:val})
        this.queryGoods()
    }

    menuHandleClk(curMenu,sort){
        let sortDefault=false;
        let sales=null;
        let price=null;
        if(curMenu==='综合'){
            sortDefault=true
        }else if(curMenu==='价格'){
            price=sort
        }else if(curMenu==='销量'){
            sales=sort
        }
        this.setState({
            sortDefault:sortDefault,
            sales:sales,
            price:price,
        })
        setTimeout(() => {
            this.queryGoods()
        }, 200);
    }

    //获取数据
    async getList(loading=true){
        const { pageIndex, pageSize } = this
    }
    //下拉刷新
    pulUpFresh = () => {
        if(this.pageIndex >= this.pageCount){
            Toast.info('已没有更多数据')
            this.setState({ refreshing: false})
            return
        }
        this.pageIndex++
        this.setState({refreshing: true})
    }

    // 点击选中skuitem
    selectSkuItem(title,itemName){
        let selectedSku=this.state.selectedSku
        selectedSku.set(title,itemName)
        this.setState({
            selectedSku:selectedSku,
            popVisible:false
        })
        setTimeout(() => {
            this.queryGoods()
        }, 200);
    }
    // 跳转到商品详情页面 
    toGoodsDetailPage(item){
        const {location} = this.props
        const { parentType,deptId,accountId } = qs.parse(location.search.split('?')[1])
        // wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/order-detail/${item.typeId}/${sessionId}/${memId}`})
        this.props.history.push(`/order-detail?deptId=${deptId}&accountId=${accountId}&typeId=${item.typeId}&skuId=${item.skuId}`)
    }
    // 渲染搜索栏一级大类
    renderSkuSelectBar(){
        const {sortDefault,sales,price}=this.state
        return (
            <Block className={Styles.contrl} wf>
                <Block onClick={this.menuHandleClk.bind(this, '综合','default')} f={1} j='c' a='c'>
                    <Block mr={5} className={sortDefault?Styles.orangeColor:''}>综合</Block>
                </Block>
                <Block onClick={this.menuHandleClk.bind(this, '价格',price==='asc'?'desc':'asc')} f={1} j='c' a='c' wf>
                    <Block mr={5} a='r' className={price ?Styles.orangeColor:''}>价格
                        
                    </Block>
                    <Block vf h={35}>
                        <Block style={{width:'16',height:'16px'}}><img style={{width:'16',height:'16px',marginTop:'8px'}} src={price && price==='asc'?sortAscChecked:sortAsc}/></Block>
                        <Block style={{width:'16',height:'16px'}}><img style={{width:'16',height:'16px',marginBottom:'8px'}} src={price && price==='desc'?sortDescChecked:sortDesc}/></Block>
                    </Block>
                    
                </Block>
                <Block onClick={this.menuHandleClk.bind(this, '销量',sales==='asc'?'desc':'asc')} f={1} j='c' a='c' wf>
                    <Block mr={5} a='r' className={sales?Styles.orangeColor:''}>销量
                        
                    </Block>
                    <Block vf h={35}>
                        <Block style={{width:'16',height:'16px'}}><img style={{width:'16',height:'16px',marginTop:'8px'}} src={sales && sales==='asc'?sortAscChecked:sortAsc}/></Block>
                        <Block style={{width:'16',height:'16px'}}><img style={{width:'16',height:'16px',marginBottom:'8px'}} src={sales && sales==='desc'?sortDescChecked:sortDesc}/></Block>
                    </Block>
                    
                </Block>
            </Block>
        )
    }

    // 渲染下拉选择属性
    renderSeleteDownPage(){
        const {currentAllowSk,selectedSku}=this.state
        return (
            <article className={Styles.search_pop}>
                {
                    currentAllowSk?
                    currentAllowSk.get('content').map((item,index)=>{
                        let isSelected=false
                        const select = selectedSku.get(currentAllowSk.get('title'))
                        if (select && select===item){
                            isSelected=true
                        }
                        return <Block className={isSelected?Styles.activeTag: Styles.normalTag} onClick={this.selectSkuItem.bind(this,currentAllowSk.get('title'),item)} key={'normalTag-'+index}>{item}</Block>
                    }):null
                }
            </article>
        )
    }
    renderGoodsList=()=>{
        const {refreshing,goods}=this.state
        return (
            <PullToRefresh
            direction='up'
            distanceToRefresh={40}
            refreshing={refreshing}
            onRefresh={this.pulUpFresh}
            damping={100}>
                {
                    goods && goods.length>0?
                    goods.map((item,index) =>{
                        return <Block key={'goods-'+index} wf className={Styles.sear_list_item} onClick={this.toGoodsDetailPage.bind(this,item)}>
                                <Block className={Styles.prod_pic}><img style={{'width':'76px',height:'76px'}} src={Constant.imgBaseUrl+item.goodsImg}/></Block>
                                <Block f={1} ml={15}>
                                    <Block>{item.goodsName}</Block>
                                    <Block mt={5} wf>{item.attrNames}</Block>
                                    <Block mt={5} wf>
                                        <Block f={1}>
                                        {
                                            item.attrList?item.attrList.map((attr,i)=><Block key={'attr-'+i} mt={5} className={Styles.prod_tag}>{attr}</Block>):null
                                        }
                                        </Block>
                                        <Block mt={5} className={Styles.orangeColor}>￥ {item.salePrice?item.salePrice.toFixed(2):null}</Block>
                                    </Block>
                                </Block>
                            </Block>
                    }):<Empty/>
                }
            </PullToRefresh>
        )
    }
    render(){
        const { popVisible,searchKeyword} = this.state
        return (
            <Block className={Styles.search_wrapper} vf>
                <SearchBar placeholder='请输入商品名称查询'
                    showCancelButton={false} 
                    onChange={this.searchInputChange}
                    value={searchKeyword?searchKeyword:''}
                    onSubmit={this.cancelInput}
                    onCancel={this.cancelInput}
                    cancelText={<Button style={{marginTop: 6, borderRadius: 15}} type='primary' size='small' onSubmit={this.onSubmit}>搜索</Button>}/>
                {
                    this.renderSkuSelectBar()
                }
                <Block f={1} className={Styles.sear_content}>
                    {
                        this.renderGoodsList()
                    }
                </Block>
            </Block>
        )
    }
}

export default connect()(SearchProduct)