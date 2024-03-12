import { Avatar, Button, Card, Col, Form, Image, Layout, Rate, Row, Spin } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react"
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Slider from "react-slick";
import { creatRatingApi, getHotelById, getRatingApi, getRoomById } from "../../../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { EnvironmentOutlined, EyeOutlined } from "@ant-design/icons";
import { current } from "@reduxjs/toolkit";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
import BookingModal from "./bookingModal";
const HotelDetail = () => {
    const baseUrl = import.meta.env.VITE_BE_URL
    const { id } = useParams()
    const nagivate = useNavigate()
    const [data, setData] = useState()
    const [rating, setRating] = useState()
    const [initialRender, setInitialRender] = useState(true);
    const [room, setRoom] = useState([])
    const [form] = useForm()
    const [comment, setComment] = useState([])
    const [update, setUpdate] = useState(false)
    const rate = async (e) => {
        const res = await creatRatingApi(id, e.rating, e.text)
        if (res) {
            form.resetFields()
            setUpdate(!update)
        }
    }
    useEffect(() => {
        const getHotel = async () => {
            try {
                const res = await getHotelById(id)
                setRating(res.data.rating)
                setData(res.data)
                let tempRoom = []
                res?.data?.roomId.map(async (item) => {
                    const res = await getRoomById(item)
                    tempRoom.push(res)
                })
                setRoom(tempRoom)
            } catch (error) {
                console.log(error)
            }
            finally {

                const res = await getRatingApi(id)
                setComment(res.data)
            }
        }
        getHotel()
    }, [id, update])

    if (initialRender && !data) {
        return null;
    }
    console.log(comment)
    return (
        <>
            <Layout>
                <Content style={{ marginTop: "10px" }}>
                    <Row style={{ margin: "0 auto", width: "80%" }}>
                        <div style={{
                            width: "100%",
                            height: "300px",
                            overflow: "hidden",
                            margin: "0 auto",
                            position: "relative",
                            borderRadius: "20px"
                        }}>
                            <Slider autoplay={true}>
                                {data?.slider?.map((item) => {
                                    return (

                                        <img key={item} src={`${baseUrl}/images/default/${item}`} style={{ width: "20%", height: "200px", objectFit: "cover" }}>
                                        </img>
                                    )
                                })}
                            </Slider>
                            <Avatar src={`${baseUrl}/images/default/${data?.logo}`} style={{ position: "absolute", zIndex: 1, bottom: 0, left: 10, border: "2px gray solid" }} size={150}></Avatar>
                            <div style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", width: "85%", height: "100px", zIndex: 1, position: "absolute", bottom: 25, right: 20, borderRadius: "20px" }}>
                                <Row>
                                    <Col style={{ marginLeft: "40px", fontSize: "20px", fontWeight: "600" }} span={24}>{data?.name}</Col>
                                    <Col style={{ marginLeft: "20px", marginTop: "6px", fontSize: "16px" }} span={24}><EnvironmentOutlined /> {data?.address}</Col>
                                    <Col style={{ marginLeft: "40px" }} span={24}>
                                        <Rate disabled defaultValue={rating} />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <Card style={{ width: "80%", margin: "0 auto" }}>
                            <div style={{ display: "flex", height: "100vh" }}>
                                <div style={{ width: "40%" }}>
                                    <span style={{ fontWeight: "600", color: "rgb(35, 93, 159)", fontSize: "25px" }}>Mổ Tả </span>
                                    <div style={{ height: "100px", overflow: "auto", textOverflow: "ellipsis" }}> {data?.description}</div>
                                    <span style={{ fontWeight: "600", color: "rgb(35, 93, 159)", fontSize: "25px" }}>Đánh Giá</span>

                                    <div style={{ marginRight: "20px", overflow: "auto  ", height: "50vh", marginTop: "20px" }}>
                                        <div>
                                            {comment.length === 0 ? (<h2>Trống</h2>) :
                                                <>        {comment?.map((item) => {
                                                    return (
                                                        <Card style={{ display: "flex", maxHeight: "100px" }}>
                                                            <div><h2 style={{ fontSize: "15px" }}>{item.createdBy.email}</h2></div>
                                                            <div style={{ overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: "nowrap", width: "200px" }}>{item.comment}</div>
                                                            <Rate style={{ fontSize: "15px" }} defaultValue={item.rating}></Rate>
                                                        </Card>
                                                    )
                                                })}</>
                                            }

                                        </div>

                                    </div>
                                    <div style={{ marginRight: "20px", marginTop: "20px" }}>
                                        <Form
                                            form={form}
                                            onFinish={rate}>
                                            <Form.Item
                                                name="rating">
                                                <Rate style={{ margin: "0 auto" }}></Rate>
                                            </Form.Item>
                                            <Form.Item
                                                name="text">
                                                <TextArea maxLength={100} style={{ maxHeight: "70px" }}></TextArea>
                                            </Form.Item>
                                            <Form.Item>
                                                <Button htmlType="submit" type="primary" style={{ margin: "0 auto", width: "100%" }}>Đánh Giá</Button>
                                            </Form.Item>
                                        </Form>



                                    </div>
                                </div>
                                <div style={{ width: "100%", overflow: "auto", }}>
                                    {room.length === 0 ? (<Spin></Spin>) : (
                                        <div>  {room?.map((item) => {
                                            return (<Col span={24} key={item?.data._id} style={{ marginTop: "30px", backgroundColor: "white", borderRadius: "10px", display: "flex", margin: "10px auto", height: "200px" }}>
                                                <img style={{ width: "200px", borderRadius: "10px" }} alt="example" src={`http://localhost:9900/images/default/${item?.data?.img}`} />
                                                <div style={{ marginLeft: "2%", width: "50%" }}>
                                                    <h2 style={{ marginTop: "30px" }}>{item?.data?.name}</h2>
                                                    <h4 style={{ color: "rgba(255,94,31,1.00)", marginTop: "10px" }}>{new Intl.NumberFormat().format(item?.data?.price)} VND</h4>
                                                    <div style={{ fontWeight: "700", marginTop: "10px" }}><EnvironmentOutlined />{item?.data?.address}</div>
                                                    <div style={{ marginTop: "10px" }}>Số Lượng : {item?.data?.availability}</div>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{item?.data?.type === "OUT_OFF" ? (<Button disabled>Hết Phòng</Button>) : (<BookingModal prop={item?.data} ></BookingModal>)}  </div>

                                            </Col>)
                                        })}</div>
                                    )}

                                </div>
                            </div>

                        </Card>
                    </Row>
                </Content >
            </Layout >
        </>
    )
}
export default HotelDetail