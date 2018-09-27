import React from 'react';
import Block from 'fs-flex'
import Styles from './index.less'
import {Modal, Picker } from 'antd-mobile'
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
    }
    onOk=()=>{
        const {index}=this.state
        const {selectedOk,data}=this.props
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
    renderItem=(item)=>{
        return (
            <Block vf>
                <Block wf f={1} style={{fontWeight: 'bold'}}>
                    <Block f={1}>{item.receiver}</Block>
                    <Block>{item.tel}</Block>
                </Block>
                <Block mt={5}>收货地址：{item.address}</Block>
            </Block>
        )
    }
    renderDefaultItem=()=>{
        return this.renderItem(this.state.selectedItem)
    }
    renderContent=()=>{
        const {index}=this.state
        const {data}=this.props
        return <Block className={Styles.pop_content} f={1}>
            {
                data.map((item,i)=>(
                    <Block key={'adopt-'+i} bc={index===i?'#FFF9F2':null} vf className={Styles.pop_item} onClick={this.selectItem.bind(this,i)}>
                        {
                            this.renderItem(item)
                        }
                    </Block>
                ))
            }
        </Block>
    }

    render(){
        const {popVisible,selectedItem}=this.state
        const {data}=this.props
        return (
            <Block>
                <Block onClick={this.openCollectInfo}>
                    {
                        this.renderDefaultItem(data)
                    }
                </Block>
                <Modal
                    popup
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