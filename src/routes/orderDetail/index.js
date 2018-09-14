import { Component } from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import { Stepper } from 'antd-mobile'
import Service from '../../services/productService'
import { createForm } from 'rc-form'
import { Badge } from 'antd-mobile'
import { CustomerIcon } from '../../components/customerIcon'
import Car from '../../assets/svg/car.svg'

class OrderDetail extends Component{
    state = { pageData: null, cur_tag: 0 }
    //dom挂在完成请求数据
    async componentDidMount(){
        const res = await Service.getDetailById()
        const { data, result } = res
        if(result)
            this.setState({ pageData: data})
    }
    //选择颜色
    selectColor(color_id, idx){
        const { form } = this.props
        form.setFieldsValue({ color_id: color_id })
        this.setState({cur_tag: idx}, () => {
            const { getFieldProps } = this.props.form
            const { onChange } = getFieldProps('color_id')
            onChange(color_id)
        })
    }
    //立即购买
    sureBuy(){
        const { form } = this.props
        const values = form.getFieldsValue()
        console.log(values)
    }
    render(){
        const { pageData, cur_tag } = this.state
        const { name, amount, colors=[] } = pageData || {}
        const { getFieldProps } = this.props.form
        return (
            pageData?<Block vf p={15}>
                <Block h={250} vf className={Styles.pro_panel}>
                    <Block f={1} bc='#eee'></Block>
                    <Block p={20} vf>
                        <Block fs={16}>{name}</Block>
                        <Block className={Styles.money_color} fs={20} mt={10}>￥{amount}</Block>
                    </Block>
                </Block>
                <Block pt={20} pb={13} fs={18}>颜色分类</Block>
                <Block wf>
                    {colors.map(({color_id, color}, idx) => (
                        <Block onClick={this.selectColor.bind(this, color_id, idx)} 
                            {...getFieldProps('color_id', {initialValue: 100})}
                            key={idx}  
                            mr={idx !=0 && idx%3 == 0?0:10}
                            className={cur_tag === idx?Styles.color_tag_select:Styles.color_tag}>
                            {color}
                        </Block>
                    ))}
                </Block>
                <Block mt={20} a='c' wf>
                    <Block fs={18} f={1}>购买数量</Block>
                    <Stepper
                        style={{ width: '120px'}}
                        showNumber
                        {...getFieldProps('num', {initialValue: 1})}
                        max={10}
                        min={1}
                        defaultValue={1}
                    />
                </Block>
                <Block pt={20} pb={20} fs={18} style={{fontWeight: 'bold',}}>套餐详情</Block>
                <Block h={300} bc='#eee' mb={60}></Block>
                <Block wf fs={16} className={Styles.footer_bar}>
                    <Block a='c' j='c' w={60}>客服</Block>
                    <Block a='c' j='c' w={60}>
                        {/* <CustomerIcon type={Car} /> */}
                        购物车
                    </Block>
                    <Block wf f={1} ml={10} mr={10}>
                        <Block className={Styles.car_sty} f={1}>加入购物车</Block>
                        <Block onClick={this.sureBuy.bind(this)} className={Styles.buy_sty} f={1}>立即购买</Block>
                    </Block>
                </Block>
            </Block>:null
        )
    }
}

export default createForm()(OrderDetail)