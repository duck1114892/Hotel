import { Avatar, Button, Col, Dropdown, Input, Popover, Row, Space, message } from "antd"
import Search from "antd/es/input/Search"
import { Header } from "antd/es/layout/layout"
import { useDispatch, useSelector } from "react-redux"
import { handleSearchs } from "../../../redux/search/action"
import { DownOutlined, HomeOutlined } from "@ant-design/icons"
import { logout } from "../../../service/api"
import { Link, useNavigate } from "react-router-dom"
import { logOut } from "../../../redux/login/action"


const HeaderComponent = () => {
    const userRole = useSelector(state => state.loginReducer)
    const nagivate = useNavigate()
    const dispatch = useDispatch()
    const handleSearch = (e) => {
        dispatch(handleSearchs(e.target.value))
    }
    const handleLogout = async () => {
        const res = await logout()
        if (res.statusCode === 201) {
            localStorage.clear()
            message.success(res.message)
            dispatch(logOut())
            nagivate('/login')
        }

    }
    const items = [
        {
            key: '2',
            label: `${userRole.user.email}`,
        },
        {
            key: '1',
            label: (
                <Link rel="noopener noreferrer" to="/">
                    Trang Chủ
                </Link>
            ),
        },
        {
            key: '3',
            danger: true,
            label: <span onClick={handleLogout}>Đăng Xuất</span>,
        },
    ];
    return (
        <Header
            style={{
                padding: 0,
                background: "white",
            }}
        >
            <Row style={{ margin: "0 20px", textAlign: "center" }}>
                <Col span={4}><Button><HomeOutlined /></Button></Col>
                <Col span={16}> <Search style={{ marginTop: "13px" }} onChange={(e) => handleSearch(e)} placeholder="Tìm Kiếm" size="large" /></Col>
                <Col span={4}>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <Avatar></Avatar>
                    </Dropdown>
                </Col>
            </Row>

        </Header>
    )
}
export default HeaderComponent