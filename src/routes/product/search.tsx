import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { SearchBar, Button, Toast } from 'antd-mobile'
import { PullToRefresh, Empty } from '../../components'
import ProductService from '../../services/productService'
import Constatn from '../../utils/constant'
import Constant from '../../utils/constant';
import {connect} from 'dva';
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
        curMenu: null,
        filterConditions:[],// 过滤条件
        selectedSku: new Map(),//存放选中的sku属性
        currentAllowSku:[],
        goods:[],// 商品列表
        searchKeyword:null//关键词
    }
    pageIndex = 1
    pageSize = 10
    pageCount = 1
    skuNameFieldMapping={'brandName':'品牌','colour':'颜色','memory':'内存','priceDur':'价格'}
    menus = [
        {title: '综合',content:[]},
    ]
    async queryGoods(){
        const {searchKeyword,selectedSku}=this.state
        const {parentType}=this.props.match.params
        const selectColor=selectedSku.get('颜色')
        const selectBrand=selectedSku.get('品牌')
        const selectMemory=selectedSku.get('内存')
        const price=selectedSku.get('价格')
        const {data,code}=await ProductService.searchGoods({
            keyword:searchKeyword?searchKeyword:null,//关键字
            colour:selectColor?selectColor:null,//颜色
            brandName:selectBrand?selectBrand:null,//品牌
            memorySize:selectMemory?selectMemory:null,//内存
            priceDur:price?price:null,//价格区间
            sortList:[],
            typeId:parentType
        })
        if (code === Constant.responseOK){
            this.setState({goods:data})
        }
    }
    componentDidMount() {
        document.title='搜索'
        const { match:{params:{name}}} = this.props
        this.setState({searchKeyword:name})
        setTimeout(() => {
            this.aqueryFilterItem()
            this.queryGoods()
        }, 200);
    }
    async aqueryFilterItem(){
        let {selectedSku}=this.state
        const { match:{params:{parentType,name,sessionId,memId}}} = this.props
        const productService=new ProductService(sessionId,memId)
        const {data,code} = await productService.queryFilterItem(parentType)
       
        if(code!==Constatn.responseOK || !data){
            return
        }
        let filterConditions=[{title: '综合',content:[]}]
        for (let key of Object.keys(data)){
            const name=this.skuNameFieldMapping[key]
            filterConditions.push({
                title:name,
                content:data[key]
            })
        }
        // 页面打开时，设置默认选中品牌
        filterConditions.map(({title,content},index)=>{
            content.map(item=>{
                if(item===name){
                    selectedSku.set('品牌',name)
                }
            })
        })
        this.setState({
            searchKeyword:name,
            filterConditions,
            selectedSku:selectedSku
        })
    }
    searchInputChange=(value)=>{
        this.setState({searchKeyword:value})
    }
    cancelInput=(val)=>{
        this.setState({searchKeyword:val})
        this.queryGoods()
    }

    menuHandleClk(curMenu){
        let {selectedSku}=this.state
        const value = selectedSku.get(curMenu.title)
        let currentAllowSk=new Map()
        currentAllowSk.set('title',curMenu.title)
        if (curMenu.title==='综合'){
            selectedSku=new Map()
            currentAllowSk.set('content',[])
        }else{
            selectedSku.delete('综合')
            currentAllowSk.set('content',curMenu.content)
        }
        selectedSku.set(curMenu.title,value)
        if (curMenu.title!=='综合'){
            this.setState({
                curMenu,
                popVisible: true,
                selectedSku:selectedSku,
                currentAllowSk:currentAllowSk
            })
        }else{
            this.setState({
                curMenu,
                selectedSku:selectedSku,
                currentAllowSk:currentAllowSk
            })
            this.queryGoods()
        }
        
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
        this.queryGoods()
        this.setState({
            selectedSku:selectedSku,
            popVisible:false
        })
    }
    // 跳转到商品详情页面 
    toGoodsDetailPage(item){
        const { match:{params:{sessionId,memId}}} = this.props
        // wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/order-detail/${item.typeId}/${sessionId}/${memId}`})
        this.props.history.push(`/order-detail/${item.typeId}/${sessionId}/${memId}`)
    }
    // 渲染搜索栏一级大类
    renderSkuSelectBar(){
        const {filterConditions,selectedSku}=this.state
        return (
            <Block className={Styles.contrl} wf>
                {
                    filterConditions.map((item,index)=>{
                        const isSelected = selectedSku.has(item.title)
                        return  <Block onClick={this.menuHandleClk.bind(this, item)} key={index} f={1} j='c' a='c'>
                                    <Block mr={5} className={isSelected?Styles.orangeColor:''}>{item.title}</Block>
                                    {
                                        item.title==='综合'?null:<i className={isSelected?Styles.arrow_b:Styles.arrow_t}></i>
                                    }
                                </Block>
                    })
                }
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
                                <Block className={Styles.prod_pic}><img style={{'width':'76px',height:'76px'}} src={Constant.imgBaseUrl+item.logoPath}/></Block>
                                <Block f={1} ml={15}>
                                    <Block>{item.title}</Block>
                                    <Block mt={5} wf>
                                        <Block f={1}>
                                            <Block mt={5} className={Styles.prod_tag}>{item.memorySize}</Block>
                                            <Block mt={5} className={Styles.prod_tag}>{item.colour}</Block>
                                        </Block>
                                        <Block mt={5} className={Styles.orangeColor}>￥{Constant.toMoney(item.salePrice)}</Block>
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
                {/* 弹出层 */}
                <section style={{display: popVisible?'block':'none'}} className={Styles.search_masker} onClick={this.handleClose}>
                    {
                        this.renderSeleteDownPage()
                    }
                </section>
            </Block>
        )
    }
}

export default connect()(SearchProduct)