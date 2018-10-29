import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { createForm } from 'rc-form'
import { SwipeAction, Icon, Stepper, Checkbox, Button,Toast,Modal } from 'antd-mobile'
import ShoppingCartService from '../../services/shoppingCartService'
import Constant from '../../utils/constant'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import ImgErr from '../../assets/img/img_error.png'
import qs from 'qs'

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
    componentWillMount(){
        document.title = '购物车'
    }
    state={
        goodsList:[],// 购物车集合
        memId:1,// 用户ID
        totalPrise:0,// 总金额
        selectedCarts:new Map(),// 选中的购物车商品
    }
    async componentDidMount(){
        this.queryShoppingCart()
    }
    async queryShoppingCart(){
        const { match:{params:{sessionId,memId}},location} = this.props
        const { accountId,deptId } = qs.parse(location.search.split('?')[1])
        const {RESP_CODE,DATA}=await new ShoppingCartService({sessionId,memId}).query({
            DATA:{
                currentPage:0,
                countPerPage:100

            },
            accountId:accountId,
            deptId:deptId

        })
        if (RESP_CODE===Constant.responseOK){
            let selectedCarts=this.state.selectedCarts
            let carts=new Map()
            let totalPrise=0;
            DATA.map(item=>{
                if(selectedCarts.has(item.cartId)){
                    carts.set(item.cartId,item)
                    totalPrise+=(item.salePrice.toFixed(2)*item.goodsTotal.toFixed(2))
                }
            })
            this.setState({
                goodsList:DATA,
                selectedCarts:carts,
                totalPrise:totalPrise.toFixed(2)
            })
        }
    }
    delShopItem (record) {
        alert('删除', '确定删除该商品?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () =>this.delted(record.cartId)
            }
          ])
    }

    async delted(cartId){
        const { match:{params:{sessionId,memId}},location} = this.props
        const { accountId,deptId } = qs.parse(location.search.split('?')[1])
        const {RESP_CODE}= await new ShoppingCartService({sessionId,memId}).delete({
            DATA:{
                cartId:cartId
            },
            accountId:accountId
            deptId:deptId

        })
        if(RESP_CODE===Constant.responseOK){
            this.queryShoppingCart()
        }
    }

    async goodsCountChange(val,item){
        const { match:{params:{sessionId,memId}},location} = this.props
        const { accountId,deptId } = qs.parse(location.search.split('?')[1])
        const {RESP_CODE}=await new ShoppingCartService({sessionId,memId}).save({
            DATA:{
                cartId:item.cartId,
                goodsTotal:val,
                skuId:item.skuId
            },
            accountId:accountId,
            deptId:deptId


        })
        if (RESP_CODE!=Constant.responseOK){
            Toast.fail('修改数量失败', 1);
        }else{
            let selectedCarts=this.state.selectedCarts
            if(selectedCarts.has(item.cartId)){
                item.goodsTotal=val
                selectedCarts.set(item.cartId,item)
            }
            setTimeout(() => {
                this.planTotalPrise()//重新计算一次金额
            }, 200);
        }
    }
    // 取消选中购物车
    unChecked(item){
        let selectedCarts=this.state.selectedCarts;
        if(selectedCarts.has(item.cartId)){
            selectedCarts.delete(item.cartId)
        }
        this.setState({selectedCarts:selectedCarts})
        this.planTotalPrise()
    }
    // 选中购物车
    checked(item){
        let selectedCarts=this.state.selectedCarts;
        selectedCarts.set(item.cartId,item)
        this.setState({selectedCarts:selectedCarts})
        this.planTotalPrise()
    }
    // 计算已选中的商品总金额
    planTotalPrise(){
        setTimeout(() => {
            const {selectedCarts,goodsList}=this.state
            let totalPrise=0;
            for (let [key, value] of selectedCarts) {
                totalPrise+=(value.salePrice.toFixed(2)*value.goodsTotal.toFixed(2))
            }
            if (selectedCarts.size===0){
                totalPrise=0
            }
            this.setState({
                totalPrise:totalPrise.toFixed(2)
            })
        }, 300);
    }
    //选中全部购物车
    async selelctAll(e){
        let totalPrise=0;
        let selected=new Map()
        const {goodsList}=this.state
        if(e.target.checked){
            goodsList.map((item,index)=>{
                selected.set(item.cartId,item)
                totalPrise+=(item.salePrice.toFixed(2) * item.goodsTotal.toFixed(2))
            })
            
        }

        console.log(totalPrise.toFixed(2))
        this.setState({
            selectedCarts:selected,
            totalPrise:totalPrise>0?totalPrise.toFixed(2):0
        })
    }
    settlement=()=>{
        const { match:{params:{sessionId,memId}},location} = this.props
        const { accountId,deptId } = qs.parse(location.search.split('?')[1])
        const {selectedCarts,goodsList}=this.state
        if(selectedCarts.size<1){
            Toast.fail('未选中任何商品！',1)
            return
        }
        let shoppinCartIdStr=''
        let index=0
        for (let [key, value] of selectedCarts) {
            if(selectedCarts.size===1 || index===(selectedCarts.size-1)){
                shoppinCartIdStr+=(value.cartId)
            }else{
                shoppinCartIdStr+=(value.cartId + ',')
            }
            index++
        }
        if(shoppinCartIdStr.length>0){
            // console.log(`shoppinCartIdStr:${shoppinCartIdStr}`)
            // wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/order-sure/${shoppinCartIdStr}/${sessionId}/${memId}`})
            this.props.history.push(`/order-sure?cartIds=${shoppinCartIdStr}&accountId=${accountId}&deptId=${deptId}`)
        }
    }
    renderCartItem=()=>{
        const {goodsList,selectedCarts,totalPrise} =this.state
        return <Block>
            {
                goodsList.map((item,index)=>{
                    const selectd=selectedCarts.has(item.cartId)
                    return (
                        <Block key={'cart-item-'+index} vf className={Styles.shop_panel}>
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
                                            <Block j='c' m='30px 10px 5px 10px' onClick={this.unChecked.bind(this,item)}>
                                                <Block a='c' j='c' className={Styles.current_checked}>
                                                    <Icon color='#FF8E44' type='check-circle' />
                                                </Block>
                                            </Block>
                                        
                                        ):<Block j='c' m='30px 10px 5px 10px' onClick={this.checked.bind(this,item)}><Block className={Styles.custom_check}></Block></Block>
                                    }
                                    <Block className={Styles.prod_pic}>
                                        <img style={{width:'76px', borderRadius: 4}} src={item.goodsImg?Constant.imgBaseUrl+item.goodsImg:ImgErr} alt={item.typeName}/>
                                        </Block>
                                    <Block vf f={1} ml={10}>
                                        <Block fs={14}>{item.typeName}</Block>
                                        <Block mt={5}>
                                            <Block className={Styles.prod_tag}>{item.attrNames}</Block>
                                        </Block>
                                        <Block wf a='c' mt={5}>
                                            <Block f={1} className={Styles.orangeColor}>￥{item.salePrice}</Block>
                                            <Block mr={10}>
                                                <Stepper
                                                    style={{ width: '100%', minWidth: '100px' }}
                                                    showNumber
                                                    max={10}
                                                    min={1}
                                                    onChange={(val)=>this.goodsCountChange(val,item)}
                                                    defaultValue={item.goodsTotal}
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
        let {goodsList,selectedCarts,totalPrise} =this.state
        if(!goodsList){
            goodsList=[]
        }
        return (
            <Block vf className={Styles.cart_container}>
                <Block className={Styles.cart_content} f={1} style={{marginBottom:'50px'}}>
                    {this.renderCartItem()}
                </Block>
                {/* footer */}
                <Block className={Styles.footer_bar} style={{marginBottom:'50px'}}>
                    <Block a='c' wf className={Styles.footer_content}>
                        <Block f={1}>
                            <CheckboxItem onChange={this.selelctAll.bind(this)}>全部</CheckboxItem>
                        </Block>
                        <Block a='c' wf>
                            <Block wf fs={17} mr={10}>合计：
                                <Block className={Styles.orangeColor}>￥{totalPrise}</Block>
                            </Block>
                            <Button type='primary' className={Styles.pay_btn} onClick={this.settlement}>结算({selectedCarts.size})</Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        )
    }
}

const mainForm = createForm()(Cart)
export default connect()(mainForm)