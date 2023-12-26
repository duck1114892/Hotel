import React, { useEffect } from 'react';
import { Button, message, Popconfirm } from 'antd';
import { deleteUser } from '../../../../../service/api';
const DeleteUSerModel = (prop, isDelete) => {
    const confirm = async (e) => {
        try {
            const res = await deleteUser(prop.prop._id)
            if (res && res.data) {
                console.log(res)
                message.success(res.message)
                prop.delete()
            }
        } catch (error) {

        }
    };
    return (
        <>
            <Popconfirm
                description="Bạn có muốn xóa người dùng này"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
            >
                <Button danger>Delete</Button>
            </Popconfirm>
        </>
    );
}
export default DeleteUSerModel