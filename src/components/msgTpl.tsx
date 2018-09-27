import Block from 'fs-flex'
import { Icon } from 'antd-mobile'
import { Link } from 'react-router-dom'

interface Options{
    status: string,
    message: string,
    linkText: string,
    linkUrl: string
}
//消息提示页面
const MsgTpl = ({status, message, linkText, linkUrl}: Options) => {

    function linkHandle(){
        wx.miniProgram.navigateTo({url:  `/pages/newPage/newPage?url=https://iretail.bonc.com.cn/#${linkUrl}`})
    }

    return (
        <Block a='c' vf mt={50} fc={status === 'success'?'#7ED321':'#FF8E44'}>
            <Icon style={{width: 50, height: 50}} type={status === 'success'?'check-circle':'cross-circle-o'} />
            <Block fs={18} mt={10} fc='#333'>{message}</Block>
            <Block j='c' mt={50} onClick={linkHandle}>
                <Block style={{
                    border: '#d2d2d2 solid 1px',
                    height: 30,
                    lineHeight: '30px',
                    padding: '0 15px',
                    borderRadius: 15
                }}>{linkText}</Block>
            </Block>
        </Block>
    )
}

export default MsgTpl