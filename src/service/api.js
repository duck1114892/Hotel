import { current } from "@reduxjs/toolkit";
import axios from "../utils/axios-customsize";

export const loginApi = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}
export const registerApi = (username, email, phone, password) => {
    return axios.post('/api/v1/user/register', { fullName: username, email, phone, password })
}
export const getBookApi = (current, pageSize) => {
    return axios.get('/api/v1/book',
        {
            params: {
                current: current,
                pageSize: pageSize
            }
        })
}
export const getCateGory = () => {
    return axios.get('/api/v1/database/category')
}
export const getBookDetail = (id) => {
    return axios.get(`/api/v1/book/${id}`)
}
export const refeshToken = () => {
    return axios.get('/api/v1/auth/account')
}