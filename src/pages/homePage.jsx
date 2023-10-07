import { Outlet } from "react-router-dom"
import HeaderComponent from "../component/header"
import FooterComponent from "../component/footer"
import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import SiderComponent from "../component/sider"

const HomePage = () => {
    return (<>   <HeaderComponent></HeaderComponent>
        <Layout   >
            <div style={{ height: '100vh' }}><SiderComponent></SiderComponent></div>

            <div style={{ height: '100vh', overflow: "auto", width: "100%" }}><Outlet></Outlet></div>

        </Layout >
    </>
    )
}
export default HomePage