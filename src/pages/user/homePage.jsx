import React from 'react';
import { DownOutlined, FilterOutlined, SmileOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Dropdown, Form, Layout, Menu, Select, Space, theme } from 'antd';
import HeaderComponent from '../admin/component/header';
import { Outlet } from 'react-router-dom';
import exampleData from '../../exampleData/data';
import HeaderHomeComponent from './outlet/headeHome';
const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {


    return (
        <Layout>
            <Layout style={{ height: "100vh" }}>
                <HeaderHomeComponent></HeaderHomeComponent>
                <Content
                    style={{ overflow: 'auto', height: "100vh" }}
                >
                    <Outlet></Outlet>
                </Content>
            </Layout>

        </Layout>
    );
};
export default HomePage;