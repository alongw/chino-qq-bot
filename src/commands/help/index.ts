import { useData } from '@/hooks/useDataFile'

import type { Event } from '@/types/user'

const { getFile, writeFile } = useData('/help')

const defaultHelpMsg = `帮助菜单
所有命令都需要 "@" 机器人后输入，尖括号包裹是的必填参数，中括号包裹的是可选参数
命令列表
- /help -- 获取帮助菜单
- /check-in -- 签到
- /me -- 获取一条关于我的信息
- /bill [number] -- 获取最近的积分流水（最高30条）
- /jrrp -- 获取今日人品值
- /motd <address> [bedrock port] -- 获取服务器状态`

if (!getFile('help.txt')) {
    writeFile('help.txt', defaultHelpMsg)
}

const helpMsg = getFile('help.txt')

export default (args: string[], event: Event) => {
    event.reply({
        content: helpMsg || defaultHelpMsg,
        msg_type: 0
    })
}
