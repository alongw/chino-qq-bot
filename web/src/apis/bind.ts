import axios, { type Response } from '@/utils/axios'

// get bind code
export const getBindCode = async () => {
    return await axios.get<
        Response<{
            code: string
        }>
    >('/bind')
}
