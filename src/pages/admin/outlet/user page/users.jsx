import { Flex, Pagination, Table } from "antd"
import { useEffect, useState } from "react";
import { getUser } from "../../../../service/api";
import CreateUserBtn from "./outlet/createUserModel";
import UpdateUserBtn from "./outlet/updateUser";
import DeleteUSerModel from "./outlet/deleteUserModel";
import { useSelector } from "react-redux";


const UserPage = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [total, setTotal] = useState();
    const [isDelete, setDelete] = useState(false)

    const onShowSizeChange = (current) => {
        setCurrent(current)
    }
    const confirmDelete = () => {
        setDelete(!isDelete)
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'

        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Role',
            render: (record) => {

                return <div>{record.role?.name ?? 'nul'}</div>
            },
            key: 'role'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Action',
            render: (record) => {
                return (<div style={{ display: "flex", justifyContent: "space-between" }}><UpdateUserBtn prop={record} delete={confirmDelete}></UpdateUserBtn><DeleteUSerModel prop={record} delete={confirmDelete}></DeleteUSerModel></div>)
            },
            key: 'action'
        }
    ];
    const findEmail = useSelector(state => state.searchReducer.keyValue)
    const getUserApi = async () => {
        setLoading(true);
        setError(null);

        try {
            const getUsers = await getUser(current, pageSize, findEmail);

            if (getUsers && getUsers.data) {
                setData(getUsers.data.result);
                setPageSize(getUsers.data.meta.pageSize);
                setTotal(getUsers.data.meta.total);
            } else {
                setError('Refresh failed: No data returned');
            }
        } catch (error) {
            console.error('Refresh failed:', error);
            setError('Refresh failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDataWithRetry = async () => {
            const maxRetries = 3;
            let retries = 0;

            while (retries < maxRetries) {
                await getUserApi();

                // If data is fetched successfully, break out of the loop
                if (!error) {
                    break;
                }

                // If there was an error, increment the retries and wait for a while before retrying
                retries += 1;
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        };

        fetchDataWithRetry();
    }, [current, pageSize, isDelete, findEmail]);

    return (
        <>
            <CreateUserBtn delete={confirmDelete} />
            <Table loading={loading} pagination={false} columns={columns} dataSource={data} />
            <Pagination onChange={(e) => setCurrent(e)} pageSize={pageSize} defaultCurrent={current} total={total} />
        </>
    );
};

export default UserPage;