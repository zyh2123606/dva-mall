import AreaData from '../../components/areaData'
import {Component} from 'react'
import Block from 'fs-flex'
import Styles from './index.less'
import {Modal,Checkbox} from 'antd-mobile'
import {Empty} from '../../components'
import {Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import {connect} from 'dva'
import Service from '../../services/addressService'
import Constant from '../../utils/constant'

/**
 *收货地址管理
 *
 * @class AddressMgr
 * @extends {Component}
 */
const CheckboxItem = Checkbox.CheckboxItem

class AddressMgr extends Component {
    //设为默认
    checkHandleChange = async(_id,index,e) => {
        let newState = this.props.myAddress
        if(e.target.checked){
            newState.data.filter((data,idx)=>{
                data.defaultFlag=2
                if(idx===index) data.defaultFlag = 1
            })
        }else{
            newState.data[index].defaultFlag = 2
        }
        const addr = newState.data[index]
        const {id,tel,memId,address,receiver,defaultFlag,province,city,county}=addr
        const temp ={id:id,tel:tel,memId:memId,address:address,receiver:receiver,defaultFlag:defaultFlag,province:province,city:city,county:county}
        const {params} = this.props.match
        const baseSer = new Service(params)
        const res = await baseSer.updateAddress(temp)
        const{code,msg} = res
        if(code==="0000"){
            Toast.info("保存成功!")
            this.setState({data:newState})
        }else{
            Toast.Info(msg)
        }
    }
    setEditAddress = (item,index,e) => {
        const {dispatch, history} = this.props
        const payload = {editIndex:index,editFlag:true}
        dispatch({type: "myAddress/editAddress", payload})
        history.push('/update-address')
    }
    deleteAddress=(item,index,e)=>{
        const alert = Modal.alert
        const pcc = this.getProvince(item.province,item.city,item.county,AreaData)
        alert('确认',`确认删除地址: ${pcc} ${item.address}么？`,[{text:'取消',onPress:()=>console.log('cancel')},
            {text:'确认',onPress:()=>{
                (async(item,index)=>{
                    const {id,memId} = item 
                    const {params} = this.props.match
                    const baseSer = new Service(params)
                    const res = await baseSer.deleteAddress({addrId:id,memId:memId})
                    const {code,msg} = res
                    if(code==="0000"){
                        Toast.info("删除成功！")
                        let newState = this.props.myAddress
                        newState.data.filter((data,idx)=>{
                            if(data.id===id)
                                newState.data.splice(idx,1)
                        })
                        this.setState({data:newState})
                    }else{
                        Toast.info(msg)
                    }
                })(item,index)
            }},])
    }

    async componentDidMount() {
        document.title = '收货地址管理'
        const {params} = this.props.match
        const baseSer = new Service(params)
        const res = await Service.getMyAddress()
        const {data, code} = res
        const {dispatch, history} = this.props
        if (code==="0000") {
            this.setState({data: data}, () => {
                const payload = this.state.data
                dispatch({type: 'myAddress/initState', payload})
            })
        }
        this.AData = AreaData
        this.forceUpdate()
    }

    getProvince=(provinceCode,cityCode,countyCode,AData)=>{
        const province = AData.filter((item,idx) => {
            return item.value===provinceCode;
        });
        const provinceName = province[0].label;
        let city =""
        let cityname =""
        for (var i = 0, len = province[0].children.length; i < len; i++) {
            if(province[0].children[i].value===cityCode){
                city = province[0].children[i]
                cityname = city.label
                break
            }
        }
        let county=""
        let countyName=""
        for (var i = 0, len = city.children.length; i < len; i++) {
            if(city.children[i].value===countyCode){
                county = city.children[i]
                countyName = county.label
                break
            }
        }
        return `${provinceName} ${cityname} ${countyName} `
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
                                <Block mt={5}>{this.AData?this.getProvince(data.province,data.city,data.county,this.AData):null}{data.address}</Block>
                            </Block>
                            <Block className={Styles.act_addr} mt={10} wf>
                                <Block f={1}>
                                    <CheckboxItem checked={data.defaultFlag===1} onChange={this.checkHandleChange.bind(this,data.id,idx)}>默认地址</CheckboxItem>
                                </Block>
                                <Block wf a='c'>
                                    <Block className={Styles.edit} onClick={this.setEditAddress.bind(this,data,idx)}></Block>
                                    <Block mr={15} ml={10} className={Styles.del} onClick={this.deleteAddress.bind(this,data,idx)}></Block>
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
