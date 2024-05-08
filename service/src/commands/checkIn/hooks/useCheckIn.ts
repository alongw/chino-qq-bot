import { useData } from '@/hooks/useDataFile'
import dayjs from 'dayjs'
import { useCoin } from '@/hooks/useCoin'
import { auth } from '@/utils/permission'

import logger from '@/utils/log'

interface FileData {
    date: number
    members: string[]
}

const { getFile, writeFile, fileExists } = useData('/checkIn')

export const useCheckIn = async (id: string) => {
    if (!fileExists('./data.json')) {
        writeFile(
            './data.json',
            JSON.stringify({
                date: dayjs().get('date'),
                members: []
            })
        )
    }

    if ((await auth('user.command.checkIn', id)) === false) {
        return {
            status: false,
            message: '抱歉，你无权使用此命令'
        }
    }

    const fileData = JSON.parse(getFile('./data.json')) as FileData
    if (fileData.date !== dayjs().get('date')) {
        fileData.date = dayjs().get('date')
        fileData.members = []
        writeFile('./data.json', JSON.stringify(fileData))
    }
    if (fileData.members.includes(id)) {
        return {
            status: false,
            message: '你今天已经签到过啦！不能再签到了哦！'
        }
    }
    fileData.members.push(id)
    writeFile('./data.json', JSON.stringify(fileData))

    const random = Math.floor(Math.random() * 50 + 1)

    const { update } = await useCoin(id)

    const result = await update({
        number: random,
        name: '每日签到积分奖励',
        type: 'add',
        desc: '使用 /check-in 命令签到获得积分'
    })

    if (!result.status) {
        logger.error('用户尝试签到失败，数据库报错：', result.msg)
        return {
            status: false,
            message: '签到失败！发生内部错误！'
        }
    }

    return {
        status: true,
        message: `签到成功！你获得了 ${random} 积分！`
    }
}
