import axios, { type Response } from '@/utils/axios'

// get state
export const getState = async () => {
    return await axios.get<
        Response<{
            state: string
        }>
    >('/login/')
}

// login
export const login = async (data: { code: string }) => {
    return await axios.post<
        Response<{
            token: string
            expire: number
        }>
    >('/login', data)
}
