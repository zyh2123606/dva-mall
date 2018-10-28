import React, { Component } from 'react'
import Block from 'fs-flex'
import { connect } from 'dva'
import { Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import Styles from './index.less'
import Logo from '../../assets/img/logo.png'
import GxLogo from '../../assets/img/gxLogo.png'
import Swiper from 'react-id-swiper'
import Service from '../../services/baseService'
import Constant from '../../utils/constant'
import ImgErr from '../../assets/img/img_error.png'
import ContentLoader from 'react-content-loader'
import Qs from 'qs'

/**
 *首页
 *
 * @class Home
 * @extends {Component}
 */
interface IProps{dispatch: any, history: any}
class Home extends Component<IProps>{
    state = {
        pageLoad: [],
        focusImgs: [],
        isRequest: false,
        typeList: []
    }
    _PAGE_DATA_ = { accountId: '', deptId: '' }
    constructor(props:IProps){
        super(props)
    }
    async componentDidMount(){
        const { search } = this.props.location
        let params = search.split('?')[1] || ''
        params = Qs.parse(params)
        this._PAGE_DATA_ = {...this._PAGE_DATA_, ...params}
        const BaseSev = new Service(),
            result = await BaseSev.getHomeData(this._PAGE_DATA_),
            prod_res = result[0],
            type_res = result[1];
        if(prod_res.RESP_CODE !== '0000') return Toast.info(prod_res.RESP_DESC)
        if(type_res.RESP_CODE !== '0000') return Toast.info(type_res.RESP_DESC)
        let _focus = [], _data = [];
        prod_res.DATA.filter((item, idx) => {
            if(item.displayType === '1'){
                _focus = item.mallRelation || []
            }else{
                _data.push(item)
            }
        })
        this.setState({
            pageLoad: _data,
            focusImgs: _focus,
            isRequest: true,
            typeList: type_res.DATA
        })
    }
    
    gotoProdDetail(typeId){
        const {memId, sessionId}=this.props.match.params
        wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#/order-detail/${typeId}/${sessionId}/${memId}`})
        // this.props.history.push(`/order-detail/${typeId}/${sessionId}/${memId}`)
    }
    gotoGoodsPage(url){
        const {memId,sessionId}=this.props.match.params
        if(url){
            wx.miniProgram.navigateTo({url: `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#${url}/${sessionId}/${memId}`})
            // this.props.history.push(`${url}/${sessionId}/${memId}`)
        }
    }
    //商品
    renderColumnView(){
        const { pageLoad } = this.state
        return pageLoad.map(({columnName, mallRelation, columnType, displayType, setId}, index) => {
            return (
                <React.Fragment key={index}>
                    <Block ml={15} mr={15}>
                        <Block wf a='c'>
                            <Block f={1} className={Styles.type_title}>{columnName}</Block>
                        </Block>
                        {setId === 1?
                        <img style={{
                            width: '100%',
                            height: 'auto'
                        }} src={Constant.imgBaseUrl + mallRelation[0].displayPic} />:null}
                    </Block>
                    <Block mr={5} ml={10} style={{lineHeight: 'normal'}}>
                        {mallRelation.map(({ displayName, displayPic, displayPrice, displaySort, perateType, relSkuId, relTypeid }, idx) => (
                            <Block key={idx} onClick={this.gotoProdDetail.bind(this, relTypeid)} vf className={Styles.prod_item} mt={15}>
                                <Block j='c' className={Styles.prod_img_c}>
                                    <img className={Styles.prod_img} src={displayPic?Constant.imgBaseUrl+displayPic:ImgErr} />
                                </Block>
                                <Block mt={5} className={Styles.type_name_txt}>{displayName}</Block>
                                <Block j='c' fs={12} pb={7} className={Styles.orangeRedColor}>￥{Constant.toMoney(displayPrice)}</Block>
                                <Block j='c'>
                                    {perateType === '1'?<Button type='primary' className={Styles.buy_btn}>立即购买</Button>
                                    :<Button type='primary' className={Styles.order_btn}>立即预约</Button>}
                                </Block>
                            </Block>
                        ))}
                    </Block>
                </React.Fragment>
            )
        })
    }
    render(){
        const { isRequest, focusImgs, typeList } = this.state
        const { deptAddress, deptManager, deptName, deptManagerAvatar, deptTel } = {}
        return (
            isRequest?<Block className={Styles.container} bc='#fff'>
                <Block vf p='0 15px'>
                    {/* top start */}
                    <Block a='c' wf pt={10}>
                        <img width={57} src={GxLogo} />
                        <Block f={1} j='c' vf className={Styles.logo_txt}>
                            <Block fs={12} fc='#FD8007'>{deptName}</Block>
                            <Block>
                                <span className={Styles.tag}>官方认证</span>
                            </Block>
                        </Block>
                        <Block className={Styles.head_pic}>
                            <img src={Constant.imgBaseUrl+deptManagerAvatar}/>
                        </Block>
                        <Block fs={10} ml={5}>店长：{deptManager}</Block>
                    </Block>
                    <Block wf fs={10} style={{lineHeight: 'normal'}} mt={7}>
                        <Block vf f={1}>
                            <Block>
                                <Block className={Styles.addr_txt}>实体店地址：{deptAddress}</Block>
                            </Block>
                            <Block a='c' fs={10} wf mt={2}>
                                <Block>联系　电话：</Block>
                                <Block className={Styles.mobile}>
                                    <a style={{color: '#fd8007'}} href={`tel:${deptTel}`}>{deptTel}</a>
                                </Block>
                            </Block>
                        </Block>
                        <Block j='c' a='c' wf className={Styles.sev_txt}>
                            <Block className={Styles.sev_ico}></Block>
                            <Block ml={3}>服务承诺</Block>
                        </Block>
                    {/* top end */}
                    </Block>
                    <section>
                        <Swiper autoplay={{delay: 3000, disableOnInteraction: false}}>
                            {focusImgs.map((item, idx) => (
                                <Block key={idx} className={Styles.focus_slide}>
                                    <img src={Constant.imgBaseUrl+item.displayPic} />
                                </Block>
                            ))}
                        </Swiper>
                        <div className='swiper-pagination'></div>
                    </section>
                    <Block className={Styles.type_title}>商品类型</Block>
                    <section>
                        <Swiper slidesPerView={4}>
                            {typeList.map(({grandFatherTypeId, grandFatherTypeName, grandFatherUrl}, idx) => (
                                <Block vf className={Styles.type_item} key={idx} onClick={this.gotoGoodsPage.bind(this)}>
                                    <Block className={Styles.type_pic_c} f={1}>
                                        <img className={Styles.type_img} src={Constant.imgBaseUrl+grandFatherUrl} />
                                    </Block>
                                    <Block className={Styles.type_name_txt}>{grandFatherTypeName}</Block>
                                </Block>
                            ))}
                        </Swiper>
                    </section>
                </Block>
                {this.renderColumnView()}
            </Block>:
            <Block vf w='100%' h='100%' bc='#fff'>
                <Block p={10}>
                    <ContentLoader height={230}>
                        <rect x="0" y="0" rx="4" ry="4" width="100%" height="10" />
                        <rect x="0" y="20" rx="4" ry="4" width="90%" height="10" />
                        <rect x="0" y="40" rx="4" ry="4" width="80%" height="10" />
                        <rect x="0" y="60" rx="4" ry="4" width="60%" height="10" />
                        <rect x="0" y="80" rx="4" ry="4" width="90%" height="10" />
                        <rect x="0" y="100" rx="4" ry="4" width="50%" height="10" />
                        <rect x="0" y="120" rx="4" ry="4" width="40%" height="10" />
                        <rect x="0" y="140" rx="4" ry="4" width="60%" height="10" />
                        <rect x="0" y="160" rx="4" ry="4" width="85%" height="10" />
                    </ContentLoader>
                </Block>
            </Block>
        )
    }
}

export default connect((state:any) => state)(Home)