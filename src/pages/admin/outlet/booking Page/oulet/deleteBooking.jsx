import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { deleteBooking } from '../../../../../service/api';


const DeleteBooking = (prop) => {
    const confirm = async () => {
        const res = await deleteBooking(prop.prop)
        if (res.statusCode === 200) {
            message.success(res.message)
            prop.confrim()
        }
        else {
            message.error("Error")
        }
    };
    const cancel = (e) => {

        message.error('Click on No');
    };
    return (
        <Popconfirm
            description="Are you sure to delete this ?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button danger>Delete</Button>
        </Popconfirm>
    );
}
export default DeleteBooking;