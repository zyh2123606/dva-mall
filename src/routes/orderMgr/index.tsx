import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Stepper,Carousel, Badge, Toast,Modal } from 'antd-mobile'
import Service from '../../services/productService'
import ShoppingCartService from '../../services/shoppingCartService';// 购物车service
import { createForm } from 'rc-form'
import {connect} from 'dva';
import Constant from '../../utils/constant';
import ImgErr from '../../assets/img/img_error.png'
import qs from 'qs'


const alert = Modal.alert;

class OrderDetail extends Component{
    state = {
        pageData: null, 
        cur_tag:null,
        defaultSkuPrice:0,
        typeId:0,
        shoppingCartCount:0,//购物车商品数量
        logoPath:'',
        skuid:0,
        headerImg:[],// 头部商品展示图片集合
        selectedAttr:new Map(),//当前选中的attr
    }
    //dom挂在完成请求数据
    async componentDidMount(){
        document.title='商品详情'
        const {match:{params:{pid,sessionId,memId}},location}  =this.props
        const services=new Service({sessionId,memId})
        const { cloudShelfId } = qs.parse(location.search.split('?')[1])
        const {RESP_CODE,DATA}=await services.getGoodsDetai({
            deptId:258,
            accountId:9,
            DATA:{
                typeId:7048,
                skuId:944
            }
        })
        if(RESP_CODE==Constant.responseOK){
            this.setDefaultAttrs(DATA)
            this.setState({pageData:DATA})
        }
        
        this.shoppingCart()
    }
    // 设置当前默认选中属性
    setDefaultAttrs=(DATA)=>{
        // 获取默认选中属性
        let selectedAttr=this.state.selectedAttr
        const attrNames=DATA.attrNames// 属性集合（字符串）
        if (attrNames){
            if(attrNames.indexOf(' ')!==-1){
                const attrs=attrNames.split(' ')
                attrs.map((item)=>{
                    const attrs=DATA.attrList.filter(v=>v.attrCode.indexOf(item)!==-1)
                    if(attrs && attrs.length>0){
                        selectedAttr.set(attrs[0].attrName,item)
                    }
                })
            }
        }
        this.setState({selectedAttr})
    }
    //选择颜色
    selectAttr(attrName,item){
        let selectedAttr=this.state.selectedAttr
        selectedAttr.set(attrName,item)
        this.setState({selectedAttr})
        this.queryPriceByGoodsColor()

    }
    // 点击属性，查询该属性对应的商品信息
    async queryPriceByGoodsColor() {
        const selectedAttr= this.state.selectedAttr
        let attr=''
        let attrLen=0
        
        //遍历key
        for (var value of selectedAttr.values()) {
            if(selectedAttr.size===1 || attrLen===(selectedAttr.size-1)){
                attr+=value
            }else{
                attr+=(value+' ')
            }
            attrLen++
        }

        const {RESP_CODE,DATA}=await new Service(1,15).querySkuGoods({
            deptId:258,
            accountId:9,
            DATA:{
                typeId:7048,
                attrList:attr
            }
        })
        if(RESP_CODE==Constant.responseOK){
            const {salePrice,skuId,goodsNum}=DATA
            let pageData = Object.assign({}, this.state.pageData, { salePrice: salePrice,skuId:skuId,goodsNum:goodsNum })
            this.setState({pageData})
        }
    }
    // 金额转换
    toMoney(num){
        return Constant.toMoney(num)
    }
    //立即购买
    async sureBuy(){
        const {form,match:{params:{sessionId,memId}}}  =this.props
        const {num} = form.getFieldsValue()
        const {skuId}=this.state.pageData
        this.props.history.push(`/order-sure?skuId=${skuId}&num=${num}&typeId=${7048}`)
        
    }
    // 添加到购物车
    async addToShoppingCart(){
        const {form,match:{params:{sessionId,memId}}}  =this.props
        const {num} = form.getFieldsValue()

        const {skuId}=this.state.pageData
        const params={
            DATA:{
                goodsTotal:num,
                skuId:skuId              
            },
            accountId:9,
            deptId:258
        }
        const shoppingCartService = new ShoppingCartService({sessionId,memId})
        const {RESP_CODE} = await shoppingCartService.save(params);
        if (RESP_CODE===Constant.responseOK){
            this.setState((preState) => ({
                shoppingCartCount: preState.shoppingCartCount + num
              }))
            Toast.success('添加购物车成功！',1)
        }
    }
    // 查看购物车
    async shoppingCart(){
        const {match:{params:{sessionId,memId}}}  =this.props
        const shoppingCartService = new ShoppingCartService({sessionId,memId})
        const {RESP_CODE,DATA} = await shoppingCartService.query({
            DATA:{
                currentPage:1,
                countPerPage:100,
            },
            accountId:9,
            deptId:258,

        })
        if (RESP_CODE===Constant.responseOK){
            let total=0;
            if(DATA && DATA.length>0){
                DATA.map(item=>{
                    if(item.goodsTotal){
                        total+=(item.goodsTotal)
                    }
                })
            }
            this.setState({shoppingCartCount:total})
        }
    }
    // 查看购物车
    toShoppingCart=()=>{
        const {match:{params:{sessionId,memId}}}  =this.props
        // TODO 处理跳转到购物车需要携带的sessionID和memId

        // wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/cart/${sessionId}/${memId}`})
        this.props.history.push(`/cart/${sessionId}/${memId}`)
    }
    //联系客服
    connectService=()=>{
        const token=''
        const {match:{params:{sessionId,memId}}}  =this.props
        // productService.connectService(token)
    }
    // 渲染商品属性部分
    renderAttrBlock=(attrName,attrValue)=>{
        const { getFieldProps } = this.props.form
        const {selectedAttr}=this.state
        return (
            <Block wf>
                {
                    attrValue?attrValue.map((item,idx)=>{
                        let selected=false
                        if(selectedAttr.has(attrName)){
                            selected=(selectedAttr.get(attrName)===item)
                        }
                        return <Block key={'attr-item-'+idx} onClick={this.selectAttr.bind(this, attrName,item)} 
                                {...getFieldProps('color_id', {initialValue: 100})}
                                key={idx}  
                                mr={idx !=0 && idx%3 == 0?0:10}
                                className={selected?Styles.color_tag_select:Styles.color_tag}>
                                {item}
                            </Block>
                    }):null
                }
            </Block>
        )
    }

    renderHeaderImges=()=>{
        const {pageData:{showImg}} =this.state
        let images=[]
        if(showImg && showImg.indexOf(",") != -1){
            images=showImg.spilt(',')
        }else{
            images.push(showImg)
        }
        console.log(images)
        return <Carousel 
            autoplay={false} 
            infinite 
            dotStyle={{background: '#D2D2D2', marginTop: 10}}
            dotActiveStyle={{background: '#FF8E44'}}
            style={{touchAction: 'none'}}>
            {
                images.map((item,index)=><img
                    key={'header-img-'+index}
                    src={Constant.imgBaseUrl+item}
                    alt={item}
                    style={{marginTop: 0, borderRadius: '5px 5px 0 0'}} 
                    className={Styles.prod_img} 
                    onLoad={() => {window.dispatchEvent(new Event('resize'));}} 
                    />)
            }
        </Carousel>
    }

    render(){
        const { pageData,defaultSkuPrice,shoppingCartCount} = this.state
        const { title,conImg } = pageData || {}
        const { getFieldProps } = this.props.form

        let xiangqing=[]
        if (conImg){
            if(conImg.indexOf(',')!==-1){
                xiangqing=conImg.split(',')
            }else{
                xiangqing.push(conImg)
            }
        }
        return (
            pageData?<Block bc='#fff' vf p={15} className={Styles.order_det_wrapper}>
                <Block vf className={Styles.pro_panel}>
                    <Block f={1} j='c' a='c'>
                        {
                            this.renderHeaderImges()
                        }
                    </Block>
                    <Block p={20} vf mt={10}>
                        <Block fs={16}>{pageData.goodsName}</Block>
                        <Block className={Styles.money_color} fs={20} mt={10}>￥{pageData.salePrice}</Block>
                    </Block>
                </Block>
                {
                    pageData.attrList?pageData.attrList.map(({attrValue,attrName},baseIndex)=>{
                        return <Block key={'base-attr-'+baseIndex}>
                                <Block pt={20} pb={13} fs={18}>{attrName}</Block>
                                {
                                    this.renderAttrBlock(attrName,attrValue)
                                }
                            </Block>
                    }):null
                }
                <Block mt={20} a='c' wf>
                    <Block fs={18} f={1} hf>
                        <Block>购买数量</Block>
                        <Block style={{color:'#CCCCCC'}}>（库存数量：{pageData.goodsNum}）</Block>
                    </Block>
                    <Stepper
                        style={{ width: '120px', touchAction: 'none'}}
                        showNumber
                        {...getFieldProps('num', {initialValue: 1})}
                        max={10}
                        min={1}
                        defaultValue={1}
                    />
                </Block>
                <Block pt={20} pb={20} fs={18} style={{fontWeight: 'bold'}}>套餐详情</Block>
                <Block vf mb={60}>
                    {
                        
                        xiangqing?xiangqing.map((item,index)=>(
                            <img className={Styles.prod_img} key={index} src={item?Constant.imgBaseUrl+item:ImgErr} alt='详情'/>
                        )):null
                    }
                </Block>
                <Block vf fs={16} className={Styles.footer_bar}>
                    <Block wf className={Styles.footer_content}>
                        {/* <Block a='c' j='c' w={60} vf onClick={this.connectService}>
                            <Block fs={22} fc='#999'>
                                <i className={Styles.icon_server} />
                            </Block>
                            <Block fs={12}>客服</Block>
                        </Block> */}
                        <Block a='c' j='c' w={60} vf onClick={this.toShoppingCart}>
                            <Block fs={24} fc='#999'>
                                <Badge text={shoppingCartCount}><i className={Styles.icon_cart} /></Badge>
                            </Block>
                            <Block fs={12} >购物车</Block>
                        </Block>
                        <Block wf f={1} ml={10} mr={10}>
                            <Block className={Styles.car_sty} f={1} onClick={this.addToShoppingCart.bind(this)}>加入购物车</Block>
                            <Block onClick={this.sureBuy.bind(this)} className={Styles.buy_sty} f={1}>立即购买</Block>
                        </Block>
                    </Block>
                </Block>
            </Block>:null
        )
    }
}

export default connect()(createForm()(OrderDetail))