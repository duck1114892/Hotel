import { UserOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import Search from "antd/es/input/Search"
import { Header } from "antd/es/layout/layout"

const HeaderComponent = () => {
    return (<> <Header
        style={{
            position: 'fixed',
            backgroundColor: '#00B7E4',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: "space-around",


        }}
    >
        <Avatar size={80} shape='circle' icon={<img src="https://static.vecteezy.com/system/resources/thumbnails/019/900/152/small/old-book-watercolor-illustration-png.png"></img>} />
        <Search placeholder="Bạn Cần Tìm Gì ?" size="" style={{ width: '60%' }}></Search>
        <Avatar size="large" shape="circle" icon={<UserOutlined />}></Avatar>
    </Header></>)
}
export default HeaderComponent