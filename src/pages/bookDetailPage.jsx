import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBookDetail } from "../service/api"
import '../../public/scss/bookDetail.css'
import { Button, Form, Image, InputNumber, Modal, Spin, Upload, message } from "antd"
import HeaderComponent from "../component/header"
import { ShoppingCartOutlined } from "@ant-design/icons"
import "react-image-gallery/styles/css/image-gallery.css";
import { v4 as uuidv4 } from 'uuid'
import ReactImageGallery from "react-image-gallery"
import { useDispatch } from "react-redux"
import addCartReducer from "../redux/cart/cartRedux"
import { isAddCart } from "../redux/cart/action"

const BookDetailPage = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [prices, setPrice] = useState()
    const [vnd, setVnd] = useState()
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const { id } = useParams()
    const dispatch = useDispatch()

    const images = fileList.map((item) => {
        return {
            original: item.url,
            thumbnail: item.url,
        }
    })
    const onFinish = (value) => {
        if (data && value) {
            const cart = {
                quantity: value.quanity,
                _id: data._id,
                detail: {
                    _id: data._id,
                    img: data.thumbnail,
                    name: data.mainText
                }
            }
            message.success('Đã Thêm Vào Giỏ Hàng')
            dispatch(isAddCart(cart))

        }
        else {
            message.error('Lỗi')
        }
    }
    useEffect(() => {
        const getBookDetailApi = async () => {
            setLoading(true);
            try {
                const dataApi = await getBookDetail(id);
                setData(dataApi.data);
                setPrice(dataApi.data.price);
                const number = dataApi.data.price;
                const formattedNumber = number.toLocaleString('vi-VN');
                setVnd(formattedNumber);

                const thumbnail = {
                    uid: uuidv4(),
                    name: dataApi.data.mainText,
                    status: 'done',
                    url: `${import.meta.env.VITE_BE_URL}/images/book/${dataApi.data.thumbnail}`,
                };

                // Check if slider is defined and has the sliderimg property
                const sliderImages = dataApi.data.slider ? dataApi.data.slider.map((item) => ({
                    url: `${import.meta.env.VITE_BE_URL}/images/book/${item}`,
                }))
                    : [];

                setFileList([thumbnail, ...sliderImages]);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        getBookDetailApi();
    }, [id]);

    const onChange = (value) => {
        console.log(prices * value)
        setPrice(data.price * value)
        const number = data.price * value;
        const formattedNumber = number.toLocaleString('vi-VN');
        setVnd(formattedNumber)
    };

    return (
        <>
            {/* `${import.meta.env.VITE_BE_URL}/images/book/${data.thumbnail}` */}
            <div className="container">
                <HeaderComponent></HeaderComponent>
                {loading ? (<Spin></Spin>) : (
                    <div className="childern">
                        <div style={{ marginTop: "2%", width: "50%" }}>
                            <ReactImageGallery autoPlay={true} showPlayButton={false} showFullscreenButton={false} showBullets={false} showNav={false} items={images} />

                        </div>
                        <div className="content">
                            <div style={{ fontFamily: " Helvetica, Arial, sans-serif", fontSize: "25px", textAlign: 'center' }}>{data.mainText}</div>
                            <div style={{ width: "100%", marginTop: "8%" }}>{loading ? (<div>loading...</div>) : <span style={{ width: "100%", textAlign: 'center', fontSize: "40px", color: "red" }}>₫{vnd}</span>}
                            </div>
                            <div className="item"> <span>Tác Giả :</span>  <span style={{ color: "#018AF7" }}>{data.author}</span> </div>
                            <div className="item"><span>Thể Loại :</span> <span style={{ color: "black" }}>{data.category}</span></div>
                            <div style={{ marginTop: "8%" }}>
                                <Form
                                    name="basic"
                                    form={form}
                                    onFinish={onFinish}
                                >
                                    <div className="item" style={{ marginTop: "8%" }} > Số Lượng : <Form.Item initialValue={1}
                                        name="quanity"><InputNumber name="quantity" min={1} max={10} onChange={onChange} /></Form.Item></div>

                                    <div className="btn" style={{ marginTop: "20%", width: "100%" }}><Button style={{ width: "50%", height: "45px", marginRight: "8%" }} type="primary" > Buy </Button> <Button onClick={() => { form.submit() }} size='large' style={{ textAlign: 'center', width: "50%", height: "45px" }} ><ShoppingCartOutlined /></Button></div>
                                </Form>
                            </div>
                        </div>
                        <div>

                        </div>

                    </div>
                )}


            </div>
        </>
    )
}
export default BookDetailPage