import { DatePicker, Table, TimePicker, Spin, Pagination, message, Tag, Button } from "antd";
import { useEffect, useState } from "react";
import { getBooking, updateBooking } from "../../../../service/api";
import moment from "moment";
import CreatBooking from "./oulet/creatBooking";
import UpdateBooking from "./oulet/updateBooking";
import DeleteBooking from "./oulet/deleteBooking";

const BookingPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState();
    const [selectedCheckOutDateTime, setSelectedCheckOutDateTime] = useState();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState();
    const [update, setUpdate] = useState(false);

    const confirmUpdate = () => {
        setUpdate(!update);
    }

    const handleCheckInDateChange = (date, dateString) => {
        const newDateTime = moment(dateString + ' ' + selectedCheckOutDateTime.format('HH:mm:ss'));
        setSelectedDateTime(newDateTime);
    };

    const handleCheckInTimeChange = (time, timeString) => {
        const newDateTime = moment(selectedDateTime.format('YYYY-MM-DD') + ' ' + timeString);
        setSelectedDateTime(newDateTime);
    };

    const handleCheckOutDateChange = (date, dateString) => {
        const newDateTime = moment(dateString + ' ' + selectedDateTime.format('HH:mm:ss'));
        setSelectedCheckOutDateTime(newDateTime);
    };

    const handleCheckOutTimeChange = (time, timeString) => {
        const newDateTime = moment(selectedDateTime.format('YYYY-MM-DD') + ' ' + timeString);
        setSelectedCheckOutDateTime(newDateTime);
    };
    const handleCheck = async (id) => {
        const res = await updateBooking(id, { status: "OK" })
        if (res) {
            setUpdate(!update)
        }
    }
    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userId',
            render: (record) => (<div>{record?.email}</div>),
            key: 'userId',
        },
        {
            title: 'Room',
            dataIndex: 'roomId',
            render: (record) => (<div>{record?.name}</div>),
            key: 'roomId',
        },
        {
            title: 'Check In Date',
            dataIndex: 'checkInDate',
            render: (record) => (
                <>
                    <DatePicker
                        value={moment(record)}
                        format="YYYY-MM-DD"
                        disabled
                    />

                </>
            ),
            key: 'checkInDate',
        },
        {
            title: 'Check Out Date',
            dataIndex: 'checkOutDate',
            render: (record) => (
                <>
                    <DatePicker
                        value={moment(record)}
                        onChange={handleCheckOutDateChange}
                        format="YYYY-MM-DD"
                        disabled
                    />

                </>
            ),
            key: 'checkOutDate',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'Total',
        },
        {
            title: 'Status',
            key: 'status',
            render: (record) => (
                <div style={{ display: "flex" }}>
                    {record?.status === 'PENDING' ? (<>
                        <Button onClick={() => handleCheck(record?._id)} type="primary" >Duyệt</Button>
                    </>) : (<>  <Tag color="success" >{record?.status}</Tag></>)}

                </div>
            ),
        },
        {
            title: 'Action',
            render: (record) => (
                <div style={{ display: "flex" }}>
                    <UpdateBooking prop={record?._id} confrim={confirmUpdate} />
                    <DeleteBooking prop={record?._id} confrim={confirmUpdate} />
                </div>
            ),
            key: 'action',
        },
    ];

    useEffect(() => {
        const getBookingApi = async () => {
            try {
                setLoading(true);
                const getBookings = await getBooking(current, pageSize);
                if (getBookings.statusCode === 200) {
                    setData(getBookings?.data?.result);
                    setTotal(getBookings.data.meta.total);
                    setPageSize(getBookings.data.meta.pageSize);
                } else {
                    // Handle error case if needed
                }
            } catch (error) {
                message.error(error);
            } finally {
                setLoading(false);
            }
        };
        getBookingApi();
    }, [update, current]);

    return (
        <>
            <Spin spinning={loading}>
                <CreatBooking prop={confirmUpdate} />
                <Table dataSource={data} columns={columns} pagination={false} />
                <Pagination onChange={(e) => setCurrent(e)} pageSize={pageSize} defaultCurrent={current} total={total} />
            </Spin>
        </>
    );
};

export default BookingPage;
