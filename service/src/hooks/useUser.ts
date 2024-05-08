import { User } from '@/database/table'
import dayjs from 'dayjs'

import type { UserTable } from '@/types/db'

const userList = new Map<
    string,
    {
        exp: number
        data: UserTable
    }
>()

/*
 * @description: 获取用户信息(带缓存)
 */
export const getUser = async (id: string) => {
    if (userList.has(id)) {
        const user = userList.get(id)
        if (user.exp > dayjs().valueOf()) {
            return user.data
        }
        userList.delete(id)
    }
    const user = await User.findOrCreate({
        where: {
            id: id
        }
    })
    userList.set(id, {
        exp: dayjs().add(1, 'day').valueOf(),
        data: user[0].get()
    })
    return user[0].get()
}

/*
 * @description: 获取用户实时信息
 */
export const getUserInfo = async (id: string) => {
    if (userList.has(id)) {
        userList.delete(id)
    }
    const user = await User.findOrCreate({
        where: {
            id: id
        }
    })
    userList.set(id, {
        exp: dayjs().add(1, 'day').valueOf(),
        data: user[0].get()
    })
    return user[0].get()
}
