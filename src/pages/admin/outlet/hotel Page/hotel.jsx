import { Avatar, Button, Drawer, Image, Pagination, Table, message } from "antd";
import { useEffect, useState } from "react";
import { getHotelApi } from "../../../../service/api";
import CreateHotel from "./outlet/createHotel";
import CreatRoom from "../room Page/oulet/creatRoom";
import UpdateHotel from "./outlet/updateHotel";
import DeleteHotel from "./outlet/deleteHotel";
import RoomAction from "../room Page/oulet/roomActionDrawer";
import { useSelector } from "react-redux";


const HotelPage = () => {
    const [loading, isLoading] = useState(false)
    const [data, setData] = useState()
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState();
    const [update, isUpDate] = useState(false)
    const confrimUpdate = useSelector(state => state.isUpdateReducer.isUpdate)
    const confirmUpdate = () => {
        isUpDate(!update)
    }
    const findName = useSelector(state => state.searchReducer.keyValue)
    const getHotel = async () => {
        isLoading(true)
        try {
            const res = await getHotelApi(current, pageSize, findName)
            if (res && res.data) {
                setData(res.data.result)
                setPageSize(res.data.meta.pageSize);
                setTotal(res.data.meta.total);
                isLoading(false)
            }
            else {

            }
        } catch (error) {
            console.log(error)

        }
        finally {
            isLoading(false)
        }
    }
    useEffect(() => {
        getHotel()
    }, [current, pageSize, update, confrimUpdate, findName])
    const columns = [
        {
            title: 'Logo',
            dataIndex: 'logo',
            key: "logo",
            render: (record) => {
                return <Avatar src={`https://hotelbe.hotelduckgg.click/images/default/${record}`}></Avatar>
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: "name"

        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: "ID"

        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: "address"
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: "phone"
        },
        {
            title: 'RoomID',
            dataIndex: 'roomId',
            render: (record) => {
                try {
                    if (record.length !== 0) {
                        return <ul>{record.map((item) => (
                            <li key={item._id} ><RoomAction prop={item._id}></RoomAction></li>
                        ))}</ul>
                    } else {
                        return <span>Chưa Có Phòng</span>;
                    }
                } catch (error) {
                    console.log(error)
                }

            },
            key: "room"
        },
        {
            title: 'Tạo Phòng',
            key: 'creatRoom',
            render: (record) => {
                return (<CreatRoom prop={record} confirmUpdate={confirmUpdate} />)
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => {
                return (<div style={{ display: "flex", justifyContent: "space-between" }}><UpdateHotel type="primary" prop={record} confirmUpdate={confirmUpdate} >Chỉnh Sửa</UpdateHotel><DeleteHotel prop={record} confirmUpdate={confirmUpdate} ></DeleteHotel></div>)
            }
        },
    ];
    return (<>
        <CreateHotel confirmUpdate={confirmUpdate}></CreateHotel>
        <Table dataSource={data} columns={columns} loading={loading} pagination={false} />
        <Pagination onChange={(e) => setCurrent(e)} pageSize={pageSize} defaultCurrent={current} total={total} />
    </>)
}
export default HotelPage
