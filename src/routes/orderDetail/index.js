import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Stepper } from 'antd-mobile'
import Service from '../../services/productService'
import { createForm } from 'rc-form'
import { Badge } from 'antd-mobile'

class OrderDetail extends Component{
    state = { pageData: null, cur_tag: 0,defaultSkuPrice:0}
    //dom挂在完成请求数据
    async componentDidMount(){
        const res = await Service.getDetailById()
        const { data, code } = res
        if(code==='1111'){
            const colors =data.goodsTypeAttrList.filter(item=>item.attrName==='颜色')||[]
            this.setState({ pageData: {...data,colors:colors?colors[0].attrValList:[]},defaultSkuPrice:data.defaultSkuPrice})
        }
    }
    //选择颜色
    selectColor(color_id, idx){
        const { form } = this.props
        this.queryPriceByGoodsColor(color_id)
        form.setFieldsValue({ color_id: color_id })
        this.setState({cur_tag: idx}, () => {
            const { getFieldProps } = this.props.form
            const { onChange } = getFieldProps('color_id')
            onChange(color_id)
        })
    }
    // 点击颜色，查询该颜色属性对应的商品信息
    async queryPriceByGoodsColor(color_id) {
        const {data,code} = await Service.queryPriceByGoodsColor({typeId:1,attrList:[{attrId:1,attrValld:color_id}]})
        if(code==='1111'){
            console.log('queryPriceByGoodsColor setState:',code)
            this.setState({defaultSkuPrice:data.salePrice})
        }

    }
    //立即购买
    sureBuy(){
        const { form } = this.props
        const values = form.getFieldsValue()
        
    }
    addToShoppingCart=()=>{
        console.log('add goods to shoopping cart!')
    }
    render(){
        const { pageData, cur_tag,defaultSkuPrice} = this.state
        const { logoPath,title,colors,goodsPicList } = pageData || {}
        
        const { getFieldProps } = this.props.form
        return (
            pageData?<Block vf p={15}>
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
                        <Block onClick={this.selectColor.bind(this, attrValId, idx)} 
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
                        <Block className={Styles.service_icon}></Block>
                        <Block fs={12}>购物车</Block>
                    </Block>
                    <Block a='c' j='c' w={60} vf>
                        <Block className={Styles.car_icon}></Block>
                        <Block fs={12}>购物车</Block>
                    </Block>
                    <Block wf f={1} ml={10} mr={10}>
                        <Block className={Styles.car_sty} f={1} onClick={this.addToShoppingCart}>加入购物车</Block>
                        <Block onClick={this.sureBuy.bind(this)} className={Styles.buy_sty} f={1}>立即购买</Block>
                    </Block>
                </Block>
            </Block>:null
        )
    }
}

export default createForm()(OrderDetail)