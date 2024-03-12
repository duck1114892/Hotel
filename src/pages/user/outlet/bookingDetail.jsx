import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getBookingForUser, getRoomById } from "../../../service/api"
import { Col, DatePicker, Spin, Tag } from "antd"
import { EnvironmentOutlined } from "@ant-design/icons"
import BookingModal from "./bookingModal"
import moment from "moment"

const BookingDetail = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getBooking = async () => {
            try {
                const res = await getBookingForUser()
                setData(res.data)
            } catch (error) {
                console.log(error)
            }

        }
        getBooking()
    }, [])
    return (
        <div style={{ width: "70%", margin: "0 auto" }}>
            <div style={{ width: "100%", overflow: "auto", }}>
                {data?.length === 0 ? (<Spin></Spin>) : (
                    <div>  {data?.map((item) => {
                        return (<Col span={24} key={item._id} style={{ marginTop: "30px", backgroundColor: "white", borderRadius: "10px", display: "flex", margin: "10px auto", height: "200px" }}>
                            <img style={{ width: "200px", borderRadius: "10px" }} alt="example" src={`${import.meta.env.VITE_BE_URL}/images/default/${item?.roomId?.img}`} />
                            <div style={{ marginLeft: "2%", width: "50%" }}>
                                <h2 style={{ marginTop: "30px" }}>{item?.roomId?.name}             {item.status === "PENDING" ? (<Tag style={{ textAlign: "center" }} color="processing">Đang Đợi Duyệt</Tag>) : (<Tag style={{ textAlign: "center" }} color="success"> Đã Duyệt</Tag>)}</h2>
                                <h4 style={{ color: "rgba(255,94,31,1.00)", marginTop: "10px" }}>{new Intl.NumberFormat().format(item.total)} VND</h4>
                                <div style={{ fontWeight: "700", marginTop: "10px" }}><EnvironmentOutlined />{item?.roomId?.address}</div>
                                <div style={{ marginTop: "10px" }}>Số Lượng Phòng Đặt : {item.quantity}</div>
                                <div style={{ marginTop: "10px" }}>
                                    <DatePicker
                                        value={moment(item.checkInDate)}
                                        format="YYYY-MM-DD"
                                        disabled
                                    />  Đến   <DatePicker
                                        value={moment(item.checkOutDate)}
                                        format="YYYY-MM-DD"
                                        disabled
                                    />
                                </div>

                            </div>
                            <div >

                            </div>

                        </Col>)
                    })}</div>
                )}

            </div>
        </div>
    )
}
export default BookingDetail