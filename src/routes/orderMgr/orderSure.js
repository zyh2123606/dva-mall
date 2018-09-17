import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { List, Button, Modal, Picker } from 'antd-mobile'
import { createForm } from 'rc-form'
import {connect} from 'dva'
import UserService from '../../services/userSeervice'
import DeptService from '../../services/deptService'
/**
 *订单确认
 *
 * @class OrderSure
 * @extends {Component}
 */
const Item = List.Item
class OrderSure extends Component{
    state = {
        collectMode:1001,//收货方式，shsm:送货上门，yytzt:营业厅自提
        reciveWay: [{label: '送货上门', value: 1001},{label: '营业厅自提', value: 1002}],
        collectUserInfo:[],//用户收货地址列表
        adoptDeptList:[],//自提营业厅列表
        saleNum:0,//库存
        collectAddress:{},//收货地址
        popVisible: false
    }
    componentDidMount(){
        this.queryCollectUserInfo()
        this.queryAdoptDeptList()
    }

    // 查询用户收货的地址列表
    async queryCollectUserInfo(){
        const {code,data}=await UserService.getAddressList(1);
        if (code==='1111'){
            const result=[]
            let collectAddress=null;
            data.map((item,index)=>{
                result.push({
                    label:item.address,
                    value:item.id
                })
                if(item.defaultFlag===1){
                    //设置默认收货地址
                    collectAddress=item
                }
            })
            this.setState({collectUserInfo:result,collectAddress})
        }
    }
    // 查询周边自提营业厅
    async queryAdoptDeptList(){
        const {code,data}=await DeptService.getAdoptDeptList(1,1)

        if (code==='1111'){
            const result=[]
            data.map((item,index)=>{
                result.push({
                    label:item.deptName,
                    value:item.deptId,
                    saleNum:item.saleNum
                })
            })
            this.setState({adoptDeptList:result})
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
        this.setState({
            collectMode:val[0]
        })
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
    orderSubmit = e => {
        const { form } = this.props
        console.log('submit order:',form.getFieldsValue())
    }
    // 金额转换
    toMoney(num){
        return num.toFixed(2);
    }
    openPopWin = () => {
        this.setState({popVisible: true})
    }
    closePopWin = () => {
        this.setState({popVisible: false})
    }
    renderCollectInfo(){
        const {adoptDeptList,collectMode,saleNum}=this.state
        const { getFieldProps } = this.props.form
        const {defaultSkuPrice,goodsNum}=this.props
        return (
                <List renderHeader='收货信息'>
                {
                    collectMode===1002?
                    <Block>
                        <Item onClick={this.openPopWin} wrap arrow='horizontal' extra='请选择'>推荐自提营业厅</Item>
                        <Item>
                            <Block wf>
                                <Block f={1}>门店库存量</Block>
                                <Block className={Styles.order_pop_wrap}>{saleNum}件
                                    <Block className={Styles.order_popover}>可以看看其他门店哦</Block>
                                    <i className={Styles.pop_arr}></i>
                                </Block>
                            </Block>
                        </Item>
                    </Block>:
                    <Item arrow='horizontal' multipleLine wrap>
                    <Block vf>
                        <Block wf f={1} style={{fontWeight: 'bold'}}>
                            <Block f={1}>张三</Block>
                            <Block>18313858906</Block>
                        </Block>
                        <Block mt={5}>收货地址：长春市万宁区 自由大路与百汇街交汇处 自由大路 1000号</Block>
                    </Block>
                </Item>
                }
                    <Item extra={<Block className={Styles.orangeColor}>￥{this.toMoney(defaultSkuPrice*goodsNum)}</Block>}>商品金额</Item>
                </List>
        )
    }
    render(){
        const { getFieldProps } = this.props.form
        const { reciveWay, popVisible } = this.state
        const {goodsNum,defaultSkuPrice,logoPath,colorName,title}=this.props
        return (
            <Block vf className={Styles.order_sure_wrapper}>
                <List>
                    <Picker
                        data={reciveWay}
                        cols={1}
                        value={1001}
                        onOk={this.seletedOrderSureWrapper}
                        {...getFieldProps('recive',{
                            initialValue:[reciveWay[0].value]
                        })}>
                        <Item arrow='horizontal' extra='请选择'>收货方式</Item>
                    </Picker>
                </List>
                <Block wf bc='#fff' p={15} mt={10}>
                    <Block className={Styles.prod_pic}>
                        <img alt={title} src={logoPath} />
                    </Block>
                    <Block vf f={1} ml={15}>
                        <Block style={{fontWeight: 'bold'}}>{title}</Block>
                        <Block fs={12} fc='#666'>{colorName}</Block>
                        <Block wf>
                            <Block f={1}>×{goodsNum}</Block>
                            <Block className={Styles.orangeColor}>￥{defaultSkuPrice}</Block>
                        </Block>
                    </Block>
                </Block>
                {this.renderCollectInfo()}
                <Block m={15} mt={20}>
                    <Button style={{borderRadius: 25}} type='primary' onClick={this.orderSubmit}>提交订单</Button>
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
                                <Block mr={15} className={Styles.orangeColor}>确定</Block>
                            </Block>
                        </section>
                        <Block className={Styles.pop_content} f={1}>
                            {/* 选中 */}
                            <Block bc='#FFF9F2' vf className={Styles.pop_item}>
                                <Block style={{fontWeight: 'bold'}}>东岭营业厅</Block>
                                <Block mt={10} wf>
                                    <Block f={1}>门店库存量</Block>
                                    <Block>5件</Block>
                                </Block>
                                <Block mt={5} wf>
                                    <Block f={1}>吉林省长春市南关区东岭南街1103号</Block>
                                    <Block ml={10} wf a='c'>
                                        <Block className={Styles.pos_icon}></Block>2.6km
                                    </Block>
                                </Block>
                            </Block>
                            <Block vf className={Styles.pop_item}>
                                <Block style={{fontWeight: 'bold'}}>东岭营业厅</Block>
                                <Block mt={10} wf>
                                    <Block f={1}>门店库存量</Block>
                                    <Block>5件</Block>
                                </Block>
                                <Block mt={5} wf>
                                    <Block f={1}>吉林省长春市南关区东岭南街1103号</Block>
                                    <Block ml={10} wf a='c'>
                                        <Block className={Styles.pos_icon}></Block>2.6km
                                    </Block>
                                </Block>
                            </Block>
                            {/* 正常 */}
                        </Block>
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