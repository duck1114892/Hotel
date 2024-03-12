import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getRoomById } from "../../../service/api"
import { Card, Image, Spin } from "antd"
import ReactImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css";
import Meta from "antd/es/card/Meta"
import { EnvironmentOutlined } from "@ant-design/icons"
import Slider from "react-slick"
const RoomDetail = () => {
    const { id } = useParams()
    const [image, setImages] = useState([])
    const [data, setData] = useState()
    useEffect(() => {
        const getRoom = async () => {
            const res = await getRoomById(id)
            console.log(res)
            try {
                if (res.statusCode === 200) {
                    setData(res.data)
                    setImages(res?.data.slider.map((item) => {
                        return {
                            original: `${import.meta.env.VITE_BE_URL}/images/default/${item}`,
                            thumbnail: `${import.meta.env.VITE_BE_URL}/images/default/${item}`,
                        }
                    }))
                }
            } catch (error) {

            }
        }
        getRoom()
    }, [])
    return (
        <>{!data ? <div style={{ width: "100%", textAlign: "center" }}><Spin></Spin></div> :
            (<>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "30%" }}>
                        <Card style={{ height: "90vh" }}>
                            <Image src={`${import.meta.env.VITE_BE_URL}/images/default/${data.img}`} style={{}}></Image>
                            <Slider></Slider>
                        </Card>

                    </div>
                    <div style={{ width: "70%" }}>
                        <Card style={{ height: "90vh" }}>
                            <h1>{data.name}</h1>
                            <Meta description={<><EnvironmentOutlined /> <span>{data.address}</span></>} />
                        </Card>

                    </div>

                </div>

            </>)
        }</>
    )
}
export default RoomDetail
