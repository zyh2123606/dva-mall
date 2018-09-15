import React from 'react';
import Block from 'fs-flex'
import Styles from './index.less';
import {Stepper,List,Picker} from 'antd-mobile';

class SubmitOrder extends React.Component{
  render(){
    const item = {
            bc: '#37caec',
            m: 10
        };
    const renderAddressInfo=()=>{
        return(
            <Block bc='#FFF' p={10} h={100} mt={10} wf>
            <Block h={80} w={80} bc></Block>
            <Block f={1} vf>
                <Block fs={18} style={{fontWeight: 'bold',}}>Apple AirPots无线蓝牙耳机 iphoneX双耳pods入耳式耳机</Block>
                <Block>黑色</Block>
                <Block wf pt={10}>
                    <Block f={1}>X1</Block>
                    <Block w={100}>￥ 1099.00</Block>
                </Block>
            </Block>
        </Block>
        )
    }
    const seasons=[
        {
          label:renderAddressInfo(),
          value:1
        },
        {
          label:renderAddressInfo(),
          value:2
        }
      ];
    return(
      <Block vf>
        <Block h={80} wf bc='#FFF'>
            <Block a='c' j='c' w={30}>
                !
            </Block>
            <Block f={1}>
                <Block vf>
                    <Block wf  fs={18} style={{fontWeight: 'bold',}} a='l'>
                        <Block f={1}>张三</Block>
                        <Block f={1}>13908891234</Block>
                    </Block>
                    <Block mt={10} fs={16}>收货地址：云南省昆明市盘龙区北泰花园</Block>
                </Block>
            </Block>
            <Block a='c' j='c' w={30}>
                >
            </Block>
        </Block>
        <Block bc='#FFF' mt={10}>
            <List style={{ backgroundColor: 'white' }}>
            <Picker extra="请选择(可选)"
                data={seasons}
                col={1}
                >
                <List.Item arrow="horizontal">收货方式</List.Item>
                </Picker>
            </List>
        </Block>
        <Block bc='#FFF' p={10} h={100} mt={10} wf>
            <Block h={80} w={80} bc></Block>
            <Block f={1} vf>
                <Block fs={18} style={{fontWeight: 'bold',}}>Apple AirPots无线蓝牙耳机 iphoneX双耳pods入耳式耳机</Block>
                <Block>黑色</Block>
                <Block wf pt={10}>
                    <Block f={1}>X1</Block>
                    <Block w={100}>￥ 1099.00</Block>
                </Block>
            </Block>
        </Block>
        <List>
            <List.Item>
                <Block bc='#FFF' p={10} h={100} mt={10} wf>
                <Block vf f={1}>
                    <Block fs={18} style={{fontWeight: 'bold',}}>收货信息</Block>
                    <Block vf pt={10}>
                        <Block wf>
                            <Block a='c' j='l' f={1}>推荐自提营业厅</Block>
                            <Block a='r' f={1}>青年路营业厅</Block>
                        </Block>
                        <Block mt={10} a='r'>昆明市南关区东岭南路1103号</Block>
                    </Block>
                </Block>
                <Block w={30} a='c' j='c'>
                    >
                </Block>
            </Block>
            </List.Item>

            <List.Item extra={'0件'}>
                门店库存量
            </List.Item>
            <List.Item extra={'￥ 1099.00'}>
                商品金额
            </List.Item>
        </List>

        <Block wf fs={16} className={Styles.footer_bar}>
            <Block className={Styles.car_sty} f={1}>加入购物车</Block>
        </Block>

    </Block>
    )
  }
}

export default SubmitOrder;
