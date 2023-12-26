import { PieChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";

const SliderComopent = () => {
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    let items = [
        getItem('Table User', '1', <Link to={'users'}><PieChartOutlined /></Link>),
        getItem('Table Book', '2', <Link to={'book'}><PieChartOutlined /></Link>),
        getItem('Table Order', '3', <Link to={'order'}><PieChartOutlined /></Link>),]
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
        </Sider>
    )
}
export default SliderComopent