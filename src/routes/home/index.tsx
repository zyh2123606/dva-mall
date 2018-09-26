import React, { Component } from 'react'
import Block from 'fs-flex'
import { connect } from 'dva'
import { Button } from 'antd-mobile'
import { Link } from 'react-router-dom'
import Styles from './index.less'
import Logo from '../../assets/img/logo.png'
import Swiper from 'react-id-swiper'
import Service from '../../services/baseService'
import Constant from '../../utils/constant'
import ImgErr from '../../assets/img/img_error.png'
import ContentLoader, { List, BulletList, Code } from 'react-content-loader'
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
        isRequest: false
    }
    constructor(props:IProps){
        super(props)
    }
    async componentDidMount(){
        const res = await Service.getHomeData()
        if(!res) return
        this.setState({
            bannerList: res[0].data || [],
            specialList: res[1].data || [],
            hotList: res[2].data || [],
            newList: res[3].data || [],
            productTypes: res[4].data || [],
            typeList: res[5].data || [],
            isRequest: true
        })
        if(window.localStorage){
            window.localStorage.setItem('data', JSON.stringify({name: 'zyh'}))
            console.log(window.localStorage.getItem('data'))
        }else{
            console.log('不支持localStorage',window)
        }
    }
    render(){
        const { specialList, hotList, newList, productTypes, bannerList, typeList, isRequest } = this.state
        return (
            isRequest?<Block className={Styles.container} bc='#fff'>
                <Block vf p='0 15px'>
                    {/* top start */}
                    <Block a='c' wf pt={10}>
                        <img width={57} src={Logo} />
                        <Block f={1} j='c' vf className={Styles.logo_txt}>
                            <Block fc='#FD8007'>云南联通沃店</Block>
                            <Block>
                                <span className={Styles.tag}>官方认证</span>
                            </Block>
                        </Block>
                        <Block className={Styles.head_pic}></Block>
                        <Block fs={10} ml={5}>店长：刘可可</Block>
                    </Block>
                    <Block wf fs={10} style={{lineHeight: 'normal'}} mt={7}>
                        <Block vf f={1}>
                            <Block>
                                <Block className={Styles.addr_txt}>实体店地址：云南省昆明市滨江西路51号</Block>
                            </Block>
                            <Block a='c' fs={10} wf mt={2}>
                                <Block>联　系电话：</Block>
                                <Block className={Styles.mobile}>18001297665</Block>
                            </Block>
                        </Block>
                        <Block j='c' a='c' wf className={Styles.sev_txt}>
                            <Block className={Styles.sev_ico}></Block>
                            <Block ml={3}>服务承诺</Block>
                        </Block>
                    </Block>
                    {/* top end */}
                    <Block mt={10} className={Styles.type_banner}>
                        <Block className={Styles.banner_inner}></Block>
                    </Block>
                    <Block className={Styles.type_title}>商品类型</Block>
                </Block>
                {/* start */}
                <section className={Styles.swiper_container}>
                    <Swiper slidesPerView={4}>
                        {typeList.map(({adPic, title}, idx) => (
                            <Link to='/' key={idx}>
                                <Block vf className={Styles.type_item}>
                                    <Block f={1}>
                                        <img className={Styles.type_img} src={Constant.imgBaseUrl+adPic} />
                                    </Block>
                                    <Block className={Styles.type_name_txt}>{title}</Block>
                                </Block>
                            </Link>
                        ))}
                    </Swiper>
                </section>
                {/* end */}
                <Block ml={15} mr={15}>
                    <Block wf a='c'>
                        <Block f={1} className={Styles.type_title}>特惠专区</Block>
                        {/* <Link className={Styles.link_sty} to='/'>More</Link> */}
                    </Block>
                    <Block className={Styles.th_banner}></Block>
                </Block>
                {/* start */}
                <section className={Styles.swiper_container}>
                    <Swiper slidesPerView={3}>
                        {specialList.map(({logoPath, typeName, minPrice, typeId}, idx) => (
                            <Link to={`/order-detail/${typeId}`} key={idx} style={{lineHeight: 'normal'}}>
                                <Block vf className={Styles.type_item} mt={15}>
                                    <Block j='c' className={Styles.prod_img_c}>
                                        <img className={Styles.prod_img} src={logoPath?Constant.imgBaseUrl+logoPath:ImgErr} />
                                    </Block>
                                    <Block mt={5} className={Styles.type_name_txt}>{typeName}</Block>
                                    <Block j='c' fs={12} pb={7} className={Styles.orangeColor}>{minPrice}</Block>
                                </Block>
                            </Link>
                        ))}
                    </Swiper>
                </section>
                {/* end */}
                <Block ml={15} mr={15}>
                    <Block wf a='c'>
                        <Block f={1} className={Styles.type_title}>热门商品</Block>
                        {/* <Link className={Styles.link_sty} to='/'>More</Link> */}
                    </Block>
                    <Block className={Styles.hot_banner}></Block>
                </Block>
                <section className={Styles.swiper_container}>
                    <Swiper slidesPerView={3}>
                        {hotList.map(({logoPath, typeName, minPrice, typeId}, idx) => (
                            <Link to={`/order-detail/${typeId}`} key={idx} style={{lineHeight: 'normal'}}>
                                <Block vf className={Styles.type_item} mt={15}>
                                    <Block j='c' className={Styles.prod_img_c}>
                                        <img className={Styles.prod_img} src={logoPath?Constant.imgBaseUrl+logoPath:ImgErr} />
                                    </Block>
                                    <Block mt={5} className={Styles.type_name_txt}>{typeName}</Block>
                                    <Block j='c' fs={12} pb={7} className={Styles.orangeColor}>{minPrice}</Block>
                                </Block>
                            </Link>
                        ))}
                    </Swiper>
                </section>
                {/* start */}
                <Block ml={15} mr={15}>
                    <Block wf a='c'>
                        <Block f={1} className={Styles.type_title}>新品上架</Block>
                        {/* <Link className={Styles.link_sty} to='/'>More</Link> */}
                    </Block>
                    <Block className={Styles.new_banner}></Block>
                </Block>
                <section className={Styles.swiper_container}>
                    <Swiper slidesPerView={3}>
                        {newList.map(({logoPath, typeName, minPrice, typeId}, idx) => (
                            <Link to={`/order-detail/${typeId}`} key={idx} style={{lineHeight: 'normal'}}>
                                <Block vf className={Styles.type_item} mt={15}>
                                    <Block j='c' className={Styles.prod_img_c}>
                                        <img className={Styles.prod_img} src={logoPath?Constant.imgBaseUrl+logoPath:ImgErr} />
                                    </Block>
                                    <Block mt={5} className={Styles.type_name_txt}>{typeName}</Block>
                                    <Block j='c' fs={12} pb={7} className={Styles.orangeColor}>{minPrice}</Block>
                                </Block>
                            </Link>
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