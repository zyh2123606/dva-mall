import { Component } from 'react'
import Block from 'fs-flex'
import { createForm } from 'rc-form'
import { List, InputItem, TextareaItem, Picker, Checkbox, Button } from 'antd-mobile'

/**
 *添加收货地址
 *
 * @class Create
 * @extends {Component}
 */
const Item = List.Item
const CheckboxItem = Checkbox.CheckboxItem
class Create extends Component{
    render(){
        const { getFieldProps } = this.props.form
        return (
            <Block bc='#fff' w='100%' h='100%'>
                <List>
                    <InputItem 
                        placeholder='请输入姓名'
                        style={{textAlign: 'right'}}
                        maxLength={10} 
                        {...getFieldProps('name')}>收货人</InputItem>
                    <InputItem 
                        type='number'
                        placeholder='请输入联系电话'
                        style={{textAlign: 'right'}}
                        maxLength={11} 
                        {...getFieldProps('name')}>联系电话</InputItem>
                    <Picker title='选择地区'>
                        <Item arrow='horizontal'>所在地区</Item>
                    </Picker>
                    <TextareaItem
                        title='收货地址'
                        placeholder='请输入地址'
                        autoHeight
                        style={{textAlign: 'right'}}
                        {...getFieldProps('address', {initialValue: '自由大路与百汇街交汇处自由大路1000号'})}
                        maxLength={100}/>
                </List>
                <Block mt={10}>
                    <CheckboxItem>设为默认地址</CheckboxItem>
                </Block>
                <Block ml={15} mr={15} mt={20}>
                    <Button style={{borderRadius: 25}} type='primary'>保存</Button>
                </Block>
            </Block>
        )
    }
}

const mainForm = createForm()(Create)
export default mainForm