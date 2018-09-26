import { Component } from 'react'
import Block from 'fs-flex'
import { createForm } from 'rc-form'
import { List,Toast, InputItem, TextareaItem, Picker, Checkbox, Button } from 'antd-mobile'
import { connect } from 'dva'
import AreaData from '../../components/areaData'
import Service from '../../services/addressService'
import { checkFormat } from './utils'

/**
 *添加收货地址
 *
 * @class Update
 * @extends {Component}
 */
const Item = List.Item
const CheckboxItem = Checkbox.CheckboxItem
class Update extends Component{
    state = {
            data: [],
            cols: 1,
            pickerValue: [],
            asyncValue: [],
            sValue: ['2013', '春'],
            visible: false,
            colorValue: ['#00FF00'],
          
    }
    submit=async(editAddr,e)=>{
        const submitVales = this.props.form.getFieldsValue()
        if(!checkFormat(submitVales)){
            return
        }
        const {address,defaultFlag,pcc:[province,city,county],receiver,tel}=submitVales
        const temp={id:this.editAddr.id,tel:tel,memId:1,address:address,receiver:receiver,defaultFlag:defaultFlag?1:2,province:province,city:city,county:county}
        const res = await Service.updateAddress(temp)
        const{code,msg} = res
        if(code==="0000"){
            Toast.info("保存成功!")
            const {history} = this.props
            history.goBack()
        }else{
            Toast.Info(msg)
        }
    }
    render(){
        const {myAddress} = this.props
        this.editAddr = null
        if(myAddress.editIndex>=0 && myAddress.editFlag)
            this.editAddr = myAddress.data[myAddress.editIndex]
        const { getFieldProps } = this.props.form
        return (
            <Block bc='#fff' w='100%' h='100%'>
                <List>
                    <InputItem 
                        placeholder='请输入姓名'
                        style={{textAlign: 'right'}}
                        maxLength={10} 
                        {...getFieldProps('receiver',{initialValue: this.editAddr?this.editAddr.receiver:''})}>收货人</InputItem>
                    <InputItem 
                        type='number'
                        placeholder='请输入联系电话'
                        style={{textAlign: 'right'}}
                        maxLength={11} 
                        {...getFieldProps('tel',{initialValue:this.editAddr? this.editAddr.tel:''})}>联系电话</InputItem>
                    <Picker data={AreaData} value={this.state.pickerValue} onChange={v=>this.setState({pickerValue:v})} 
                        onOk={()=>this.setState({visible:false})}
                        onDisemiss={()=>this.setState({visible:false})}
                        {...getFieldProps('pcc',{initialValue:this.editAddr?[this.editAddr.province,this.editAddr.city,this.editAddr.county]:''})}
                        title='选择地区'>
                        <Item arrow='horizontal'>所在地区</Item>
                    </Picker>
                    <TextareaItem
                        title='收货地址'
                        placeholder='请输入地址'
                        autoHeight
                        style={{textAlign: 'right'}}
                        {...getFieldProps('address', {initialValue: this.editAddr?this.editAddr.address:''})}
                        maxLength={100}/>
                </List>
                <Block mt={10}>
                    <CheckboxItem defaultChecked={this.editAddr?this.editAddr.defaultFlag===1:false}
                        {...getFieldProps('defaultFlag',{initialValue:this.editAddr?this.editAddr.defaultFlag===1:false})}>设为默认地址</CheckboxItem>
                </Block>
                <Block ml={15} mr={15} mt={20}>
                    <Button style={{borderRadius: 25}} type='primary' onClick={this.submit.bind(this,this.editAddr)}>保存</Button>
                </Block>
            </Block>
        )
    }
}

const mainForm = createForm()(Update)
export default connect(state => state)(mainForm)
