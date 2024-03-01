import { useMotd } from './hooks/useMotd'

import dayjs from 'dayjs'

import type { Event } from '@/types/user'

let exp: number | undefined

export default async (args: string[], event: Event) => {
    if (!args[0]) {
        return event.reply({
            msg_type: 0,
            content: '命令执行失败：Not enough parameters'
        })
    }

    if (exp && dayjs().valueOf() < exp) {
        return event.reply({
            msg_type: 0,
            content: '命令执行失败：Too many requests, please try again later.'
        })
    }

    exp = dayjs().add(15, 's').valueOf()

    const result = await useMotd(args[0], args[1] ? +args[1] : undefined)
    if (!result) {
        return event.reply({
            msg_type: 0,
            content: '获取 mc 服务器信息失败，请稍后再试'
        })
    }
    return event.reply({
        msg_type: 0,
        content: `获取 mc 服务器信息成功：\n服务器状态：${JSON.stringify(
            result.status
        )}\n人数：${JSON.stringify(result.players_online)}/${JSON.stringify(
            result.players_max
        )}\n版本：${JSON.stringify(
            result.version || '未知'
        )}\n\n以上信息仅供参考，由服务器自身提供，与本机器人无关`
    })
}
