import React from 'react';
import Block from 'fs-flex'
import Styles from './index.less'
import {Modal, Radio,Toast,List,Button } from 'antd-mobile'
import UserService from '../../services/userSeervice'
import Constant from '../../utils/constant'
import bianji from '../../assets/img/bianji.png'
import uncheck from '../../assets/img/uncheck.png'
import checked from '../../assets/img/checked.png'

const Item =List.Item
class  CollectInfoList extends React.Component{
    state={
        popVisible:false,
        index:0,
        selectedItem:null,//选中收货地址
    }
    async componentDidMount(){
        document.title = '选择收货地址'
        this.queryCollectInfo()
    }
    
    openCollectInfo=()=>{
        this.setState({
            popVisible:true,
        })
        this.queryCollectInfo()
    }

    queryCollectInfo=async()=>{
        const {sessionId,memId,accountId} = this.props
        console.log(`accountId:${accountId}`)
        const {RESP_CODE,DATA}=await new UserService({sessionId,memId}).getAddressList({
            DATA:{

            },
            accountId:accountId

        });
        if (RESP_CODE===Constant.responseOK){
            if(DATA){

                this.setState({data:DATA.addressList||[]})
            }
        }
    }

    onOk=()=>{
        this.props.selectedOk(this.state.selectedItem)
        this.setState({
            popVisible: false
        })
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
        const {memId,sessionId,history,accountId,deptId}=this.props
        // this.props.history.push(`/add-address/${sessionId}/${memId}?accountId=${accountId}&deptId=${deptId}`)

        const u=`https://iretail.bonc.com.cn/#/add-address/${sessionId}/${memId}?accountId=${accountId}&deptId=${deptId}`
        const _url =`/pages/newPage/newPage?url=${encodeURIComponent(u)}`
        wx.miniProgram.navigateTo({url: _url})
    }
    // // 去编辑收货信息
    // toEditCollectInfo(item){
    //    /update-address/
    // }
    //选中收货地址
    selectCollectinfoItem(item){
        this.setState({selectedItem:item})
    }
    renderItem=(item)=>{
        const {selectedItem} =this.state
        let isChecked=(selectedItem && selectedItem.addrId===item.addrId)
        return (
            <Block vf>
                <Block wf f={1} style={{fontWeight: 'bold'}}>
                    <Block f={1}>{item.conUser}</Block>
                    <Block>{item.conTel}</Block>
                </Block>
                <Block mt={5} pb={10}>收货地址：{item.addrDetail}</Block>
                <Block pt={10} hf style={{borderTop:'1px solid #ddd'}}>
                    <Block f={1} hf onClick={this.selectCollectinfoItem.bind(this,item)}>
                        <Block a='c' j='c'><img style={{height:'20px',width:'20px'}} src={isChecked?checked:uncheck}/></Block>
                        <Block a='c' j='c' ml={5}>选择地址</Block>
                    </Block>
                    {/* <Block w={100} a='c' j='c' onClick={this.toEditCollectInfo.bind(this,item)}><img src={bianji}/></Block> */}
                </Block>
            </Block>
        )
    }
    renderDefaultItem=()=>{
        const {selectedItem} =this.state
        const isSelect=(selectedItem && selectedItem.addrId!==0)
        return(
            <Block hf>
                <Block mt={5} f={1} pb={10}>收货地址：{isSelect?selectedItem.addrDetail:''}</Block>
                <Block a='c' fs={16} style={{color:'#888'}}>{isSelect?selectedItem.address:'请选择'}</Block>
            </Block>
        )
    }
    renderContent=()=>{
        const {index,data}=this.state
        return <Block className={Styles.pop_content} f={1}>
            <Block h={20} hf m={10}><Block f={1}></Block><Block onClick={this.addCollection} style={{color:'#FF8E44'}}>添加收货地址</Block></Block>
            {
                data && data.length>0?data.map((item,i)=>(
                    <Block key={'adopt-'+i} m={5} vf className={Styles.pop_item} style={{boxShadow:'0 0 1px #E6E6E6',borderRadius: '5px',color: '#707070'}} onClick={this.selectItem.bind(this,i)}>
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
            <Block vf f={1}>
                <Block f={1} vf>
                    <Block onClick={this.openCollectInfo}>
                        {
                            this.renderDefaultItem()
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
                    <Block h={50} m={10}>
                        <Button disabled={selectedItem===null} style={{borderRadius:'30px'}} type="primary" onClick={this.onOk}>确定</Button>
                    </Block>
                </Modal>
                </Block>
                
            </Block>
        )
    }
}

export default CollectInfoList;