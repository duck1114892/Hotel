import { Avatar, Button, Checkbox, Form, Input, InputNumber, Modal, Select, Upload, message } from 'antd';
import { useState } from 'react';
import exampleData from '../../../../../exampleData/data';
import TextArea from 'antd/es/input/TextArea';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { callUploadBookImg, creatHotel, creatRoom, updateHotel, updateHotelRoomId } from '../../../../../service/api';
import UploadFile from '../../../../../upload/upload';
import UploadMutiFiles from '../../../../../upload/uploadMuiti';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
const CreatRoom = (prop) => {
    const [form] = useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [update, isUpDate] = useState(false)
    let logoName = useSelector(state => state.uploadReducer.singleFile)
    let sliderName = useSelector(state => state.uploadReducer.muitipleFiles)
    const onFinish = async (values) => {
        const data = {
            hotelId: values._id,
            name: values.nameRoom,
            address: values.address,
            description: values.des,
            type: values.type,
            price: values.price,
            availability: values.availability,
            img: logoName[0],
            slider: sliderName?.map((item) => {
                return item.name
            })
        }
        const res = await creatRoom(data)
        await updateHotelRoomId(prop.prop._id, { roomId: [res.data._id] })
        if (res.statusCode = 201) {
            message.success(res.message)
            setIsModalOpen(false)
            form.resetFields()
            prop.confirmUpdate()
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (<>
        <Button type="primary" onClick={showModal}>
            Create Room
        </Button>
        <Modal title={`Tạo Phòng Cho Hotel : ${prop.prop.name}`} open={isModalOpen} onOk={() => form.submit()} onCancel={handleCancel}>
            <Avatar src={`https://hotelbe.hotelduckgg.click/images/default/${prop.prop.logo}`} />
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
                }}
                initialValues={prop.prop}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Hotel Id"
                    name="_id"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập HotelId ',
                        },
                    ]}

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Tên"
                    name="nameRoom"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your tên khách sạn!',
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
                    name="des"
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
                    <InputNumber min={1} defaultValue={1} />
                </Form.Item>
                <Form.Item
                    label="Ảnh Bìa"
                    name="img"
                >
                    <UploadFile></UploadFile>
                </Form.Item>
                <Form.Item
                    label="Slider"
                    name="slider"
                >
                    <UploadMutiFiles></UploadMutiFiles>
                </Form.Item>

            </Form>
        </Modal>

    </>)
}
export default CreatRoom
