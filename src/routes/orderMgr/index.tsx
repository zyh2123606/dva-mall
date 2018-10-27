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
            this.setState({pageData:DATA})
        }
        
        // this.shoppingCart()
    }
    //选择颜色
    selectColor(attrValId,baseAttrId){
        const { form } = this.props
        const {cur_tag}=this.state
        form.setFieldsValue({ color_id: attrValId })
        
        const new_cur_tag=cur_tag.set(baseAttrId,attrValId)
        this.setState({cur_tag: new_cur_tag}, () => {
            const { getFieldProps } = this.props.form
            const { onChange } = getFieldProps('color_id')
            onChange(attrValId)
        })
        this.queryPriceByGoodsColor()
    }
    // 点击颜色，查询该颜色属性对应的商品信息
    async queryPriceByGoodsColor() {
        const {typeId,cur_tag,pageData:{goodsTypeAttrList}}=this.state
        const {match:{params:{sessionId,memId}}}  =this.props
        let attrList=[]
        cur_tag.forEach((value,key)=>{
            goodsTypeAttrList.map(attrItem=>{
                const attrItems = attrItem.attrValList.filter((v,i)=>v.attrValId===value)
                if (attrItems && attrItems.length>0){
                    attrList.push({attrId:attrItems[0].attrId,attrValId:attrItems[0].attrValId})
                }
            })
            
        })
        const services=new Service(sessionId,memId)
        const {data,code} = await services.queryPriceByGoodsColor({typeId:typeId,attrList:attrList})
        if(code===Constant.responseOK){
            if(data.goodsHeadPicList && data.goodsHeadPicList.length>0){
                let picList=[]
                data.goodsHeadPicList.map(item=>{
                    picList.push({
                        "picName":"",
                        "picPath":item,
                    })
                })
                this.setState({
                    defaultSkuPrice:this.toMoney(data.skuPrice.salePrice),
                    skuid:data.id,
                    headerImg:picList
                })
            }else{
                this.setState({
                    defaultSkuPrice:this.toMoney(data.skuPrice.salePrice),
                    skuid:data.id})
            }
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
        const {skuid}=this.state
        const params={
            memId:memId,// TODO 用户ID
            skuId:skuid,// skuid
            amount:num// 数量
        }
        // 添加购物车
        const {code,data} = await new ShoppingCartService({sessionId,memId}).save(params);
        if(code===Constant.responseOK){
            // wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/order-sure/${data+','}/${sessionId}/${memId}`})
            this.props.history.push(`/order-sure/${data+','}/${sessionId}/${memId}`)
        }else{
            Toast.fail('操作失败！',1)
        }
    }
    // 添加到购物车
    async addToShoppingCart(){
        const {form,match:{params:{sessionId,memId}}}  =this.props
        const {num} = form.getFieldsValue()

        const {skuid}=this.state
        const params={
            memId:memId,// 用户ID
            skuId:skuid,// skuid
            amount:num// 数量
        }
        const shoppingCartService = new ShoppingCartService({sessionId,memId})
        const {code} = await shoppingCartService.save(params);
        if (code===Constant.responseOK){
            this.setState((preState) => ({
                shoppingCartCount: preState.shoppingCartCount + 1
              }))
            Toast.success('添加购物车成功！',1)
        }
    }
    async shoppingCart(){
        const {match:{params:{sessionId,memId}}}  =this.props
        const shoppingCartService = new ShoppingCartService({sessionId,memId})
        const {data,code} = await shoppingCartService.query()
        if (code===Constant.responseOK){
            this.setState({shoppingCartCount:data.length})
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
    renderAttrBlock=(attrValue)=>{
        const { getFieldProps } = this.props.form
        const {cur_tag}=this.state
        return (
            <Block wf>
                {
                    attrValue?attrValue.map((item,idx)=>{
                        let selected=false
                        return <Block key={'attr-item-'+idx} onClick={this.selectColor.bind(this, null,null)} 
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
        }
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
        const { title,goodsPicList } = pageData || {}
        const { getFieldProps } = this.props.form
        return (
            pageData?<Block bc='#fff' vf p={15} className={Styles.order_det_wrapper}>
                <Block vf className={Styles.pro_panel}>
                    <Block f={1} j='c' a='c'>
                        {
                            this.renderHeaderImges()
                        }
                    </Block>
                    <Block p={20} vf mt={10}>
                        <Block fs={16}>{title}</Block>
                        <Block className={Styles.money_color} fs={20} mt={10}>￥{pageData.salePrice}</Block>
                    </Block>
                </Block>
                {
                    pageData.attrList?pageData.attrList.map(({attrValue,attrName},baseIndex)=>{
                        return <Block key={'base-attr-'+baseIndex}>
                                <Block pt={20} pb={13} fs={18}>{attrName}</Block>
                                {
                                    this.renderAttrBlock(attrValue)
                                }
                            </Block>
                    }):null
                }
                <Block mt={20} a='c' wf>
                    <Block fs={18} f={1}>购买数量</Block>
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
                        goodsPicList?goodsPicList.map((item,index)=>(
                            <img className={Styles.prod_img} key={index} src={item.picPath?Constant.imgBaseUrl+item.picPath:ImgErr} alt={item.picName}/>
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