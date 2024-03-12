import { Avatar, Button, Col, Drawer, Dropdown, Form, Input, Menu, Popover, Row, Select, Space, message } from "antd"
import Search from "antd/es/input/Search"
import { Header } from "antd/es/layout/layout"
import { useDispatch, useSelector } from "react-redux"
import { handleSearchs } from "../../../redux/search/action"
import { DownOutlined, FilterOutlined, HomeOutlined, MenuOutlined } from "@ant-design/icons"
import { logout } from "../../../service/api"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { logOut } from "../../../redux/login/action"
import exampleData from "../../../exampleData/data"
import { useEffect, useState } from "react"
import { useForm } from "antd/es/form/Form"
import { isFilters } from "../../../redux/filter/action"


const HeaderHomeComponent = () => {
    const location = useLocation()
    const userRole = useSelector(state => state.loginReducer.user.role)
    const [form] = useForm()
    const nagivate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        localStorage.clear()
        const res = await logout()
        if (res.statusCode === 201) {
            message.success(res.message)
            dispatch(logOut())
            nagivate('/login')
        }

    }
    const items = [
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


    if (userRole === "SUPER_ADMIN") {
        items.push({
            key: '2',
            label: (
                <Link rel="noopener noreferrer" to="adminPage/users">
                    AdminPage
                </Link>
            ),
        })
    }

    const items1 = [{
        key: "/",
        label: <Link to='/'>Trang Chủ</Link>
    }, {
        key: "/hotel",
        label: <Link to='hotel'>Khách Sạn</Link>
    },
    {
        key: "/room",
        label: <Link to='room'>Phòng</Link>
    },
    {
        key: "/booking",
        label: <Link to='booking'>Booking</Link>
    },

    ]
    return (
        <Header
            style={{

                background: "white",

            }}
        >
            <Row style={{ margin: "0 20px", textAlign: "center" }}>
                <Col span={4}> </Col>
                <Col span={16}>     <Menu
                    mode="horizontal"
                    defaultSelectedKeys={[`${location.pathname}`]}
                    items={items1}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                /></Col>
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
            <>

            </>


        </Header>
    )
}
export default HeaderHomeComponent