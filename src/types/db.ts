interface Sequelize {
    createAt: number
    updateAt: number
}

export type DataBase<T> = Sequelize & T

export interface UserTable {
    id: string
    group: number
    name: string
    integral: number
}

export interface GroupTable {
    gid: number
    name: string
}

export interface PermissionTable {
    pid: number
    name: string
    description: string
    parent: number
}

export interface GroupPermissionTable {
    gpid: number
    gid: number
    pid: number
    specialValue: number
    allow: boolean
}
