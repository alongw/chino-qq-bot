import dayjs from 'dayjs'

import { Bill, User } from '@/database/table'
import validator from 'validator'

import type { Event } from '@/types/user'

export default async (args: string[], event: Event) => {
    const number = args[0] || 10
    if (!validator.isInt(number.toString()) || +number < 1 || +number > 30) {
        return event.reply({
            content: '查询积分记录失败：参数错误！',
            msg_type: 0
        })
    }
    const result = await Bill.findAll({
        where: {
            uid: event.user.id
        },
        include: User,
        limit: +number
    })
    if (result.length === 0) {
        return event.reply({
            content: '查询积分记录失败：没有找到相关记录！',
            msg_type: 0
        })
    }
    const billList = result.map((e) => e.toJSON()).reverse()
    const reply = billList
        .map((e, i) => {
            return `(${i + 1})${dayjs(e.time).format('YYYY-MM-DD HH:mm:ss')} | ${
                e.before
            } => ${e.after} | ${e.name}`
        })
        .join('\n')

    event.reply({
        content: `查询积分记录成功：（最后${
            billList.length < 10 ? 10 : billList.length
        }条）\n${reply}\n若需查询更多详细记录，请使用其他渠道`,
        msg_type: 0
    })
}
