import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBookDetail } from "../service/api"
import '../../public/scss/bookDetail.css'
import { Image, InputNumber, Spin } from "antd"
import HeaderComponent from "../component/header"
const BookDetailPage = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    useEffect(() => {

        const getBookDetailApi = async () => {
            setLoading(true)
            try {
                const dataApi = await getBookDetail(id)
                setData(dataApi.data)
            }
            catch (e) {
                console.log(e)
            }
            finally {

                setLoading(false)
            }
        }
        getBookDetailApi()

    }, [])

    const onChange = (value) => {
        console.log('changed', value);
    };

    return (
        <>
            <div className="container">
                <HeaderComponent></HeaderComponent>
                {loading ? (<Spin></Spin>) : (
                    <div className="childern">
                        <Image
                            width={400}

                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                        <div className="content">

                            <h1>{data.mainText}</h1>
                            <div> <span>Tác Giả :</span> {data.author}</div>
                            <div><span>Thể Loại :</span> {data.category}</div>
                            <div><span>Giá : </span><span style={{ color: "red" }}>{data.price}</span> </div>
                            <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />
                        </div>
                    </div>
                )}


            </div>
        </>
    )
}
export default BookDetailPage