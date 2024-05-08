import axios from 'axios'
import logger from '@/utils/log'

interface Motd {
    host: string
    port?: number
    ipv6Port: number
    name?: string
    status: string
    motd: string
    players_max: number
    players_online: number
    players: any[]
    version: string
    modInfo: string
    favicon: string
}

export const useMotd = async (ip: string, port?: number) => {
    try {
        const { data: result } = (await axios('https://api.imlazy.ink/mcapi', {
            params: {
                type: 'json',
                host: port ? `${ip}:${port}` : ip,
                be: port ? 'true' : 'false'
            }
        })) as { data: Motd }

        return result
    } catch (error) {
        logger.error('获取 mc 服务器信息失败', error)
        return null
    }
}
