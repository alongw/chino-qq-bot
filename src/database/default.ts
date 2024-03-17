import { Group, Permission } from './table'

import {
    defaultPermissions,
    type Permission as PermissionType
} from '@/permission/permission'

await Group.findOrCreate({
    where: {
        gid: 1
    },
    defaults: {
        gid: 1,
        name: 'default'
    }
})

for (const e of defaultPermissions as unknown as PermissionType[]) {
    await Permission.findOrCreate({
        where: {
            pid: e.pid
        },
        defaults: {
            pid: e.pid,
            name: e.name,
            parent: e.parent,
            description: e.desc
        }
    })
}
