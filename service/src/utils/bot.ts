import { Client } from 'amesu'
import config from './config'

const client = new Client({
    ...config.bot,
    events: ['GROUP_MESSAGES', 'PUBLIC_GUILD_MESSAGES']
})

// 机器人上线
client.online()

export default client
