import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Stepper, Icon } from 'antd-mobile'
import Service from '../../services/productService'
import ShoppingCartService from '../../services/shoppingCartService';// 购物车service
import { createForm } from 'rc-form'
import { Badge,Toast } from 'antd-mobile'
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

class OrderDetail extends Component{
    state = {
        pageData: null, 
        cur_tag: 0,
        defaultSkuPrice:0,
        typeId:0,
        shoppingCartCount:0,
        logoPath:'',
        colorName:'',
        skuid:0,
    }
    //dom挂在完成请求数据
    async componentDidMount(){
        const {match:{params:{pid}}}  =this.props
        const res = await Service.getDetailById()
        const { data, code } = res
        if(code==='1111'){
            let colors =data.goodsTypeAttrList.filter(item=>item.attrName==='颜色')||[];
            colors=colors?colors[0].attrValList:[];
            let selectColorIdx=0;
            let selectColor='';
            colors.map((item,index)=>{
                if(item.selected===1){
                    selectColorIdx=index
                    selectColor=item.attrCode
                }
            })
            this.setState({
                cur_tag:selectColorIdx,
                pageData: {...data,colors:colors},
                defaultSkuPrice:this.toMoney(data.defaultSkuPrice),
                typeId:pid,
                title:data.title,
                logoPath:data.logoPath,
                colorName:selectColor,
                skuid:data.defaultSkuId})
        }
        // 查询购物车商品数量
        this.shoppingCart()
    }
    //选择颜色
    selectColor(color_id, idx,attrCode){
        const { form } = this.props
        this.queryPriceByGoodsColor(color_id)
        form.setFieldsValue({ color_id: color_id })
        this.setState({cur_tag: idx,colorName:attrCode}, () => {
            const { getFieldProps } = this.props.form
            const { onChange } = getFieldProps('color_id')
            onChange(color_id)
        })
    }
    // 点击颜色，查询该颜色属性对应的商品信息
    async queryPriceByGoodsColor(color_id) {
        const {data,code} = await Service.queryPriceByGoodsColor({typeId:1,attrList:[{attrId:1,attrValld:color_id}]})
        console.log('queryPriceByGoodsColor:data',data)
        if(code==='1111'){
            this.setState({
                defaultSkuPrice:this.toMoney(data.salePrice),
                skuid:data.id})
        }

    }
    // 金额转换
    toMoney(num){
        return (num/100).toFixed(2);
    }
    //立即购买
    sureBuy(){
        const { form,dispatch} = this.props
        const {color_id,num} = form.getFieldsValue()
        const {typeId,defaultSkuPrice,logoPath,colorName,title}=this.state
        dispatch({
            type:'orderDetail/submitOrder',
            payload:{
                typeId:typeId,
                colorId:color_id,
                goodsNum:num,
                defaultSkuPrice:defaultSkuPrice,
                logoPath:logoPath,
                colorName:colorName,
                title:title
            }
        })
        dispatch(routerRedux.push(`/order-sure/${this.state.typeId}`))
    }
    // 添加到购物车
    async addToShoppingCart(){
        const data={
            
        }
        const {code} = await ShoppingCartService.save(data);
        if (code==='1111'){
            this.setState((preState) => ({
                shoppingCartCount: preState.shoppingCartCount + 1
              }))
            Toast.success('添加购物车成功！',1)
        }
    }
    async shoppingCart(){
        const {data,code} = await ShoppingCartService.query({start:0})
        if (code==='1111'){
            this.setState({shoppingCartCount:data.length})
        }
    }
    render(){
        const { pageData, cur_tag,defaultSkuPrice,shoppingCartCount} = this.state
        const { logoPath,title,colors,goodsPicList } = pageData || {}
        
        const { getFieldProps } = this.props.form
        return (
            pageData?<Block bc='#fff' vf p={15} className={Styles.order_det_wrapper}>
                <Block h={250} vf className={Styles.pro_panel}>
                    <Block f={1} bc='#eee'><img src={logoPath} alt='商品logo'/></Block>
                    <Block p={20} vf>
                        <Block fs={16}>{title}</Block>
                        <Block className={Styles.money_color} fs={20} mt={10}>￥{defaultSkuPrice}</Block>
                    </Block>
                </Block>
                <Block pt={20} pb={13} fs={18}>颜色分类</Block>
                <Block wf>
                    {colors.map(({attrValId, attrCode}, idx) => (
                        <Block onClick={this.selectColor.bind(this, attrValId, idx,attrCode)} 
                            {...getFieldProps('color_id', {initialValue: 100})}
                            key={idx}  
                            mr={idx !=0 && idx%3 == 0?0:10}
                            className={cur_tag === idx?Styles.color_tag_select:Styles.color_tag}>
                            {attrCode}
                        </Block>
                    ))}
                </Block>
                <Block mt={20} a='c' wf>
                    <Block fs={18} f={1}>购买数量</Block>
                    <Stepper
                        style={{ width: '120px'}}
                        showNumber
                        {...getFieldProps('num', {initialValue: 1})}
                        max={10}
                        min={1}
                        defaultValue={1}
                    />
                </Block>
                <Block pt={20} pb={20} fs={18} style={{fontWeight: 'bold',}}>套餐详情</Block>
                <Block h={300} bc='#eee' mb={60}>
                    {
                        goodsPicList.map((item,index)=>(
                            <img key={index} src={item.picPath} alt={item.picName}/>
                        ))
                    }
                </Block>
                <Block wf fs={16} className={Styles.footer_bar}>
                    <Block a='c' j='c' w={60} vf>
                        <Block fs={12}>客服</Block>
                    </Block>
                    <Block a='c' j='c' w={60} vf>
                        <Block>
                        </Block>
                        <Block fs={12}><Badge text={shoppingCartCount}><span>购物车</span></Badge></Block>
                    </Block>
                    <Block wf f={1} ml={10} mr={10}>
                        <Block className={Styles.car_sty} f={1} onClick={this.addToShoppingCart.bind(this)}>加入购物车</Block>
                        <Block onClick={this.sureBuy.bind(this)} className={Styles.buy_sty} f={1}>立即购买</Block>
                    </Block>
                </Block>
            </Block>:null
        )
    }
}

export default connect(state=>state)(createForm()(OrderDetail))