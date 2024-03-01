export interface Permission {
    pid: number
    name: string
    path: string
    allow?: boolean
    parent?: number
    desc?: string
}

// {
//     pid: 4,  // 权限ID
//     name: 'avatar',  // 权限名称
//     path: 'admin.useradmin.editUserInfo.avatar',  // 权限路径
//     parent?: 3,  // 父级权限ID
//     allow?: false  // 权限默认值
// }

export const defaultPermissions: Permission[] = [
    // 普通用户相关权限
    {
        pid: 10,
        name: 'user',
        path: 'user',
        desc: '普通用户相关权限'
    },
    // 用户执行命令
    {
        pid: 102,
        name: 'command',
        path: 'user.command',
        parent: 10,
        allow: true,
        desc: '用户执行命令'
    },
    // help 命令
    {
        pid: 10203,
        name: 'help',
        path: 'user.command.help',
        parent: 102,
        desc: 'help 命令'
    },
    // check-in 命令
    {
        pid: 10204,
        name: 'checkIn',
        path: 'user.command.checkIn',
        parent: 102,
        desc: 'check-in 命令'
    }
]
