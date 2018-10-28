import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { List, Button, Modal, Picker,Toast,InputItem } from 'antd-mobile'
import { createForm } from 'rc-form'
import {connect} from 'dva'
import UserService from '../../services/userSeervice'
import DeptService from '../../services/deptService'
import OrderService from '../../services/orderService'
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
        orderDeptId:1,// 当前营业厅
        totalPrise:0,//总价格,
        shoppingcard:[],//购物车ID集合
        goodsList:[],// 购物车商品集合
        collectMode:2,//收货方式，2:送货上门，:营业厅自提
        reciveWay: [{label: '送货上门', value: 2},{label: '营业厅自提', value: 3}],
        adoptDeptList:[],//自提营业厅列表
        collectAddress:{},//收货地址
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
        adoptTimeSelect:{},

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

        fapiaoSelect:null,//选中开发票模式

    }
    async componentDidMount(){
        document.title='订单确认'
        const {location}  =this.props
        const { num,skuId } = qs.parse(location.search.split('?')[1])

        this.queryInvoiceType()// 查询可开发票信息
    }
    async queryGoodsdAndSkuInfo(){
        let { history,match:{params:{shoppingcardId,sessionId,memId}}} = this.props
        if (shoppingcardId.length>1){
            shoppingcardId=shoppingcardId.split(',')
        }else{
            shoppingcardId=[Number.parseInt(shoppingcardId)]
        }
        const shoppingCartService = new ShoppingCartService({sessionId,memId})
        const {data,code}=await shoppingCartService.query(shoppingcardId)
        if (code===Constant.responseOK){
            let totalPrise=0
            if(!data || data.length===0){
                // TODO 这里应该跳转到购物车？个人中心？
                wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/cart/${sessionId}/${memId}`})
            }
            data.map(item=>{
                totalPrise+=(item.salePrice*item.amount)
            })
            this.setState({
                totalPrise:totalPrise,
                goodsList:data
            })
        }
        this.setState({
            shoppingcard:shoppingcardId
        })
    }
    // 查询周边自提营业厅
    async queryAdoptDeptList(){
        const {goodsList,orderDeptId} = this.state
        // 因为有多个商品的情况，所以默认去第一个商品的skuID
        const { match:{params:{sessionId,memId}}} = this.props
        if(goodsList&& goodsList.length>0){
            const {code,data}=await new DeptService({sessionId,memId}).getAdoptDeptList(goodsList[0].skuId,orderDeptId)
            if (code===Constant.responseOK && data){
                this.setState({adoptDeptList:data})
            }
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
        if (seleted){
            this.setState({
                saleNum:seleted[0].saleNum
            })
        }
    }
    //提交订单
    async orderSubmit () {
        const {match:{params:{sessionId,memId}}} = this.props
        const {collectMode,selectedAdopt,collectAddress,shoppingcard}=this.state
        
        
        let params={
            cartIdList:shoppingcard,// 购物车ID集合
            memId:memId,// 用户ID
            dispatchWay:collectMode,// 送货方式
            deptId:1,//下单门店Id
            memo:'',//订单备注
            adoptDeptId:0,//自提门店ID
            addrId:0,//收货地址Id
        }
        console.log('selectedAdopt.....',selectedAdopt)
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

        const {data,code}= await new OrderService({sessionId,memId}).addOrder({...params})
        if (code===Constant.responseOK){
            // this.pay(data)
            wx.miniProgram.navigateTo({url: `/pages/payPage/payPage?id=${data}`})
        }
    }
    // 调用支付接口
    async pay(orderCode){
        const {match:{params:{sessionId,memId}}} = this.props
        const {code} = await new OrderService({sessionId,memId}).pay(orderCode)
        if(code===Constant.responseOK){
            Toast.success('成功！',1)
            setTimeout(() => {
                // wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/success/${orderCode}/${sessionId}/${memId}`})
                // this.props.history.push(`/success/${orderCode}/${sessionId}/${memId}`)
            }, 1000);
        }else{
            Toast.fail('提交订单失败！',1)
            setTimeout(() => {
                wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/fail/${sessionId}/${memId}`})
                // this.props.history.push(`/fanpmil/${sessionId}/${memId}`)
            }, 1000);
        }
    }

    // 金额转换
    toMoney(num){
        return Constant.toMoney(num);
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
    // 查询可开发票信息
    async queryInvoiceType(){
        const {DATA}=await new UserService(1,15).queryInvoiceType({
            deptCode:258,
            DATA:{},
        })
        if(DATA){
            this.setState({invoiceType:DATA})
        }
    }
    // 选中开票类型
    selectInvoic(selectItem){
        this.setState({selectInvoiceType:selectItem})
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
        console.log(adoptTimeSelect)
        return (
            <Block className={Styles.pop_content}>
                {
                    adoptTimes && adoptTimes.length>0?adoptTimes.map((item,index)=>{
                        let isSelect=false
                        if(adoptTimeSelect && adoptTimeSelect.value===item.value){
                            isSelect=true
                        }
                        return <Block ml={5} mr={5} mt={2} wf f={1} bc={isSelect?'#FFF9F2':'#F4F7FB'} onClick={()=>this.setState({adoptTimeSelect:item})} key={'adopt-time-'+index} style={isSelect?selectStyle:null} className={Styles.pop_item}>
                                <Block f={1}>{item.label}</Block>
                                <Block a='c' j='c'><Block h={10} w={10} style={isSelect?potinselect:unSelectStyle}></Block></Block>
                            </Block>
                    }):<Block wf f={1} className={Styles.pop_item}> 无自提时间 </Block>
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
                        const color = item.attrList.filter((i)=>i.baseAttrName==='颜色')
                        return <Block key={'goods-item-'+index} wf bc='#fff' p={15} mt={10}>
                                <Block className={Styles.prod_pic}>
                                    <img alt={item.goodsName} src={Constant.imgBaseUrl+item.logoPath} />
                                </Block>
                                <Block vf f={1} ml={15}>
                                    <Block style={{fontWeight: 'bold'}}>{item.goodsName}</Block>
                                    <Block fs={12} fc='#666'>{color && color.length>0?color[0].attrCode:'无'}</Block>
                                    <Block wf>
                                        <Block f={1}>×{item.amount}</Block>
                                        <Block className={Styles.orangeColor}>￥{Constant.toMoney(item.salePrice)}</Block>
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
        const {adoptTimeSelect,reciveWay,collectMode,totalPrise,isCheckedJifen}=this.state
        const {match:{params:{sessionId,memId}},history,form:{getFieldProps}} = this.props
        return (
            <Block>

                    <List renderHeader={<Block fs={18} style={{color:'#000',fontWeight: 'bold'}}>收货信息</Block>}>
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
                {
                    collectMode===3?
                    <Block>
                        <Item onClick={()=>this.setState({timePopVisible:true})} wrap arrow='horizontal' extra={adoptTimeSelect?adoptTimeSelect.label:'请选择'}>自提时间</Item>
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
                    <Item onClick={()=>this.setState({fapiaoPopVisible:true})} arrow='horizontal' extra={''}>选择发票</Item>
                 </List>
                <List renderHeader={<Block fs={18} style={{color:'#000',fontWeight: 'bold'}}>会员信息</Block>}>
                    <Item onClick={()=>this.setState({honbaoPopVisible:true})} wrap arrow='horizontal' extra={'请选择'}>红包</Item>
                    <Item wrap extra={
                        <Block hf onClick={()=>this.setState({isCheckedJifen:!isCheckedJifen})}>
                            <Block f={1}>共12345积分，可抵扣12元</Block>
                            <Block><img style={{height:'20px',width:'20px'}} src={isCheckedJifen?checked:uncheck}/></Block>
                        </Block>
                        }>积分</Item>
                </List>

                <List renderHeader={<Block fs={18} style={{color:'#000',fontWeight: 'bold'}}>总金额</Block>}>
                    <Item extra={<Block className={Styles.orangeColor}>￥{Constant.toMoney(totalPrise)}</Block>}>商品金额</Item>
                    <Item extra={<Block className={Styles.orangeColor}>￥{Constant.toMoney(totalPrise)}</Block>}>红包抵扣</Item>
                    <Item extra={<Block className={Styles.orangeColor}>￥{Constant.toMoney(totalPrise)}</Block>}>积分抵扣</Item>
                    <Item extra={<Block className={Styles.orangeColor}>￥{Constant.toMoney(totalPrise)}</Block>}>总金额</Item>
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
        const {fapiaoSelect,invoiceType,selectInvoiceType}=this.state
        const {getFieldProps}=this.props.form
        
        let selected=true
        return (
            <Block className={Styles.order_det_wrapper} bc='#fff' vf  p={15}>
                <Block vf p={15} f={1}>
                    <Block vf>
                        <Block f={1} pb={13} fs={18}>发票类型</Block>
                        <Block f={1} wf>
                            {
                                invoiceType && invoiceType.length>0?invoiceType.map((item,index)=>{
                                    const typeSelected=(selectInvoiceType && selectInvoiceType.invoiceType===item.invoiceType) 
                                    return <Block onClick={this.selectInvoic.bind(this,item)} mr={10} key={'invoiceType'+index} className={typeSelected?Styles.color_tag_select:Styles.color_tag}>{item.typeName}</Block>
                                }):null
                            }
                        </Block>
                    </Block>

                    <Block vf mt={20}>
                        <Block f={1} pb={13} fs={18}>发票抬头</Block>
                        <Block f={1} wf>
                            <Block mr={10} className={selected?Styles.color_tag_select:Styles.color_tag}>个人</Block>
                            <Block mr={10} className={selected?Styles.color_tag_select:Styles.color_tag}>单位</Block>
                        </Block>
                        <Block f={1} className={Styles.company_info}>
                            <InputItem
                                {...getFieldProps('company')}
                                placeholder='公司'/>
                            <InputItem
                                {...getFieldProps('taxpayerCode')}
                                placeholder='纳税人识别号'/>
                        </Block>
                    </Block>

                    <Block vf mt={20}>
                        <Block f={1} pb={13} fs={18}>收票人信息</Block>
                        <Block f={1} vf className={Styles.user_info_group}>
                            <InputItem
                                    {...getFieldProps('phone')}
                                    placeholder='收票人手机'/>
                                <InputItem
                                    {...getFieldProps('email')}
                                    placeholder='收票人邮箱'/>
                        </Block>
                    </Block>

                    <Block vf mt={20}>
                        <Block f={1} pb={13} fs={18}>发票内容</Block>
                        <Block f={1} wf>
                            <Block mr={10} className={selected?Styles.color_tag_select:Styles.color_tag}>不开发票</Block>
                            <Block mr={10} className={selected?Styles.color_tag_select:Styles.color_tag}>商品明细</Block>
                        </Block>
                    </Block>
                    <Block vf mt={5} style={{color: '#888',fontSize: '14px'}}>发票内容将显示详细商品名称与价格优惠</Block>
                </Block>
                <Block h={30} f={1}>
                    <Button style={{borderRadius: 25}} type='primary'>确定</Button>
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