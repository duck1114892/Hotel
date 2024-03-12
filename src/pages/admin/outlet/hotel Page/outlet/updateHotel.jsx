import { Button, Checkbox, Form, Input, InputNumber, Modal, Select, Upload, message } from 'antd';
import { useState } from 'react';
import exampleData from '../../../../../exampleData/data';
import TextArea from 'antd/es/input/TextArea';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { callUploadBookImg, creatHotel, updateHotel } from '../../../../../service/api';
import UploadFile from '../../../../../upload/upload';
import UploadMutiFiles from '../../../../../upload/uploadMuiti';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
const UpdateHotel = (prop) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm()
    const dispatch = useDispatch()
    let logoName = useSelector(state => state.uploadReducer.singleFile)
    let sliderName = useSelector(state => state.uploadReducer.muitipleFiles)
    const onFinish = async (values) => {
        const data = {
            name: values.name,
            address: values.address,
            description: values.des,
            phone: values.phone,
            logo: logoName[0],
            slider: sliderName?.map((item) => {
                return item.name
            }),
        }

        const res = await updateHotel(prop.prop._id, data)
        if (res.statusCode === 200) {
            prop.confirmUpdate()
            message.success(res.message)
            setIsModalOpen(false);
            dispatch(isUpload(''))
            dispatch(isUploadMutiple([]))
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
        form.resetFields()
    };

    return (<>
        <Button type="primary" onClick={showModal}>
            Update Hotel
        </Button>
        <Modal title="Chỉnh Sửa Khách Sạn" open={isModalOpen} onOk={() => form.submit()} onCancel={handleCancel}>
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Tên"
                    name="name"
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
                    label="Số Điện Thoại"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Số Điện Thoại ',
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} min={0} controls={false} ></InputNumber>
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
                    label="Logo"
                    name="logo"
                >
                    <UploadFile></UploadFile>
                </Form.Item>
                <Form.Item
                    label="Slider"
                    name="slider"
                >
                    <UploadMutiFiles></UploadMutiFiles>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </Modal>

    </>)
}
export default UpdateHotel