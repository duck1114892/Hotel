import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, message } from 'antd';
import moment from 'moment';
import { createBooking, getListUser, getRoom, getRoomById, getUser } from '../../../service/api';
import { useForm } from 'antd/es/form/Form';
import { CarryOutOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const BookingModal = (prop) => {
    const getId = useSelector(state => state.loginReducer.user.id);
    const get = useSelector(state => state.loginReducer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState([]);
    const [room, setRoom] = useState([]);
    const [total, setTotal] = useState();
    const [isQuantity, setQuantity] = useState(1);
    const [maxRoom, setMaxRoom] = useState(1);
    const [checkInDate, setCheckInDate] = useState()
    const [finalPrice, setFinalPrice] = useState(0);
    const [form] = useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFinalPrice(0)
    };

    const handleQuantity = (value) => {
        setQuantity(value);
        calculateTotal(value, prop.prop.price);
    };

    const calculateTotal = (quantity, pricePerDay) => {
        const startDate = form.getFieldValue('checkIn');
        setCheckInDate(startDate)
        const endDate = form.getFieldValue('checkOut');
        if (!endDate && !startDate) {
            setFinalPrice(pricePerDay)
        }
        else {
            setFinalPrice(1 * pricePerDay * (endDate?.$D - startDate?.$D))
        }

    };

    const onFinish = async (values) => {
        const formattedCheckIn = values.checkIn.toISOString();
        const formattedCheckOut = values.checkOut.toISOString();
        if (finalPrice <= 0) {
            message.error("Vui Lòng Kiểm Tra Lại Ngày Đặt")
        }
        else {
            try {
                const res = await createBooking({
                    userId: getId,
                    roomId: prop.prop._id,
                    quantity: 1,
                    total: finalPrice,
                    checkInDate: formattedCheckIn,
                    checkOutDate: formattedCheckOut,
                    status: "PENDING"
                });
                if (res.statusCode === 201) {
                    message.success(res.message);
                    setIsModalOpen(false);
                } else {
                    message.error(res.message);
                }
            } catch (error) {
                message.error(error.response.data.message);
            }
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                <CarryOutOutlined /> Đặt Phòng
            </Button>
            <Modal title="Đặt Phòng" visible={isModalOpen} onOk={() => form.submit()} onCancel={handleCancel}>
                <Form
                    name="basic"
                    style={{
                        width: "100%",
                        textAlign: "center"
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
                        name="checkIn"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Check-In date!',
                            },
                        ]}
                    >
                        <DatePicker disabledDate={(current) => {
                            return current && current < moment().startOf('day');
                        }} style={{ width: "100%" }} placeholder='Ngày Check In' format="YYYY-MM-DD HH:mm" onChange={() => { calculateTotal(form.getFieldValue('quantity'), prop.prop.price) }} />
                    </Form.Item>
                    <Form.Item

                        name="checkOut"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the Check-Out date!',
                            },
                        ]}
                    >
                        <DatePicker disabledDate={(current) => {
                            return current && current < moment().startOf('day');
                        }} style={{ width: "100%" }} placeholder='Ngày Check Out' format="YYYY-MM-DD HH:mm" onChange={() => { calculateTotal(form.getFieldValue('quantity'), prop.prop.price) }} />
                    </Form.Item>
                    <h2 style={{ marginRight: "10px", color: "rgba(255,94,31,1.00)" }}>{new Intl.NumberFormat().format(finalPrice)} VND</h2>
                </Form>
            </Modal>
        </>
    );
};

export default BookingModal;
