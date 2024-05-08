import dayjs from 'dayjs'

import { useUserCharacter, getMsg } from './hooks/useUserCharacter'

import type { Event } from '@/types/user'

const value = new Map<
    string,
    {
        luck: number
        exp: number
    }
>()

export default (args: string[], event: Event) => {
    const { getCharacter } = useUserCharacter(event.user.id)

    let luckValue = value.get(event.user.id)

    if (!luckValue || dayjs().get('date') !== luckValue.exp) {
        luckValue = {
            luck: getCharacter(),
            exp: dayjs().get('date')
        }
        value.set(event.user.id, luckValue)
    }

    event.reply({
        content: `你今天的人品是：${luckValue.luck}，${getMsg(luckValue.luck)}`,
        msg_type: 0
    })
}
