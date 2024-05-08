import type { Event } from '@/types/user'

export default async (args: string[], event: Event) => {
    console.log(args, event)
}
