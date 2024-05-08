import { useCheckIn } from './hooks/useCheckIn'

import type { Event } from '@/types/user'

export default async (args: string[], event: Event) => {
    const { message, status } = await useCheckIn(event.author.member_openid)

    event.reply({
        content: message,
        msg_type: 0
    })
}
