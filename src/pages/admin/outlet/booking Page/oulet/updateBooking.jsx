import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, message } from 'antd';
import moment from 'moment';
import { createBooking, getRoom, getRoomById, getUser, updateBooking } from '../../../../../service/api';
import { useForm } from 'antd/es/form/Form';

const UpdateBooking = (prop) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState([]);
    const [room, setRoom] = useState([]);
    const [total, setTotal] = useState()
    const [isQuantity, setQuantity] = useState(1)
    const [form] = useForm()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleQuantity = (e) => {
        setQuantity(e)
    }
    const hanldeGetTotal = async (e) => {
        const getTotal = await getRoomById(e)
        setTotal(getTotal.data.price)
    }
    const handleGetPrice = (a, b) => {
        return a * b
    }

    const onFinish = async (values) => {
        const formattedCheckIn = values.checkIn.toISOString();
        const formattedCheckOut = values.checkOut.toISOString();
        try {
            const res = await updateBooking(prop.prop,
                {
                    userId: values.email,
                    roomId: values.roomId,
                    quantity: values.quantity,
                    total: total * isQuantity,
                    checkInDate: formattedCheckIn,
                    checkOutDate: formattedCheckOut
                }
            )
            if (res.statusCode === 200) {
                message.success(res.message)
                setIsModalOpen(false)
                prop.confrim()
                form.resetFields()
            }
            else {
                message.error(res.message)
            }
        } catch (error) {
            message.error(error.response.data.message)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const getInfo = async () => {
            const getEmail = await getUser();
            const getRooms = await getRoom();
            try {
                if (getEmail.statusCode === 200 && getRooms.statusCode === 200) {
                    const getUserEmail = getEmail.data.result;
                    const getUserRoom = getRooms.data.result;

                    setEmail(
                        getUserEmail.map((item) => {
                            return {
                                value: item._id,
                                label: item.email,
                            };
                        })
                    );

                    setRoom(
                        getUserRoom.map((item) => {
                            return {
                                value: item._id,
                                label: item.name,
                                children: (record) => {
                                    return <div>{record.name}</div>;
                                },
                            };
                        })
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        getInfo();
    }, []);

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Update
            </Button>
            <Modal title="Create Booking" visible={isModalOpen} onOk={() => form.submit()} onCancel={handleCancel}>
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
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please select an email!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{
                                width: 200,
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => option?.label?.includes(input)}
                            filterSort={(optionA, optionB) =>
                                optionA?.label.toLowerCase().localeCompare(optionB?.label.toLowerCase())
                            }
                            options={email}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Room"
                        name="roomId"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a room!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{
                                width: 200,
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => option?.label?.includes(input)}
                            filterSort={(optionA, optionB) =>
                                optionA?.label.toLowerCase().localeCompare(optionB?.label.toLowerCase())
                            }
                            options={room}
                            onChange={(e) => hanldeGetTotal(e)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số Lượng Phòng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the quantity!',
                            },
                        ]}
                    >
                        <InputNumber min={0} onChange={(e) => { handleQuantity(e) }} />
                    </Form.Item>
                    <Form.Item
                        label="Ngày Check In"
                        name="checkIn"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Check-In date!',
                            },
                        ]}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                    </Form.Item>
                    <Form.Item
                        label="Ngày Check Out"
                        name="checkOut"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Check-Out date!',
                            },
                        ]}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                    </Form.Item>
                    <span style={{ marginRight: "10px" }}>Giá :</span>
                    <InputNumber min={1} formatter={value => ` ${value} VND`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')} value={handleGetPrice(total, isQuantity)} style={{ width: "50%", textAlign: "center" }} />

                </Form>
            </Modal>
        </>
    );
};

export default UpdateBooking;
