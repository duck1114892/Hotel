import React, { useEffect } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import SliderComopent from './component/slider';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderComponent from './component/header';
const { Header, Content, Footer, Sider } = Layout;

const AdminHomePage = () => {
    const userRole = useSelector(state => state.loginReducer)
    const nagivate = useNavigate()
    console.log(userRole)
    if (userRole.user.role !== 'SUPER_ADMIN') {
        nagivate('/')
    }
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ height: '100vh' }}>
            <SliderComopent></SliderComopent>
            <Layout>
                <HeaderComponent></HeaderComponent>
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet></Outlet>
                    </div>
                </Content>

            </Layout>
        </Layout>
    );
};
export default AdminHomePage;