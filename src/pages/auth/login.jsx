import { Button, Checkbox, Form, Input, Layout, message, notification } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout";
import '../../styles/reset.css'
import { loginApi } from "../../service/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../utils/axios-customsize";
const LoginPage = () => {

    const onFinish = async (values) => {
        const data = await loginApi(values.username, values.password)

        if (data.statusCode === 201) {
            console.log(data)
            message.success(`Xin Chào ${data.data.user.email}`)
            localStorage.setItem('access_token', data.data.access_token)

        }
        else {

        }


    };
    const onFinishFailed = (errorInfo) => {

    };
    console.log(useSelector(state => state.loginReducer))
    return (
        <Layout style={{ minHeight: '100vh' }} >
            <Header style={{
                color: "Blacks",
                backgroundColor: 'white',
                textAlign: 'center',
                fontSize: "30px"
            }}>Đăng Nhập</Header>
            <Content
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Form
                    name="basic"
                    layout="vertical"
                    className="form"
                    labelCol={{
                        span: 8,

                    }}
                    wrapperCol={{
                        span: 24,
                    }}

                    style={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: "column",
                        alignItems: 'center'

                    }}


                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                >
                    <Form.Item
                        style={{ width: "60%" }}
                        name="username"
                        label='Email'
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
                        <Button className="btn" style={{ height: '40px', width: '100px' }} type="primary" htmlType="submit">
                            Đăng Nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
            <Footer style={{ color: 'black' }}>Bạn Chưa Có Tài Khoản ? <Link to='/signUp' relative="path">Đăng Ký</Link></Footer>
        </Layout>
    )
}
export default LoginPage