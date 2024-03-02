import { useUserCharacter, getMsg } from './hooks/useUserCharacter'

import type { Event } from '@/types/user'

export default (args: string[], event: Event) => {
    const { getCharacter } = useUserCharacter(event.user.id)

    const luckValue = getCharacter()

    event.reply({
        content: `你今天的人品是：${luckValue}，${getMsg(luckValue)}`,
        msg_type: 0
    })
}
