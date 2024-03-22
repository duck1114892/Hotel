import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getHotelApi } from "../../../service/api"
import { Button, Card, Col, Form, Layout, Pagination, Rate, Result, Row, Select, Slider } from "antd"
import Meta from "antd/es/card/Meta"
import Sider from "antd/es/layout/Sider"
import { Content, Header } from "antd/es/layout/layout"
import { EnvironmentOutlined, EyeOutlined, SmileOutlined, UndoOutlined } from "@ant-design/icons"
import { useForm } from "antd/es/form/Form"
import exampleData from "../../../exampleData/data"

const HotelHome = () => {
    const { sort } = useParams()
    const [mostRatingHotel, setMostRatingHotel] = useState([])
    const [title, setTitle] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [total, setTotal] = useState(6)
    const [address, setAddress] = useState()
    const nagivate = useNavigate()
    const onFinish = (e) => {
        setAddress(e.address)
    }
    const [form] = useForm()
    const resetForm = () => {
        nagivate('/hotel')
        setAddress("")
        form.resetFields()
    }
    const fetchData = async () => {
        let resHotel
        if (address) {
            resHotel = await getHotelApi(current, pageSize, undefined, undefined, address)
        }
        else if (sort === 'bestHotel') {
            resHotel = await getHotelApi(current, pageSize, undefined, 4)

        }
        else if (sort === 'hcm') {
            resHotel = await getHotelApi(current, pageSize, undefined, undefined, 'Hồ Chí Minh (Thành phố)')

        }
        else if (sort === 'hn') {
            resHotel = await getHotelApi(current, pageSize, undefined, undefined, 'Hà Nội (Thủ đô)')

        }
        else if (sort === 'dn') {
            resHotel = await getHotelApi(current, pageSize, undefined, undefined, 'Đà Nẵng (Thành phố)')

        }
        else if (sort === 'full' || sort === undefined) {
            resHotel = await getHotelApi(current, pageSize, undefined, 0, undefined)

        }

        return resHotel
    }
    useEffect(() => {
        const getApi = async () => {
            const resHotel = await fetchData()
            setTotal(resHotel.data.meta.total)
            setMostRatingHotel(resHotel.data.result)

        }
        getApi()
    }, [sort, current, pageSize, address])

    return (
        <>
            <Layout style={{ width: "90%", margin: "0 auto" }}>
                <Header style={{ backgroundColor: "white", height: "50%", marginTop: "30px", paddingTop: "20px", width: "40%", margin: "0 auto", borderRadius: "20px" }}>
                    <Form
                        name="basic"
                        style={{

                        }}
                        onFinish={onFinish}
                        form={form}
                        autoComplete="off">
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="address"
                                >
                                    <Select placeholder="Địa Chỉ" options={exampleData.address}></Select>
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
                    {mostRatingHotel.length === 0 ? (<Result
                        icon={<SmileOutlined />}
                        title="Không Tìm Thấy Khách Sạn Nào"
                        extra={<Button type="primary" onClick={resetForm}>Tìm Lại</Button>}
                    />) : (<Row>
                        {mostRatingHotel.map((item) => {
                            console.log(item?.rating)
                            return (
                                <Col span={24} key={item._id} style={{ marginTop: "30px", backgroundColor: "white", borderRadius: "10px", display: "flex", margin: "10px auto" }}>
                                    <img style={{ width: "200px", borderRadius: "10px" }} alt="example" src={`${import.meta.env.VITE_BE_URL}/images/default/${item?.logo}`} />
                                    <div style={{ marginLeft: "2%", width: "50%" }}>
                                        <h2 style={{ marginTop: "30px" }}>{item?.name}</h2>
                                        <div style={{ fontWeight: "700", color: "gray", marginTop: "20px" }}><EnvironmentOutlined />{item.address}</div>
                                        <div style={{ marginTop: "20px", color: "gray" }}>Số Lượng Phòng : {item?.roomId?.length}</div>
                                        <Rate style={{ marginTop: "20px" }} disabled defaultValue={item?.rating}></Rate>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><Link to={`/hotelDetail/${item?._id}`}><Button danger type="primary"><EyeOutlined />Xem Thêm</Button></Link></div>
                                </Col>
                            )
                        })}
                    </Row>)}

                    <Pagination onChange={(e) => {
                        setCurrent(e)
                        scrollToTop()
                    }} pageSize={pageSize} style={{ marginTop: "20px" }} total={total}></Pagination>
                </Content>
            </Layout >
        </>
    )
}
export default HotelHome