import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Checkbox } from 'antd-mobile'
import { Empty } from '../../components'
import { Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import {connect} from 'dva'

/**
 *收货地址管理
 *
 * @class AddressMgr
 * @extends {Component}
 */
const CheckboxItem = Checkbox.CheckboxItem
class AddressMgr extends Component{
    //设为默认
    checkHandleChange = e => {

    }
    setEditAddress = e =>{
        const {dispatch,history} = this.props
        const payload = {address:'滨江西路51号'}
        dispatch({type:"myAddress/editAddress",payload})
        history.push('/add-address')
    }
    render(){
        return (
            <Block vf className={Styles.container}>
                <Block ml={15} mr={15} pb={15} mb={80}>
                    <Block className={Styles.addr_panel} vf>
                        <Block vf ml={15} mr={15}>
                            <Block wf mt={10}>
                                <Block f={1}>李可可</Block>
                                <Block>18313858906</Block>
                            </Block>
                            <Block mt={5}>吉林省 长春市 朝阳区自由大路与百汇街交汇处自由大路1000号</Block>
                        </Block>
                        <Block className={Styles.act_addr} mt={10} wf>
                            <Block f={1}>
                                <CheckboxItem onChange={this.checkHandleChange}>默认地址</CheckboxItem>
                            </Block>
                            <Block wf a='c'>
                                <Block className={Styles.edit} onClick={this.setEditAddress}></Block>
                                <Block mr={15} ml={10} className={Styles.del}></Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
                <Empty />
                <Block mt={10} pb={20} pt={20} pl={15} pr={15} className={Styles.footer}>
                    <Link className={Styles.link_btn} to='/add-address'>添加新地址</Link>
                </Block>
            </Block> 
        )
    }
}

export default connect(state=>state)(AddressMgr)