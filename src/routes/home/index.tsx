import React, { Component } from 'react'
import Block from 'fs-flex'
import { connect } from 'dva'
import { Button ,Modal} from 'antd-mobile'
import { Link } from 'react-router-dom'
import Styles from './index.less'
import Logo from '../../assets/img/logo.png'
import Swiper from 'react-id-swiper'
import Service from '../../services/baseService'
import Constant from '../../utils/constant'
import ImgErr from '../../assets/img/img_error.png'
import ContentLoader from 'react-content-loader'
const alert = Modal.alert;
/**
 *首页
 *
 * @class Home
 * @extends {Component}
 */
interface IProps{dispatch: any, history: any}
class Home extends Component<IProps>{
    state = {
        specialList: [],
        hotList: [],
        newList: [],
        productTypes: [],
        bannerList: [],
        isRequest: false,
        deptInfo: {},
        allBanner:[],
    }


    bannerStyle={1:Styles.banner_inner,2:Styles.th_banner,3:Styles.hot_banner,4:Styles.new_banner}

    constructor(props:IProps){
        super(props)
    }
    async componentDidMount(){
        const { params } = this.props.match
        const BaseSev = new Service(params)
        const res = await BaseSev.getHomeData()
        if(!res) return
        this.setState({
            specialList: res[0].data || [],
            hotList: res[1].data || [],
            newList: res[2].data || [],
            typeList: res[3].data || [],
            deptInfo: res[4].data || {},
            allBanner: res[5].data || [],
            isRequest: true
        })
    }
    
    gotoProdDetail(typeId){
        const {memId,sessionId}=this.props.match.params
        // alert('info', `info-session:${sessionId} info-id:${memId}  info-type:${typeId}`, [
        //     { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
        //     { text: 'OK', onPress: () => console.log('ok') },
        //   ]);
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

    // 渲染各个分类的banner图片
    renderBanner=(adType)=>{
        const allBanner=this.state.allBanner
        if (!allBanner || allBanner.length===0){
            return <Block className={this.bannerStyle[adType]}></Block>
        }
        let currentBanner=allBanner.filter(item=>item.adType===adType)
        if (!currentBanner || currentBanner.length===0){
            return <Block className={this.bannerStyle[adType]}></Block>
        }
        currentBanner=currentBanner[0]
        return (
            <Block onClick={this.gotoGoodsPage.bind(this,currentBanner.adUrl)}><img style={{width:'100%',height:'150px'}} src={Constant.imgBaseUrl+currentBanner.adPic} alt='banner'/></Block>
        )
    }
    render(){
        const { specialList, hotList, typeList, newList, isRequest, deptInfo } = this.state
        const { deptAddress, deptManager, deptName, deptManagerAvatar, deptTel } = deptInfo || {}
        return (
            isRequest?<Block className={Styles.container} bc='#fff'>
                <Block vf p='0 15px'>
                    {/* top start */}
                    <Block a='c' wf pt={10}>
                        <img width={57} src={Logo} />
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
                    <Block mt={10} className={Styles.type_banner}>
                        {/* <Block className={Styles.banner_inner}></Block> */}
                        {
                            this.renderBanner(1)
                        }
                    </Block>
                    <Block className={Styles.type_title}>商品类型</Block>
                </Block>
                {/* start */}
                <section className={Styles.swiper_container}>
                    <Swiper slidesPerView={4}>
                        {typeList.map(({adPic, title,adUrl}, idx) => (
                            <Block key={idx} onClick={this.gotoGoodsPage.bind(this, adUrl)}>
                                <Block vf className={Styles.type_item}>
                                    <Block f={1}>
                                        <img className={Styles.type_img} src={Constant.imgBaseUrl+adPic} />
                                    </Block>
                                    <Block className={Styles.type_name_txt}>{title}</Block>
                                </Block>
                            </Block>
                        ))}
                    </Swiper>
                </section>
                {/* end */}
                <Block ml={15} mr={15}>
                    <Block wf a='c'>
                        <Block f={1} className={Styles.type_title}>特惠专区</Block>
                        {/* <Link className={Styles.link_sty} to='/'>More</Link> */}
                    </Block>
                    {
                        this.renderBanner(2)
                    }
                    {/* <Block className={Styles.th_banner}></Block> */}
                </Block>
                {/* start */}
                <section className={Styles.swiper_container}>
                    <Swiper slidesPerView={3}>
                        {specialList.map(({logoPath, typeName, minPrice, typeId}, idx) => (
                            <Block onClick={this.gotoProdDetail.bind(this, typeId)} key={idx} style={{lineHeight: 'normal'}}>
                                <Block vf className={Styles.type_item} mt={15}>
                                    <Block j='c' className={Styles.prod_img_c}>
                                        <img className={Styles.prod_img} src={logoPath?Constant.imgBaseUrl+logoPath:ImgErr} />
                                    </Block>
                                    <Block mt={5} className={Styles.type_name_txt}>{typeName}</Block>
                                    <Block j='c' fs={12} pb={7} className={Styles.orangeColor}>{Constant.toMoney(minPrice)}</Block>
                                </Block>
                            </Block>
                        ))}
                    </Swiper>
                </section>
                {/* end */}
                <Block ml={15} mr={15}>
                    <Block wf a='c'>
                        <Block f={1} className={Styles.type_title}>热门商品</Block>
                        {/* <Link className={Styles.link_sty} to='/'>More</Link> */}
                    </Block>
                    {/* <Block className={Styles.hot_banner}></Block> */}
                    {
                        this.renderBanner(3)
                    }
                </Block>
                <section className={Styles.swiper_container}>
                    <Swiper slidesPerView={3}>
                        {hotList.map(({logoPath, typeName, minPrice, typeId}, idx) => (
                            <Block onClick={this.gotoProdDetail.bind(this, typeId)} key={idx} style={{lineHeight: 'normal'}}>
                                <Block vf className={Styles.type_item} mt={15}>
                                    <Block j='c' className={Styles.prod_img_c}>
                                        <img className={Styles.prod_img} src={logoPath?Constant.imgBaseUrl+logoPath:ImgErr} />
                                    </Block>
                                    <Block mt={5} className={Styles.type_name_txt}>{typeName}</Block>
                                    <Block j='c' fs={12} pb={7} className={Styles.orangeColor}>{Constant.toMoney(minPrice)}</Block>
                                </Block>
                            </Block>
                        ))}
                    </Swiper>
                </section>
                {/* start */}
                <Block ml={15} mr={15}>
                    <Block wf a='c'>
                        <Block f={1} className={Styles.type_title}>新品上架</Block>
                        {/* <Link className={Styles.link_sty} to='/'>More</Link> */}
                    </Block>
                    {/* <Block className={Styles.new_banner}></Block> */}
                    {
                        this.renderBanner(4)
                    }
                </Block>
                <section className={Styles.swiper_container}>
                    <Swiper slidesPerView={3}>
                        {newList.map(({logoPath, typeName, minPrice, typeId}, idx) => (
                            <Block onClick={this.gotoProdDetail.bind(this, typeId)} key={idx} style={{lineHeight: 'normal'}}>
                                <Block vf className={Styles.type_item} mt={15}>
                                    <Block j='c' className={Styles.prod_img_c}>
                                        <img className={Styles.prod_img} src={logoPath?Constant.imgBaseUrl+logoPath:ImgErr} />
                                    </Block>
                                    <Block mt={5} className={Styles.type_name_txt}>{typeName}</Block>
                                    <Block j='c' fs={12} pb={7} className={Styles.orangeColor}>{Constant.toMoney(minPrice)}</Block>
                                </Block>
                            </Block>
                        ))}
                    </Swiper>
                </section>
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