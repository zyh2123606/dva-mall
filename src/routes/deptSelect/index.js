import React, { Component } from 'react';
import {SearchBar,Button} from 'antd-mobile';
import Block from 'fs-flex';
import Styles from './index.less';
import Checked from '../../assets/img/checked.png';
import unChecked from '../../assets/img/uncheck.png';
import weizhi from '../../assets/img/weizhi.png';
import DeptSelectService from '../../services/deptService';
import Canstant from '../../utils/constant';
import Qs from 'qs'

class DeptSelect  extends Component {
    state={
        searchKeyword:null,
        deptList:[],
        currentSelect:null,// 当前选中条目
    }

    async componentDidMount(){
        this.search()
    }

    searchInputChange=(val)=>{
        this.setState({searchKeyword:val})
    }

    search=async()=>{
        const {searchKeyword}=this.state
        const { search } = this.props.location
        let params = search.split('?')[1] || ''
        params = Qs.parse(params)
        const {accountId,longitude,latitude}=params
        let data={
            deptIng:longitude,// 获取经度
            deptLat:latitude,// 获取维度
            currentPage:1,
            countPerPage:25,
            fullname:searchKeyword||null,//门店名称
        }
        const {RESP_CODE,DATA}=await new DeptSelectService(1,15).getDeptList(data,accountId);
        if(RESP_CODE===Canstant.responseOK){
            this.setState({deptList:DATA.deptList})
        }
    }

    select(currentSelect){
        this.setState({currentSelect})
    }

    comfirmSelect=()=>{
        const { currentSelect } = this.state
        const {accountId}=this.props.match.params

        const { search } = this.props.location
        let params = search.split('?')[1] || ''
        params = Qs.parse(params)
        const {longitude,latitude}=params
        const { history } = this.props
        history.push(`/mall/home?accountId=${accountId}&deptId=${currentSelect.depeId}&longitude=${longitude}&latitude=${latitude}`)
    }
  render() {
    const {searchKeyword,deptList,currentSelect}=this.state
    return (
      <Block className={Styles.default_wrapper} vf>
            <Block f={1}>
                <Block>
                    <SearchBar placeholder='请输入门店名称搜索'
                    showCancelButton={true} 
                    onChange={this.searchInputChange}
                    value={searchKeyword?searchKeyword:''}
                    onSubmit={this.search}
                    onCancel={this.search}
                    cancelText={<Button style={{marginTop: 6, borderRadius: 15}} type='primary' size='small' onSubmit={this.onSubmit}>搜索</Button>}/>
                </Block>
                <Block vf>
                    {
                        deptList && deptList.length>0?deptList.map((item,index)=>{
                            let isSelect=false
                            if(currentSelect){
                                isSelect=(currentSelect.depeId===item.depeId)
                            }
                            return(
                                <Block key={'dept-'+index} mt={15} vf p={10} style={{borderBottom:'1px solid #ddd'}} onClick={this.select.bind(this,item)}>
                                    <Block wf f={1} style={{fontWeight: 'bold'}}>
                                        <Block fs={15} f={1}>{item.simplename}</Block>
                                        <Block mr={10}>
                                            <img style={{width:'20px',height:'20px'}} src={isSelect?Checked:unChecked}/>
                                        </Block>
                                    </Block>
                                    <Block pt={5} hf>
                                        <Block f={1} mr={15}>{item.fullname}</Block>
                                        <Block hf>
                                            <Block><img src={weizhi}/></Block>
                                            <Block j='c' ml={5}>{item.distance?(item.distance/1000+' km'):null}</Block>
                                        </Block>
                                    </Block>
                                </Block>
                            )
                        }):<Block mt={50} fc='#999' fs={16} a='c' j='c'>暂无门店可选</Block>
                    }
                    
                </Block>
            </Block>
            <Block h={50} m={10}>
                <Button disabled={currentSelect===null} style={{borderRadius:'30px'}} type="primary" onClick={this.comfirmSelect}>确定</Button>
            </Block>
      </Block>
    )
  }
}

export default DeptSelect
