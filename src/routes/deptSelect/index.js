import React, { Component } from 'react';
import {SearchBar,Button} from 'antd-mobile';
import Block from 'fs-flex';
import Styles from './index.less';
import Checked from '../../assets/img/checked.png';
import unChecked from '../../assets/img/uncheck.png';
import weizhi from '../../assets/img/weizhi.png';


class DeptSelect  extends Component {
    state={
        searchKeyword:''
    }
  render() {
    const {searchKeyword}=this.state
    return (
      <Block className={Styles.default_wrapper} vf>
          <Block>
                <SearchBar placeholder='请输入商品名称查询'
                showCancelButton={true} 
                onChange={this.searchInputChange}
                value={searchKeyword?searchKeyword:''}
                onSubmit={this.cancelInput}
                onCancel={this.cancelInput}
                cancelText={<Button style={{marginTop: 6, borderRadius: 15}} type='primary' size='small' onSubmit={this.onSubmit}>搜索</Button>}/>
            </Block>
            <Block vf style={{marginTop:'10px'}}>
                <Block vf pl={5} pr={5} style={{borderBottom:'1px solid'}}>
                    <Block wf f={1} style={{fontWeight: 'bold'}}>
                        <Block fs={15} f={1}>上海联通江苏路营业厅</Block>
                        <Block mr={10}>
                            <img style={{width:'20px',height:'20px'}} src={Checked}/>
                        </Block>
                    </Block>
                    <Block pt={5} hf>
                        <Block f={1} mr={15}>上海市 长宁区 江苏路1458号 上海联通江苏路营业厅</Block>
                        <Block hf>
                            <Block><img src={weizhi}/></Block>
                            <Block j='c' ml={5}>6.5 KM</Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
      </Block>
    )
  }
}

export default DeptSelect
