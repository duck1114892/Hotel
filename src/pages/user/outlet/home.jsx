import { useEffect, useState } from "react"
import { getHotelApi, getRoom, getRoomList } from "../../../service/api"
import { Button, Card, Col, Flex, Form, Image, Pagination, Rate, Result, Row, Select, Skeleton, Spin } from "antd"
import Meta from "antd/es/card/Meta"
import { CreditCardOutlined, CrownOutlined, EnvironmentOutlined, EyeOutlined, LeftOutlined, PercentageOutlined, RightOutlined, SearchOutlined, TagOutlined } from "@ant-design/icons"
import { handleSearchs } from "../../../redux/search/action"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { isFilters } from "../../../redux/filter/action"
import { useForm } from "antd/es/form/Form"
import exampleData from "../../../exampleData/data"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { Footer } from "antd/es/layout/layout"

const Home = () => {
    const { Meta } = Card
    const [form] = useForm()
    const nagivate = useNavigate()
    const dispatch = useDispatch()
    const [mostRatingHotel, setMostRatingHotel] = useState([])
    const [bestRoom, setBestRoom] = useState([])
    const [getHotellAddress, setHotelAddress] = useState([])
    const settings = {
        speed: 700,
        slidesToShow: bestRoom.length,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "0"
    };
    const settings1 = {
        speed: 700,
        slidesToShow: bestRoom.length,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "0"
    };
    const onFinish = (e) => {
        if (e.address && e.price) {
            nagivate(`room/${e.address}/${e.price}`)
        }
    }
    const NextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
                <div className="custom-next-arrow" onClick={onClick}>
                    <Button shape="circle"><RightOutlined /></Button>
                </div>
            </div>
        );
    };
    const PrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} style={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}>
                <div className="custom-next-arrow" onClick={onClick}>
                    <Button shape="circle"><LeftOutlined /></Button>
                </div>
            </div>
        );
    };
    const filter = useSelector(state => state.filterReducer)
    const search = useSelector(state => state.searchReducer)
    useEffect(() => {
        const getHoltelMostRating = async () => {
            const resHotel = await getHotelApi(null, null, null, 4)
            console.log()
            setMostRatingHotel(resHotel.data.result)
            const resRoom = await getRoomList(undefined, undefined, undefined, '<=1000000', undefined, undefined)
            setBestRoom(resRoom.data.result)
            const getHotel = await getHotelApi()
            setHotelAddress(getHotel.data.result)
        }
        getHoltelMostRating()
    }, [])
    return (
        <>  <Flex vertical justify="center" align="center" >

        </Flex >
            <Row style={{ marginTop: "50px" }}>
                {mostRatingHotel.length === 0 ? (
                    <Spin></Spin>
                ) : (
                    <div style={{ width: "80%", margin: "0 auto" }}>
                        <h2 style={{ fontFamily: "Godwit,MuseoSans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol", color: "rgb(35, 93, 159)" }}><CrownOutlined />Khách Sạn Nổi Bật Nhất</h2>
                        <Slider {...settings} prevArrow={<PrevArrow></PrevArrow>} nextArrow={<NextArrow></NextArrow>} autoplay >
                            {mostRatingHotel.map((item) => (
                                <div key={item.id} style={{ width: "292px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                                    <Link to={`hotelDetail/${item._id}`}>
                                        <Card
                                            key={item.id}
                                            hoverable
                                            style={{
                                                width: "292px",

                                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                                            }}
                                            cover={<img alt="example" src={`${import.meta.env.VITE_BE_URL}/images/default/${item.logo}`} />}
                                        >
                                            <Meta title={`${item.name}`} description={<><EnvironmentOutlined />{item.address}</>} />
                                            <Rate disabled defaultValue={item.rating} />
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                        <div style={{ justifyContent: "center", display: 'flex', marginTop: "30px" }} > <Link to={'/hotel/bestHotel'}><Button type="primary">Xem Thêm <RightOutlined /></Button></Link></div>
                    </div>
                )}

            </Row>
            <Row style={{ marginTop: "50px" }}>
                {bestRoom.length === 0 ? (
                    <Spin></Spin>
                ) : (
                    <div style={{ width: "80%", margin: "0 auto" }}>
                        <h2 style={{ fontFamily: "Godwit,MuseoSans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol", color: "rgb(35, 93, 159)" }}><PercentageOutlined />Phòng Giá Hợp Lý</h2>
                        <Slider {...settings1} prevArrow={<PrevArrow></PrevArrow>} nextArrow={<NextArrow></NextArrow>} autoplay={true}>
                            {bestRoom.map((item) => (
                                <div key={item.id} style={{ width: "292px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                                    <Card
                                        key={item.id}
                                        hoverable
                                        style={{
                                            width: "292px",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",

                                        }}
                                        cover={(<><img alt="example" src={`${import.meta.env.VITE_BE_URL}/images/default/${item.img}`} />
                                        </>)}
                                    >
                                        <Meta title={`${item.name}`} description={<><EnvironmentOutlined />{item.address}</>} />
                                        <h4 style={{ color: "rgba(255,94,31,1.00)" }}>{new Intl.NumberFormat().format(item.price)} VND</h4>
                                    </Card>

                                </div>
                            ))}
                        </Slider>
                        <div style={{ justifyContent: "center", display: 'flex', marginTop: "30px" }} > <Link to={'/room/bestPrice'}><Button type="primary">Xem Thêm <RightOutlined></RightOutlined></Button></Link></div>
                    </div>
                )}

            </Row>
            <Row style={{ marginTop: "50px" }}>
                {exampleData.address.length === 0 ? (
                    <Spin></Spin>
                ) : (<div style={{ width: "80%", margin: "0 auto" }}>
                    <h2 style={{ fontFamily: "Godwit,MuseoSans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol", color: "rgb(35, 93, 159)" }}><EnvironmentOutlined />Thành Phố</h2>

                    <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>

                        <Link to='hotel/hcm'>  <Card
                            hoverable
                            style={{
                                width: "392px",
                                height: "250px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                background: "url('../../../../public/img/hcm.jpg')",
                                backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%) ,url('../../../../public/img/hcm.jpg')"
                            }}
                        >
                            <div style={{ color: "white", width: "100%", display: 'flex', justifyContent: "center", fontWeight: "500", fontSize: "30px" }}>Hồ Chí Minh</div>
                        </Card></Link>
                        <Link to="hotel/hn"> <Card
                            hoverable
                            style={{
                                width: "392px",
                                height: "250px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                background: "url('../../../../public/img/hcm.jpg')",
                                backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%) ,url('../../../../public/img/hn.jpg')"
                            }}
                        >
                            <div style={{ color: "white", width: "100%", display: 'flex', justifyContent: "center", fontWeight: "500", fontSize: "30px" }}>Hà Nội</div>
                        </Card>
                        </Link>
                        <Link to="hotel/dn">
                            <Card
                                hoverable
                                style={{
                                    width: "392px",
                                    height: "250px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    background: "url('../../../../public/img/hcm.jpg')",
                                    backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%) ,url('../../../../public/img/dn.jpg')"
                                }}
                            >
                                <div style={{ color: "white", width: "100%", display: 'flex', justifyContent: "center", fontWeight: "500", fontSize: "30px" }}>Đà Nẵng</div>
                            </Card>
                        </Link>
                    </div>
                </div>

                )}

            </Row>
            <Footer></Footer>
        </>
    )
}
export default Home 