import axios from "axios";
const baseUrl = import.meta.env.VITE_BE_URL
const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        if (response && response.data) {
            return response.data;
        } else {
            return response;
        }
    },
    function (error) {
        if (error && error.response && error.response.data) {
            return error.response.data;
        } else {
            return Promise.reject(error);
        }
    }
);
export default instance