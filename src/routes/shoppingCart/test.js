import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { createForm } from 'rc-form'
import { SwipeAction, Icon, Stepper, Checkbox, Button } from 'antd-mobile'

/**
 *购物车
 *
 * @class Cart
 * @extends {Component<IPropos>}
 */
interface IPropos{form: any}
const CheckboxItem = Checkbox.CheckboxItem
class Cart extends Component<IPropos>{
    constructor(props: IPropos){
        super(props)
    }
    state={
        goodsList:[],
        memId:1,

    }
    private delShopItem = (record: object, idx: number) => {

    }
    async componentDidMount(){
        const {data,code}=await ShoppingCartService.query({memId:this.state.memId})
        if (code===Constant.responseOK){
            let totalPrise=0
            data.map(item=>{
                totalPrise+=(item.salePrice*item.amount)
            })
            this.setState({
                totalPrise:totalPrise,
                goodsList:data
            })
        }
    }
    goodsCountChange=(val,item)=>{
        const {data,code}=ShoppingCartService.save({
            id:item.cartId,
            memId:this.state.memId,
            skuId:item.skuId,
            amount:val

        })
        if (code!=Constant.responseOK){
            Toast.fail('添加数量失败', 1);
        }
    }
    public render(){
        const { getFieldProps } = this.props.form
        const {goodsList} =this.state
        return (
            <Block vf className={Styles.cart_container}>
                <Block className={Styles.cart_content}>
                    <Block wf className={Styles.shop_panel}>
                        <SwipeAction autoClose right={[
                            {text: '删除', onPress: this.delShopItem, style: {
                                background: '#FD5563', 
                                padding: '0 10px', 
                                color: '#fff',
                                borderRadius: '0 5px 5px 0'}}
                            ]}>
                            <Block wf pt={10} pb={10}>
                                <Block j='c' m='30px 10px 5px 10px'>
                                    <Block className={Styles.custom_check}></Block>
                                </Block>
                                <Block className={Styles.prod_pic}></Block>
                                <Block vf f={1} ml={10}>
                                    <Block fs={14}>小米 红米Note5  64G红色全网联通4G手机 双卡双待</Block>
                                    <Block mt={5}>
                                        <Block className={Styles.prod_tag}>64G</Block>
                                        <Block className={Styles.prod_tag}>黑色</Block>
                                    </Block>
                                    <Block wf a='c'>
                                        <Block f={1} className={Styles.orangeColor}>￥2799.00</Block>
                                        <Block mr={10}>
                                            <Stepper
                                                style={{ width: '100%', minWidth: '100px' }}
                                                showNumber
                                                max={10}
                                                min={1}
                                                defaultValue={1}
                                            />
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                        </SwipeAction>
                    </Block>
                    <Block wf className={Styles.shop_panel}>
                        <SwipeAction autoClose right={[
                            {text: '删除', onPress: this.delShopItem, style: {
                                background: '#FD5563', 
                                padding: '0 10px', 
                                color: '#fff',
                                borderRadius: '0 5px 5px 0'}}
                            ]}>
                            <Block wf pt={10} pb={10}>
                                <Block j='c' m='30px 10px 5px 10px'>
                                    <Block a='c' j='c' className={Styles.current_checked}>
                                        <Icon color='#FF8E44' type='check-circle' />
                                    </Block>
                                </Block>
                                <Block className={Styles.prod_pic}></Block>
                                <Block vf f={1} ml={10}>
                                    <Block fs={14}>小米 红米Note5  64G红色全网联通4G手机 双卡双待</Block>
                                    <Block mt={5}>
                                        <Block className={Styles.prod_tag}>64G</Block>
                                        <Block className={Styles.prod_tag}>黑色</Block>
                                    </Block>
                                    <Block wf a='c'>
                                        <Block f={1} className={Styles.orangeColor}>￥2799.00</Block>
                                        <Block mr={10}>
                                            <Stepper
                                                style={{ width: '100%', minWidth: '100px' }}
                                                showNumber
                                                max={10}
                                                min={1}
                                                defaultValue={1}
                                            />
                                        </Block>
                                    </Block>
                                </Block>
                            </Block>
                        </SwipeAction>
                    </Block>
                </Block>
                {/* footer */}
                <Block className={Styles.footer_bar}>
                    <Block a='c' wf className={Styles.footer_content}>
                        <Block f={1}>
                            <CheckboxItem>全部</CheckboxItem>
                        </Block>
                        <Block a='c' wf>
                            <Block wf fs={17} mr={10}>合计：
                                <Block className={Styles.orangeColor}>￥7990.00</Block>
                            </Block>
                            <Button type='primary' className={Styles.pay_btn}>结算(1)</Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        )
    }
}

const mainForm = createForm()(Cart)
export default mainForm