import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Modal, Row, Select, message } from 'antd';
import exampleData from '../../../../../exampleData/data'
import { useNavigate } from 'react-router-dom';
import { creatUser, getRole, updateUser } from '../../../../../service/api';
import { EditOutlined } from '@ant-design/icons';
const UpdateUserBtn = (prop) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    let [loading, setLoading] = useState(false)
    let [role, setRole] = useState([])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {

        setLoading(true)
        try {
            const createUserApi = await updateUser(prop.prop._id, {
                name: values.name,
                age: values.age,
                gender: values.gender,
                address: values.address,
                hotel: values.hotel
            })

            if (createUserApi.statusCode === 200) {
                message.success(createUserApi.message)
                prop.delete()
            }
            else {
                message.error(createUserApi.message)
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        finally {
            setLoading(false)
        }

    };
    const onFinishFailed = (errorInfo) => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
        setLoading(true)

    };
    useEffect(() => {
        const getRoles = async () => {
            const res = await getRole()
            let role = res.data.result
            setRole(role?.map((item) => {
                return {
                    "value": item._id,
                    "label": item.name
                }
            }) ?? [])
        }
        getRoles()
    }, [])

    return (
        <>
            <Button type="primary" onClick={showModal}>
                <EditOutlined />
            </Button>
            <Modal title="Chỉnh Sửa" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    layout="vertical"
                    className="form"
                    style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: "column",
                        alignItems: 'center'

                    }}
                    initialValues={prop.prop}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        style={{ width: "60%" }}
                        name="name"
                        label='Tên Tài Khoản'
                        className="form-item"
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Nhập Tên Tài Khoản !',
                            },
                        ]}
                    >
                        <Input className="input" />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "60%" }}
                        name="email"
                        label='Email'
                        className="form-item"
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Nhập Email !',
                            },
                        ]}

                    >

                        <Input disabled={true} className="input" />
                    </Form.Item>
                    <Row style={{ width: "70%" }} >
                        <Col span={8}>
                            <Form.Item
                                label='Tuổi'

                                name="age"
                                className="form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui Lòng Nhập Tuổi!',
                                    },
                                ]}
                            >

                                <Select options={exampleData.age}></Select>
                            </Form.Item></Col>
                        <Col span={8}>
                            <Form.Item
                                label='Giới Tính'

                                name="gender"
                                className="form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui Lòng Nhập Giới Tính!',
                                    },
                                ]}
                            >
                                <Select options={exampleData.sex}></Select>
                            </Form.Item></Col>
                        <Col span={8}>
                            <Form.Item
                                label='Địa Chỉ'
                                name="address"
                                className="form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui Lòng Nhập Địa Chỉ!',
                                    },
                                ]}
                            >
                                <Select options={exampleData.address}></Select>

                            </Form.Item></Col>
                    </Row>

                    <Form.Item
                        label='Hotel'
                        style={{ width: "60%" }}
                        name="hotel"
                        className="form-item"

                    >

                        <Input className="input" />
                    </Form.Item>



                    <Form.Item

                        style={{ marginTop: '10px' }}
                    >
                        <Button className="btn" style={{ height: '40px', width: '100px' }} type="primary" htmlType="submit" loading={loading}>
                            Cập Nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default UpdateUserBtn