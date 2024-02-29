import client from '@/utils/bot'
import { useCommand } from '@/hooks/useCommand'
import logger, { cmdLogger } from '@/utils/log'

import { CommandResponseType } from '@/types/command'

// 监听群消息
client.on('group.at.message.create', (e) => {
    console.log(e)
    const { status, data, message } = useCommand(e)
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
    console.log(data)

    const { name, args } = data
})
