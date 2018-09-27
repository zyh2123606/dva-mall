import { NavBar, Icon } from 'antd-mobile'
import Block from 'fs-flex'

const NavTopBar = ({title, leftClick, rightContent}) => (
    <Block style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 1000
    }}>
        <NavBar
            icon={<Icon type="left" />}
            onLeftClick={leftClick}
            rightContent={rightContent}>{title}</NavBar>
    </Block>
)

export default NavTopBar