import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { SearchBar, Button, Toast } from 'antd-mobile'
import { PullToRefresh, Empty } from '../../components'
import ProductService from '../../services/productService'
import Constatn from '../../utils/constant'
import Constant from '../../utils/constant';
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
    skuNameFieldMapping={'brandName':'品牌','colour':'颜色','memory':'内存'}
    menus = [
        {title: '综合',content:[]},
    ]
    async queryGoods(){
        const { match:{params:{parentType,name}},dispatch} = this.props
        const {searchKeyword,selectedSku}=this.state

        const selectColor=selectedSku.get('颜色')
        const selectBrand=selectedSku.get('品牌')
        const selectMemory=selectedSku.get('内存')
        const {data,code}=await ProductService.searchGoods({
            keyword:searchKeyword?searchKeyword:name,//关键字
            colour:selectColor?selectColor:'',//颜色
            brandName:selectBrand?selectBrand:'',//品牌
            memorySize:selectMemory?selectMemory:'',//内存
            sortList:[]
        })
        if (code === Constant.responseOK){
            this.setState({goods:data})
        }
    }
    componentDidMount() {
        this.aqueryFilterItem()
        this.queryGoods()
    }
    async aqueryFilterItem(){
        let { match:{params:{parentType,name}},dispatch} = this.props
        const {data,code} = await ProductService.queryFilterItem(parentType)
       
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
        console.log('filterConditions:',filterConditions)
        this.setState({
            filterConditions
        })
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
        this.setState({
            curMenu,
            popVisible: true,
            selectedSku:selectedSku,
            currentAllowSk:currentAllowSk
        })
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
    }

    renderSkuSelectBar(){
        const {filterConditions,selectedSku}=this.state
        return (
            <Block className={Styles.contrl} wf>
                {
                    filterConditions.map((item,index)=>{
                        const isSelected = selectedSku.has(item.title)
                        return  <Block onClick={this.menuHandleClk.bind(this, item)} key={index} f={1} j='c' a='c'>
                                    <Block mr={5} className={isSelected?Styles.orangeColor:''}>{item.title}</Block>
                                    <i className={isSelected?Styles.arrow_b:Styles.arrow_t}></i>
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
                    goods?
                    goods.map((item,index) =>{
                        return <Block key={'goods-'+index} wf className={Styles.sear_list_item}>
                                <Block className={Styles.prod_pic}><img style={{'width':'76px',height:'76px'}} src={Constant.imgBaseUrl+item.logoPath}/></Block>
                                <Block f={1} ml={15}>
                                    <Block>{item.title}</Block>
                                    <Block mt={5} wf>
                                        <Block f={1}>
                                            <Block mt={5} className={Styles.prod_tag}>{item.memorySize}</Block>
                                            <Block mt={5} className={Styles.prod_tag}>{item.colour}</Block>
                                        </Block>
                                        <Block mt={5} className={Styles.orangeColor}>￥{item.salePrice}</Block>
                                    </Block>
                                </Block>
                            </Block>
                    }):<Empty/>
                }
            </PullToRefresh>
        )
    }
    render(){
        const { popVisible, curMenu, refreshing} = this.state
        return (
            <Block className={Styles.search_wrapper} vf>
                <SearchBar placeholder='请输入商品名称查询'
                    showCancelButton={true} 
                    cancelText={<Button style={{marginTop: 6, borderRadius: 15}} type='primary' size='small'>搜索</Button>}/>
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

export default SearchProduct