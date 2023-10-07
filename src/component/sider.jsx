import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Checkbox, Col, Layout, Row, theme } from 'antd';
import { getCateGory } from "../service/api";
import { filter, isFilter } from '../redux/filter/action';

const SiderComponent = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tick, setTick] = useState() // Trạng thái tải dữ liệu
    const dispatch = useDispatch();

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        dispatch(filter(checkedValues));
        if (checkedValues.length !== 0) {
            dispatch(isFilter(true))
        }
        else {
            dispatch(isFilter(false))
        }
    };

    const { token: { colorBgContainer } } = theme.useToken();

    useEffect(() => {
        const getCategoryApi = async () => {
            setLoading(true);
            try {
                const data = await getCateGory();
                setResult(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        getCategoryApi();
    }, []);

    return (
        <Layout.Sider
            style={{
                background: colorBgContainer,
                marginTop: "80px"
            }}
            width={300}
        >
            <div style={{ fontSize: "20px", textAlign: 'center' }}>Thể Loại :</div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Checkbox.Group
                    style={{
                        width: '100%',
                    }}
                    onChange={onChange}
                >
                    <Row>
                        {result.map((item) => (
                            <Col span={20} key={item}>
                                <Checkbox style={{ marginLeft: '10%', fontSize: "17px" }} value={item}>{item}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            )}
        </Layout.Sider>
    );
}

export default SiderComponent;
