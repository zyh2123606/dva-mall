import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Stepper } from 'antd-mobile'

class OrderDetail extends Component{
    render(){
        return (
            <Block vf p={15}>
                <Block h={250} vf className={Styles.pro_panel}>
                    <Block f={1} bc='#eee'></Block>
                    <Block p={20} vf>
                        <Block fs={16}>无限蓝牙耳机</Block>
                        <Block className={Styles.money_color} fs={20} mt={10}>￥1099.00</Block>
                    </Block>
                </Block>
                <Block pt={20} pb={13} fs={18}>颜色分类</Block>
                <Block wf>
                    <Block f={1} className={Styles.color_tag}>白色</Block>
                    <Block f={1} ml={10} className={Styles.color_tag}>白色</Block>
                    <Block f={1} ml={10} className={Styles.color_tag}>白色</Block>
                    <Block f={1} ml={10} className={Styles.color_tag}>白色</Block>
                </Block>
                <Block mt={20} a='c' wf>
                    <Block fs={18} f={1}>购买数量</Block>
                    <Stepper
                        style={{ width: '120px' }}
                        showNumber
                        max={10}
                        min={1}
                        value={1}
                    />
                </Block>
                <Block pt={20} pb={20} fs={18} style={{fontWeight: 'bold',}}>套餐详情</Block>
                <Block h={300} bc='#eee' mb={60}></Block>
                <Block wf fs={16} className={Styles.footer_bar}>
                    <Block a='c' j='c' w={60}>客服</Block>
                    <Block a='c' j='c' w={60}>购物车</Block>
                    <Block wf f={1} ml={10} mr={10}>
                        <Block className={Styles.car_sty} f={1}>加入购物车</Block>
                        <Block className={Styles.buy_sty} f={1}>立即购买</Block>
                    </Block>
                </Block>
            </Block>
        )
    }
}

export default OrderDetail