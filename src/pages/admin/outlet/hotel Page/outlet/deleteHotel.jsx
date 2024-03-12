import React, { useEffect } from 'react';
import { Button, message, Popconfirm } from 'antd';
import { deleteHotel, deleteUser } from '../../../../../service/api';
import { DeleteOutlined } from '@ant-design/icons';
const DeleteHotel = (prop) => {

    const confirm = async (e) => {
        try {
            const res = await deleteHotel(prop.prop._id)
            if (res.statusCode === 200) {
                console.log(res)
                message.success(res.message)
                prop.confirmUpdate()
            }
        } catch (error) {

        }
    };
    return (
        <>
            <Popconfirm
                description="Bạn có muốn xóa Hotel này"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
            >
                <Button danger><DeleteOutlined /></Button>
            </Popconfirm>
        </>
    );
}
export default DeleteHotel