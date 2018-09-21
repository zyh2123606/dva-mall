import {Component} from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import {Checkbox} from 'antd-mobile'
import {Empty} from '../../components'
import {Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import {connect} from 'dva'
import Service from '../../services/addressService'
import { district } from 'antd-mobile-demo-data'

/**
 *收货地址管理
 *
 * @class AddressMgr
 * @extends {Component}
 */
const CheckboxItem = Checkbox.CheckboxItem

class AddressMgr extends Component {
    //设为默认
    checkHandleChange = (id,index,e) => {
        let newState = this.props.myAddress
        if(e.target.checked){
            newState.data.filter((data,idx)=>{
                data.defaultFlag=2
                if(idx===index) data.defaultFlag = 1
            })
        }else{
            newState.data[index].defaultFlag = 2
        }
        this.setState({data:newState})
    }
    setEditAddress = (item,index,e) => {
        const {dispatch, history} = this.props
        const payload = {editIndex:index,editFlag:true}
        dispatch({type: "myAddress/editAddress", payload})
        history.push('/add-address')
    }

    async componentDidMount() {
        const res = await Service.getMyAddress(1)
        const {data, code} = res
        const {dispatch, history} = this.props
        if (code==="0000") {
            this.setState({data: data}, () => {
                const payload = this.state.data
                dispatch({type: 'myAddress/initState', payload})
            })
        }
        console.log(district)
    }
    
    render() {
        return (
            <Block vf className={Styles.container}>
                <Block ml={15} mr={15} pb={15} mb={80}>
                    {this.props.myAddress ? this.props.myAddress.data.map((data, idx)=>(
                        <Block className={Styles.addr_panel} key = {idx} vf>
                            <Block vf ml={15} mr={15}>
                                <Block wf mt={10}>
                                    <Block f={1}>{data.receiver}</Block>
                                    <Block>{data.tel}</Block>
                                </Block>
                                <Block mt={5}>吉林省 长春市 {data.address}</Block>
                            </Block>
                            <Block className={Styles.act_addr} mt={10} wf>
                                <Block f={1}>
                                    <CheckboxItem checked={data.defaultFlag===1} onChange={this.checkHandleChange.bind(this,data.id,idx)}>默认地址</CheckboxItem>
                                </Block>
                                <Block wf a='c'>
                                    <Block className={Styles.edit} onClick={this.setEditAddress.bind(this,data,idx)}></Block>
                                    <Block mr={15} ml={10} className={Styles.del}></Block>
                                </Block>
                            </Block>
                        </Block>
                    )):<Empty/>}
                </Block>
                <Block mt={10} pb={20} pt={20} pl={15} pr={15} className={Styles.footer}>
                    <Link className={Styles.link_btn} to='/add-address'>添加新地址</Link>
                </Block>
            </Block>
        )
    }
}

export default connect(state => state)(AddressMgr)
