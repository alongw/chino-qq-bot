import axios from 'axios'
// import type { AxiosResponse } from 'axios'
import { emit } from '@/event'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// http request 拦截器
axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token')
        if (token && config.headers) {
            // 将token设置成请求头
            // 需要在客户端拼接 Bearer 的前缀
            config.headers.Authorization = 'Bearer ' + token
        }

        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(
    (config) => {
        if (config?.data?.status == 401) {
            emit('API:UNAUTHORIZED')
        } else {
            emit('API:UNKNOW')
        }

        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

export type Response<T = any> = { status: number; msg: string; data: T }

export default axios
