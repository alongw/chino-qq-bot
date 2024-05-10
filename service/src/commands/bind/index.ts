import { useBindCode } from '@/hooks/useBindCode'

import { User } from '@/database/table'

import { auth } from '@/utils/permission'

import type { Event } from '@/types/user'
import logger from '@/utils/log'

const { verifyCode } = useBindCode()

export default async (args: string[], event: Event) => {
    if (!(await auth('user.command.motd', event.author.member_openid))) {
        return event.reply({
            msg_type: 0,
            content: '命令执行失败：Permission denied'
        })
    }

    const code = args[0]
    if (!code) {
        return event.reply({
            msg_type: 0,
            content: '命令执行失败：参数不足'
        })
    }

    // check code
    const nid = verifyCode(code, event.author.member_openid)
    if (!nid) {
        return event.reply({
            msg_type: 0,
            content: '命令执行失败：绑定码无效'
        })
    }

    // write to db
    try {
        await User.update(
            {
                nid: nid
            },
            {
                where: {
                    id: event.author.member_openid
                }
            }
        )
    } catch (error) {
        logger.error('绑定 nid 数据库报错：', error)
        return event.reply({
            msg_type: 0,
            content: '命令执行失败：未知错误，请联系技术人员。'
        })
    }

    return event.reply({
        msg_type: 0,
        content:
            '绑定成功，你现在可以在网页上操作你的账号了。（若网页未变化，请刷新网页）'
    })
}
