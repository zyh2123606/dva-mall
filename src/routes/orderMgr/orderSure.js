import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { List, Button, Modal, Picker,Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import {connect} from 'dva'
import UserService from '../../services/userSeervice'
import DeptService from '../../services/deptService'
import OrderService from '../../services/orderService'
import ShoppingCartService from '../../services/shoppingCartService'
import CollectInfoList from  './CollectInfoList'
import {routerRedux} from 'dva/router';
import Constant from '../../utils/constant';
/**
 *订单确认
 *
 * @class OrderSure
 * @extends {Component}
 */
const Item = List.Item
class OrderSure extends Component{
    state = {
        typeId:1,
        memId:1,
        orderDeptId:1,// 当前营业厅
        totalPrise:0,//总价格,
        shoppingcard:[],//购物车ID集合
        goodsList:[],// 购物车商品集合
        collectMode:2,//收货方式，shsm:送货上门，yytzt:营业厅自提
        reciveWay: [{label: '送货上门', value: 2},{label: '营业厅自提', value: 3}],
        collectUserInfo:[],//用户收货地址列表
        adoptDeptList:[],//自提营业厅列表
        collectAddress:{},//收货地址
        popVisible: false,
        selectAdoptIndex:0,
        selectedAdopt:{deptId:0,deptName:'',saleNum:0},//自提营业厅列表选中项
    }
    async componentDidMount(){
        this.queryGoodsdAndSkuInfo()
        this.queryCollectUserInfo()
        setTimeout(() => {
            this.queryAdoptDeptList()
        }, 1000);
    }
    async queryGoodsdAndSkuInfo(){
        let { match:{params:{shoppingcardId}},dispatch} = this.props
        if (shoppingcardId.length>1){
            shoppingcardId=shoppingcardId.split(',')
        }else{
            shoppingcardId=[Number.parseInt(shoppingcardId)]
        }
        const {data,code}=await ShoppingCartService.query({memId:1,cartIdList:shoppingcardId})
        if (code===Constant.responseOK){
            let totalPrise=0
            if(data && data.length===0){
                // TODO 这里应该跳转到购物车？个人中心？
                dispatch(routerRedux.push(`/order-detail/${this.state.typeId}`))
            }
            data.map(item=>{
                totalPrise+=(item.salePrice*item.amount)
            })
            console.log('queryGoodsdAndSkuInfo:',data)
            this.setState({
                totalPrise:totalPrise,
                goodsList:data
            })
        }
        this.setState({
            shoppingcard:shoppingcardId
        })
    }
    // 查询用户收货的地址列表
    async queryCollectUserInfo(){
        const {memId}=this.state
        const {code,data}=await UserService.getAddressList(memId);
        if (code===Constant.responseOK){
            this.setState({collectUserInfo:data})
        }
    }
    // 查询周边自提营业厅
    async queryAdoptDeptList(){
        const {goodsList,orderDeptId} = this.state
        // 因为有多个商品的情况，所以默认去第一个商品的skuID
        const {code,data}=await DeptService.getAdoptDeptList(goodsList[0].skuId,orderDeptId)
        if (code===Constant.responseOK && data){
            console.log('data',data)
            this.setState({adoptDeptList:data})
        }
    }

    //日期选择
    dateHandleChange = date => {
        const { getFieldProps } = this.props.form
        const { onChange } = getFieldProps('date')
        onChange(date)
    }
    // 选择收货方式，回调函数
    seletedOrderSureWrapper=(val)=>{
        if(val[0]===1001){
            // 送货上门
            this.setState({
                collectMode:val[0],
                selectedAdopt:{index:0,deptId:0,deptName:''}
            })
        }else{
            // 营业厅自提
            this.setState({
                collectMode:val[0],
                collectAddress:{}
            })
        }
    }
    // 选择自提营业厅，回调
    seletedAdoptDept=(val)=>{
        const {adoptDeptList}=this.state
        const seleted=adoptDeptList.filter(item=>item.value===val[0])
        console.log('....',seleted)
        if (seleted){
            this.setState({
                saleNum:seleted[0].saleNum
            })
        }
    }
    //提交订单
    async orderSubmit () {
        const {dispatch,match:{params:{shoppingcardId}}} = this.props
        const {memId,collectMode,selectedAdopt,collectAddress,shoppingcard}=this.state
        let params={
            cartIdList:shoppingcard,// 购物车ID集合
            memId:memId,// 用户ID
            dispatchWay:collectMode,// 送货方式
            deptId:1,//下单门店Id
            memo:'',//订单备注
            adoptDeptId:0,//自提门店ID
            addrId:0,//收货地址Id
        }
        if (collectMode===2){
            if(Object.getOwnPropertyNames(collectAddress).length===0){
                Toast.fail('请选择收货方式!', 1);
                return
            }
            // 送货上门
            params.addrId=collectAddress.id//收货地址Id
        }else{
            // 门店自提
            if(selectedAdopt.deptId===0){
                Toast.fail('请选择自提营业厅!', 1);
                return
            }

            if(selectedAdopt.saleNum===0){
                Toast.fail('当前门店该商品库存为0，请选择其他门店!', 1);
                return
            }
            params.adoptDeptId=selectedAdopt.deptId//自提门店ID
        }
        console.log('submit order params:',params)
        const {data,code}= await OrderService.addOrder({...params})
        if (code===Constant.responseOK){
            Toast.success('提交订单成功！',1)
            dispatch(routerRedux.push(`/order-complete/${data}/${shoppingcardId}`))
        }else{
            Toast.fail('提交订单失败！',1)
        }
    }
    // 金额转换
    toMoney(num){
        return num.toFixed(2);
    }
    // 确认选中自提地址
    confirmAdopt=()=>{
        const {selectAdoptIndex,adoptDeptList}=this.state
        const selected=adoptDeptList.filter((item,i)=>i===selectAdoptIndex)
        this.setState({
            popVisible: false,
            selectedAdopt:{
                deptId:selected[0].deptId,
                deptName:selected[0].deptName,
                saleNum:selected[0].saleNum
            }
        })
    }
    // 弹出选择自提营业厅列表
    openPopWin = () => {
        this.setState({popVisible: true})
    }
    // 关闭（取消）选择营业厅列表
    closePopWin = () => {
        this.setState({
            popVisible: false,
            selectedAdopt:{
                deptId:0,
                deptName:'',
                saleNum:0,
            }
        })
    }
    // 点击营业厅列表项
    selectAdoptItem(index,adoptItem){
        this.setState({
            selectAdoptIndex:index
        })
    }

    // 选择收货地址完成
    selectedCollectInfo=(data,index)=>{
        this.setState({
            collectAddress:data
        })
    }

    renderGoodsArray=()=>{
        console.log(this.state.goodsList)
        return (
            <Block>
                {
                    this.state.goodsList.map((item,index)=>{
                        const color = item.attrList.filter((i)=>i.baseAttrName==='颜色')
                        return <Block key={'goods-item-'+index} wf bc='#fff' p={15} mt={10}>
                                <Block className={Styles.prod_pic}>
                                    <img alt={item.goodsName} src={Constant.imgBaseUrl+item.logoPath} />
                                </Block>
                                <Block vf f={1} ml={15}>
                                    <Block style={{fontWeight: 'bold'}}>{item.goodsName}</Block>
                                    <Block fs={12} fc='#666'>{color?color[0].attrCode:'无'}</Block>
                                    <Block wf>
                                        <Block f={1}>×{item.amount}</Block>
                                        <Block className={Styles.orangeColor}>￥{item.salePrice}</Block>
                                    </Block>
                                </Block>
                            </Block>
                    })
                }
            </Block>
        )
    }

    renderCollectInfo(){
        const {selectedAdopt,collectMode,totalPrise,collectUserInfo}=this.state
        return (
                <List renderHeader='收货信息'>
                {
                    collectMode===3?
                    <Block>
                        <Item onClick={this.openPopWin} wrap arrow='horizontal' extra={selectedAdopt.deptName===''?'请选择':selectedAdopt.deptName}>推荐自提营业厅</Item>
                        <Item>
                            <Block wf>
                                <Block f={1}>门店库存量</Block>
                                <Block className={Styles.order_pop_wrap}>{selectedAdopt.saleNum}件
                                    <Block className={Styles.order_popover}>可以看看其他门店哦</Block>
                                    <i className={Styles.pop_arr}></i>
                                </Block>
                            </Block>
                        </Item>
                    </Block>:
                    <Item arrow='horizontal' multipleLine wrap>
                        {/* 选择收货地址 */}
                        <CollectInfoList 
                        data={collectUserInfo} 
                        selectedOk={this.selectedCollectInfo}/>
                    </Item>
                }
                    <Item extra={<Block className={Styles.orangeColor}>￥{totalPrise}</Block>}>商品金额</Item>
                </List>
        )
    }
    renderAdoptDept=()=>{
        const {adoptDeptList,selectAdoptIndex}=this.state
        return <Block className={Styles.pop_content} f={1}>
            {
                adoptDeptList.map((item,i)=>(
                    <Block key={'adopt-'+i} bc={selectAdoptIndex===i?'#FFF9F2':null} vf className={Styles.pop_item} onClick={this.selectAdoptItem.bind(this,i,item)}>
                        <Block style={{fontWeight: 'bold'}}>{item.deptName}</Block>
                        <Block mt={10} wf>
                            <Block f={1}>门店库存量</Block>
                            <Block>{item.saleNum}件</Block>
                        </Block>
                        <Block mt={5} wf>
                            <Block f={1}>{item.deptAddress}</Block>
                            <Block ml={10} wf a='c'>
                                <Block className={Styles.pos_icon}></Block>{item.sharePrice}km
                            </Block>
                        </Block>
                    </Block>
                ))
            }
        </Block>
    }
    render(){
        const { getFieldProps } = this.props.form
        const { reciveWay, popVisible,collectMode } = this.state
        return (
            <Block vf className={Styles.order_sure_wrapper}>
                <List>
                    <Picker
                        data={reciveWay}
                        cols={1}
                        value={collectMode}
                        onOk={this.seletedOrderSureWrapper}
                        {...getFieldProps('recive',{
                            initialValue:[reciveWay[0].value]
                        })}>
                        <Item arrow='horizontal' extra='请选择'>收货方式</Item>
                    </Picker>
                </List>
                {this.renderGoodsArray()}
                {this.renderCollectInfo()}
                <Block m={15} mt={20}>
                    <Button style={{borderRadius: 25}} type='primary' onClick={this.orderSubmit.bind(this)}>提交订单</Button>
                </Block>
                {/* 选择推荐营业厅 */}
                <Modal
                    popup
                    visible={popVisible}
                    animationType='slide-up'>
                    <Block vf className={Styles.pop_wrapper}>
                        <section className={Styles.pop_header}>
                            <Block wf>
                                <Block onClick={this.closePopWin} ml={15} fc='#999'>取消</Block>
                                <Block j='c' f={1}>选择自提营业厅</Block>
                                <Block onClick={this.confirmAdopt} mr={15} className={Styles.orangeColor}>确定</Block>
                            </Block>
                        </section>
                        {this.renderAdoptDept()}
                    </Block>
                </Modal>
            </Block>
        )
    }
}

function mapStateToProps(state){
    const {typeId,colorId,goodsNum,defaultSkuPrice,logoPath,colorName,title,skuid}=state.orderDetail
    return {typeId,colorId,goodsNum,defaultSkuPrice,logoPath,colorName,title,skuid}
}

const mainForm = createForm()(OrderSure)
export default connect(mapStateToProps)(mainForm)