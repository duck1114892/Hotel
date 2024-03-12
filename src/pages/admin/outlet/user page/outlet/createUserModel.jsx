import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Modal, Row, Select, message } from 'antd';
import exampleData from '../../../../../exampleData/data'
import { useNavigate } from 'react-router-dom';
import { creatUser, getRole } from '../../../../../service/api';
const CreateUserBtn = (prop) => {
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
        console.log(values)
        setLoading(true)
        try {
            const createUserApi = await creatUser({
                name: values.username,
                email: values.email,
                password: values.password,
                age: values.age,
                gender: values.gender,
                address: values.address,
                role: values.role
            })

            if (createUserApi.statusCode === 201) {
                message.success(createUserApi.message)
                prop.delete()
            }
            else {
                message.error(createUserApi.message)
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
            message.error(error.response.data.message)
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
                Tạo Người Dùng
            </Button>
            <Modal title="Tạo Người Dùng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                    initialValues={{
                        remember: true,
                    }}

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        style={{ width: "60%" }}
                        name="username"
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

                        <Input className="input" />
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
                        <Col span={8}>
                            <Form.Item
                                label='Role'
                                name="role"
                                className="form-item"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui Lòng Nhập Role!',
                                    },
                                ]}
                            >
                                <Select options={role}></Select>

                            </Form.Item></Col>
                    </Row>

                    <Form.Item
                        label='Mật Khẩu'
                        style={{ width: "60%" }}
                        name="password"
                        className="form-item"
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Nhập Mật Khẩu !',
                            },
                        ]}
                    >

                        <Input.Password className="input" />
                    </Form.Item>



                    <Form.Item

                        style={{ marginTop: '10px' }}
                    >
                        <Button className="btn" style={{ height: '40px', width: '100px' }} type="primary" htmlType="submit" loading={loading}>
                            Đăng Ký
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default CreateUserBtn