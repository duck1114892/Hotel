import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Drawer, Form, Input, InputNumber, Layout, Row, Select, message } from 'antd';
import { deleteRoom, getRoomById, updateRoom } from '../../../../../service/api';
import { LoadingOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../../../../../public/scss/roomDrawer.css"
import exampleData from '../../../../../exampleData/data';
import TextArea from 'antd/es/input/TextArea';
import UploadMutiFiles from '../../../../../upload/uploadMuiti';
import UploadFile from '../../../../../upload/upload';
import { useDispatch, useSelector } from 'react-redux';
import { isConfrimUpdate } from '../../../../../redux/confim/action';
import { useForm } from 'antd/es/form/Form';
const RoomAction = (prop) => {
    const [form] = useForm()
    const [open, setOpen] = useState(false);
    const [data, setData] = useState()
    const [hotelRef, setHotelRef] = useState()
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [isUpdate, setUpdate] = useState(false)
    const dispatch = useDispatch()
    let logoName = useSelector(state => state.uploadReducer.singleFile)
    let sliderName = useSelector(state => state.uploadReducer.muitipleFiles)

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        form.resetFields()
        setOpen(false);
    };
    const onFinish = async (values) => {
        console.log(values)
        const datas = {
            name: values.name,
            address: values.address,
            description: values.description,
            type: values.type,
            price: values.price,
            availability: values.availability,
            img: logoName[0],
            slider: sliderName?.map((item) => {
                return item.name
            })
        }
        const res = await updateRoom(prop.prop, datas)
        if (res.statusCode === 200) {
            message.success(res.message)
            setOpen(false);
        }
    };
    const handleDelete = async (id) => {
        const res = await deleteRoom(id)
        if (res.statusCode === 200) {
            showDrawer(false)
            setOpen(false)
            dispatch(isConfrimUpdate())
            message.success(res.message)

        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const getRoomWithId = async () => {
        const res = await getRoomById(prop.prop)
        setLoading(true)
        try {
            if (res.statusCode === 200) {
                setData(res.data)
                setHotelRef(res.data.hotelId)
                setImages(res?.data.slider.map((item) => {
                    return {
                        original: `http://localhost:9900/images/default/${item}`,
                        thumbnail: `http://localhost:9900/images/default/${item}`,
                    }
                }))
                setLoading(false)

            }
            else {
                message.error(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {

        getRoomWithId()
    }, [])

    return (
        <>
            <a onClick={showDrawer}>{prop.prop}</a>
            <Drawer title={`Phòng : ${prop.prop}`} width={'70%'} placement="right" onClose={onClose} open={open}>
                {loading ? <LoadingOutlined></LoadingOutlined> : (<>
                    <Layout>
                        <Header style={{ height: "10%", color: "white" }}>
                            <Row>
                                <Col span={12} style={{ fontSize: '15px' }}>
                                    <Avatar
                                        style={{ width: "40px", height: "40px" }}
                                        src={`http://localhost:9900/images/default/${hotelRef?.logo}`} />

                                    <div style={{ display: "flex" }}>
                                        <h3 style={{ marginRight: "20px" }}>Id:</h3>
                                        {` ${hotelRef?._id}`}
                                    </div>

                                    <div style={{ display: "flex" }}>
                                        <h3 style={{ marginRight: "20px" }}>Tên:</h3>
                                        {` ${hotelRef?.name}`}
                                    </div>
                                </Col>

                                <Col span={12} style={{ textAlign: 'center' }}>

                                    <ImageGallery
                                        showThumbnails={true}
                                        showPlayButton={false}
                                        showFullscreenButton={false}
                                        autoPlay={true}
                                        showNav={false}
                                        showIndex={false}
                                        items={images} />
                                </Col>
                            </Row>

                        </Header>
                        <Content>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                style={{
                                    maxWidth: 600,
                                    marginTop: "2%"
                                }}
                                initialValues={data}
                                form={form}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"

                            >

                                <Form.Item
                                    label="Tên"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your tên phòng!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Địa Chỉ"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Địa Chỉ',
                                        },
                                    ]}
                                >
                                    <Select options={exampleData.address}></Select>
                                </Form.Item>
                                <Form.Item
                                    label="Trạng Thái"
                                    name="type"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Trạng Thái',
                                        },
                                    ]}
                                >
                                    <Select options={exampleData.status}></Select>
                                </Form.Item>
                                <Form.Item
                                    label="Mô Tả"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mô Tả',
                                        },
                                    ]}
                                >
                                    <TextArea></TextArea>
                                </Form.Item>
                                <Form.Item
                                    label="Giá"
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui Lòng Nhập Giá',
                                        },
                                    ]}
                                >
                                    <InputNumber min={1000} defaultValue={1000} />
                                </Form.Item>
                                <Form.Item
                                    label="Số Lượng Phòng"
                                    name="availability"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui Lòng Nhập Số Lượng Phòng',
                                        },
                                    ]}

                                >
                                    <InputNumber min={1} />
                                </Form.Item>
                                <Row style={{ justifyContent: 'center' }}>
                                    <Col>
                                        <Form.Item
                                            label="Ảnh Bìa"
                                            name="img"
                                        >
                                            <UploadFile></UploadFile>
                                        </Form.Item>
                                    </Col>

                                    <Col>
                                        <Form.Item
                                            label="Slider"
                                            name="slider"
                                        >
                                            <UploadMutiFiles></UploadMutiFiles>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div style={{ display: 'flex', width: '100%', textAlign: 'center', justifyContent: "center" }}>

                                    <Form.Item
                                    >
                                        <Button type="primary" htmlType="submit">
                                            Update
                                        </Button>
                                    </Form.Item>

                                    <Form.Item

                                    >
                                        <Button danger onClick={() => handleDelete(prop.prop)}>
                                            Delete
                                        </Button>
                                    </Form.Item>
                                </div>
                            </Form>

                        </Content>
                    </Layout>
                </>)}
            </Drawer >
        </>
    );
};
export default RoomAction;