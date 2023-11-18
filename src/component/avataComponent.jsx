import { UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown } from "antd"
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../service/api";

const AvataComponent = ({ props }) => {
    const items = []
    console.log(props)
    const isAdmin = useSelector(state => state.loginReducer)

    const logoutApi = async () => {
        await logout()
        window.location.reload()
        localStorage.clear()

    }
    if (isAdmin.user.role === 'ADMIN') {
        items.push(
            {
                item: '1',
                label: (
                    <Link style={{ fontSize: "16px" }} to={'/admin/dashboard'}>Trang Admin</Link>
                )
            })
    }

    if (isAdmin.isAuth) {
        items.push(
            {
                item: '4',
                label: (<>
                    {props ? <Link to='/' style={{ fontSize: "16px" }}>Trang Chủ</Link> : <Link to='/history' style={{ fontSize: "16px" }}>Lịch Sử Đặt Hàng</Link>}
                </>

                )
            },
            {
                item: '2',
                label: (
                    <Link onClick={logoutApi} style={{ fontSize: "16px" }}>Đăng Xuất</Link>
                )
            },

        )
    }


    return (<Dropdown placement="bottom" menu={{ items }}>
        <Avatar size="large" shape="circle" icon={<UserOutlined />}></Avatar>
    </Dropdown>)
}
export default AvataComponent