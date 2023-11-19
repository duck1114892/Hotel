import { useEffect, useState } from "react"
import { callHistory } from "../service/api"
import { Button, Col, List, Row, Typography } from "antd"
import { Link } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"
import AvataComponent from "../component/avataComponent"
import '../../public/scss/viewOrder.css'
const ViewOrder = () => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await callHistory()

                setData(res.data)
                setLoading(true)

            } catch (error) {

            }
            finally {
                setLoading(false)
            }

        }
        getData()
    }, [])

    return (
        <>
            <div className="container" style={{ display: "block", height: "80vh", backgroundColor: "white" }}>
                <div className="headers" style={{ width: "100%", display: "flex", justifyContent: "space-around", marginTop: "2%", height: "1vh", backgroundColor: "white" }} >
                    <Link to="/"><Button className="backBtn" style={{
                        position: "absolute",
                        left: '100px',
                        fontSize: '20px',
                        height: '45px'
                    }}><ArrowLeftOutlined ></ArrowLeftOutlined></Button></Link>
                    <div className="text" style={{ fontSize: "40px" }}>History</div>
                    <AvataComponent props={true}></AvataComponent>
                </div>
                <div className="body" style={{ width: "100%", height: "60vh", display: "flex", justifyContent: "center" }}>
                    <List
                        style={{ width: "100%", height: "70vh", }}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item
                                style={{ marginLeft: "10%" }}
                            >
                                <List.Item.Meta
                                    title={(<>
                                        <Row>
                                            <Col span={7}>
                                                <a style={{ color: "black" }}>{item.name} </a>
                                            </Col>
                                            <Col span={7}>
                                                <a >{item.email}</a>
                                            </Col>
                                            <Col span={7}>
                                                <a className="font-size" style={{ color: "red" }}>{item.totalPrice.toLocaleString('vn-VN', { style: 'currency', currency: 'VND' })}</a>
                                            </Col>
                                        </Row>

                                    </>)}
                                    description={
                                        (<>{item.detail.map((item) => {
                                            return (<ul>
                                                <li>{item.bookName} x {item.quantity}</li>
                                            </ul>)
                                        })}</>)
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </>
    )
}
export default ViewOrder