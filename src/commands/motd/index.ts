import { useMotd } from './hooks/useMotd'

import type { Event } from '@/types/user'

export default async (args: string[], event: Event) => {
    if (!args[0]) {
        return event.reply({
            msg_type: 0,
            content: '命令执行失败：Not enough parameters'
        })
    }

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
        )}\n版本：${JSON.stringify(result.version || '未知')}`
    })
}
