import React from 'react';
import Block from 'fs-flex'
import Styles from './index.less'
import {Modal, Picker,Toast } from 'antd-mobile'
import UserService from '../../services/userSeervice'
import Constant from '../../utils/constant'
class  CollectInfoList extends React.Component{
    state={
        popVisible:false,
        index:0,
        selectedItem:{
            id:0,
            address:'',
            receiver:'',
            tel:''
        }
    }
    async componentDidMount(){
        document.title = '选择收货地址'
        setTimeout(() => {
            this.init()
        }, 500);
    }
    init(){
        const {data}=this.props
        let selectedItem={id:0,address:'',receiver:'',tel:''}
        let selectIndex=0;
        if(this.state.selectedItem.id!=0){
            return this.renderItem(this.state.selectedItem)
        }
        if(data){
            const defaultAdr= data.filter((item,index)=>{
                if(item.defaultFlag===1){
                    selectIndex=index
                    return true
                }
                return false
            })

            if(defaultAdr && defaultAdr.length>0){
                selectedItem={
                    id:defaultAdr[0].id,
                    address:defaultAdr[0].address,
                    receiver:defaultAdr[0].receiver,
                    tel:defaultAdr[0].tel,
                }

            }else{
                const frist=data[0]
                if(!frist){
                    return
                }
                selectedItem={
                    id:data[0].id,
                    address:data[0].address,
                    receiver:data[0].receiver,
                    tel:data[0].tel,
                }
            }
        }
        this.setState({index:selectIndex,selectedItem})
        // 设置默认收货地址
        this.props.selectedOk(selectedItem,selectIndex)
    }
    openCollectInfo=()=>{
        this.setState({
            popVisible:true,
        })
        this.queryCollectInfo()
    }

    queryCollectInfo=async()=>{
        const {sessionId,memId} = this.props
        const {code,data}=await new UserService({sessionId,memId}).getAddressList();
        if (code===Constant.responseOK){
            if(data && data.length>0){
                this.setState({data:data})
            }else{
                Toast.info('无收货地址，即将跳转到添加地址页面!')
                this.setState({
                    popVisible:false,
                })
                setTimeout(() => {
                    wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/add-address/${sessionId}/${memId}`})
                    // this.props.history.push(`/add-address/${sessionId}/${memId}`)
                }, 1000);
            }
        }
    }

    onOk=()=>{
        const {index,data}=this.state
        const {selectedOk}=this.props
        const item=data.filter((d,idx)=>idx===index)
        const selected={id:item[0].id,address:item[0].address,receiver:item[0].receiver,tel:item[0].tel}
        this.setState({
            popVisible:false,
            selectedItem:selected
        })
        selectedOk(selected,index)
    }
    selectItem=(index)=>{
        this.setState({
            index:index
        })
    }
    closePopWin=()=>{
        this.setState({
            popVisible: false
        })
    }

    // 添加收货地址
    addCollection=()=>{
        console.log('添加收货地址')
    }
    renderItem=(item)=>{
        return (
            <Block vf>
                <Block wf f={1} style={{fontWeight: 'bold'}}>
                    <Block f={1}>{item.receiver}</Block>
                    <Block>{item.tel}</Block>
                </Block>
                <Block mt={5}>收货地址：{item.address}</Block>
                <Block mt={5} hf style={{borderTop:'1px solid #CCCCCC'}}>
                    <Block f={1}>选择地址</Block>
                    <Block w={100} a='c' j='c'>编辑</Block>
                </Block>
            </Block>
        )
    }
    renderDefaultItem=()=>{
        return this.renderItem(this.state.selectedItem)
    }
    renderContent=()=>{
        const {index,data}=this.state
        return <Block className={Styles.pop_content} f={1}>
            <Block h={20} hf m={10}><Block f={1}></Block><Block onClick={this.addCollection} style={{color:'#FF8E44'}}>添加收货地址</Block></Block>
            {
                data && data.length>0?data.map((item,i)=>(
                    <Block key={'adopt-'+i} vf className={Styles.pop_item} onClick={this.selectItem.bind(this,i)}>
                        {
                            this.renderItem(item)
                        }
                    </Block>
                )):null
            }
        </Block>
    }

    render(){
        const {popVisible,selectedItem,data}=this.state
        return (
            <Block>
                <Block onClick={this.openCollectInfo}>
                    {
                        this.renderDefaultItem(data)
                    }
                </Block>
                <Modal
                    popup={false}
                    visible={popVisible}
                    animationType='slide-up'>
                    <Block vf className={Styles.pop_wrapper}>
                        <section className={Styles.pop_header}>
                            <Block wf>
                                <Block onClick={this.closePopWin} ml={15} fc='#999'>取消</Block>
                                <Block j='c' f={1}>选择收货地址</Block>
                                <Block onClick={this.onOk} mr={15} className={Styles.orangeColor}>确定</Block>
                            </Block>
                        </section>
                        {this.renderContent()}
                    </Block>
                </Modal>
            </Block>
        )
    }
}

export default CollectInfoList;