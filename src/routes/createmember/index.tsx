import React from 'react';
import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Stepper,Carousel, InputItem, Toast,Button } from 'antd-mobile'
import Service from '../../services/productService'
import ShoppingCartService from '../../services/shoppingCartService';// 购物车service
import { createForm } from 'rc-form'
import {connect} from 'dva';
import Constant from '../../utils/constant';
import ImgErr from '../../assets/img/img_error.png'
import qs from 'qs'

import MemBerService from '../../services/memberService'

class CreateMember extends React.Component{
    state={
        phoneNum:null
    }
    componentDidMount(){
        document.title='注册会员'
    }
    onOk=async()=>{
        const {location}  =this.props
        const { deptId,accountId,typeId,skuId } = qs.parse(location.search.split('?')[1])
        const phoneNum=this.state.phoneNum
        if(!phoneNum){
            Toast.fail('请输入手机号码',2)
            return
        }
        var isPhone = /^1[34578]\d{9}$/;//手机号码
        if(!isPhone.test(phoneNum.replace(/\s+/g, ""))){
            Toast.fail('请输入正确的电话号码',2)
            return
        }
        const {RESP_CODE}=await new MemBerService({memId:1,sessionId:1}).save({
            deptId:deptId,
            accountId:accountId,
            DATA:{
                telNum:phoneNum
            }
        })
        if(RESP_CODE===Constant.responseOk){
            // this.props.history.push(`/order-detail?skuId=${skuId}&&typeId=${typeId}&deptId=${deptId}&accountId=${accountId}`)
            const u=`https://iretail.bonc.com.cn/cnc/#/order-detail?skuId=${skuId}&&typeId=${typeId}&deptId=${deptId}&accountId=${accountId}`
            const _url =`/pages/newPage/newPage?url=${encodeURIComponent(u)}`
            wx.miniProgram.navigateTo({url: _url})
        }else{
            Toast.fail('创建会员失败',2)
        }
    }

     // 电话号码输入监听
  phoneOnChange=(val)=>{
      this.setState({phoneNum:val})
  }


    render(){
        return(
            <Block vf style={{height:'100%'}}>
                <Block vf f={1}>
                    <InputItem
                        clear
                        placeholder="电话号码"
                        value={this.state.phoneNum}
                        onChange={this.phoneOnChange}
                    >电话号码</InputItem>
                </Block>
                <Block h={50} m={10}>
                    <Button style={{borderRadius:'30px'}} type="primary" onClick={this.onOk}>确定</Button>
                </Block>
            </Block>
        )
    }
}

export default CreateMember;