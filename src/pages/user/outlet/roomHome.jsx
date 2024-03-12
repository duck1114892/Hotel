import { useEffect, useState } from "react"
import { useNavigate, useNavigation, useParams } from "react-router-dom"
import { getHotelApi, getRoomList } from "../../../service/api"
import { Avatar, Button, Card, Col, Form, Layout, Pagination, Rate, Result, Row, Select, Slider } from "antd"
import Meta from "antd/es/card/Meta"
import Sider from "antd/es/layout/Sider"
import { Content, Footer, Header } from "antd/es/layout/layout"
import { EnvironmentOutlined, ExclamationCircleOutlined, EyeOutlined, SmileOutlined, UndoOutlined } from "@ant-design/icons"
import exampleData from "../../../exampleData/data"
import { useForm } from "antd/es/form/Form"
import BookingModal from "./bookingModal"

const RoomHome = () => {
    const { sort, address, price } = useParams()
    const [bestRoom, setBestRoom] = useState([])
    const [title, setTitle] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [total, setTotal] = useState(6)
    const [resetToggle, setResetToggle] = useState(true)
    const [form] = useForm()
    const [filterAddress, setAddress] = useState()
    const [filterPrice, setPrice] = useState()
    const nagivate = useNavigate()
    const onFinish = (e) => {
        setAddress(e.address)
        setPrice(e.price)
    }
    const resetForm = () => {

        nagivate("/room")
        setAddress("")
        setPrice("")
        form.resetFields()
    }
    const fetchData = async () => {

        let resRoom
        if (filterAddress && filterPrice) {
            resRoom = await getRoomList(current, pageSize, filterAddress, filterPrice);
        }
        else if (filterAddress) {
            resRoom = await getRoomList(current, pageSize, filterAddress);
        }
        else if (filterPrice) {
            resRoom = await getRoomList(current, pageSize, null, filterPrice);
        }

        else if (sort === 'bestPrice') {
            resRoom = await getRoomList(current, pageSize, undefined, '<=1000000', undefined, undefined);
        } else if (sort === 'full' || sort === undefined) {
            resRoom = await getRoomList(current, pageSize);
        } else if (address && price) {
            resRoom = await getRoomList(current, pageSize, address, price, null, null);
        } else if (address) {
            resRoom = await getRoomList(current, pageSize, address);
        }

        return resRoom;
    };
    useEffect(() => {
        const getApi = async () => {
            const resRoom = await fetchData();
            setTotal(resRoom.data.meta.total);
            setBestRoom(resRoom.data.result);
        };
        getApi();

    }, [sort, current, filterAddress, filterPrice, resetToggle])
    return (
        <>
            <Layout style={{ width: "90%", margin: "0 auto" }}>
                <Header style={{ backgroundColor: "white", height: "50%", marginTop: "30px", paddingTop: "20px", width: "40%", margin: "0 auto", borderRadius: "20px" }}>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        form={form}
                        autoComplete="off">
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="address"

                                >
                                    <Select placeholder={"Địa Chỉ"} options={exampleData.address}></Select>
                                </Form.Item>
                            </Col>

                            <Col
                                span={24}>
                                <Form.Item
                                    name="price"

                                >
                                    <Select placeholder={"Giá Tiền"} options={exampleData.price}></Select>
                                </Form.Item>
                            </Col>
                            <Col
                                style={{ display: "flex", justifyContent: 'center' }}
                                span={24}>
                                <Form.Item
                                    name="star"
                                >
                                    <Button type="primary" htmlType="submit">Lọc</Button>

                                </Form.Item>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: "20px" }}>
                            <Col span={22}></Col>
                            <Col span={2} ><Button onClick={resetForm} shape="circle"><UndoOutlined /></Button></Col>
                        </Row>


                    </Form>
                </Header>
                <Content style={{ width: "80%", margin: "0 auto" }} >
                    {bestRoom.length === 0 ? (<Result
                        icon={<SmileOutlined />}
                        title="Không Tìm Thấy Phòng Nào"
                        extra={<Button type="primary" onClick={resetForm}>Tìm Lại</Button>}
                    />) : (<> <Row>
                        {bestRoom.map((item) => {
                            return (
                                <Col span={24} key={item.id} style={{ marginTop: "30px", backgroundColor: "white", borderRadius: "10px", display: "flex", margin: "10px auto", height: "200px" }}>
                                    <img style={{ width: "200px", borderRadius: "10px" }} alt="example" src={`${import.meta.env.VITE_BE_URL}/images/default/${item?.img}`} />
                                    <div style={{ marginLeft: "2%", width: "50%" }}>
                                        <h2 style={{ marginTop: "30px" }}>{item?.name}</h2>
                                        <h4 style={{ color: "rgba(255,94,31,1.00)", marginTop: "10px" }}>{new Intl.NumberFormat().format(item?.price)} VND</h4>
                                        <div style={{ fontWeight: "700", marginTop: "10px" }}><EnvironmentOutlined />{item?.address}</div>
                                        <div style={{ marginTop: "10px" }}>Số Lượng : {item.availability}</div>
                                        <div style={{ marginTop: "10px" }}><Avatar src={`${import.meta.env.VITE_BE_URL}/images/default/${item.hotelId?.logo}`} size={'small'}></Avatar> <span>{item.hotelId?.name}</span>
                                            <Rate defaultValue={item.hotelId?.rating} disabled></Rate>
                                        </div>
                                    </div>
                                    {
                                        item.availability == 0 ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><Button disabled ><ExclamationCircleOutlined />Hết Phòng</Button></div> : <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><BookingModal prop={item}></BookingModal></div>
                                    }

                                </Col>
                            )
                        })}
                    </Row></>)}


                    <Pagination onChange={(e) => {
                        setCurrent(e)
                    }} pageSize={pageSize} style={{ marginTop: "20px" }} total={total}></Pagination>
                </Content>

            </Layout >
        </>
    )
}
export default RoomHome