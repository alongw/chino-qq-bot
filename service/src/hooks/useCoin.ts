import dayjs from 'dayjs'

import logger from '@/utils/log'
import { checkValue } from '@/utils/common'
import { User, Bill } from '@/database/table'

const getUser = async (uid: string) => {
    const result = await User.findOne({
        where: {
            id: uid
        }
    })
    return result
}

interface AddConfig {
    number: number
    name: string
    type: 'add' | 'sub'
    desc?: string
}

export const useCoin = async (uid: string) => {
    const get = async () => {
        const user = await getUser(uid)
        if (!user) {
            return {
                status: false,
                msg: 'Can not find user'
            }
        }
        return {
            status: true,
            coin: user.toJSON().coin
        }
    }

    const update = async (
        configOrType: 'add' | 'sub' | AddConfig,
        number?: number,
        name?: string,
        desc?: string
    ) => {
        // 效验参数
        if (typeof configOrType === 'object') {
            number = configOrType.number
            name = configOrType.name
            desc = configOrType.desc
            configOrType = configOrType.type
        }
        if (!checkValue(configOrType, name, number)) {
            return {
                status: false,
                msg: 'Missing required parameters'
            }
        }
        try {
            // 查找用户
            const user = await getUser(uid)
            if (!user) {
                return {
                    status: false,
                    msg: 'Can not find user'
                }
            }
            // 判断积分是否足够
            if (configOrType === 'sub' && user.toJSON().coin < number) {
                return {
                    status: false,
                    msg: 'Insufficient user coin'
                }
            }
            // 写入账单
            Bill.create({
                uid,
                coin: number,
                name,
                desc,
                before: user.toJSON().coin,
                after:
                    configOrType === 'add'
                        ? user.toJSON().coin + number
                        : user.toJSON().coin - number,
                type: configOrType === 'add' ? 1 : 2,
                time: dayjs().valueOf()
            })
            // 更新用户余额
            User.update(
                {
                    coin:
                        configOrType === 'add'
                            ? user.toJSON().coin + number
                            : user.toJSON().coin - number
                },
                {
                    where: {
                        id: uid
                    }
                }
            )
            return {
                status: true,
                msg: 'Update user coin success'
            }
        } catch (error) {
            logger.error('更新用户积分发生错误：' + error)
            return {
                status: false,
                msg: 'Update user coin error'
            }
        }
    }

    return {
        update,
        get
    }
}
