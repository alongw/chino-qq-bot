import yaml from 'js-yaml'
import fse from 'fs-extra'

import logger from './log'

type LogLevel = 'OFF' | 'FATAL' | 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE' | 'ALL'

const defaultConfig = {
    dev: false,
    sql: {
        type: 'mysql',
        sync: true,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'chino'
    },
    bot: {
        appid: '114514',
        token: '1919810',
        secret: '10086',
        sandbox: false,
        max_retry: 3,
        log_level: 'INFO' as LogLevel
    }
}

// 判断文件是否存在
if (!fse.existsSync('./config.yaml')) {
    logger.error('未找到配置文件，将尝试自动创建')
    try {
        fse.writeFileSync('./config.yaml', yaml.dump(defaultConfig))
    } catch (error) {
        logger.error('创建配置文件失败' + error)
        process.exit(1)
    }

    logger.info('配置文件创建成功，请修改配置文件')
    process.exit(0)
}

// 读取配置文件
let config: typeof defaultConfig
try {
    config = yaml.load(fse.readFileSync('./config.yaml', 'utf-8')) as typeof defaultConfig
} catch (error) {
    logger.error('读取配置文件失败' + error)
    process.exit(1)
}

export default config
