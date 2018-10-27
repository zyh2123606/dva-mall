import { Component } from 'react'
import Block from 'fs-flex'
import { createForm } from 'rc-form'
import { List,Toast, InputItem, TextareaItem, Picker, Checkbox, Button, NavBar } from 'antd-mobile'
import { connect } from 'dva'
import AreaData from '../../components/areaData'
import Service from '../../services/addressService'
import { checkFormat } from './utils'
import { NavTopBar } from '../../components'
import Constant from '../../utils/constant'

/**
 *添加收货地址
 *
 * @class Create
 * @extends {Component}
 */
const Item = List.Item
const CheckboxItem = Checkbox.CheckboxItem

class Create extends Component{
    componentDidMount(){
        document.title = '添加收货地址'
    }
    state = {
        data: [],
        cols: 1,
        pickerValue: [],
        asyncValue: [],
        sValue: ['2013', '春'],
        visible: false,
        colorValue: ['#00FF00'],
          
    }
    getProvince=(provinceCode,cityCode,countyCode)=>{
        const province = AreaData.filter((item,idx) => {
            return item.value===provinceCode;
        });
        const provinceName = province[0].label;
        let city =""
        let cityName =""
        for (var i = 0, len = province[0].children.length; i < len; i++) {
            if(province[0].children[i].value===cityCode){
                city = province[0].children[i]
                cityName = city.label
                break
            }
        }
        let county=""
        let districtName=""
        for (var i = 0, len = city.children.length; i < len; i++) {
            if(city.children[i].value===countyCode){
                county = city.children[i]
                districtName = county.label
                break
            }
        }
        return { provinceName,cityName,districtName } 
    }
    submit=async()=>{
        const submitVales = this.props.form.getFieldsValue()
        if(!checkFormat(submitVales)){
            return
        }
        const {addrDetail,isDefault,pcc:[province,city,district],conUser,conTel,street}=submitVales
        const aData=this.getProvince(province,city,district)
        const temp={street:street,conTel:conTel,addrDetail:addrDetail,conUser:conUser,isDefault:isDefault?1:2,province:aData.provinceName,city:aData.cityName,district:aData.districtName}
        const {params} = this.props.match
        const baseSer = new Service(params)
        const res = await baseSer.saveAddress(temp)
        const{RESP_CODE,RESP_DESC} = res
        if(RESP_CODE==="0000"){
            Toast.info("保存成功!")
            const {history} = this.props
            history.goBack()
        }else{
            Toast.Info(RESP_DESC)
        }
    }
    render(){
        const {myAddress, history} = this.props
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
                        {...getFieldProps('conUser')}>收货人</InputItem>
                    <InputItem 
                        type='number'
                        placeholder='请输入联系电话'
                        style={{textAlign: 'right'}}
                        maxLength={11} 
                        {...getFieldProps('conTel')}>联系电话</InputItem>
                    <Picker data={AreaData} value={this.state.pickerValue} onChange={v=>this.setState({pickerValue:v})} 
                        onOk={()=>this.setState({visible:false})}
                        onDisemiss={()=>this.setState({visible:false})}
                        {...getFieldProps('pcc')}
                        title='选择地区'>
                        <Item arrow='horizontal'>所在地区</Item>
                    </Picker>
                    <TextareaItem
                        title='街道'
                        placeholder='请输入街道'
                        autoHeight
                        style={{textAlign: 'right'}}
                        {...getFieldProps('street')}
                        maxLength={100}/>
                    <TextareaItem
                        title='收货地址'
                        placeholder='请输入地址'
                        autoHeight
                        style={{textAlign: 'right'}}
                        {...getFieldProps('addrDetail')}
                        maxLength={100}/>
                </List>
                <Block mt={10}>
                    <CheckboxItem 
                        {...getFieldProps('isDefault')}>设为默认地址</CheckboxItem>
                </Block>
                <Block ml={15} mr={15} mt={20}>
                    <Button style={{borderRadius: 25}} type='primary' onClick={this.submit.bind(this)}>保存</Button>
                </Block>
            </Block>
        )
    }
}

const mainForm = createForm()(Create)
export default connect(state => state)(mainForm)
