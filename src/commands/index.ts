import client from '@/utils/bot'
import { useCommand, commands } from '@/hooks/useCommand'
import logger, { cmdLogger } from '@/utils/log'

import { CommandResponseType } from '@/types/command'

import './import'

// 监听群消息
client.on('group.at.message.create', async (e) => {
    const { status, data, message } = await useCommand(e)
    if (status !== CommandResponseType.Success) {
        if (status === CommandResponseType.Fail) return
        e.reply({
            content: `命令执行失败：${message || 'unknown error'}`,
            msg_type: 0
        })

        return
    }
    cmdLogger.info(
        `[Command] user ${e.author.id} run command ${JSON.stringify(
            e.content
        )} in group ${e.group_openid}`
    )

    const { name, args, user } = data

    if (!commands.has(name)) {
        return e.reply({
            content: `命令执行失败：Unknown command, please check your input or use /help for help`,
            msg_type: 0
        })
    }

    return commands.get(name)(args, {
        ...e,
        user
    })
})
