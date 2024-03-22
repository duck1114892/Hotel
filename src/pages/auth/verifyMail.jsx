import React, { useState } from 'react';
import { Button, Form, Input, message, Result, Steps, theme } from 'antd';
import { CheckMail, verifyMailApi } from '../../service/api';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
const VerifyMail = () => {
    const [mail, setMail] = useState('')

    const steps = [
        {
            title: 'Email',
            content: <Input required type='email' style={{ maxWidth: "300px", minHeight: "50px" }} value={mail} onChange={(e) => setMail(e.target.value)} placeholder='Vui Lòng Nhập Email'></Input>,
            icon: <UserOutlined></UserOutlined>
        },
        {
            title: 'Xác Thực',
            content: <Result
                status="success"
                title="Noice !!!"
                subTitle="Vui Lòng Kiểm Tra Hòm Thư"
            />,
            icon: <MailOutlined></MailOutlined>
        }
    ];
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = async () => {
        const res = await CheckMail(mail)
        if (res.statusCode === 201) {
            let res = await verifyMailApi(mail)
            message.success(res.message)
            setCurrent(current + 1);
        }
        else {
            message.error(res.message)
        }
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    return (
        <>
            <Steps style={{ minHeight: "50px", padding: "20px 100px" }} current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
                style={{
                    marginTop: 24,
                }}
            >
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}

            </div>
        </>
    );
}
export default VerifyMail