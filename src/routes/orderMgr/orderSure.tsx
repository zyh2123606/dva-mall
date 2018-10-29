import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { List, Button, Modal, Picker,Toast,InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import {connect} from 'dva'
import UserService from '../../services/userSeervice'
import DeptService from '../../services/deptService'
import OrderService from '../../services/orderService'
import Service from '../../services/productService'
import ShoppingCartService from '../../services/shoppingCartService'
import CollectInfoList from  './CollectInfoList'
import Constant from '../../utils/constant'
import HonbaoImage from '../../assets/img/hongbao@2x.png'
import uncheck from '../../assets/img/uncheck.png'
import checked from '../../assets/img/checked.png'
import qs from 'qs'
const alert = Modal.alert;
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
        totalPrise:0,//总价格,
        shoppingcard:[],//购物车ID集合
        goodsList:[],// 购物车商品集合
        collectMode:null,//收货方式:1、无配送，2、快递，3、上门自提
        reciveWay: [{label: '送货上门', value: 2},{label: '营业厅自提', value: 3}],
        adoptDeptList:[],//自提营业厅列表
        collectAddress:null,//收货地址
        popVisible: false,
        selectAdoptIndex:0,
        selectedAdopt:{deptId:0,deptName:'',saleNum:0},//自提营业厅列表选中项

        timePopVisible:false,// 选择自提时间是否显示
        adoptTimes:[
            {label:'1月10日（周1）',value:'1'},
            {label:'1月11日（周2）',value:'2'},
            {label:'1月12日（周3）',value:'3'},
            {label:'1月13日（周4）',value:'4'},
            {label:'1月14日（周5）',value:'5'},
        ],

        // 自提时间
        adoptTimeSelect:null,

        honbaoPopVisible:false,//红包选择
        
        isCheckedJifen:false,//是否使用积分
        honbaoSelect:null,// 当前选中红包
        honbaos:[
            {
                id:1,
                amount:5,
                conition:20,// 使用条件
                overdueTime:'2018-1-10'// 到期时间
            },
            {
                id:2,
                amount:2,
                conition:15,// 使用条件
                overdueTime:'2018-1-10'// 到期时间
            }
        ],

        fapiaoPopVisible:false,//发票选择
        invoiceType:[],// 可选择开发票形式
        selectInvoiceType:null,// 当前选中开发票形式
        invTitle:'',//发票抬头
        unitInoutShow:false,// 单位信息输入框控制
        fapiaoSelect:null,//选中开发票模式
        fapiaoContentSelect:'商品明细',// 发票内容选择
        inputAble:true,// 选中不开发票时，隐藏所有操作
    }
    async componentDidMount(){
        document.title='订单确认'
        const {location}  =this.props
        const { num,skuId,typeId,cartIds,deptId,accountId } = qs.parse(location.search.split('?')[1])
        let goodsList=[]
        if(num && skuId &&typeId ){// 判断是否是从商品详情页面进入
            const {RESP_CODE,DATA}=await new Service(1,15).getGoodsDetai({
                deptId:deptId,
                accountId:accountId,
                DATA:{
                    typeId:typeId,
                    skuId:skuId
                }
            })
            if(RESP_CODE==Constant.responseOK && DATA){
                console.log(DATA)
                goodsList.push({
                    goodsImg:DATA.goodsImg,
                    salePrice:DATA.salePrice,
                    goodsTotal:parseInt(num),
                    cartId:null,
                    typeName:DATA.goodsName,
                    attrNames:DATA.attrNames,
                    skuId:DATA.skuId,
                })
            }
        }else{// 判断为从购物车进入页面
            const shoppingCartService = new ShoppingCartService(1,15)
            const {RESP_CODE,DATA} = await shoppingCartService.query({
                DATA:{
                    currentPage:1,
                    countPerPage:100,
                },
                accountId:accountId,
                deptId:deptId,
            })
            if (RESP_CODE===Constant.responseOK){
                let idArray=[]
                let sss=''
                if(cartIds && cartIds.indexOf(',')){
                    idArray=cartIds.split(',')
                }else{
                    idArray.push(cartIds)
                }
                console.log(idArray)
                if(DATA && DATA.length>0){
                    console.log(DATA)
                    idArray.map(item=>{
                        const selectCart=DATA.filter(v=>parseInt(v.cartId)===parseInt(item))
                        if(selectCart &&selectCart.length>0){
                            goodsList.push(selectCart[0])
                        }
                    })
                }
            }
        }
        let totalPrise=0
        goodsList.map(item=>{
            totalPrise+=(item.salePrice.toFixed(2)*item.goodsTotal.toFixed(2)||0)
        })
        this.setState({
            goodsList:goodsList,
            totalPrise:totalPrise.toFixed(2)
        })
    }

    //日期选择
    dateHandleChange = date => {
        const { getFieldProps } = this.props.form
        const { onChange } = getFieldProps('date')
        onChange(date)
    }
    // 选择收货方式，回调函数
    seletedOrderSureWrapper=(val)=>{
        this.setState({collectMode:val[0]})
    }
    // 选择自提营业厅，回调
    seletedAdoptDept=(val)=>{
        const {adoptDeptList}=this.state
        const seleted=adoptDeptList.filter(item=>item.value===val[0])
        if (seleted){
            this.setState({
                saleNum:seleted[0].saleNum
            })
        }
    }
    //提交订单
    async orderSubmit () {
        const {match:{params:{sessionId,memId}},form,location} = this.props
        const { deptId,accountId } = qs.parse(location.search.split('?')[1])
        const {collectMode,goodsList,collectAddress,shoppingcard,totalPrise,fapiaoContentSelect,selectInvoiceType,invTitle,fapiaoSelect,adoptTimeSelect}=this.state
        let params={
            deptId:258,
            accountId:9,
            DATA:{
                memDiscount:'',
                ticketNum:'',
                ticketCode:'',
                pointMoney:'',
                saleOrderInfo:{//销售单信息
                    totalPrice:totalPrise,
                    balaMoney:totalPrise,
                    actualMoney:totalPrise,
                    goodsDesc:null,
                    goodsMemo:null,
                    feeMoney:null,
                    dispatchWay:collectMode,//配送方式
                    addrId:null,
                    dispatchDate:null,
                    memId:''// 会员

                },
                saleStoreGoods:[],//内容描述
                // storeOrderInvoice:{}//开票信息
            },
            
        }
        if(!collectMode){
            Toast.fail('请选择收货方式', 1);
            return
        }else{

            if(parseInt(collectMode)===2){
                console.log(collectAddress)
                if(!collectAddress){
                    Toast.fail('请选择收货地址', 1);
                    return
                }
                params.DATA.saleOrderInfo.addrId=collectAddress.addrId
            }
            if(parseInt(collectMode)===3){
                if(!adoptTimeSelect){
                    Toast.fail('请选择自提时间', 1);
                    return
                }
                params.DATA.saleOrderInfo.dispatchDate=adoptTimeSelect
               
            }
        }
        
        goodsList.map(item=>{
            params.DATA.saleStoreGoods.push({
                goodsName:item.typeName,
                salePrice:item.salePrice,
                goodsNum:item.goodsTotal,
                skuId:item.skuId
                cartId:item.cartId  
            })
        })

        //开票判断，如果选择了开票，则必填
        if(fapiaoContentSelect==='商品明细'){
            if(selectInvoiceType && invTitle){
                const {company,taxpayerCode,email} = form.getFieldsValue()
                params.DATA.storeOrderInvoice={
                    invType:selectInvoiceType,
                    invTitle:invTitle===1?'个人':'公司',
                    invContent:fapiaoContentSelect,
                    identNum:taxpayerCode||invTitle,
                    invEmail:email,
                    titleType:invTitle

                }
            }
        }
        
        const {RESP_CODE,DATA}= await new OrderService({sessionId,memId}).addOrder(params)
        if (RESP_CODE===Constant.responseOK){
            Toast.success('提交的名单成功！',2)
            setTimeout(() => {
                // wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/cnc/#/order-complete/orderNum=${DATA.orderNum}/orderId=${DATA.orderId}/deptId=${258}/accountId=${9}`})
        const { deptId,accountId } = qs.parse(location.search.split('?')[1])
                this.props.history.push(`/order-complete?orderNum=${DATA.orderNum}&orderId=${DATA.orderId}&deptId=${deptId}&accountId=${accountId}`)
            }, 1000);
        }
    }
   
    // 确认选中自提地址
    confirmAdopt=()=>{
        const {selectAdoptIndex,adoptDeptList}=this.state
        const selected=adoptDeptList.filter((item,i)=>i===selectAdoptIndex)
        console.log('确认选中自提地址:',selected[0])
        this.setState({
            popVisible: false,
            selectedAdopt:{
                deptId:selected[0].id,
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

    //--------------------------------------------------------------------------------发票相关
    // 选中开票类型
    selectInvoic(selectItem){
        this.setState({selectInvoiceType:selectItem})
    }
    // 选中发票抬头类型
    selectInvTitle(invTitle){
       let unitInoutShow=false
        if(invTitle===2){
            unitInoutShow=true
        }
        this.setState({invTitle:parseInt(invTitle),unitInoutShow:unitInoutShow})
    }
    // 选中发票内容项
    setFapiaoContent(content){
        let fapiaoPopVisible=true
        let inputAble=true
        if(content==='不开发票'){
            fapiaoPopVisible=false
            inputAble=false
        }
        this.setState({
            fapiaoPopVisible:fapiaoPopVisible,
            inputAble:inputAble,
            fapiaoContentSelect:content
        })
    }
    selectFapiao=()=>{
        const {company,taxpayerCode,email} = this.props.form.getFieldsValue()
        const {selectInvoiceType,invTitle,fapiaoSelect,fapiaoContentSelect}=this.state
        if(fapiaoContentSelect==='商品明细'){
            if(!selectInvoiceType){
                Toast.fail('请选择发票类型', 1);
                return
            }
            if(!invTitle){
                Toast.fail('请选择发票抬头', 1);
                return
            }
            if(invTitle===2){
                if(!company){
                    Toast.fail('请填写公司名称', 1);
                    return
                }
                if(!taxpayerCode){
                    Toast.fail('请填写纳税人标识号', 1);
                    return
                }
            }
            if(!email){
                Toast.fail('请填写电子邮箱', 1);
                return
            }
        }
        this.setState({fapiaoPopVisible:false})
    }
    //--------------------------------------------------------------------------------红包相关
    queryRedTicket=async()=>{
        // const {RESP_CODE,DATA}=await new UserService(1,15).queryRedTicket({
        //     DATA:{

        //     },
        //     accountId:9,
        //     deptId:258,

        // })
    }
    //--------------------------------------------------------------------------------积分相关
    async queryMember(){
        const {RESP_CODE,DATA}=await new UserService(1,15).queryMember({
            DATA:{

            },
            accountId:9,
            deptId:258,
        })
    }
    // 自提时间选择列表
    renderrAdoptTime=()=>{
        const {adoptTimes,adoptTimeSelect}=this.state
        const selectStyle={
            backgroundColor:'#FFF9F2',
            color:'#FF5A60',
            borderRadius:'5px',
        }
        const unSelectStyle={
            backgroundColor:'rgb(172, 167, 167)',
            borderRadius:'5px',
        }

        const potinselect={
            backgroundColor:'#FF5A60',
            borderRadius:'5px',
        }
        let days=Constant.getWeekDays()
        return (
            <Block className={Styles.pop_content}>
                {
                   days.map((item,index)=>{
                        let isSelect=false
                        if(adoptTimeSelect && adoptTimeSelect===item){
                            isSelect=true
                        }
                        return <Block ml={5} mr={5} mt={2} wf f={1} bc={isSelect?'#FFF9F2':'#F4F7FB'} onClick={()=>this.setState({adoptTimeSelect:item})} key={'adopt-time-'+index} style={isSelect?selectStyle:null} className={Styles.pop_item}>
                                <Block f={1}>{item}</Block>
                                <Block a='c' j='c'><Block h={10} w={10} style={isSelect?potinselect:unSelectStyle}></Block></Block>
                            </Block>
                    })
                }
            </Block>
        )
    }

    // 商品列表
    renderGoodsArray=()=>{
        return (
            <Block>
                {
                    this.state.goodsList.map((item,index)=>{
                        return <Block key={'goods-item-'+index} wf bc='#fff' p={15} mt={10}>
                                <Block className={Styles.prod_pic}>
                                    <img alt={item.typeName} src={Constant.imgBaseUrl+item.goodsImg} />
                                </Block>
                                <Block vf f={1} ml={15}>
                                    <Block style={{fontWeight: 'bold'}}>{item.typeName}</Block>
                                    <Block fs={12} fc='#666'>{item.attrNames}</Block>
                                    <Block wf>
                                        <Block f={1}>×{item.goodsTotal}</Block>
                                        <Block className={Styles.orangeColor}>￥{item.salePrice}</Block>
                                    </Block>
                                </Block>
                            </Block>
                    })
                }
            </Block>
        )
    }

    //收货地址列表
    renderCollectInfo(){
        const {adoptTimeSelect,reciveWay,collectMode,totalPrise,isCheckedJifen,fapiaoContentSelect,selectInvoiceType}=this.state
        const {match:{params:{sessionId,memId}},history,form:{getFieldProps}} = this.props
        return (
            <Block>

                    <List renderHeader={<Block fs={18} style={{color:'#000',fontWeight: 'bold'}}>收货信息</Block>}>
                        <Picker
                                data={reciveWay}
                                cols={1}
                                value={collectMode}
                                onOk={this.seletedOrderSureWrapper}
                                {...getFieldProps('recive')}>
                                <Item arrow='horizontal' extra='请选择'>收货方式</Item>
                            </Picker>
                {
                    parseInt(collectMode)===3?
                    <Block>
                        <Item onClick={()=>this.setState({timePopVisible:true})} wrap arrow='horizontal' extra={adoptTimeSelect?adoptTimeSelect:'请选择'}>自提时间</Item>
                    </Block>:
                    <Item arrow='horizontal' multipleLine wrap>
                        {/* 选择收货地址 */}
                        <CollectInfoList 
                        memId={memId}
                        history={history}
                        sessionId={sessionId}
                        selectedOk={this.selectedCollectInfo}/>
                    </Item>
                }
                    
                    
                </List>

                 <List renderHeader={<Block fs={18} style={{color:'#000',fontWeight: 'bold'}}>开具发票</Block>}>
                    <Item onClick={()=>this.setState({fapiaoPopVisible:true})} 
                    arrow='horizontal' extra={fapiaoContentSelect==='商品明细'&&selectInvoiceType?(selectInvoiceType===1?'普通纸质发票':'普通电子发票'):'不开发票' }
                    >选择发票</Item>
                 </List>
                {/* <List renderHeader={<Block fs={18} style={{color:'#000',fontWeight: 'bold'}}>会员信息</Block>}>
                    <Item onClick={()=>this.setState({honbaoPopVisible:true})} wrap arrow='horizontal' extra={'请选择'}>红包</Item>
                    <Item wrap extra={
                        <Block hf onClick={()=>this.setState({isCheckedJifen:!isCheckedJifen})}>
                            <Block f={1}>共12345积分，可抵扣12元</Block>
                            <Block><img style={{height:'20px',width:'20px'}} src={isCheckedJifen?checked:uncheck}/></Block>
                        </Block>
                        }>积分</Item>
                </List> */}

                <List renderHeader={<Block fs={18} style={{color:'#000',fontWeight: 'bold'}}>总金额</Block>}>
                    <Item extra={<Block className={Styles.orangeColor}>￥{totalPrise}</Block>}>商品金额</Item>
                    {/* <Item extra={<Block className={Styles.orangeColor}>￥{Constant.toMoney(totalPrise)}</Block>}>红包抵扣</Item>
                    <Item extra={<Block className={Styles.orangeColor}>￥{Constant.toMoney(totalPrise)}</Block>}>积分抵扣</Item> */}
                    <Item extra={<Block className={Styles.orangeColor}>￥{totalPrise}</Block>}>总金额</Item>
                </List>
                </Block>
        )
    }

    //红包选择
    rendeHonbao=()=>{
        const {honbaos,honbaoSelect}=this.state
        return(
            <Block className={Styles.pop_content}>
                {
                     honbaos && honbaos.length>0?honbaos.map((item,index)=>{
                         return <Block style={{backgroundImage:`url(${HonbaoImage})`}} ml={10} mr={10} mt={10} wf f={1} onClick={()=>this.setState({honbaoSelect:item})} key={'hb-'+index} className={Styles.pop_item_honbao}>
                            <Block f={3} fs={20} a='c' j='c' style={{color:'#fff',fontWeight: 'bold'}}>￥5 </Block>
                            <Block f={4} mt={10} vf pt={10} pl={10}>
                                <Block fs={15} style={{fontWeight: 'bold'}}>满20可以使用</Block>
                                <Block mt={10} fs={12} style={{color:'#CCCCCC'}}>2018-1-10 到期</Block>
                            </Block>
                            <Block w={80} a='c' j='c'>
                                <Block f={1} a='c' j='c' className={Styles.peceive}>立即使用</Block>
                            </Block>
                         </Block>
                    }):null
                }
            </Block>
        )
    }

    // 开具发票页面
    renderFapiaoWindow=()=>{
        const {unitInoutShow,selectInvoiceType,invTitle,fapiaoContentSelect,inputAble}=this.state
        const {getFieldProps}=this.props.form
        let selected=true
        return (
            <Block className={Styles.order_det_wrapper} bc='#fff' vf  p={15}>
                <Block vf p={15} f={1}>
                    <Block vf>
                        <Block f={1} pb={13} fs={18}>发票类型</Block>
                        <Block f={1} wf>
                            <Block onClick={this.selectInvoic.bind(this,1)} mr={10} className={selectInvoiceType && selectInvoiceType===1?Styles.color_tag_select:Styles.color_tag}>普通纸质发票</Block>
                            <Block onClick={this.selectInvoic.bind(this,2)} mr={10} className={selectInvoiceType && selectInvoiceType===2?Styles.color_tag_select:Styles.color_tag}>普通电子发票</Block>
                        </Block>
                    </Block>
                    {
                        inputAble?<Block>
                            <Block vf mt={20}>
                                <Block f={1} pb={13} fs={18}>发票抬头</Block>
                                <Block f={1} wf>
                                    <Block onClick={this.selectInvTitle.bind(this,1)} mr={10} className={invTitle&& invTitle===1 ?Styles.color_tag_select:Styles.color_tag}>个人</Block>
                                    <Block onClick={this.selectInvTitle.bind(this,2)} mr={10} className={invTitle&& invTitle===2 ?Styles.color_tag_select:Styles.color_tag}>单位</Block>
                                </Block>
                                {
                                    unitInoutShow?<Block>
                                        <Block f={1} className={Styles.company_info}>
                                            <InputItem
                                                {...getFieldProps('company')}
                                                placeholder='公司'/>
                                            <InputItem
                                                {...getFieldProps('taxpayerCode')}
                                                placeholder='纳税人识别号'/>
                                        </Block>
                                    </Block>:null
                                }
                                
                            </Block>

                            <Block vf mt={20}>
                                <Block f={1} pb={13} fs={18}>收票人信息</Block>
                                <Block f={1} vf className={Styles.user_info_group}>
                                        <InputItem
                                            {...getFieldProps('email')}
                                            placeholder='收票人邮箱'/>
                                </Block>
                            </Block>
                        </Block>:null
                    }

                    <Block vf mt={20}>
                        <Block f={1} pb={13} fs={18}>发票内容</Block>
                        <Block f={1} wf>
                            <Block onClick={this.setFapiaoContent.bind(this,'不开发票')} mr={10} className={fapiaoContentSelect==='不开发票'?Styles.color_tag_select:Styles.color_tag}>不开发票</Block>
                            <Block onClick={this.setFapiaoContent.bind(this,'商品明细')} mr={10} className={fapiaoContentSelect==='商品明细'?Styles.color_tag_select:Styles.color_tag}>商品明细</Block>
                        </Block>
                    </Block>
                    <Block vf mt={5} style={{color: '#888',fontSize: '14px'}}>发票内容将显示详细商品名称与价格优惠</Block>
                </Block>
                <Block h={30} f={1}>
                    <Button style={{borderRadius: 25}} type='primary' onClick={this.selectFapiao}>确定</Button>
                </Block>
            </Block>
            
        )
    }

    render(){
        const { getFieldProps } = this.props.form
        const { reciveWay, popVisible,collectMode,timePopVisible,honbaoPopVisible,fapiaoPopVisible} = this.state
        return (
            <Block vf className={Styles.order_sure_wrapper}>
                {/* 商品信息 */}
                {this.renderGoodsArray()}
                
                {this.renderCollectInfo()}
                <Block m={15} mt={20}>
                    <Button style={{borderRadius: 25}} type='primary' onClick={this.orderSubmit.bind(this)}>提交订单</Button>
                </Block>
            
                <Modal
                    popup
                    visible={timePopVisible}
                    animationType='slide-up'>
                    <Block vf className={Styles.pop_wrapper}>
                        <section className={Styles.pop_header}>
                            <Block wf>
                                <Block onClick={()=>this.setState({adoptTimeSelect:null,timePopVisible:false})} ml={15} fc='#999'>取消</Block>
                                <Block j='c' f={1}>选择自提时间</Block>
                                <Block onClick={()=>this.setState({timePopVisible:false})} mr={15} className={Styles.orangeColor}>确定</Block>
                            </Block>
                        </section>
                        {this.renderrAdoptTime()}
                    </Block>
                </Modal>

                <Modal
                    popup
                    visible={honbaoPopVisible}
                    animationType='slide-up'>
                    <Block vf className={Styles.pop_wrapper}>
                        <section className={Styles.pop_header}>
                            <Block wf>
                                <Block onClick={()=>this.setState({honbaoPopVisible:false,honbaoSelect:null})} ml={15} fc='#999'>取消</Block>
                                <Block j='c' f={1}>可用红包</Block>
                                <Block onClick={()=>this.setState({honbaoPopVisible:false})} mr={15} className={Styles.orangeColor}>确定</Block>
                            </Block>
                        </section>
                        {this.rendeHonbao()}
                    </Block>
                </Modal>

                <Modal
                    popup={false}
                    visible={fapiaoPopVisible}
                    animationType='slide-up'>
                    <Block vf className={Styles.pop_wrapper_fapiao}>
                        <section className={Styles.pop_header}>
                            <Block wf>
                                <Block onClick={()=>this.setState({fapiaoPopVisible:false,fapiaoSelect:null})} ml={15} fc='#999'>取消</Block>
                                <Block j='c' f={1}>开具发票</Block>
                                <Block onClick={()=>this.setState({fapiaoPopVisible:false})} mr={15} className={Styles.orangeColor}>确定</Block>
                            </Block>
                        </section>
                        {this.renderFapiaoWindow()}
                    </Block>
                </Modal>
            </Block>
        )
    }
}


const mainForm = createForm()(OrderSure)
export default connect()(mainForm)