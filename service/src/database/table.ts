import { DataTypes, Model } from 'sequelize'

import config from '@/utils/config'

import logger from '@/utils/log'

import db from '@/utils/db'

import type {
    DataBase,
    UserTable,
    PermissionTable,
    GroupPermissionTable,
    GroupTable,
    BillTable
} from '@/types/db'

export const User = db.define<Model<UserTable, DataBase<UserTable>>>('user', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    group: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    coin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    nid: {
        type: DataTypes.STRING
    }
})

export const Group = db.define<Model<GroupTable>>('Group', {
    gid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export const Permission = db.define<Model<PermissionTable>>('Permission', {
    pid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    parent: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

export const GroupPermission = db.define<Model<GroupPermissionTable>>('GroupPermission', {
    gpid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    specialValue: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    allow: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

export const Bill = db.define<Model<BillTable>>('Bill', {
    bid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coin: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    before: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    after: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
})

Group.belongsToMany(Permission, {
    through: {
        model: GroupPermission,
        unique: false
    }
})

Permission.belongsToMany(Group, {
    through: {
        model: GroupPermission,
        unique: false
    }
})

User.hasMany(Bill, {
    foreignKey: 'uid'
})

Bill.belongsTo(User, {
    foreignKey: 'uid'
})

if (config.sql.sync === true) {
    logger.info('开始同步数据库，如果您不需要，请在配置文件中禁用')
    try {
        await db.sync({ alter: true })
        import('./default')
        logger.info('数据库同步成功')
    } catch (error) {
        logger.error('数据库同步失败')
        logger.error(error)
        process.exit(0)
    }
}
