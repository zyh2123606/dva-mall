import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { createForm } from 'rc-form'
import { SwipeAction, Icon, Stepper, Checkbox, Button,Toast,Modal } from 'antd-mobile'
import ShoppingCartService from '../../services/shoppingCartService'
import Constant from '../../utils/constant';
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
const alert = Modal.alert;
/**
 *购物车
 *
 * @class Cart
 * @extends {Component<IPropos>}
 */
interface IPropos{form: any,dispatch:any}
const CheckboxItem = Checkbox.CheckboxItem
class Cart extends Component<IPropos>{
    constructor(props: IPropos){
        super(props)
    }
    state={
        goodsList:[],// 购物车集合
        memId:1,// 用户ID
        totalPrise:0,// 总金额
        selectedCartId:new Set(),// 选中的购物车商品

    }
    async componentDidMount(){
        this.queryShoppingCart()
    }
    async queryShoppingCart(){
        const {data,code}=await ShoppingCartService.query({memId:this.state.memId})
        if (code===Constant.responseOK){
            this.setState({
                goodsList:data
            })
        }
    }
    delShopItem (record) {
        const {memId,}=this.state
        alert('删除', '确定删除该商品?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () =>this.delted(record.cartId)
            }
          ])
    }

    async delted(cartId){
        const {memId,}=this.state
        const {code,data}= await ShoppingCartService.delete(cartId,memId)
        if(code===Constant.responseOK){
            this.queryShoppingCart()
        }
    }

    async goodsCountChange(val,item){
        const {data,code}=await ShoppingCartService.save({
            id:item.cartId,
            memId:this.state.memId,
            skuId:item.skuId,
            amount:val

        })
        console.log('goodsCountChange....',code,data)
        if (code!=Constant.responseOK){
            Toast.fail('添加数量失败', 1);
        }else{
            this.queryShoppingCart()
            this.planTotalPrise()//重新计算一次金额
        }
    }
    // 取消选中购物车
    unChecked(index){
        let selectedCartId=this.state.selectedCartId;
        selectedCartId.delete(index)
        this.setState({selectedCartId:selectedCartId})
        this.planTotalPrise()
    }
    // 选中购物车
    checked(index){
        let selectedCartId=this.state.selectedCartId;
        selectedCartId.add(index)
        this.setState({selectedCartId:selectedCartId})
        this.planTotalPrise()
    }
    // 计算已选中的商品总金额
    async planTotalPrise(){
        const {selectedCartId,goodsList}=this.state
        let totalPrise=0;
        selectedCartId.forEach(element => {
            const selectd= goodsList.filter((item,index)=>index===element)
            if(selectd && selectd.length>0){
                selectd.map((sItem)=>{
                    totalPrise+=sItem.totalMoney
                })
            }
        });
        this.setState({
            totalPrise:totalPrise
        })
    }
    //选中全部购物车
    async selelctAll(e){
        let totalPrise=0;
        let selected=new Set()
        const {goodsList}=this.state
        if(e.target.checked){
            goodsList.map((item,index)=>{
                selected.add(index)
                totalPrise+=item.totalMoney
            })
            
        }
        this.setState({
            selectedCartId:selected,
            totalPrise:totalPrise
        })
    }
    settlement=()=>{
        const {selectedCartId,goodsList}=this.state
        const {dispatch} =this.props;
        if(selectedCartId.size<1){
            Toast.fail('未选中任何商品！',1)
            return
        }
        let shoppinCartIdStr=''
        let index=0
        selectedCartId.forEach(item=>{
            goodsList.map((v,i)=>{
                if(item===i){
                    if(selectedCartId.size===1 || index===(selectedCartId.size-1)){
                        shoppinCartIdStr+=(v.cartId)
                    }else{
                        shoppinCartIdStr+=(v.cartId+',')
                    }   
                }
            })
            index++
        })
        if(shoppinCartIdStr.length>0){
            console.log(`shoppinCartIdStr:${shoppinCartIdStr}`)
            dispatch(routerRedux.push({
                pathname:`/order-sure/${shoppinCartIdStr}`
            }));
        }
    }
    renderCartItem=()=>{
        const {goodsList,selectedCartId,totalPrise} =this.state
        return <Block>
            {
                goodsList.map((item,index)=>{
                    const selectd=selectedCartId.has(index)
                    return (
                        <Block key={'cart-item-'+index} wf className={Styles.shop_panel}>
                            <SwipeAction autoClose right={[
                                {text: '删除', onPress: this.delShopItem.bind(this,item), style: {
                                    background: '#FD5563', 
                                    padding: '0 10px', 
                                    color: '#fff',
                                    borderRadius: '0 5px 5px 0'}}
                                ]}>
                                <Block wf pt={10} pb={10}>
                                    
                                    {
                                        selectd?(
                                            <Block j='c' m='30px 10px 5px 10px' onClick={this.unChecked.bind(this,index)}>
                                                <Block a='c' j='c' className={Styles.current_checked}>
                                                    <Icon color='#FF8E44' type='check-circle' />
                                                </Block>
                                            </Block>
                                            
                                        
                                        ):<Block j='c' m='30px 10px 5px 10px' onClick={this.checked.bind(this,index)}><Block className={Styles.custom_check}></Block></Block>
                                    }
                                    <Block className={Styles.prod_pic}><img src={Constant.imgBaseUrl+item.logoPath} alt={item.goodsName}/></Block>
                                    <Block vf f={1} ml={10}>
                                        <Block fs={14}>{item.goodsName}</Block>
                                        <Block mt={5}>
                                            {
                                                item.attrList.map((subItem,subIndex)=>{
                                                    return <Block key={'attr-item-index-'+subIndex} className={Styles.prod_tag}>{subItem.attrCode}</Block>
                                                })
                                            }
                                        </Block>
                                        <Block wf a='c'>
                                            <Block f={1} className={Styles.orangeColor}>￥{item.salePrice}</Block>
                                            <Block mr={10}>
                                                <Stepper
                                                    style={{ width: '100%', minWidth: '100px' }}
                                                    showNumber
                                                    max={10}
                                                    min={1}
                                                    onChange={(val)=>this.goodsCountChange(val,item)}
                                                    defaultValue={item.amount}
                                                />
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                            </SwipeAction>
                        </Block>
                    )
                })
            }
        </Block>
    }
    public render(){
        const { getFieldProps } = this.props.form
        let {goodsList,selectedCartId,totalPrise} =this.state
        if(!goodsList){
            goodsList=[]
        }
        return (
            <Block vf className={Styles.cart_container}>
                <Block className={Styles.cart_content}>
                    {this.renderCartItem()}
                </Block>
                
                
                {/* footer */}
                <Block className={Styles.footer_bar}>
                    <Block a='c' wf className={Styles.footer_content}>
                        <Block f={1}>
                            <CheckboxItem onChange={this.selelctAll.bind(this)}>全部</CheckboxItem>
                        </Block>
                        <Block a='c' wf>
                            <Block wf fs={17} mr={10}>合计：
                                <Block className={Styles.orangeColor}>￥{totalPrise}</Block>
                            </Block>
                            <Button type='primary' className={Styles.pay_btn} onClick={this.settlement}>结算({selectedCartId.size})</Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        )
    }
}

const mainForm = createForm()(Cart)
export default connect()(mainForm)