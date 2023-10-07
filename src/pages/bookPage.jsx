import React, { useEffect, useState } from "react";
import { Button, Card, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import { Link, useLocation } from "react-router-dom";
import { getBookApi } from "../service/api";
import { useSelector } from "react-redux";
import { filter } from "../redux/filter/action";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const BookPage = () => {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState()
    const [pageSize, setPageSize] = useState(8)
    const [book, setBook] = useState([]);
    let cate = useSelector((state) => state.rootReducer.category);
    let filterState = useSelector((state) => state.rootReducer.isFilter);


    useEffect(() => {
        let getBook = async () => {
            let dataApi = await getBookApi(page, pageSize)

            let data = dataApi.data.result
            setTotal(dataApi.data.meta.total)
            let dataFilter;
            if (filterState) {
                dataFilter = data.filter((item1) =>
                    cate.some((item2) => item2 === item1.category)
                );
                setPageSize()
                setTotal()
            } else {
                dataFilter = data;
            }
            setBook(dataFilter);
        }
        getBook()
    }, [page, cate, filterState]);

    // Calculate the total number of pages based on the number of books and pageSize




    return (
        <Content
            className="site-layout"
            style={{
                margin: "80px 0",
                height: "100%",
            }}
        >
            <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                {book.map((item) => (
                    <div key={item._id} style={{ flex: "0 0 calc(25% - 16px)", margin: "8px" }}>
                        <Card
                            hoverable
                            style={{
                                width: 240,
                            }}
                            cover={
                                <Link to={`/book-detail/${item._id}`}>
                                    <img style={{ width: '100%' }} src="https://static2.vieon.vn/vieplay-image/poster_v4/2023/07/06/wkqqn3xh_660x946-chuthuathoichien2-tagtapmoi.png" alt={item.mainText} />
                                </Link>} // Add an alt attribute
                        >
                            <Meta title={item.mainText} />
                            <div
                                style={{
                                    width: "100%",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {item.author}
                            </div>
                            <div style={{ fontWeight: 600 }}>{item.price} VND</div>
                        </Card>
                    </div>
                ))}
            </div>
            <Pagination
                style={{ width: "100%" }}
                current={page}
                onChange={(page) => {
                    setPage(page);
                }}
                total={total} // Use totalPages to calculate the total
                pageSize={8}
            />
        </Content>
    );
};

export default BookPage;
