import { message } from "antd";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BE_URL
const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

const updateToken = async () => {
    const res = await instance.get('/api/v1/auth/refresh')
    console.log("chec", res)
    if (res && res.data) {
        return res.data.access_token
    }
    else { return null }
}
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
const NO_RETRY_HEADER = 'x-no-retry'
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
instance.interceptors.response.use(
    function (response) {
        return response && response.data ? response.data : response
    },
    async function (error) {
        console.log('this is', error.response.data)
        message.error(error.response.data.message)
        if (error.config
            && error.response
            && +error.response.status === 401
            && !error.config.headers[NO_RETRY_HEADER]) {
            const access_token = await updateToken()
            error.config.headers[NO_RETRY_HEADER] = 'true'
            if (access_token) {
                error.config.headers['Authorization'] = `Bearer ${access_token}`
                localStorage.setItem("access_token", access_token)
                return instance.request(error.config)
            }
        } else {
            return Promise.reject(error);
        }
    }
);
export default instance