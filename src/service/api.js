import { current } from "@reduxjs/toolkit";
import axios from "../utils/axios-customsize";

export const loginApi = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}
export const signUpApi = (value) => {
    return axios.post('/api/v1/auth/register', value)
}
export const refesh = () => {
    return axios.get('/api/v1/auth/account')
}
export const getUser = (current, pageSize) => {
    return axios.get(`/api/v1/users?current=${current}&pageSize=${pageSize}`)
}
export const getPermission = () => {
    return axios.get('/api/v1/permissions')
}
export const creatUser = (value) => {
    return axios.post('/api/v1/users', value)
}
export const getRole = () => {
    return axios.get('/api/v1/roles')
}
export const updateUser = (id, values) => {
    return axios.patch(`/api/v1/users/${id}`, values)
}
export const refreshToken = () => {
    return axios.get('/api/v1/auth/refresh')
}
export const deleteUser = (id) => {
    return axios.delete(`/api/v1/users/${id}`)
}
console.log(getPermission())
export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}
