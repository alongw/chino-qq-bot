import _ from 'lodash'

import { CommandResponseType } from '@/types/command'

import { type GroupAtMessageCreate } from 'amesu'

// {
//     t: 'GROUP_AT_MESSAGE_CREATE',
//     author: {
//       id: 'B6032A90790CEBCD2AD2E5858FEEC147',
//       member_openid: 'B6032A90790CEBCD2AD2E5858FEEC147'
//     },
//     content: ' 阿斯顿发',
//     group_id: 'ADF11AC257B091235EC4D1C423799178',
//     group_openid: 'ADF11AC257B091235EC4D1C423799178',
//     id: 'ROBOT1.0_EQutZDB6U2.71AbplxgCmjYccilzKyGmH-wT3QYh.pz-ogFVO8ydVq7dMQ9Es6LDvUaVFFDYXEhgn-alPz7rbg!!',
//     timestamp: '2024-03-01T01:59:47+08:00',
//     reply: [Function (anonymous)]
//   }

export const splitCommand = (
    command: string
): {
    name: string
    args: string[]
} => {
    const [name, ...args] = command.split(' ')
    return { name, args }
}

export const useCommand = (
    event: GroupAtMessageCreate
): {
    status: CommandResponseType
    message?: string
    data?: {
        name: string
        args: string[]
    }
} => {
    const command = _.trim(event.content)
    if (command[0] !== '/')
        return {
            status: CommandResponseType.Fail,
            message: 'Not a command'
        }
    const { name, args } = splitCommand(command)

    // TODO: check permission

    return {
        status: CommandResponseType.Success,
        data: {
            name,
            args
        }
    }
}
